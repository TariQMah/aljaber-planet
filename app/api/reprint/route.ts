import { NextRequest, NextResponse } from "next/server";

import { o_code, o_name, query } from "@/utils/constrant";
import db from "mssql";
import {
  closeConnectionToInsertDatabase,
  connectToDatabase,
  connectToInsertDatabase,
  connectionClose,
} from "@/lib/db";
import { error } from "console";
interface TokenResponse {
  access_token?: string;
}

interface TranscResponse {
  data?: any; // Adjust the type based on your API response structure
}

async function fetchData(billId: string): Promise<void> {
  try {
    // Establish the database connection
    await connectToInsertDatabase();

    // Construct the SQL query
    const sql = query.Retrive_Reprint;
    var post = { id: 1, title: "Hello MySQL" };
    // Execute the query using a parameterized query and async/await

    const { recordset }: any = await new Promise((resolve, reject) => {
      db.query(
        sql + `'${billId}' ORDER BY CreatedAt DESC`,
        (error: any, results: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
    console.log("🚀 ~ file: route.ts:48 ~ fetchData ~ result:", recordset);

    return recordset;

    // Process the query result here (use 'result' variable)
  } catch (error) {
    // Handle errors
    console.error(error);
  } finally {
    // Close the database connection after the query
    await closeConnectionToInsertDatabase();
  }
}

export async function POST(req: NextRequest) {
  try {
    const { billId } = await req.json();
    if (!billId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data: any = await fetchData(billId);
    await connectToDatabase();
    const sql = query.baseinfo_query_o;
    const result = await db.query(`${sql} '${billId}'`);
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
    console.log("🚀 ~ file: route.ts:149 ~ POST ~ records:", records);

    const payload = {
      issueTaxRefundTag: data[0]?.TaxRefundTagNumber,
      date: data[0]?.CreatedAt,
      receiptNumber: data[0]?.ReceiptNumber,
      terminal: data[0]?.Terminal,
      type: data[0]?.Tpye,
      quantity: data[0]?.ItemsQTY,
      discountAmount: data[0]?.ItemsQTY, //// i need to handle this, Need This it will create problem
      totalTaxableAmount: data[0]?.TaxRefundAmount,
      operator: {
        code: o_code,
        name: o_name,
      },
      order: {
        totalBeforeVAT: data[0]?.TaxRefundAmount, /// UPDATE THIS
        vatIncl: data[0]?.TotalAmount + data[0]?.VAT,
        total: data[0]?.TaxRefundAmount,
        items: records,
        paymentMethods: [
          {
            code: data[0]?.TaxRefundAmount,
            amount: data[0]?.TaxRefundAmount,
            paymentMethod: data[0]?.paymentType,
          },
        ],
      },
      shopper: {
        firstName: data[0]?.CustomerFName,
        lastName: data[0]?.CustomerLName,
        nationality: data[0]?.Nationality,
        countryOfResidence: data[0]?.Residence,
        phoneNumber: data[0]?.Phone,
        birth: {
          date: data[0]?.DOB,
        },
        shopperIdentityDocument: {
          expirationDate: "",
          type: data[0]?.DocumentType?.toUpperCase(),
          issuedBy: data[0]?.Nationality,
          number: data[0]?.DocNumber,
        },
      },
      sales: {
        firstName: data[0]?.SalesFirstName,
        lastName: data[0]?.SalesLastName,
        salesID: data[0]?.SalesID,
      },
    };

    return new NextResponse(JSON.stringify(payload), { status: 201 });
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || "Internal Server Error";

    return new NextResponse(errorMessage, { status: 500 });
  }
}
