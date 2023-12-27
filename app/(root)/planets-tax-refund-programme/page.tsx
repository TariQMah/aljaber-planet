"use client";

import React, {
  useMemo,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";

import DataTable from "./components/Table";
import ScanForm from "./components/ScanForm";
import CustomerForm from "./components/CustomerForm";
import ScanPassport from "./components/ScanPassport";
import { Button } from "@/components/ui/button";
import {
  calculateSum,
  formatDateTime,
  issuetaxrefundtag,
  o_code,
  o_name,
  payment_method_code,
  types,
} from "@/utils/constrant";
import axios from "axios";
import { LoadingModal } from "@/components/modals/modal";
import toast from "react-hot-toast";
import AlertModal from "@/components/alertModal/alertModal";
import { useRouter } from "next/navigation";
import useGeneratePrint from "@/hooks/use-generate-slip";

const Page = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isPrint, setIsPrint] = useState(false);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const [passport, setPassport] = useState();
  const [recieptNumber, setRecieptNumber] = useState<string>();
  const [tagRecipt, setTagRecipt] = useState<string>();
  const formSubmit = useRef<HTMLButtonElement | null>(null);
  const generatePrint = useGeneratePrint();

  const onFormSubmit = useCallback(
    async (payload: any) => {
      console.log("🚀 ~ file: page.tsx:48 ~ payload:", payload);
      const totalSum = calculateSum("grossAmount", data);
      const netSum = calculateSum("netAmount", data);
      const vatSum = calculateSum("vatAmount", data);
      const qty = calculateSum("quantity", data);
      const totalTaxableAmount = calculateSum("totalTaxableAmount", data);
      const discountAmount = calculateSum("DiscountAmount", data);

      const now = new Date();
      const systemDateTime: string = formatDateTime(now);

      const body = {
        issueTaxRefundTag: issuetaxrefundtag,
        date: systemDateTime,
        receiptNumber: recieptNumber,
        terminal: process.env.NEXT_PUBLIC_TERMINAL,
        type: types,
        quantity: qty,
        discountAmount: discountAmount,
        totalTaxableAmount: Math.round(totalTaxableAmount * 100) / 100,
        operator: {
          code: o_code,
          name: o_name,
        },
        order: {
          totalBeforeVAT: netSum,
          vatIncl: vatSum,
          total: totalSum,
          items: data,
          paymentMethods: [
            {
              code: payment_method_code,
              amount: totalSum,
              paymentMethod: data[0]?.paymentType,
            },
          ],
        },
        shopper: {
          firstName: payload?.fName,
          lastName: payload?.lName,
          nationality: payload?.nationality,
          countryOfResidence: payload?.residence,
          phoneNumber: payload?.phone,
          birth: {
            date: payload?.dob,
          },
          shopperIdentityDocument: {
            expirationDate: "",
            type: payload?.docType?.toUpperCase(),
            issuedBy: payload?.nationality,
            number: payload?.docNumber,
          },
        },
        sales: {
          firstName: data[0]?.salesFName,
          lastName: data[0]?.salesLName,
          salesID: data[0]?.salesUserId,
        },
      };

      console.log("🚀 ~ file: page.tsx:103 ~ body:", body);
      await axios
        .post("/api/inventory", { body })
        .then(({ data }: any) => {
          let { taxRefundResponse } = data;
          toast.success(taxRefundResponse?.message);
          setTagRecipt(taxRefundResponse);
          setIsPrint(true);

          generatePrint.addPrint({ ...body, taxRefundResponse });
        })
        .catch((error: any) =>
          toast.error(
            error?.response?.data || "No conenction made, check your internet"
          )
        );
    },
    [recieptNumber, data, axios]
  );

  const print = async () => {
    router.push("/generatedreciept");
  };
  return (
    <div>
      <h2 className="text-center text-2xl py-5">NEW TRANSACTION</h2>

      <div className="flex gap-10 mx-10">
        <div className=" w-[80%] relative">
          <div className="flex w-full gap-5 ">
            <ScanForm
              setRecieptNumber={setRecieptNumber}
              setLoading={setLoading}
              setData={setData}
              setOpen={setOpen}
            />
            <ScanPassport setData={setPassport} />
          </div>
          <DataTable data={data} />

          <div className="  text-center bottom-0 mx-auto w-[60%] my-10 left-0 right-0">
            <div className="gap-5 flex justify-center">
              <Button
                className="bg-red-500 h-28 w-30 shadow-lg text-2xl"
                size={"lg"}
              >
                Cancel
              </Button>
              <Button
                onClick={() =>
                  formSubmit && formSubmit.current && formSubmit.current.click()
                }
                size={"lg"}
                className="h-28 shadow-lg text-2xl"
              >
                Refund Tax
              </Button>
            </div>
          </div>
        </div>
        <div className=" w-[20%]">
          <CustomerForm
            onFormSubmit={onFormSubmit}
            submitRef={formSubmit}
            passport={passport}
          />
        </div>

        <LoadingModal isOpen={open} loading={loading} />
      </div>
      <Button onClick={() => setIsPrint((prev) => !prev)}>sss</Button>
      <AlertModal setOpen={setIsPrint} action={print} isOpen={isPrint} />
    </div>
  );
};

export default Page;
