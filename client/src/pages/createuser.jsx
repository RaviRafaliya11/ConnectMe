import Avatar from "@/components/common/Avatar";
import Input from "@/components/common/Input";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { CREATE_NEW_USER_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function createuser() {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const router = useRouter();

  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("/default_avatar.png");
  const [errorMessage, setErrorMessage] = useState();
  const [email, setEmail] = useState(userInfo?.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // useEffect(() => {
  //   if (!newUser & !userInfo?.email) router.push("/login");
  //   else if (!newUser && userInfo?.email) router.push("/");
  // }, [newUser, userInfo, router]);

  const validateDetails = (name, about, password, confirmPassword) => {
    if (name.length < 3) {
      setErrorMessage("Name is too short.");
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
    if (validateDetails(name, about, password, confirmPassword)) {
      const email = userInfo.email;
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
        console.log(err);
      }
    }
  };

  return (
    <div className=" bg-panel-header-background h-full p-5">
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

      <div className="w-full px-5 flex items-start justify-center mx-auto">
        <div className="bg-search-input-container-background max-w-3xl p-5 rounded-md flex flex-col justify-center mt-2 gap-3 w-full">
          {errorMessage && (
            <span className="text-sm text-red-400">{errorMessage} </span>
          )}
          <Input name="Name" state={name} setState={setName} label />

          <Input
            inputtype="email"
            name="Email"
            state={email}
            setState={setEmail}
            label
            isdisabled={true}
          />
          <Input name="About" state={about} setState={setAbout} label />

          <Input
            inputtype="password"
            name="Password"
            state={password}
            setState={setPassword}
            label
          />
          <Input
            inputtype="password"
            name="Confirm Password"
            state={confirmPassword}
            setState={setConfirmPassword}
            label
          />
          <div className=" flex items-center justify-center ">
            <button
              onClick={createNewUserHandler}
              className="flex items-center justify-center gap-7 font-semibold bg-gray-400 p-5 rounded-md"
            >
              Create Profile
            </button>
          </div>
        </div>
        <Avatar type="xl" image={image} setImage={setImage} />
      </div>
    </div>
  );
}

export default createuser;
