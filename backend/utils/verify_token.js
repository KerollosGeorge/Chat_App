import jwt, { verify } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "You are not authorized to access this resource" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Token is not Valid!" });
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "You are not authorized to access this resource" });
    }
  });
};
