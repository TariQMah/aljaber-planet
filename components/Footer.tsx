"use client";
import React from "react";

const Footer = () => {
  const current = new Date();
  return (
    <div className="bg-green-500 py-10 text-xl text-white  shadow-md flex justify-between px-10 items-center">
      <p>
        Developed By IT-Department Al Jaber © Copyright {current?.getFullYear()}
        . All rights reserved.
      </p>
      <p>(Version : {process.env.NEXT_PUBLIC_APP_VERSION})</p>
    </div>
  );
};

export default Footer;
