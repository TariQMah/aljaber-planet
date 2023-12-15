"use client";
import React, { useMemo, useCallback } from "react";
import { Progress } from "@/components/ui/progress";

import { Card, CardContent } from "@/components/ui/card";
import InvoiceRow from "./InvoiceRow";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { calculateSum, english } from "@/utils/constrant";

const DataTable = ({ data }: any) => {
  const totalSum = useMemo(
    () => calculateSum("grossAmount", data),
    [calculateSum, data]
  );
  const netSum = useMemo(
    () => calculateSum("netAmount", data),
    [calculateSum, data]
  );
  const unitSum = useMemo(
    () => calculateSum("unitPrice", data),
    [calculateSum, data]
  );
  const vatSum = useMemo(
    () => calculateSum("vatAmount", data),
    [calculateSum, data]
  );
  const qtySum = useMemo(
    () => calculateSum("quantity", data),
    [calculateSum, data]
  );
  console.log("🚀 ~ file: Table.tsx:41 ~ DataTable ~ qtySum:", qtySum);

  return (
    <Card className="w-full">
      <CardContent className="p-0 ">
        <Table className=" w-full overflow-scroll ">
          <TableHeader className="sticky z-10 top-0 bg-secondary">
            <TableRow>
              <TableHead className="w-[200px]">Item Name</TableHead>
              <TableHead>QTY</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>VAT</TableHead>
              <TableHead>Unit #</TableHead>
              <TableHead>Net #</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="relative w-full h-[400px]">
            {data?.map((row: any, key: any) => (
              <InvoiceRow key={key} invoice={row} />
            ))}
          </TableBody>
          <TableFooter className="sticky z-10 bottom-0 bg-secondary">
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>{qtySum}</TableCell>
              <TableCell></TableCell>
              <TableCell>{`${vatSum?.toFixed(2)} ${
                english.currency
              }`}</TableCell>
              <TableCell>{`${unitSum?.toFixed(2)} ${
                english.currency
              }`}</TableCell>
              <TableCell>{`${netSum?.toFixed(2)} ${
                english.currency
              }`}</TableCell>

              <TableCell className="text-right">
                {`${totalSum?.toFixed(2)} ${english.currency}`}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DataTable;
