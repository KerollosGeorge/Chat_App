import express from "express";
import { sendMessage, getMessages } from "../controllers/message.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

//send a message
router.post("/send/:id", protectRoute, sendMessage);

//get a message
router.get("/:id", protectRoute, getMessages);

export default router;
