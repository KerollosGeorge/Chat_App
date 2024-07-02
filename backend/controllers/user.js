import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const users = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    console.log("error in get users controller", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
