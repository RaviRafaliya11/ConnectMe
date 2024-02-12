import React, { useEffect, useRef, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { CHECK_USER_ROUTE, GET_MESSAGES_ROUTE, HOST } from "@/utils/ApiRoutes";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import Chat from "./Chat/Chat";
import { io } from "socket.io-client";
import VoiceCall from "./Call/VoiceCall";
import VideoCall from "./Call/VideoCall";
import IncomingVideoCall from "./common/IncomingVideoCall";
import IncomingVoiceCall from "./common/IncomingVoiceCall";
import Head from "next/head";
import SideBar from "./SideBar";
import ContentContainer from "./ContentContainer";
import ChannelBar from "./ChannelBar";

function Main() {
  const [redirectLogin, setRedirectLogin] = useState(false);

  const [
    {
      userInfo,
      currentChatUser,
      videoCall,
      voiceCall,
      incomingVideoCall,
      incomingVoiceCall,
      isLeftSideOpen,
    },
    dispatch,
  ] = useStateProvider();
  const Router = useRouter();
  const socket = useRef();
  const [socketEvent, setSocketEvent] = useState(false);

  useEffect(() => {
    if (redirectLogin) Router.push("/HomePage");
  }, [redirectLogin]);

  onAuthStateChanged(firebaseAuth, async (currentUser) => {
    const savedData = JSON.parse(localStorage.getItem("userInfoLocalStorage"));
    if (!currentUser) {
      if (!savedData) {
        setRedirectLogin(true);
      }
    }
    if (!userInfo && (savedData?.email || currentUser?.email)) {
      const { data } = await axios.post(CHECK_USER_ROUTE, {
        email: savedData?.email || currentUser?.email,
      });

      if (!data.status) {
        Router.push("/login");
      }
      dispatch({
        type: reducerCases.SET_USER_INFO,
        userInfo: data.data,
      });
    }
  });

  useEffect(() => {
    const getMessages = async () => {
      const {
        data: { messages },
      } = await axios.get(
        `${GET_MESSAGES_ROUTE}/${userInfo.id}/${currentChatUser.id}`
      );
      dispatch({ type: reducerCases.SET_MESSAGES, messages });
    };
    if (currentChatUser?.id) getMessages();
  }, [currentChatUser]);

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST);
      socket.current.emit("add-user", userInfo.id);
      dispatch({ type: reducerCases.SET_SOCKET, socket });
    }
  }, [userInfo]);

  useEffect(() => {
    if (socket.current && !socketEvent) {
      socket.current.on("msg-recieve", (data) => {
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: { ...data.message },
        });
      });

      socket.current.on("online-users", ({ onlineUsers }) => {
        dispatch({
          type: reducerCases.SET_ONLINE_USERS,
          onlineUsers,
        });
      });
      socket.current.on("incoming-voice-call", ({ from, roomId, callType }) => {
        dispatch({
          type: reducerCases.SET_INCOMING_VOICE_CALL,
          incomingVoiceCall: { ...from, roomId, callType },
        });
      });

      socket.current.on("incoming-video-call", ({ from, roomId, callType }) => {
        dispatch({
          type: reducerCases.SET_INCOMING_VIDEO_CALL,
          incomingVideoCall: { ...from, roomId, callType },
        });
      });

      socket.current.on("voice-call-rejected", () => {
        dispatch({
          type: reducerCases.END_CALL,
        });
      });

      socket.current.on("video-call-rejected", () => {
        dispatch({
          type: reducerCases.END_CALL,
        });
      });

      setSocketEvent(true);
    }
  }, [socket.current]);

  return (
    <div>
      {incomingVoiceCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <IncomingVoiceCall />
        </div>
      )}
      {incomingVideoCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <IncomingVideoCall />
        </div>
      )}

      {voiceCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VoiceCall />
        </div>
      )}

      {videoCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VideoCall />
        </div>
      )}

      {!videoCall && !voiceCall && !incomingVoiceCall && !incomingVideoCall && (
        <div className="flex">
          <SideBar />

          <>
            <ChannelBar />
            <ContentContainer />
          </>
        </div>
      )}
    </div>
  );
}

export default Main;
