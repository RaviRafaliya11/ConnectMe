import Image from "next/image";
import { BsPlus } from "react-icons/bs";
import { VscSignOut } from "react-icons/vsc";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_INITIAL_CONTACTS_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function SideBar() {
  const [{ userInfo, messages, userContacts }, dispatch] = useStateProvider();
  const router = useRouter();
  useEffect(() => {
    const getContacts = async () => {
      try {
        const {
          data: { users, onlineUsers },
        } = await axios(`${GET_INITIAL_CONTACTS_ROUTE}/${userInfo.id}`);
        dispatch({ type: reducerCases.SET_ONLINE_USERS, onlineUsers });
        dispatch({ type: reducerCases.SET_USER_CONTACTS, userContacts: users });
      } catch (err) {
        console.log(err);
      }
    };
    if (userInfo?.id) {
      getContacts();
    }
  }, [userInfo, messages]);

  const handleAllContactsPage = () => {
    dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col bg-white dark:bg-gray-900 shadow-lg justify-between">
      <div>
        <a>
          <div
            className="sidebar-icon group"
            onClick={() => dispatch({ type: reducerCases.SET_LEFT_SIDE_OPEN })}
          >
            <Image src="connectme.svg" width={45} height={45} />

            <span className="sidebar-tooltip group-hover:scale-100">
              ConnetMe{" "}
            </span>
          </div>
        </a>

        <hr className="sidebar-hr" />

        {userContacts.map((contact) => (
          <Server data={contact} key={contact.id} />
        ))}

        <hr className="sidebar-hr" />
        <div className="sidebar-icon group" onClick={handleAllContactsPage}>
          <BsPlus size="32" />
          <span className="sidebar-tooltip group-hover:scale-100">
            Add Contact{" "}
          </span>
        </div>
      </div>

      <div>
        <hr className="sidebar-hr" />
        <div
          className="sidebar-icon group"
          onClick={() => router.push("/logout")}
        >
          <VscSignOut size="22" />
          <span className="sidebar-tooltip group-hover:scale-100">Signout</span>
        </div>
      </div>
    </div>
  );
}

const Server = ({ data }) => {
  const [{ userInfo, isContactsPage }, dispatch] = useStateProvider();
  const handleContactClick = () => {
    if (!isContactsPage) {
      dispatch({
        type: reducerCases.CHANGE_CURRENT_CHAT_USER,
        user: {
          name: data.name,
          about: data.about,
          profilePicture: data.profilePicture,
          email: data.email,
          id: userInfo.id === data.senderId ? data.recieverId : data.senderId,
        },
      });
    } else {
      dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
      dispatch({
        type: reducerCases.CHANGE_CURRENT_CHAT_USER,
        user: { ...data },
      });
    }
  };
  return (
    <div className="sidebar-icon group" onClick={handleContactClick}>
      <img
        className="sidebar-icon group w-full h-full object-cover"
        src={data.profilePicture}
      />
      <span className="sidebar-tooltip group-hover:scale-100 group-hover:z-[1000]">
        {data.name}{" "}
      </span>
    </div>
  );
};
