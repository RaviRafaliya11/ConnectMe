import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";
import { FaCamera, FaMicrophone } from "react-icons/fa";

function ChatListItem({ data, isContactsPage = false }) {
  const [{ userInfo, currentChatUser, isUnreadChat }, dispatch] =
    useStateProvider();

  const handleContactClick = () => {
    if (!isContactsPage) {
      dispatch({
        type: reducerCases.CHANGE_CURRENT_CHAT_USER,
        user: {
          name: data.name,
          about: data.about,
          profilePicture: data.profilePicture,
          email: data.email,
          isPremiumUser: data.isPremiumUser,
          id: userInfo.id === data.senderId ? data.recieverId : data.senderId,
        },
      });
    } else {
      dispatch({
        type: reducerCases.CHANGE_CURRENT_CHAT_USER,
        user: { ...data },
      });
      dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
    }
  };

  return (
    <div
      className={`flex cursor-pointer items-center bg-gray-100 dark:bg-gray-700 shadow-black border-r border-gray-400 dark:border-gray-800 dark:shadow-white ${
        !isContactsPage && "shadow-md"
      } hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white transition-all duration-300 ease-linear group ${
        isUnreadChat && !data.totalUnreadMessages > 0 ? "hidden" : ""
      }`}
      onClick={handleContactClick}
    >
      <div className="min-w-fit p-[2px] bg-gray-300 group-hover:bg-gray-400 dark:bg-gray-600 group-hover:dark:bg-gray-600 rounded-full mr-3 ml-2 transition-all duration-300 ease-linear">
        <Avatar type="lg" image={data?.profilePicture} />
      </div>
      <div className="min-h-full flex flex-col justify-center mt-3 pr-2 w-full">
        <div className="flex justify-between">
          <div>
            <span className="main-text  text-sm capitalize">
              {data?.name} {userInfo.email === data?.email && "(You)"}
            </span>
          </div>
        </div>
        <div className="flex  pb-2 pt-1 pr-2">
          <div className="flex justify-between w-full">
            <span className="text-secondary line-clamp-1 text-sm">
              {isContactsPage ? (
                data?.about || "\u00A0"
              ) : (
                <div
                  className="flex text-black dark:text-gray-300 group-hover:dark:text-white items-center justify-between gap-1 max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[200px]
                xl:max-w-[300px]"
                >
                  {data.senderId === userInfo.id && (
                    <MessageStatus messageStatus={data.messageStatus} />
                  )}

                  {data.type === "text" && (
                    <span className="truncate">{data.message}</span>
                  )}
                  {data.type === "audio" && (
                    <span className="flex gap-1 items-center">
                      <FaMicrophone className="text-panel-header-icon" />
                      Audio
                    </span>
                  )}
                  {data.type === "image" && (
                    <span className="flex gap-1 items-center">
                      <FaCamera className="text-panel-header-icon" />
                      Image
                    </span>
                  )}
                </div>
              )}
            </span>

            {data.totalUnreadMessages > 0 ? (
              <span className="dark:bg-green-600 bg-gray-300 group-hover:bg-gray-400 text-black px-1.5 rounded-full text-sm">
                {data.totalUnreadMessages}
              </span>
            ) : (
              <>
                {!isContactsPage && (
                  <span
                    className={`${
                      !data.totalUnreadMessages > 0
                        ? "text-secondary"
                        : "text-icon-green"
                    }   text-black dark:text-gray-300 group-hover:dark:text-white px-1.5 rounded-full text-xs`}
                  >
                    {calculateTime(data.createdAt)}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatListItem;
