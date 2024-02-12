import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { ADD_IMAGE_MESSAGE_ROUTE, ADD_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import PhotoPicker from "../common/PhotoPicker";
import { MdEmojiEmotions, MdFilePresent } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";

import dynamic from "next/dynamic";
const CaptureAudio = dynamic(() => import("../common/CaptureAudio"), {
  ssr: false,
});

function MessageBar() {
  const [{ currentChatUser, userInfo, socket }, dispatch] = useStateProvider();
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const [grabImage, setGrabImage] = useState(false);
  const [showAudioRecorder, setShowAudioRecorder] = useState(false);

  const handleEmojiModal = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emoji) => {
    setMessage((prevMessage) => (prevMessage += emoji.emoji));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id !== "emoji-open") {
        if (
          emojiPickerRef.current &&
          !emojiPickerRef.current.contains(event.target)
        ) {
          setShowEmojiPicker(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (grabImage) {
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrabImage(false);
        }, 1000);
      };
    }
  }, [grabImage]);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message,
      });
      socket.current.emit("send-msg", {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message: data.message,
      });
      dispatch({
        type: reducerCases.ADD_MESSAGE,
        newMessage: { ...data.message },
        fromSelf: true,
      });
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const imagePickerChange = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file, file.name);

      const response = await axios.post(ADD_IMAGE_MESSAGE_ROUTE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          from: userInfo.id,
          to: currentChatUser.id,
        },
      });
      if (response.status === 201) {
        socket.current.emit("send-msg", {
          to: currentChatUser?.id,
          from: userInfo?.id,
          message: response.data.message,
        });
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: { ...response.data.message },
          fromSelf: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {currentChatUser && (
        <form onSubmit={sendMessage}>
          <div className="relative">
            <div className="bottom-bar">
              <MdEmojiEmotions
                size={33}
                className="messagebar-icon"
                title="Emoji"
                id="emoji-open"
                onClick={handleEmojiModal}
              />

              {showEmojiPicker && (
                <div
                  ref={emojiPickerRef}
                  className="absolute bottom-24 left-16 z-40"
                >
                  <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
                </div>
              )}

              <MdFilePresent
                size={33}
                className=" messagebar-icon mr-2"
                onClick={() => setGrabImage(true)}
              />

              <input
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                type="text"
                placeholder="Enter message..."
                className="bottom-bar-input"
              />
              {message.length ? (
                <IoSend
                  onClick={(e) => sendMessage(e)}
                  size={28}
                  className="messagebar-icon rounded mr-1"
                />
              ) : (
                <>
                  {!showAudioRecorder && (
                    <FaMicrophone
                      size={28}
                      className=" messagebar-icon mr-2"
                      title="Record"
                      onClick={() => setShowAudioRecorder(true)}
                    />
                  )}

                  {showAudioRecorder && (
                    <CaptureAudio hide={setShowAudioRecorder} />
                  )}
                </>
              )}
            </div>
          </div>
        </form>
      )}
      {grabImage && <PhotoPicker onChange={imagePickerChange} />}
    </>
  );
}

export default MessageBar;
