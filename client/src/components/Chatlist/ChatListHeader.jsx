import React, { useState } from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { reducerCases } from "@/context/constants";
import { useRouter } from "next/router";
import ContextMenu from "../common/ContextMenu";

function ChatListHeader() {
  const [{ userInfo }, dispatch] = useStateProvider();
  const router = useRouter();
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuLocation, setContextMenuLocation] = useState({
    x: 0,
    y: 0,
  });

  const showContextMenu = (e) => {
    e.preventDefault();
    setContextMenuVisible(true);
    setContextMenuLocation({ x: e.pageX, y: e.pageY });
  };

  const contextMenuOptions = [
    {
      name: "Logout",
      callback: async () => {
        setContextMenuVisible(false);
        router.push("/logout");
      },
    },
  ];

  const handleAllContactsPage = () => {
    dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
  };

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center">
      <div className="cursor-pointer">
        <Avatar type="sm" image={userInfo?.profileImage} />
      </div>
      <div className="flex gap-6">
        <BsFillChatLeftTextFill
          className=" text-panel-header-icon cursor-pointer text-xl"
          title="New Chat"
          onClick={handleAllContactsPage}
        />
        <>
          <BsThreeDotsVertical
            className=" text-panel-header-icon cursor-pointer text-xl"
            title="Menu"
            id="context-opener"
            onClick={(e) => showContextMenu(e)}
          />
        </>
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

export default ChatListHeader;
