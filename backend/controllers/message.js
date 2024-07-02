import { StatusCodes } from "http-status-codes";
import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const { message } = req.body;
    //if user not login this will make error so we need middleware to protect route
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // if there is no a previous conversation then create new one with empty message (default)
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    // if there is a previous conversation then add message to it
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await newMessage.save(); if it take 1s
    // await conversation.save(); and 1s then it waits 2sec

    //promise run parallel and doesn't take time like (await newMessage.save();)
    await Promise.all([newMessage.save(), conversation.save()]); //but this wait 1sec only

    //Socket IO functionality will go here to make it real time
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(StatusCodes.CREATED).json(newMessage);
  } catch (error) {
    console.log("Error in Send Message Contoller: ", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    //to return the array of bojects each obj => (message)
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // not REF but Actual Messages

    //if there is no conversation then return an empty array
    if (!conversation) {
      return res.status(StatusCodes.NOT_FOUND).json([]);
    }
    const messages = conversation.messages;

    res.status(StatusCodes.OK).json(messages);
  } catch (error) {
    console.log("Error in Get Messages Contoller: ", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "internal server error" });
  }
};
