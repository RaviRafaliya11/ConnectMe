import TopNavigation from "./TopNavigation ";
import { useStateProvider } from "@/context/StateContext";
import Empty from "./Empty";
import dynamic from "next/dynamic";
import MessageBar from "./Chat/MessageBar";
import ChatContainer from "./Chat/ChatContainer";

const CaptureAudio = dynamic(
  () => import("../components/common/CaptureAudio"),
  {
    ssr: false,
  }
);
const ContentContainer = () => {
  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider();

  return (
    <div className="content-container">
      {currentChatUser ? (
        <>
          {/* Header */}

          <TopNavigation />

          {/* Messages */}
          <div className="content-list h-screen">
            <ChatContainer />
          </div>

          {/* Message Box */}
          <MessageBar />
        </>
      ) : (
        <>
          <Empty userInfo={userInfo} />
        </>
      )}
    </div>
  );
};

export default ContentContainer;
