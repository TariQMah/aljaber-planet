import { query } from "@/utils/constrant";
import axios, { AxiosRequestConfig } from "axios";
import { NextRequest, NextResponse } from "next/server";
import db from "mssql";
import {
  closeConnectionToInsertDatabase,
  connectToDatabase,
  connectToInsertDatabase,
} from "@/lib/db";
interface TokenResponse {
  access_token?: string;
}

interface TranscResponse {
  data?: any; // Adjust the type based on your API response structure
}

export async function POST(req: NextRequest) {
  try {
    const { body } = await req.json();
    const params = new URLSearchParams();
    params.append("client_id", process.env.client_id || "");
    params.append("client_secret", process.env.client_secret || "");
    params.append("grant_type", process.env.grant_type || "");

    const tokenConfig: AxiosRequestConfig = {
      method: "post",
      maxBodyLength: Infinity,
      url: process.env.token_api || "",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: params,
    };

    const { data: tokenResponse } = await axios.request<TokenResponse>(
      tokenConfig
    );

    const accessToken = tokenResponse?.access_token || "";

    const transcConfig: AxiosRequestConfig = {
      method: "post",
      maxBodyLength: Infinity,
      url: process.env.new_transc || "",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Cookie: "XSRF-TOKEN=78e6b675-c39e-4fda-9635-1dcea0696e04",
      },
      data: JSON.stringify(body),
    };

    const { data: transcResponse }: any = await axios.request<TranscResponse>(
      transcConfig
    );

    try {
      await connectToInsertDatabase();

      const sql2 = `INSERT INTO [RefundEntries] (
      [ReceiptNumber]
      ,[CustomerFName]
      ,[CustomerLName]
      ,[Passport]
      ,[Phone]
      ,[DOB]
      ,[Nationality]
      ,[Residence]
      ,[DocumentType]
      ,[DocNumber]
      ,[TotalAmount]
      ,[ItemsQTY]
      ,[VAT]
      ,[TaxRefundAmount]
      ,[TaxReFundMessage]
      ,[TaxRefundQrCode]
      ,[taxRefundStatus]
      ,[TaxRefundStatusCode]
      ,[TaxRefundTagNumber]
      ,[TaxDigitalReceipt]
      ,[TaxRegisterStatus]
      ,[TaxRegisterTagNumber]
      ,[CreatedAt]
      ,[SalesFirstName]
      ,[SalesLastName]
      ,[SalesID]
      ,[Terminal]
      ,[Type])
VALUES ('${transcResponse?.receiptNumber}',
 '${body.shopper?.firstName}',
  '${body.shopper?.lastName}',
  '${body.shopper?.shopperIdentityDocument?.number}',
  '${body.shopper?.phoneNumber}',
  '${body.shopper?.birth?.date}',
  '${body.shopper?.nationality}',
  '${body.shopper?.countryOfResidence}',
  '${body.shopper?.shopperIdentityDocument?.type}',
  '${body.shopper?.shopperIdentityDocument?.number}',
  '${transcResponse?.totalAmount}',
  '${transcResponse?.transactionItems?.length}',
  '${transcResponse?.vatAmount}',
  '${transcResponse?.taxRefundResponse?.refundAmount}',
  '${transcResponse?.taxRefundResponse?.message}',
  '${transcResponse?.taxRefundResponse?.taxRefundQrCode}',
  '${transcResponse?.taxRefundResponse?.taxRefundStatus}',
  '${transcResponse?.taxRefundResponse?.taxRefundStatusCode}',
  '${transcResponse?.taxRefundResponse?.taxRefundTagNumber}',
  '${transcResponse?.taxRegisterResponse?.digitalReceipt}',
  '${transcResponse?.taxRegisterResponse?.taxRegisterStatus}',
  '${transcResponse?.taxRegisterResponse?.taxRegisterTagNumber}',
  GETDATE(),
  '${body.sales?.firstName}',
  '${body.sales?.lastName}',
  '${body.sales?.salesID}',
  '${body.terminal}',
  '${body.type}'
  )`;
      const result = await db.query(sql2);
      console.log("🚀 ~ file: route.ts:120 ~ POST ~ result:", result);
    } catch (error) {
      console.log("🚀 ~ file: route.ts:167 ~ POST ~ error:", error);
    } finally {
      return new NextResponse(JSON.stringify(transcResponse), { status: 201 });
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || "Internal Server Error";

    return new NextResponse(errorMessage, { status: 500 });
  } finally {
    await closeConnectionToInsertDatabase();
  }
}
