import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { UPDATE_USER_PREMIUM_STATUS } from "@/utils/ApiRoutes";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Paymentsuccess() {
  const router = useRouter();
  const [{}, dispatch] = useStateProvider();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("userInfoLocalStorage"));

    const updateUser = async () => {
      await axios
        .post(`${UPDATE_USER_PREMIUM_STATUS}`, { userId: savedData.id })
        .then((response) => {
          if (response.data.user) {
            localStorage.setItem(
              "userInfoLocalStorage",
              JSON.stringify(response.data.user)
            );
            dispatch({
              type: reducerCases.SET_USER_INFO,
              userInfo: response.data.user,
            });
          }
        });
    };
    updateUser();
  }, []);
  return (
    <div className=" bg-panel-header-background h-screen">
      <div className="flex items-center justify-start gap-2 px-5 text-white">
        <Image
          className="animate-pulse"
          src="/connectme.svg"
          alt="ConnectMe"
          height={100}
          width={100}
        />
        <span className="text-xl ">ConnectMe</span>
      </div>

      <div className="max-w-2xl flex items-center justify-center mx-auto">
        <div className="bg-search-input-container-background p-5 rounded-md flex flex-col justify-center mt-5 gap-6 w-full">
          <div className=" flex flex-col items-center justify-center gap-5">
            <h1 className="text-white text-5xl my-5">Thank you for Joining!</h1>
            <button
              onClick={() => router.push("/")}
              className="flex items-center justify-center gap-7 bg-gray-400 font-semibold p-5 rounded-md"
            >
              Home
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-panel-header-background mt-5 w-full flex-col gap-6"></div>
    </div>
  );
}
