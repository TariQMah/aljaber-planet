"use client";

import React, { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import toast from "react-hot-toast";

const ScanForm = ({ setData, setOpen, setLoading, setRecieptNumber }: any) => {
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
    setRecieptNumber(id);
    setOpen(true);
    setLoading(true);
    await axios
      .post(`/api/${id}`)
      .then((res) => {
        if (res?.data?.length > 0) {
          setData(res?.data);
        } else {
          toast.error("No data found, try different reciept number");
        }
        setOpen(false);
      })
      .catch((err) => {
        setOpen(false);
        let { response } = err;
        toast.error(response?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    retriveData(data?.reciept);
  }

  return (
    <div className="flex w-full flex-col mb-10">
      {/* <h4 className="">Cart Information</h4> */}
      <Card className={""}>
        <CardHeader>
          <CardTitle>Enter Reciept Number</CardTitle>
          <CardDescription>Enter / Scan Invoice Number.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="reciept"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="h-16" tabIndex={1} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScanForm;
