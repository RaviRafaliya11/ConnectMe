import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import React from "react";
import { FaLayerGroup, FaSearch } from "react-icons/fa";
function SearchBar() {
  const [{ contactSearch, isUnreadChat }, dispatch] = useStateProvider();

  return (
    <div className="flex gap-3 items-center justify-between px-3 top-navigation border-r border-b border-gray-400 dark:border-gray-600">
      <div className="search w-full">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={contactSearch}
          onChange={(e) =>
            dispatch({
              type: reducerCases.SET_CONTACT_SEARCH,
              contactSearch: e.target.value,
            })
          }
        />
        <FaSearch size="18" className="text-secondary my-auto" />
      </div>
      <FaLayerGroup
        className={`sidebar-icon w-8 h-8 p-2 ${
          isUnreadChat ? "rounded-sm post-selected" : ""
        }`}
        title="Filter"
        onClick={() => dispatch({ type: reducerCases.SET_UNREAD_CHATS })}
      />
    </div>
  );
}

export default SearchBar;
