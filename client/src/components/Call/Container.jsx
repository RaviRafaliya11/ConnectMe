import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_CALL_TOKEN } from "@/utils/ApiRoutes";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdOutlineCallEnd } from "react-icons/md";
import { useRouter } from "next/router";

function Container({ data }) {
  const [{ socket, userInfo }, dispatch] = useStateProvider();
  const [callAccepted, setCallAccepted] = useState(false);
  const [token, setToken] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    if (data.type === "out-going") {
      socket.current.on("accept-call", () => setCallAccepted(true));
    } else {
      setTimeout(() => {
        setCallAccepted(true);
      }, 1000);
    }
  }, [data]);

  useEffect(() => {
    const getToken = async () => {
      try {
        const {
          data: { token: returnedToken },
        } = await axios.get(`${GET_CALL_TOKEN}/${userInfo.id}`);
        setToken(returnedToken);
      } catch (error) {
        console.log(error);
      }
    };
    getToken();
  }, [callAccepted]);

  useEffect(() => {
    const startCall = async () => {
      if (callAccepted) router.push(`/room/1`);
    };
    if (token) {
      startCall();
    }
  }, [token]);

  const endCall = () => {
    const id = data.id;
    if (data.callType === "voice") {
      socket.current.emit("reject-voice-call", { from: id });
    } else {
      socket.current.emit("reject-video-call", { from: id });
    }
    dispatch({ type: reducerCases.END_CALL });
  };

  return (
    <div className="bg-gray-400 dark:bg-gray-700 w-full h-full flex flex-col items-center pt-20">
      <p className="my-2 main-text ">Outgoing</p>
      <div className="bg-black/10 dark:bg-white/10 rounded-lg py-10 px-20 w-auto h-auto flex flex-col items-center justify-center">
        <Image
          src={data.profilePicture}
          alt="avatar"
          height={150}
          width={150}
          className="rounded-full"
        />
        <p className="font-semibold my-5 text-3xl dark:text-white capitalize ">
          {data.name}
        </p>
        <span className="mb-3 main-text">
          {callAccepted && data.callType !== "video" ? "Connected" : "Calling"}
        </span>
        <button onClick={endCall} class="CallBtn bg-red-500">
          <div class="sign">
            <MdOutlineCallEnd className="text-3xl cursor-pointer dark:text-white" />
          </div>
          <div class="text">End Call</div>
        </button>
      </div>
    </div>
  );
}

export default Container;
