import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getAllUsers } from "../controllers/user.js";

const router = express.Router();

//get users
router.get("/", protectRoute, getAllUsers);

export default router;
