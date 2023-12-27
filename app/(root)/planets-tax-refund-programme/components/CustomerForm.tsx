"use client";

import React, { useRef, useEffect, useCallback } from "react";
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
import toast from "react-hot-toast";
import { countries } from "country-data";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDateTime } from "@/utils/constrant";

const CustomerForm = ({ passport, submitRef, onFormSubmit }: any) => {
  const FormSchema = z.object({
    fName: z.string().min(2, {
      message: "first name must be provided.",
    }),
    lName: z.string().min(2, {
      message: "last name must be provided.",
    }),
    phone: z.string().min(2, {
      message: "phone number must be provided.",
    }),
    dob: z.string().min(2, {
      message: "date of birth must be provided.",
    }),
    nationality: z.string().min(2, {
      message: "nationality must be provided.",
    }),
    residence: z.string().min(2, {
      message: "residence must be provided.",
    }),

    docType: z.string().min(2, {
      message: "document type must be provided.",
    }),

    docNumber: z.string().min(2, {
      message: "document number must be provided.",
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
      docType: "",
      docNumber: "",
    },
  });

  const getAlpha3Code = (alpha3Code: string): string | undefined => {
    const country = countries[alpha3Code];
    return country ? country.alpha2 : undefined;
  };
  const formSetValues = useCallback(() => {
    if (passport?.length > 0) {
      const documentType = passport[0]?.substring(0, 1);

      const passportRawData = passport.split("\n");

      if (documentType !== "P") {
        toast.error("Please check document type again");
        return;
      }

      const name = passport?.substring(5, 30);

      const nameArray = name.split("<");
      const lastName = nameArray[0];
      const firstName = nameArray.slice(1).join(" ");

      const firstline = passportRawData[0];
      const secondLine = passportRawData[1];
      const thirdLine = passportRawData[2];
      let passportNumber, nationality;

      if (secondLine && secondLine?.length == 0) {
        toast.error("Second line not read. Please try again");
      } else {
        if (
          secondLine?.substring(7, 8) != "<" &&
          secondLine?.substring(8, 9) != "<"
        ) {
          passportNumber = secondLine?.substring(0, 9);
        } else if (
          secondLine?.substring(8, 9) === "<" &&
          secondLine?.substring(7, 8) != "<"
        ) {
          passportNumber = secondLine?.substring(0, 8);
        } else {
          passportNumber = secondLine?.substring(0, 7);
        }
      }
      const countryCode = passport?.substring(2, 5);

      form.setValue("fName", firstName);
      form.setValue("lName", lastName);
      form.setValue("docType", "Passport");
      form.setValue("docNumber", passportNumber);
      // form.setValue("passport", passportNumber);
      form.setValue(
        "nationality",
        getAlpha3Code(secondLine?.substring(10, 13)) || ""
      );
      form.setValue(
        "residence",
        getAlpha3Code(secondLine?.substring(10, 13)) || ""
      );

      const dateOfBirth = secondLine?.substring(13, 19);
      const yearPrefix =
        parseInt(dateOfBirth?.substring(0, 2)) > 45 ? "19" : "20";
      const formattedDateOfBirth = `${yearPrefix}${dateOfBirth?.substring(
        0,
        2
      )}-${dateOfBirth?.substring(2, 4)}-${dateOfBirth?.substring(4, 6)}`;
      form.setValue("dob", formattedDateOfBirth);

      form.clearErrors();
    }
  }, [passport, form.setValue]);

  useEffect(() => {
    formSetValues();
  }, [passport]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    onFormSubmit(data);
  }

  return (
    <div className="flex flex-col">
      <Card className={""}>
        <CardHeader>
          <CardTitle>Tourist Info</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name:</FormLabel>
                    <FormControl>
                      <Input tabIndex={3} {...field} placeholder="First Name" />
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
                      <Input tabIndex={4} {...field} placeholder="Last Name" />
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
                      <Input
                        tabIndex={5}
                        {...field}
                        placeholder="Phone Number"
                      />
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
                      <Input
                        tabIndex={6}
                        type="date"
                        {...field}
                        placeholder="dd/mm/yyyy"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality:</FormLabel>
                    <FormControl>
                      <Locations selected={field.value} />
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
                      <Locations selected={field.value} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className={" my-10"}>
        <CardHeader>
          <CardTitle>Tourist Document Info</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="docType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doc Type:</FormLabel>
                    <FormControl>
                      <Input
                        tabIndex={3}
                        readOnly
                        {...field}
                        placeholder="Doc Type"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="docNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doc Number:</FormLabel>
                    <FormControl>
                      <Input
                        tabIndex={4}
                        readOnly
                        {...field}
                        placeholder="Doc Number"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button style={{ display: "none" }} ref={submitRef}>
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerForm;
