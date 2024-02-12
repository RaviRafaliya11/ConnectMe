import React from "react";
import TopNavigation from "./TopNavigation ";
import { MdEmail } from "react-icons/md";
import { useRouter } from "next/router";
import { checkout } from "@/utils/Checkout";

function Empty({ userInfo }) {
  const router = useRouter();
  return (
    <>
      {" "}
      <TopNavigation />
      <div className="w-screen h-screen">
        <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-20 lg:my-0">
          <div className="w-full lg:w-3/5 rounded-lg lg:rounded-lg shadow-2xl bg-white opacity-75 mx-3 lg:mx-0 lg:flex">
            <div className="p-4 md:p-12 text-center lg:text-left">
              <img
                src={userInfo?.profilePicture}
                alt=" "
                className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-40 w-40 bg-cover bg-center"
              />
              <h1 className="text-3xl font-bold pt-8 lg:pt-0 capitalize text-black flex items-center gap-2 justify-center">
                {userInfo?.name} {userInfo?.isPremiumUser && "💎"}
              </h1>
              <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-purple-500 opacity-25"></div>
              <p className="pt-4 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                <MdEmail className="w-5 h-5 mr-2" />
                {userInfo?.email}
              </p>
              <p className="pt-8 text-sm">Thankyou for Joining ConnectMe.</p>
              <div className="pt-12 pb-8 flex items-center gap-5 justify-between">
                <button
                  onClick={() => router.push("/logout")}
                  className="relative inline-flex items-center justify-start  px-5 py-3 overflow-hidden font-bold rounded group bg-green-600"
                >
                  <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-black opacity-100 group-hover:-translate-x-8"></span>
                  <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                    Signout
                  </span>
                </button>

                {!userInfo?.isPremiumUser && (
                  <button
                    onClick={() => {
                      checkout({
                        lineItems: [
                          {
                            price: "price_1OGuEyALq3vVp5r0Lg5SixtH",
                            quantity: 1,
                          },
                        ],
                      });
                    }}
                    className="overflow-hidden relative w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group"
                  >
                    Subscribe!
                    <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-200 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right"></span>
                    <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-right"></span>
                    <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right"></span>
                    <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
                      $19.99!
                    </span>
                  </button>
                )}
              </div>
            </div>

            <img
              src={userInfo?.profilePicture}
              alt=" "
              className="hidden lg:block rounded-full shadow-xl mx-auto -mt-16 h-40 w-40 bg-cover bg-center"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Empty;
