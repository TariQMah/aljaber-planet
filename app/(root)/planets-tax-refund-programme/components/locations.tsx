"use client";

import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { locations } from "@/utils/constrant";
import { cn, countries } from "@/lib/utils";
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

const Locations = ({ selected }: any) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>(selected?.toLowerCase());

  useEffect(() => {
    if (selected) setValue(selected?.toLowerCase());
  }, [selected]);

  const findSelected = countries?.find(
    (item, index) => item?.Code2.toLowerCase() == value
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
          {value ? findSelected?.Name : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full  p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-72 ">
              {countries?.map((framework: any, index: number) => (
                <CommandItem
                  key={framework?.Code2}
                  value={framework?.Code2}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework?.Code2 ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework?.Name}
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
