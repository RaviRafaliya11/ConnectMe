import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import { FaArrowLeft, FaSearch } from "react-icons/fa";

function ContactsList() {
  const [allContacts, setAllContacts] = useState([]);
  const [searchContacts, setSearchContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [{}, dispatch] = useStateProvider();

  useEffect(() => {
    if (searchTerm.length) {
      const filteredData = {};
      Object.keys(allContacts).forEach((key) => {
        filteredData[key] = allContacts[key].filter((obj) =>
          obj.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setSearchContacts(filteredData);
    } else {
      setSearchContacts(allContacts);
    }
  }, [searchTerm]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const {
          data: { users },
        } = await axios.get(GET_ALL_CONTACTS);
        setAllContacts(users);
        setSearchContacts(users);
      } catch (err) {
        console.log(err);
      }
    };
    getContacts();
  }, []);

  return (
    <div className="h-auto overflow-y-scroll scrollbar-hide flex flex-col">
      <div className="flex gap-3 items-center justify-between px-3 top-navigation border-r border-b border-gray-400 dark:border-gray-600">
        <FaArrowLeft
          className={`sidebar-icon w-8 h-8 p-2 `}
          title="Back"
          onClick={() => dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE })}
        />
        <div className="search w-full">
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch size="18" className="text-secondary my-auto" />
        </div>
      </div>

      {Object.entries(searchContacts).map(([initialLetter, userList]) => {
        return (
          <>
            {userList.length > 0 && (
              <div key={Date.now() + initialLetter}>
                <div className="main-text font-bold p-3 bg-gray-300 dark:bg-gray-800 ">
                  {initialLetter}
                </div>

                {userList.map((contact) => {
                  return (
                    <ChatListItem
                      data={contact}
                      isContactsPage={true}
                      key={contact.id}
                    />
                  );
                })}
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}
export default ContactsList;
