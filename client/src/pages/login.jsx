import Input from "@/components/common/Input";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import useDarkMode from "@/hooks/useDarkMode";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
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
              userInfo: data.data,
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

  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <div>
      <div className="flex items-center p-7 justify-between top-navigation">
        <Image
          className="animate-pulse"
          src="/connectme.svg"
          alt="ConnectMe"
          height={80}
          width={80}
        />
        <span onClick={handleMode}>
          {darkTheme ? (
            <FaSun size="24" className="top-navigation-icon" />
          ) : (
            <FaMoon size="24" className="top-navigation-icon" />
          )}
        </span>
      </div>
      <div class="bg-white dark:bg-gray-700 dark:border-t dark:border-gray-500 py-5 max-w-screen">
        <div class="container flex flex-col mx-auto bg-white dark:bg-gray-700 my-5">
          <div class="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
            <div class="flex items-center justify-center w-full lg:p-12">
              <div class="flex items-center xl:p-10">
                <div class="flex flex-col w-full h-full pb-6 text-center bg-white dark:bg-gray-700  rounded-3xl">
                  <h3 class="mb-3 text-4xl font-extrabold text-gray-900 dark:text-white">
                    Sign In
                  </h3>
                  <p class="mb-4 text-gray-700 dark:text-gray-400">
                    Enter your email and password
                  </p>
                  <div
                    onClick={() => handleLogin({ type: "Google" })}
                    class="flex cursor-pointer items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-gray-900 bg-white dark:bg-gray-700 hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 border dark:text-gray-400 dark:hover:bg-gray-400 dark:hover:text-black  ease-linear"
                  >
                    <FcGoogle size={28} className="mr-5" /> Sign in with Google
                  </div>

                  <div class="flex items-center mb-3">
                    <hr class="h-0 border-b border-solid border-gray-500 grow" />
                    <p class="mx-4 text-gray-600 dark:text-gray-100">OR</p>
                    <hr class="h-0 border-b border-solid border-gray-500 grow" />
                  </div>

                  {errorMessage && (
                    <span className="text-sm text-red-400 my-2">
                      {errorMessage}{" "}
                    </span>
                  )}

                  <label
                    for="email"
                    class="mb-2 text-sm text-start text-gray-900 dark:text-gray-400"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="Email"
                    state={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="connectme@gmail.com"
                    class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-400 mb-7 placeholder:text-gray-700 bg-gray-200  text-gray-900 rounded-2xl"
                  />
                  <label
                    for="password"
                    class="mb-2 text-sm text-start text-gray-900 dark:text-gray-400"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="Password"
                    state={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter a password"
                    class="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-gray-400 placeholder:text-gray-700 bg-gray-200 text-gray-900 rounded-2xl"
                  />
                  <div class="flex flex-row justify-end mb-8">
                    <span class="mr-4 text-sm font-medium text-blue-500">
                      Forget password?
                    </span>
                  </div>
                  <button
                    onClick={() => handleLogin({ type: "EmailPassword" })}
                    class="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-blue-600 focus:ring-4 focus:ring-blue-100 bg-blue-500"
                  >
                    Sign In
                  </button>
                  <p class="text-sm leading-relaxed text-gray-900 dark:text-gray-400">
                    Not registered yet?{" "}
                    <span
                      onClick={() => router.push("signup")}
                      class="font-bold text-gray-700 dark:text-gray-100 cursor-pointer hover:scale-105 hover:underline"
                    >
                      Create an Account
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
