import { FaMoon, FaSun, FaPhoneAlt, FaVideo } from "react-icons/fa";
import useDarkMode from "../hooks/useDarkMode";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

const TopNavigation = ({}) => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();
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
  return (
    <div className="top-navigation">
      {/* Title */}
      <h5 className="title-text capitalize ml-5">
        {currentChatUser ? (
          <>
            {currentChatUser?.name} {currentChatUser?.isPremiumUser && "💎"}
          </>
        ) : (
          <>
            {userInfo?.name} {userInfo?.isPremiumUser && "💎"}
          </>
        )}
      </h5>
      {/* Theme */}
      <span onClick={handleMode}>
        {darkTheme ? (
          <FaSun size="24" className="top-navigation-icon" />
        ) : (
          <FaMoon size="24" className="top-navigation-icon" />
        )}
      </span>
      {/* Search */}
      {/* <div className="search">
        <input className="search-input" type="text" placeholder="Search..." />
        <FaSearch size="18" className="text-secondary my-auto" />
      </div>


      
      <FaRegBell size="24" className="top-navigation-icon" /> */}

      {currentChatUser && (
        <>
          <FaPhoneAlt
            onClick={handleVoiceCall}
            size="20"
            className="top-navigation-icon"
          />
          <FaVideo
            onClick={handleVideoCall}
            size="20"
            className="top-navigation-icon"
          />
        </>
      )}
      <img
        src={
          currentChatUser
            ? currentChatUser?.profilePicture
            : userInfo?.profilePicture
        }
        className="top-navigation-icon w-8 h-8 rounded-full"
      />
    </div>
  );
};

export default TopNavigation;
