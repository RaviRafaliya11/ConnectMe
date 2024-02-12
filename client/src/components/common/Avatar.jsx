import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import CapturePhoto from "./CapturePhoto";

function Avatar({ type, image, setImage }) {
  const [grabImage, setGrabImage] = useState(false);
  const [hover, setHover] = useState(false);
  const [showCaputreImage, setShowCaputreImage] = useState(false);

  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuLocation, setContextMenuLocation] = useState({
    x: 0,
    y: 0,
  });

  const showContextMenu = (e) => {
    e.preventDefault();
    setContextMenuVisible(true);
    setContextMenuLocation({ x: e.pageX, y: e.pageY });
  };

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

  const contextMenuOptions = [
    {
      name: "Take Photo",
      callback: () => {
        setShowCaputreImage(true);
      },
    },

    {
      name: "Upload Photo",
      callback: () => {
        setGrabImage(true);
      },
    },
    {
      name: "Remove Photo",
      callback: () => {
        setImage("/default_avatar.png");
      },
    },
  ];

  // save image
  const imagePickerChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const data = document.createElement("img");
    reader.onload = function (event) {
      data.src = event.target.result;
      data.setAttribute("data-src", event.target.result);
    };
    reader.readAsDataURL(file);
    setTimeout(() => {
      console.log(data.src);
      setImage(data.src);
    }, 100);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        {type === "sm" && (
          <div className="relative h-10 w-10">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type === "lg" && (
          <div className="relative h-10 w-10">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type === "xl" && (
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="relative z-0 cursor-pointer"
          >
            <div
              className={`z-10 bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 flex items-center rounded-full justify-center flex-col text-center gap-2 ${
                hover ? "visible" : "hidden"
              }`}
              id="context-opener"
              onClick={(e) => showContextMenu(e)}
            >
              <FaCamera
                className="text-2xl"
                id="context-opener"
                onClick={(e) => showContextMenu(e)}
              />
              <span id="context-opener" onClick={(e) => showContextMenu(e)}>
                Add Image
              </span>
            </div>
            <div className=" h-60 w-60 flex items-center justify-center">
              <Image src={image} alt="avatar" className="rounded-full" fill />
            </div>
          </div>
        )}
      </div>
      {contextMenuVisible && (
        <ContextMenu
          options={contextMenuOptions}
          location={contextMenuLocation}
          setContextMenu={setContextMenuVisible}
        />
      )}

      {showCaputreImage && (
        <CapturePhoto setImage={setImage} hide={setShowCaputreImage} />
      )}
      {grabImage && <PhotoPicker onChange={imagePickerChange} />}
    </>
  );
}

export default Avatar;
