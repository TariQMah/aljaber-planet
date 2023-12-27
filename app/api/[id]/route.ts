import { query } from "@/utils/constrant";
import db from "mssql";
import { connectToDatabase, connectionClose } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params?: { id?: string } }
) {
  try {
    const { body } = await req.json();
    console.log("🚀 ~ file: route.ts:10 ~ POST ~ body:", body);
    if (params && !params.id) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    // const body = await req.json()
    // const { name } = body

    await connectToDatabase();

    const sql = query.baseinfo_query_o;

    const result = await db.query(sql + `'${params.id}'`);
    const records = [];
    for (const row of result.recordset) {
      const items = {
        ProductKey: row.ProductKey,
        description: row.Description,
        quantity: row.Quantity,
        unitPrice: row.ItemBasePrice,
        vatCode: process.env.VATCODE,
        vatAmount: row.ItemTax,
        netAmount: row.Quantity * row.ItemBasePrice,
        grossAmount: row.Quantity * row.ItemBasePrice + row.ItemTax,
        Total: row.ItemTotal,
        OriginalPrice: row.ItemOriginalPrice,
        DiscountAmount: row.ItemDiscountAmount,
        merchandiseGroup: process.env.MERCHANDISEGROUP,
        taxRefundEligible: true,
        salesFName: row.FirstName,
        salesLName: row.LastName,
        salesUserId: row.UserId,
        totalTaxableAmount: row.TotalTaxableAmount,
        paymentType: row.PaymentTypeDescription,
      };
      records.push(items);
    }
    await connectionClose();

    return NextResponse.json(records);
  } catch (error) {
    console.log("Store error : ", error);
    return new NextResponse("Internal Error ", { status: 500 });
  }
}
