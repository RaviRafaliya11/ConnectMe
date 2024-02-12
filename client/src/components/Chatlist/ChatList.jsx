import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import List from "./List";
import { useStateProvider } from "@/context/StateContext";
import ContactsList from "./ContactsList";

function ChatList() {
  const [{ contactsPage, isLeftSideOpen, currentChatUser }, dispatch] =
    useStateProvider();
  const [pageType, setPageType] = useState("default");

  useEffect(() => {
    if (contactsPage) {
      setPageType("all-contacts");
    } else {
      setPageType("default");
    }
  }, [contactsPage]);
  return (
    <div
      className={` bg-white dark:bg-gray-900
      w-auto sm:w-auto sm:flex flex-col max-h-screen z-20
      ${currentChatUser ? "hidden sm:inline-block" : ""}
      `}
    >
      {pageType === "default" && (
        <>
          <SearchBar />
          <List />
        </>
      )}

      {pageType === "all-contacts" && (
        <>
          <ContactsList />
        </>
      )}
    </div>
  );
}

export default ChatList;
