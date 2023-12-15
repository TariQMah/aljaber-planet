"use client";

import React from "react";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-hot-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const ScanPassport = ({ setData }: any) => {
  const FormSchema = z.object({
    passport: z.string().min(2, {
      message: "Reciept number must be at least 2 characters.",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      passport: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { passport } = data;
    if (passport?.length > 0) {
      setData(passport?.trim());
    } else {
      toast.error("Something went wrong.");
    }
  }

  return (
    <div className="flex w-full flex-col mb-10">
      {/* <h4 className="">Cart Information</h4> */}
      <Card className={""}>
        <CardHeader>
          <CardTitle>Passport Scan</CardTitle>
          <CardDescription>Enter / Scan Passport Number.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="passport"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        tabIndex={2}
                        rows={2}
                        className="h-16 min-h-0"
                        {...field}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                      />
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

export default ScanPassport;
