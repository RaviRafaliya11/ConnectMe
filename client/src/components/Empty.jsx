import Image from "next/image";
import React from "react";

function Empty() {
  return (
    <div className="border-conversation-border border-l w-full bg-panel-header-background flex flex-col h-[100vh] border-b-4  items-center justify-center">
      <Image
        src="/connectme.svg"
        alt="ConnectMe"
        height={300}
        width={300}
        className=" animate-bounce"
      />
    </div>
  );
}

export default Empty;
