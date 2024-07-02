import { Message } from "./Message";
import { BsSend } from "react-icons/bs";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../Context/AuthContext";
import { useConversation } from "../zestand/useConversation";
import { useEffect, useRef, useState } from "react";
import { useSendMessage } from "../Hooks/useSendMessage";
import { useGetMessages } from "../Hooks/useGetMessages";
import MessageSkeleton from "./MessageSkeleton";
import { useListenMessages } from "../Hooks/useListenMessages";

export const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const { Loading, messages } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="flex gap-1 items-center justify-start bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text font-bold text-slate-200">To:</span>
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullName}
            </span>
          </div>

          <div className="px-4 flex-1 overflow-auto ">
            {Loading &&
              [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!Loading && messages.length === 0 && (
              <p className="text-center">
                send a message to start the conversation
              </p>
            )}
            {!Loading &&
              messages.length > 0 &&
              messages.map((m) => {
                return (
                  <div key={m._id} ref={lastMessageRef}>
                    <Message message={m} />
                  </div>
                );
              })}
          </div>
          <form className="px-4 my-3" onSubmit={handleSubmit}>
            <div className="w-full relative">
              <input
                type="text"
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
                placeholder="send a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className=" absolute inset-y-0 end-0 flex items-center pe-3">
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <BsSend />
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col gap-2 px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold items-center">
        <p>Welcome 👋 {authUser.fullName} ❄️</p>
        <p>Select a chat to start a messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
