import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import Image from "next/image";
import React from "react";
import { MdOutlineCallEnd } from "react-icons/md";
import { FiPhoneIncoming } from "react-icons/fi";

function IncomingVideoCall() {
  const [{ incomingVideoCall, socket }, dispatch] = useStateProvider();
  const acceptCall = () => {
    dispatch({
      type: reducerCases.SET_VIDEO_CALL,
      videoCall: { ...incomingVideoCall, type: "in-coming" },
    });
    socket.current.emit("accept-incoming-call", { id: incomingVideoCall.id });
    dispatch({
      type: reducerCases.SET_INCOMING_VIDEO_CALL,
      incomingVideoCall: undefined,
    });
  };
  const rejectCall = () => {
    socket.current.emit("reject-video-call", { from: incomingVideoCall.id });
    dispatch({ type: reducerCases.END_CALL });
  };
  return (
    <div className="bg-gray-400 dark:bg-gray-700 w-full h-full flex flex-col items-center pt-20">
      <p className="my-2 main-text ">Incoming Video Call</p>
      <div className="bg-black/10 dark:bg-white/10 rounded-lg py-10 px-20 w-auto h-auto flex flex-col items-center justify-center">
        <Image
          src={incomingVideoCall.profilePicture}
          alt="avatar"
          height={150}
          width={150}
          className="rounded-full"
        />
        <p className="font-semibold my-5 text-3xl dark:text-white capitalize ">
          {incomingVideoCall.name}
        </p>

        <div className="flex items-center gap-5">
          <button onClick={rejectCall} class="CallBtn bg-red-500">
            <div class="sign">
              <MdOutlineCallEnd className="text-3xl cursor-pointer dark:text-white" />
            </div>
            <div class="text">Decline</div>
          </button>

          <button onClick={acceptCall} class="CallBtn bg-green-500">
            <div class="sign">
              <FiPhoneIncoming className="text-3xl cursor-pointer dark:text-white" />
            </div>
            <div class="text">Accept</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default IncomingVideoCall;
