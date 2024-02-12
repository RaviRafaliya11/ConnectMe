import React from "react";
import { HiOutlineDownload } from "react-icons/hi";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>ConnectMe | Home</title>
        <link rel="icon" href="/connectme.svg" />
      </Head>
      <Header />
      <div className="bg-[#404EED] pb-8 md:pb-0 md:px-16">
        <div className="p-7 py-9 h-auto md:h-[83vh] md:flex relative">
          <div className="flex flex-col gap-7 md:max-w-md lg:max-w-none lg:justify-center ">
            <h1 className="text-5xl text-white font-bold">
              IMAGINE A PLACE...
            </h1>
            <h2 className="text-white text-lg font-light tracking-wide lg:max-w-3xl w-full">
              ...where you can belong to a school club, a gaming group, or a
              worldwide art community. Where just you and a handful of friends
              can spend time together. A place that makes it easy to talk every
              day and hang out more often.
            </h2>
            <div className="flex flex-col sm:flex-row  lg:flex-row md:items-start sm:items-center gap-6">
              <button className="bg-white w-60 font-medium flex items-center justify-center rounded-full p-4 text-lg hover:shadow-2xl hover:text-[#5865f2] focus:outline-none transition duration-200 ease-in-out">
                <HiOutlineDownload className="w-6 mr-2" />
                Download for Mac
              </button>
              <button className="bg-gray-900 text-white w-72 font-medium flex items-center justify-center rounded-full p-4 text-lg hover:shadow-2xl hover:bg-gray-800 focus:outline-none transition duration-200 ease-in-out">
                Open ConnetMe in your browser
              </button>
            </div>
          </div>
          <div>
            <img src="/images/image1.svg" alt="" className="md:hidden mt-5" />
            <img src="/images/image2.svg" alt="" className="hidden md:inline" />
          </div>
        </div>
      </div>

      <div className="md:px-16">
        <div className="flex flex-wrap xl:flex-nowrap items-center ">
          <img src="/images/image3.svg" alt="" />
          <div className="flex flex-col gap-7">
            <h1 className="text-3xl md:text-5xl font-bold">
              Create an invite-only place where you belong
            </h1>
            <h2 className=" text-lg font-light tracking-wide lg:max-w-3xl w-full">
              ConnectMe servers are organized into topic-based channels where
              you can collaborate, share, and just talk about your day without
              clogging up a group chat.
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap-reverse xl:flex-nowrap items-center ">
          <div className="flex flex-col gap-7">
            <h1 className="text-3xl md:text-5xl font-bold">
              Where hanging out is easy
            </h1>
            <h2 className=" text-lg font-light tracking-wide lg:max-w-3xl w-full">
              Grab a seat in a voice channel when you’re free. Friends in your
              server can see you’re around and instantly pop in to talk without
              having to call.
            </h2>
          </div>
          <img src="/images/image4.svg" alt="" />
        </div>

        <div className="flex flex-wrap xl:flex-nowrap items-center ">
          <img src="/images/image5.svg" alt="" />
          <div className="flex flex-col gap-7">
            <h1 className="text-3xl md:text-5xl font-bold">
              From few to a fandom
            </h1>
            <h2 className=" text-lg font-light tracking-wide lg:max-w-3xl w-full">
              Get any community running with moderation tools and custom member
              access. Give members special powers, set up private channels, and
              more.
            </h2>
          </div>
        </div>
        <img src="/images/image6.svg" className="w-full" alt="" />
      </div>
      <Footer />
    </div>
  );
}
