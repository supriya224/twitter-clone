import React from "react";
import Image from "next/image";
import SideBarLink from "./SideBarLink";
import {
  AiFillHome,
  AiOutlineBell,
  AiOutlineInbox,
  AiOutlineUser,
} from "react-icons/ai";
import { HiOutlineHashtag, HiOutlineClipboardList } from "react-icons/hi";
import { BiBookmark, BiDotsHorizontalRounded } from "react-icons/bi";
import { PiDotsThreeCircle } from "react-icons/pi";
import { signOut, useSession } from "next-auth/react";

// import {IMG} from '../assests/img1.png'
function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hover:animate-none p-0 xl:ml-24">
        <Image src="https://rb.gy/ogau5a" width={30} height={30} />
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <SideBarLink text="Home" Icon={AiFillHome} active />
        <SideBarLink text="Explore" Icon={HiOutlineHashtag} />
        <SideBarLink text="Notifications" Icon={AiOutlineBell} />
        <SideBarLink text="Messages" Icon={AiOutlineInbox} />
        <SideBarLink text="Bookmarks" Icon={BiBookmark} />
        <SideBarLink text="Lists" Icon={HiOutlineClipboardList} />
        <SideBarLink text="Profile" Icon={AiOutlineUser} />
        <SideBarLink text="More" Icon={PiDotsThreeCircle} />
      </div>
      <button className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full text-lg font-bold shadow-2xl w-56 h-[52px] hover:bg-[#1a8cd8]">
        Tweet
      </button>
      <div
        className="text-[#d9d9d9] flex items-center justify-center hoverAnimation xl:ml-auto xl:mr-5 mt-auto"
        onClick={signOut}
      >
        {/* <img src={IMG} alt="img" className="h-10 w-10 rounded-full xl:ml-2.5"/> */}
        <img
          src={session.user.image}
          alt=""
          className="h-10 w-10 rounded-full xl:mr-2.5"
        />
        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold text-[#6e767d] pl-3">
            {" "}
            {session.user.name}
          </h4>
          <p className="text-[#6e767d] pl-3">@{session.user.tag}</p>
        </div>
        <BiDotsHorizontalRounded className="h-5 hidden xl:inline ml-10" />
      </div>
    </div>
  );
}

export default Sidebar;
