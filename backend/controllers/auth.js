import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const Register = async (req, res) => {
  const { fullName, username, password, confirmPassword, gender } = req.body;
  try {
    if (password !== confirmPassword) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Passwords don't match" });
    }
    // check user existance
    const user = await User.findOne({ username: username });
    if (user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "username already exists" });
    }
    //Password Hashing
    const isExist = await User.findOne({ username: username });
    if (!isExist) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
      const user = new User({
        fullName,
        username,
        password: hash,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      });
      generateTokenAndSetCookie(user._id, res);
      await user.save();
      res.status(StatusCodes.CREATED).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "User already exist" });
    }
  } catch (error) {
    console.log("Error in signup controller");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ error: "User Not Found" });
    }
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      return res.json({ error: "Wrong Password, Please try again" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(StatusCodes.OK).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

export const Logout = (req, res) => {
  try {
    res
      .cookie("jwt", "", { maxAge: 0 })
      .status(StatusCodes.OK)
      .json({ message: "User Logged Out" });
  } catch (error) {
    console.log("Error in logout controller");
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
