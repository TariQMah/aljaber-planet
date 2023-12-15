import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { NextRequest, NextResponse } from "next/server";

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

    const { data: transcResponse } = await axios.request<TranscResponse>(
      transcConfig
    );

    return new NextResponse(JSON.stringify(transcResponse), { status: 201 });
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || "Internal Server Error";

    return new NextResponse(errorMessage, { status: 500 });
  }
}
