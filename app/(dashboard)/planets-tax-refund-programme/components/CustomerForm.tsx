"use client";

import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import Locations from "./locations";
import { locations } from "@/utils/constrant";

const CustomerForm = () => {
  const FormSchema = z.object({
    fName: z.string({
      required_error: "first name must be provided.",
    }),

    lName: z.string({
      required_error: "last name must be provided.",
    }),
    phone: z.string({
      required_error: "phone number must be provided.",
    }),
    dob: z.string({
      required_error: "date of birth must be provided.",
    }),
    nationality: z.string({
      required_error: "nationality must be provided.",
    }),
    residence: z.string({
      required_error: "residence must be provided.",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fName: "",
      lName: "",
      phone: "",
      dob: "",
      nationality: "",
      residence: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("🚀 ~ file: page.tsx:55 ~ onSubmit ~ data:", data);
  }

  const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];

  return (
    <div className="flex flex-col">
      <h4 className="">Cart Information</h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter / Scan Invoice Number" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter / Scan Invoice Number" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter / Scan Invoice Number" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="dd/mm/yyyy" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Nationality:</FormLabel>
                <FormControl>
                  <Locations data={locations} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="residence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country of Residence:</FormLabel>
                <FormControl>
                  <Locations data={locations} />
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

export default CustomerForm;
