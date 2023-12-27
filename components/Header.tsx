"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import React from "react";

const Header: React.FC = () => {
  const router = usePathname();
  if (router === "/generatedreciept") return;
  return (
    <div className="bg-green-500 shadow-md flex justify-center items-center">
      <div className=" border-r-2 py-3 my-4 ">
        <img
          src={"/images/recieptimages/DUAE.png"}
          alt="location logo"
          height={100}
          width={200}
          className="object-contain"
        />
      </div>
      <div className="logo-2 ml-10">
        <img
          src={"/images/planetlogo.png"}
          alt="location logo"
          height={100}
          width={150}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Header;
