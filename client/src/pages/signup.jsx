import Avatar from "@/components/common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import useDarkMode from "@/hooks/useDarkMode";
import { CREATE_NEW_USER_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Signup() {
  const [{}, dispatch] = useStateProvider();
  const router = useRouter();
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("/default_avatar.png");
  const [errorMessage, setErrorMessage] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateDetails = (name, email, about, password, confirmPassword) => {
    if (name.length < 3) {
      setErrorMessage("Name is too short.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please Enter Valid Email Address.");

      return false;
    }
    if (about.length < 5) {
      setErrorMessage("About is too short.");
      return false;
    }

    if (password.length < 8) {
      setErrorMessage("Password is too short (minimum 8 characters).");
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  const createNewUserHandler = async () => {
    if (validateDetails(name, email, about, password, confirmPassword)) {
      try {
        const { data } = await axios.post(CREATE_NEW_USER_ROUTE, {
          email,
          name,
          about,
          image,
          password,
        });
        if (data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: false });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id: data.id,
              name,
              email,
              profileImage: image,
              status: about,
            },
          });
          router.push("/");
        }
      } catch (err) {
        setErrorMessage("Email Already Taken");
        console.log(err);
      }
    }
  };

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
      <div class="bg-white dark:bg-gray-700 dark:border-t dark:border-gray-500 py-5 max-w-screen flex items-start justify-around flex-wrap">
        <div class=" container max-w-max flex flex-col bg-white dark:bg-gray-700 my-5">
          <div class="flex justify-center h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
            <div class="flex items-center justify-center lg:p-12">
              <div class="flex items-center xl:p-10">
                <div class="flex flex-col h-full pb-6 text-center bg-white dark:bg-gray-700  rounded-3xl">
                  <h3 class="mb-3 text-4xl font-extrabold text-gray-900 dark:text-white">
                    Sign Up
                  </h3>

                  <div class="flex items-center my-3">
                    <hr class="h-0 border-b border-solid border-gray-500 grow" />
                    <p class="mx-4 text-gray-600 dark:text-gray-100">Details</p>
                    <hr class="h-0 border-b border-solid border-gray-500 grow" />
                  </div>

                  {errorMessage && (
                    <span className="text-sm text-red-400 my-2">
                      {errorMessage}{" "}
                    </span>
                  )}

                  <label
                    for="name"
                    class="mb-2 text-sm text-start text-gray-900 dark:text-gray-400"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="name"
                    name="Name"
                    state={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-400 mb-7 placeholder:text-gray-700 bg-gray-200  text-gray-900 rounded-2xl"
                  />

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
                    for="about"
                    class="mb-2 text-sm text-start text-gray-900 dark:text-gray-400"
                  >
                    About
                  </label>
                  <input
                    id="about"
                    type="about"
                    name="About"
                    state={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="About"
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
                  <label
                    for="confirm password"
                    class="mb-2 text-sm text-start text-gray-900 dark:text-gray-400"
                  >
                    Password
                  </label>
                  <input
                    id="confirm password"
                    type="confirm password"
                    name="Password"
                    state={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Enter a confirm password"
                    class="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-gray-400 placeholder:text-gray-700 bg-gray-200 text-gray-900 rounded-2xl"
                  />
                  <button
                    onClick={createNewUserHandler}
                    class="w-full px-6 py-5 mb-5 mt-3 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-blue-600 focus:ring-4 focus:ring-blue-100 bg-blue-500"
                  >
                    Sign Up
                  </button>
                  <p class="text-sm leading-relaxed text-gray-900 dark:text-gray-400">
                    Already registered?{" "}
                    <span
                      onClick={() => router.push("login")}
                      class="font-bold text-gray-700 dark:text-gray-100 cursor-pointer hover:scale-105 hover:underline"
                    >
                      Login Here
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-20 my-5">
          <Avatar type="xl" image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
}
