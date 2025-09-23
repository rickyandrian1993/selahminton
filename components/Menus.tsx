"use client";

import Link from "next/link";

export default function Menus() {
  return (
    <div className="pt-4 gap-4 grid grid-cols-1 w-full">
      <button
        className="w-full bg-[#ecebe8] rounded-xl shadow hover:shadow-lg p-2 flex flex-col items-center text-center transition-all duration-200 transform hover:scale-110 hover:cursor-pointer"
        onClick={() =>
          window.open("https://www.instagram.com/selahminton", "_blank")
        }
      >
        Instagram
      </button>
      <button
        className="w-full bg-[#ecebe8] rounded-xl shadow hover:shadow-lg p-2 flex flex-col items-center text-center transition-all duration-200 transform hover:scale-110 hover:cursor-pointer"
        onClick={() =>
          window.open("https://www.tiktok.com/@selahminton", "_blank")
        }
      >
        Tiktok
      </button>
      <button
        className="w-full bg-[#ecebe8] rounded-xl shadow hover:shadow-lg p-2 flex flex-col items-center text-center transition-all duration-200 transform hover:scale-110 hover:cursor-pointer"
        onClick={() =>
          window.open("https://www.youtube.com/@selahminton-25", "_blank")
        }
      >
        Youtube
      </button>
      <button
        className="w-full bg-[#ecebe8] rounded-xl shadow hover:shadow-lg p-2 flex flex-col items-center text-center transition-all duration-200 transform hover:scale-110 hover:cursor-pointer"
        onClick={() =>
          window.open(
            "https://link.ayo.co.id/l/community-26674_ref_RICGHX",
            "_blank"
          )
        }
      >
        Ayo Community
      </button>
      <Link
        className="w-full bg-[#ecebe8] rounded-xl shadow hover:shadow-lg p-2 flex flex-col items-center text-center transition-all duration-200 transform hover:scale-110 hover:cursor-pointer"
        href={"/products"}
      >
        Badminton Equipments
      </Link>
    </div>
  );
}
