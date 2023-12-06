"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  password: z.string({
    required_error: "Password is required",
  }),
});

const Page = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("🚀 ~ file: page.tsx:41 ~ onSubmit ~ data:", data);

    router.push("/dashboard");

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }
  return (
    <div className="flex bg-white justify-center items-center h-full">
      <div className="m-auto p-5 bg-gray-300 rounded-xl border-2 border-white w-[600px]">
        <div className="flex flex-col text-center justify-center">
          <div className="flex  justify-center my-5 ">
            <Image
              alt="aljaber logo"
              width={300}
              height={100}
              src={"/images/opticallogo.png"}
            />
          </div>

          <div className="flex justify-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username/email" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="password" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
