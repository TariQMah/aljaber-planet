"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";
import toast from "react-hot-toast";
import useGeneratePrint from "@/hooks/use-generate-slip";
import axios from "axios";
import { useRouter } from "next/navigation";
interface FormData {
  billReceiptNumber: string;
}
const Page = () => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<FormData>();
  const generatePrint = useGeneratePrint();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await axios
      .post("/api/reprint", { billId: data?.billReceiptNumber })
      .then(({ data }: any) => {
        generatePrint.addPrint(data);
        router.push("/generatedreciept");
      })
      .catch((error: any) =>
        toast.error(
          error?.response?.data || "No conenction made, check your internet"
        )
      );
  };

  return (
    <div className="flex justify-center h-[100%] py-24">
      <form
        className="flex w-full max-w-2xl items-center space-x-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          className="text-2xl h-32 w-[600px]"
          placeholder="Bill Receipt Number"
          {...register("billReceiptNumber", { required: true })}
        />
        <Button
          type="submit"
          className="text-2xl h-32 w-60"
          variant={"destructive"}
          disabled={formState.isSubmitting}
        >
          Reprint
        </Button>
      </form>
    </div>
  );
};

export default Page;
