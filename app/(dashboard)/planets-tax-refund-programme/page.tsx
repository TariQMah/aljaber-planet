"use client";

import React, { useMemo, useCallback, useState } from "react";

import DataTable from "./components/Table";
import ScanForm from "./components/ScanForm";
import CustomerForm from "./components/CustomerForm";

const Page = () => {
  const [data, setData] = useState([]);
  console.log("🚀 ~ file: page.tsx:11 ~ Page ~ data:", data);
  return (
    <div>
      <h2 className="text-center text-2xl py-5">NEW TRANSACTION</h2>

      <div className="flex gap-10 mx-10">
        <div className=" w-[80%]">
          <DataTable data={data} />
        </div>
        <div className=" w-[20%]">
          <ScanForm setData={setData} />

          <CustomerForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
