import Input from "@/components/common/Input";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function login() {
  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (userInfo?.id && !newUser) router.push("/");
  }, [userInfo, newUser]);

  const validateDetails = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minPasswordLength = 8;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please Enter Valid Email Address.");

      return false;
    }
    if (password.length < minPasswordLength) {
      setErrorMessage("Password is too short.");

      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleLogin = async ({ type }) => {
    if (type === "Google") {
      const provider = new GoogleAuthProvider();
      const {
        user: { displayName: name, email, photoURL: profileImage },
      } = await signInWithPopup(firebaseAuth, provider);
      try {
        if (email) {
          const { data } = await axios.post(CHECK_USER_ROUTE, { email });

          if (!data.status) {
            dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
            dispatch({
              type: reducerCases.SET_USER_INFO,
              userInfo: { name, email, profileImage, status: "Available" },
            });
            router.push("/createuser");
          } else {
            localStorage.setItem(
              "userInfoLocalStorage",
              JSON.stringify(data.data)
            );
            dispatch({
              type: reducerCases.SET_USER_INFO,
              userInfo: {
                id: data.data.id,
                name: data.data.name,
                email: data.data.email,
                profileImage: data.data.profilePicture,
                status: "",
              },
            });
            router.push("/");
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      if (validateDetails(email, password)) {
        try {
          if (email) {
            const { data } = await axios.post(CHECK_USER_ROUTE, {
              email,
            });

            if (!data.status) {
              setErrorMessage("User not found.");
            } else {
              if (password === data.data.password) {
                localStorage.setItem(
                  "userInfoLocalStorage",
                  JSON.stringify(data.data)
                );
                dispatch({
                  type: reducerCases.SET_USER_INFO,
                  userInfo: {
                    id: data.data.id,
                    name: data.data.name,
                    email: data.data.email,
                    profileImage: data.data.profilePicture,
                    status: "",
                  },
                });
                router.push("/");
              } else {
                setErrorMessage("Incorrect Email OR Password");
              }
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
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
          {errorMessage && (
            <span className="text-sm text-red-400">{errorMessage} </span>
          )}

          <Input
            inputtype="email"
            name="Email"
            state={email}
            setState={setEmail}
            label
          />
          <Input
            inputtype="password"
            name="Password"
            state={password}
            setState={setPassword}
            label
          />
          <div className=" flex items-center justify-center ">
            <button
              onClick={() => handleLogin({ type: "EmailPassword" })}
              className="flex items-center justify-center gap-7 bg-gray-400 font-semibold p-5 rounded-md"
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-panel-header-background mt-5 w-full flex-col gap-6">
        <button
          onClick={() => handleLogin({ type: "Google" })}
          className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-md"
        >
          <FcGoogle className="text-4xl" />
          <span className="text-white text-xl">Login With Google</span>
        </button>
      </div>
    </div>
  );
}
