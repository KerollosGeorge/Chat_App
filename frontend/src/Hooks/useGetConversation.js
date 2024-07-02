import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useGetConversation = () => {
  const [load, setLoad] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversation = async () => {
      setLoad(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoad(false);
      }
    };
    getConversation();
  }, []);
  return { load, conversations };
};
