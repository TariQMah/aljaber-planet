"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const onRouteClick = (route: String) => {
    router.push(`/${route}`);
  };
  return (
    <div className="flex flex-col my-32 mx-auto w-[80%]">
      <div className="text-center gap-5 flex flex-col">
        <h2 className="text-4xl">Welcome to Aljaber's Planet Tax Refund</h2>
        <p className="text-2xl">Select a process to continue</p>
      </div>

      <div className="flex gap-10 my-10">
        <Card
          onClick={() => onRouteClick("planets-tax-refund-programme")}
          className="w-full group transition rounded-3xl shadow-md  hover:shadow-2xl hover:bg-green-500 hover:cursor-pointer "
        >
          <CardContent className="p-48">
            <h3 className="text-6xl text-center transition  group-hover:text-white">
              New
            </h3>
          </CardContent>
        </Card>
        <Card
          onClick={() => onRouteClick("cancel-refund-request")}
          className="w-full group transition rounded-3xl shadow-md  hover:shadow-2xl  hover:bg-green-500 "
        >
          <CardContent className="p-48">
            <h3 className="text-6xl text-center transition  group-hover:text-white">
              Cancel
            </h3>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
