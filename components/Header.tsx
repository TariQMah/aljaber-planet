import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="bg-green-500 shadow-md flex justify-center items-center">
      <div className=" border-r-2 py-3 my-4 ">
        <Image
          src={"/images/recieptimages/DUAE.png"}
          alt="location logo"
          height={100}
          width={200}
          className="object-contain"
        />
      </div>
      <div className="logo-2 ml-10">
        <Image
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
