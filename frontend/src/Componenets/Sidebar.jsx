import { IoSearchSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { Conversation } from "./Conversation";
import { Link } from "react-router-dom";
import { useLogout } from "../Hooks/useLogout";
import { useGetConversation } from "../Hooks/useGetConversation";
import { getRandomEmoji } from "../Utils/emojis";
import { useState } from "react";
import { useConversation } from "../zestand/useConversation";
import toast from "react-hot-toast";
export const Sidebar = () => {
  const { loading, logout } = useLogout();
  const { load, conversations } = useGetConversation();
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    if (search.length < 3) {
      return toast.error("search term must be at least 3 characters long");
    }
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No such usee found");
    }
  };
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <form
        className="flex flex-col items-center gap-2"
        onSubmit={handleSubmit}
      >
        <div className="flex">
          <input
            type="text"
            placeholder="Search..."
            className="input input-borderd rounded-full "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-circle bg-sky-500 text-white"
          >
            <IoSearchSharp className="w-6 h-6 outline-none" />
          </button>
        </div>
        <div className="divider px-3" />
        <div className="w-full py-2 flex flex-col overflow-auto">
          {conversations.map((conversation, idx) => (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              emoji={getRandomEmoji()}
              lastIdx={idx === conversations.length - 1}
            />
          ))}
          {load ? <span className="loading loading-spinner"></span> : null}
        </div>
        <div></div>
      </form>
      <div className="mt-auto ">
        <Link to={"/login"}>
          {!loading ? (
            <BiLogOut
              className="w-6 h-6 text-white cursor-pointer"
              onClick={logout}
            />
          ) : (
            <span className="loading loading-spinner"></span>
          )}
        </Link>
      </div>
    </div>
  );
};
