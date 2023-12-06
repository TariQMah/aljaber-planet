"use client";

import React, { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";

const ScanForm = ({ setData }: any) => {
  const FormSchema = z.object({
    reciept: z.string().min(2, {
      message: "Reciept number must be at least 2 characters.",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reciept: "",
    },
  });
  useEffect(() => {
    form.register("reciept");
    form.setFocus("reciept");
  }, [form]);

  const retriveData = async (id?: string) => {
    const { data } = await axios.post(`/api/${id}`);
    setData(data);
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("🚀 ~ file: page.tsx:55 ~ onSubmit ~ data:", data);
    retriveData(data?.reciept);
  }

  return (
    <div className="flex flex-col mb-10">
      <h4 className="">Cart Information</h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="reciept"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Reciept Number:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter / Scan Invoice Number" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default ScanForm;
