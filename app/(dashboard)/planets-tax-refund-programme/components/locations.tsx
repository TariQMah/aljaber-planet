"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Locations = ({ data }: any) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  console.log(
    "🚀 ~ file: locations.tsx:26 ~ Locations ~ value:",
    Object.keys(data)?.find((framework: any, index: number) => {
      const key = framework?.toLowerCase();

      if (key === value) {
        console.log("🚀 ~ file: locations.tsx:33 ~ Object.keys ~ key:", key);
        console.log(
          "🚀 ~ file: locations.tsx:34 ~ Object.keys ~ value:",
          value
        );
        console.log(
          "🚀 ~ file: locations.tsx:31 ~ Object.keys ~ key === value:",
          key === value
        );
        console.log(
          "🚀 ~ file: locations.tsx:31 ~ Object.keys ~ data === data:",
          data[framework]
        );
        return data[key];
      }
    })
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full  justify-between"
        >
          {value
            ? Object.keys(data)?.find((framework: any, index: number) => {
                const key = framework?.toLowerCase();
                if (key === value) {
                  return data[framework];
                }
              })
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full  p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-72 ">
              {Object.keys(data)?.map((framework: any, index: number) => (
                <CommandItem
                  key={data[framework]}
                  value={framework}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === data[framework] ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {data[framework]}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Locations;
