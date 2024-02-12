import { useStateProvider } from "@/context/StateContext";
import { calculateTime } from "@/utils/CalculateTime";
import React, { useEffect, useRef, useState } from "react";
import MessageStatus from "../common/MessageStatus";
import ImageMessage from "./ImageMessage";
import dynamic from "next/dynamic";
import { FaSortDown } from "react-icons/fa6";
import { DELETE_MESSAGE_ROUTE, GET_MESSAGES_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import { reducerCases } from "@/context/constants";
const VoiceMessage = dynamic(() => import("./VoiceMessage"), {
  ssr: false,
});

function ChatContainer() {
  const [{ messages, currentChatUser, userInfo, socket }, dispatch] =
    useStateProvider();
  const bottomRef = useRef(null);

  const latestMessageRef = useRef(null);

  useEffect(() => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({
        behavior: "smooth",
      });
      scrollToBottom();
    }
  }, [messages]);

  const handleDeleteMessage = async (messageInfo) => {
    try {
      const response = await axios.delete(
        `${DELETE_MESSAGE_ROUTE}/${messageInfo.id}`
      );

      socket.current.emit("send-msg", {
        to: currentChatUser.id,
        from: userInfo.id,
        message: "",
      });

      const getMessages = async () => {
        const {
          data: { messages },
        } = await axios.get(
          `${GET_MESSAGES_ROUTE}/${userInfo.id}/${currentChatUser.id}`
        );
        dispatch({ type: reducerCases.SET_MESSAGES, messages });
      };
      if (currentChatUser.id) getMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };
  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <div className="w-full p-5">
      {messages?.map((message, index) => (
        <div
          key={message.id}
          className={` group relative max-w-max flex ${
            message.senderId === currentChatUser.id
              ? "justify-start"
              : "justify-end flex-1 ml-auto"
          }`}
          ref={index === messages.length - 1 ? latestMessageRef : null}
        >
          {message.type === "text" && (
            <div
              className={`text-white px-2 py-[5px] mb-1 text-sm rounded-md flex gap-2 items-end w-fit ${
                message.senderId === currentChatUser.id
                  ? "bg-incoming-background"
                  : "bg-incoming-background"
              }`}
            >
              <span className="break-all">{message.message}</span>

              <div className="flex gap-1 items-end">
                <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
                  {calculateTime(message.createdAt)}
                </span>
                <span>
                  {message.senderId === userInfo.id && (
                    <MessageStatus messageStatus={message.messageStatus} />
                  )}
                </span>
              </div>
            </div>
          )}
          {message.type === "image" && <ImageMessage message={message} />}
          {message.type === "audio" && <VoiceMessage message={message} />}

          {userInfo.isPremiumUser && (
            <>
              {message.senderId !== currentChatUser.id && (
                <div className="text-white absolute mr-1 -mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FaSortDown className="text-white" />
                  <div className="hidden group-hover:block absolute top-full right-0 z-10">
                    <div className="bg-black/50 px-3 py-1 rounded-md hover:bg-blue-400/70 cursor-pointer">
                      Edit
                    </div>
                    <div
                      className="bg-black/50 px-3 py-1 rounded-md hover:bg-red-400/70 cursor-pointer"
                      onClick={() => handleDeleteMessage(message)}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ))}
      <div ref={bottomRef} className="pb-5" />
    </div>
  );
}

export default ChatContainer;
