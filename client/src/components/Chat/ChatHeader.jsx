import React, { useState } from "react";
import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { IoMenuOutline } from "react-icons/io5";
import ContextMenu from "../common/ContextMenu";

function ChatHeader() {
  const [{ currentChatUser, onlineUsers }, dispatch] = useStateProvider();

  const handleVoiceCall = () => {
    dispatch({
      type: reducerCases.SET_VOICE_CALL,
      voiceCall: {
        ...currentChatUser,
        type: "out-going",
        callType: "voice",
        callaccepted: false,
        roomId: Date.now(),
      },
    });
  };

  const handleVideoCall = () => {
    dispatch({
      type: reducerCases.SET_VIDEO_CALL,
      videoCall: {
        ...currentChatUser,
        type: "out-going",
        callType: "video",
        roomId: Date.now(),
      },
    });
  };

  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuLocation, setContextMenuLocation] = useState({
    x: 0,
    y: 0,
  });

  const showContextMenu = (e) => {
    e.preventDefault();
    setContextMenuVisible(true);
    setContextMenuLocation({ x: e.pageX - 42, y: e.pageY + 10 });
  };

  const contextMenuOptions = [
    {
      name: "Exit",
      callback: async () => {
        setContextMenuVisible(false);
        dispatch({ type: reducerCases.SET_LEFT_SIDE_OPEN });
      },
    },
  ];

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center bg-panel-header-background z-10">
      <div className="flex items-center justify-center gap-6">
        {currentChatUser && (
          <div className="sm:hidden">
            <IoMenuOutline
              onClick={() =>
                dispatch({ type: reducerCases.SET_LEFT_SIDE_OPEN })
              }
              className="text-white text-3xl"
            />
          </div>
        )}
        <Avatar type="sm" image={currentChatUser?.profilePicture} />
        <div className="flex flex-col">
          <span className="text-primary-strong">{currentChatUser?.name}</span>
          <span className="text-secondary text-sm">
            {onlineUsers.includes(currentChatUser.id) ? "online" : "offline"}
          </span>
        </div>
      </div>
      <div className="flex gap-6">
        <MdCall
          onClick={handleVoiceCall}
          className="text-panel-header-icon cursor-pointer text-xl"
        />
        <IoVideocam
          onClick={handleVideoCall}
          className="text-panel-header-icon cursor-pointer text-xl"
        />
        <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-xl hidden sm:inline-block" />
        <BsThreeDotsVertical
          className="text-panel-header-icon cursor-pointer text-xl hidden sm:inline-block"
          id="context-opener"
          onClick={(e) => showContextMenu(e)}
        />
        {contextMenuVisible && (
          <ContextMenu
            options={contextMenuOptions}
            location={contextMenuLocation}
            setContextMenu={setContextMenuVisible}
          />
        )}
      </div>
    </div>
  );
}

export default ChatHeader;
