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
  const [about, setAbout] = useState();
  const [image, setImage] = useState("/default_avatar.png");

  useEffect(() => {
    if (!newUser & !userInfo?.email) router.push("/login");
    else if (!newUser && userInfo?.email) router.push("/");
  }, [newUser, userInfo, router]);

  const validateDetails = () => {
    if (name.length < 3) {
      return false;
    }
    return true;
  };

  const createNewUserHandler = async () => {
    if (validateDetails) {
      const email = userInfo.email;
      try {
        const { data } = await axios.post(CREATE_NEW_USER_ROUTE, {
          email,
          name,
          about,
          image,
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
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <Image src="/connectme.svg" alt="connetme" height={300} width={300} />
        <span className="text-7xl">ConnectMe</span>
      </div>
      <h2 className="text-2xl">Create Profile</h2>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          <Input name="Name" state={name} setState={setName} label />
          <Input name="About" state={about} setState={setAbout} label />

          <div className=" flex items-center justify-center ">
            <button
              onClick={createNewUserHandler}
              className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-md"
            >
              Create Profile
            </button>
          </div>
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
}

export default createuser;
