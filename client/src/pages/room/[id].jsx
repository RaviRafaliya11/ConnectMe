import React from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function Room() {
  const router = useRouter();
  const [{ socket, userInfo }, dispatch] = useStateProvider();

  let myMeeting = async (element) => {
    const appID = 440708721;
    const serverSecret = "9191108497fea7b5121c42e5fd5cac94";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      router.query.id.toString(),
      Date.now().toString(),
      `${userInfo.name}`
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            userInfo.id.toString(),
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      onLeaveRoom: () => {
        window.location.href = "/";
      },

      onUserLeave: () => {
        window.location.href = "/";
      },
    });
  };

  return (
    <div>
      <div ref={myMeeting} />
    </div>
  );
}
