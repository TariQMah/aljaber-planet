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
import { english } from "@/utils/constrant";

const DataTable = ({ data }: any) => {
  const calculateSum = useCallback(
    (property: any) => {
      return data.reduce((accumulator: any, invoice: any) => {
        const propertyValue = invoice[property].toString();
        return accumulator + parseFloat(propertyValue);
      }, 0);
    },
    [data]
  );

  const totalSum = useMemo(() => calculateSum("Total"), [calculateSum]);
  const netSum = useMemo(() => calculateSum("netAmount"), [calculateSum]);
  const unitSum = useMemo(() => calculateSum("unitPrice"), [calculateSum]);
  const vatSum = useMemo(() => calculateSum("vatAmount"), [calculateSum]);
  const qtySum = useMemo(() => calculateSum("quantity"), [calculateSum]);

  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="w-full my-10">
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
              <TableCell>{`${vatSum.toFixed(2)} ${
                english.currency
              }`}</TableCell>
              <TableCell>{`${unitSum.toFixed(2)} ${
                english.currency
              }`}</TableCell>
              <TableCell>{`${netSum.toFixed(2)} ${
                english.currency
              }`}</TableCell>

              <TableCell className="text-right">
                {`${totalSum.toFixed(2)} ${english.currency}`}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DataTable;
