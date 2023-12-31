import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { english } from "@/utils/constrant";

const InvoiceRow = ({ invoice }: any) => {
  return (
    <TableRow className="">
      <TableCell className="font-medium">{invoice.description}</TableCell>
      <TableCell>{invoice.quantity}</TableCell>
      <TableCell>
        <Badge
          variant="secondary"
          className="bg-green-300 hover:bg-green-400 text-white"
        >
          Eligible
        </Badge>
      </TableCell>
      <TableCell>{`${invoice?.vatAmount?.toFixed(2)} ${
        english.currency
      }`}</TableCell>
      <TableCell>{`${invoice?.unitPrice?.toFixed(2)} ${
        english.currency
      }`}</TableCell>
      <TableCell>{`${invoice?.OriginalPrice?.toFixed(2)} ${
        english.currency
      }`}</TableCell>
      <TableCell className="text-right">{`${invoice.Total} ${english.currency}`}</TableCell>
    </TableRow>
  );
};

export default InvoiceRow;
