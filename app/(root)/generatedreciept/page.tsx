"use client";

import {
  formatDateTime,
  slip_logo,
  o_name,
  o_phone,
  o_pos_lcoation,
  o_website,
} from "@/utils/constrant";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import useGeneratePrint from "@/hooks/use-generate-slip";

interface ExtendedWindow extends Window {
  JsBarcode: any; // Adjust the type accordingly based on JsBarcode's actual type
}
declare global {
  interface Window {
    JsBarcode: any;
  }
}
interface BarcodeProps {
  value: string;
}

const Barcode: React.FC<BarcodeProps> = ({ value }: any) => {
  const svgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("jsbarcode").then((JsBarcode) => {
        if (svgRef.current) {
          const extendedWindow = window as ExtendedWindow;
          if (extendedWindow.JsBarcode && svgRef.current) {
            extendedWindow.JsBarcode(svgRef.current, value, {
              format: "CODE128",
              displayValue: true,
              fontSize: 20,
              textMargin: 10,
              width: 200,
              height: 100,
              margin: 0,
            });
          }
        }
      });
    }
  }, [value]);

  return (
    <img
      ref={svgRef}
      style={{ height: "45.8pt", width: "200.4pt", borderWidth: "0px" }}
    />
  );
};

const Page = () => {
  const now = new Date();
  const items = useGeneratePrint((state) => state.items);

  const [isPrinting, setIsPrinting] = useState(false);

  const printItems = () => {
    setIsPrinting(true);

    setTimeout(function () {
      window.print();
    }, 500);
  };

  const current = items[items?.length - 1] || {};
  console.log("🚀 ~ file: page.tsx:82 ~ page ~ current:", current);

  let formattedDate = moment(current?.date)
    .local()
    .format("DD/MM/YYYY HH:mm:ss a");


  return (
    <>
      <table
        className="printTable"
        style={{
          borderWidth: "0px",
          width: "209.7pt",
          float: "left",
        }}
      >
        <tbody>
          <tr>
            <td
              style={{ borderBottom: "2px dashed #000", padding: "10px 5px" }}
            >
              {/* MAIN LOGO */}

              <table cellPadding={"2pt"}>
                <tbody>
                  <tr>
                    <td style={{ padding: "5pt" }} className="">
                      <img
                        src={slip_logo}
                        style={{
                          height: "45.8pt",
                          width: "200.4pt",
                          borderWidth: "0px",
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center m-0 p-0 text-lg font-bold">
                      {o_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center m-0 p-0 text-md">
                      {o_pos_lcoation}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center m-0 p-0 text-md">
                      Phone: {o_phone}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center m-0 p-0 text-md">
                      Website: {o_website}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center m-0 p-0 text-md font-bold">
                      TAX INVOICE
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center m-0 p-0  text-md font-bold">
                      TRN:100308821600003
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style={{ borderBottom: "2px solid #000", padding: "10px 5px" }}>
              <table cellPadding={"3pt"} width={"100%"}>
                <tbody>
                  <tr>
                    <td className="text-sm  m-0 p-0">
                      Invoice No./رقم الفاتورة :
                    </td>
                    <td className="text-sm m-0 pr-0">
                      {current?.receiptNumber || ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm  m-0 p-0">
                      Invoice Date/تاريخ الفاتورة :
                    </td>
                    <td className="text-sm  m-0 p-0">{current?.date}</td>
                  </tr>
                  <tr>
                    <td className="text-sm  m-0 p-0">
                      Sales Person/مندوب مبيعات:
                    </td>
                    <td className="text-sm  m-0 p-0">
                      {current?.sales?.salesID} {current?.sales?.firstName}{" "}
                      {current?.sales?.lastName}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm  m-0 p-0">POS/نقاط البيع :</td>
                    <td className="text-sm   m-0 p-0">{o_name}</td>
                  </tr>
                  <tr>
                    <td className="text-sm  m-0 p-0">
                      Customer Name/إسم العميل:
                    </td>
                    <td className="text-sm  m-0 p-0">
                      {current?.shopper?.firstName} {current?.shopper?.lastName}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td
              style={{ borderBottom: "2px dashed #000", padding: "10px 5px" }}
            >
              <table cellPadding={"3pt"} width={"100%"}>
                <tbody>
                  <tr>
                    <td className="text-sm font-bold m-0 p-0" width={"50%"}>
                      Description
                    </td>
                    <td className="text-sm  font-bold  m-0 p-0" width={"10%"}>
                      Qty
                    </td>
                    <td className="text-sm  font-bold m-0 p-0" width={"10%"}>
                      Price
                    </td>
                    <td className="text-sm  font-bold m-0 p-0" width={"10%"}>
                      Disc
                    </td>
                    <td
                      className="text-sm  font-bold text-right  m-0 p-0"
                      width={"20%"}
                    >
                      Total
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm  font-bold m-0 p-0" width={"50%"}>
                      رقم المنتج{" "}
                    </td>
                    <td className="text-sm  font-bold m-0 p-0" width={"10%"}>
                      الكمية
                    </td>
                    <td className="text-sm  font-bold m-0 p-0" width={"10%"}>
                      السعر
                    </td>
                    <td className="text-sm  font-bold m-0 p-0" width={"10%"}>
                      الخصم
                    </td>
                    <td
                      className="text-sm  font-bold m-0 p-0"
                      width={"20%"}
                      style={{ textAlign: "right" }}
                    >
                      الإجمالي
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm  m-0 p-0"></td>
                    <td className="text-sm  m-0 p-0"></td>
                    <td className="text-sm  m-0 p-0"></td>
                    <td className="text-sm  m-0 p-0"></td>
                    <td
                      className="text-sm  font-bold text-right  m-0 p-0"
                      width={"40%"}
                    >
                      (Price in AED)
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td
              style={{ borderBottom: "2px dashed #000", padding: "10px 5px" }}
            >
              <table cellPadding={"3pt"} width={"100%"}>
                <tbody>
                  {current?.order ? (
                    Object.keys(current?.order?.items).map((index, j) => (
                      <>
                        <tr key={index + j}>
                          <td className="text-sm" width={"50%"}>
                            {current?.order?.items[index]?.description}{" "}
                          </td>
                          <td className="text-sm" width={"10%"}>
                            {current?.order?.items[index].quantity}
                          </td>
                          <td className="text-sm" width={"10%"}>
                            {current?.order?.items[index].OriginalPrice}
                          </td>
                          <td className="text-sm" width={"10%"}>
                            {current?.order?.items[index].DiscountAmount}
                          </td>
                          <td className="text-sm text-right" width={"20%"}>
                            {Math.round(
                              current?.order?.items[index].Total * 100
                            ) / 100}
                          </td>
                        </tr>
                      </>
                    ))
                  ) : (
                    <div></div>
                  )}
                </tbody>
              </table>
            </td>
          </tr>

          <tr>
            <td style={{ borderBottom: "2px solid #000", padding: "5px 5px" }}>
              <table cellPadding={"3pt"} width={"100%"}>
                <tbody>
                  <tr>
                    <td className="text-sm m-0 p-0">
                      No.of Items/ عدد القطع:{" "}
                    </td>
                    <td className="text-sm text-right  m-0 p-0">
                      {current?.order?.items?.length}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm  m-0 p-0">Quantity/كمية: </td>
                    <td className="text-sm text-right m-0 p-0">
                      {" "}
                      {current?.quantity}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm  m-0 p-0">Discount/الخصم: </td>
                    <td className="text-sm  text-right m-0 p-0">
                      AED{current?.discountAmount}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm  m-0 p-0">
                      Bill Total/إجمالي الفاتورة:{" "}
                    </td>
                    <td className="text-sm  text-right m-0 p-0">
                      {console.log("tttt", current?.order)}
                      AED{current?.order?.totalBeforeVAT?.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm  m-0 p-0">VAT/ضريبة: </td>
                    <td className="text-sm text-right  m-0 p-0">
                      AED{current?.order?.vatIncl?.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold text-md  m-0 p-0">
                      Net Value(incl. VAT)/
                      <br />
                      الإجمالي شامل الضريبة: <br />
                    </td>
                    <td className=" font-bold  text-md m-0 p-0 text-right">
                      AED{current?.order?.total}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm  m-0 p-0">
                      Tender Amount/ مبلغ العطاء:{" "}
                    </td>
                    <td className="text-sm  text-right m-0 p-0">AED</td>
                  </tr>
                  <tr>
                    <td className="text-sm  m-0 p-0">
                      Change Due/التغيير المستحق:{" "}
                    </td>
                    <td className="text-sm  text-right m-0 p-0">AED0.00</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style={{ borderBottom: "2px solid #000", padding: "10px 5px" }}>
              <table cellPadding={"3pt"} width={"100%"}>
                <tbody>
                  <tr>
                    <td className="text-sm  m-0 p-0">
                      Tender Type/ وصف الخدمة{" "}
                    </td>
                    <td className="text-sm text-right  m-0 p-0">
                      Amount/ القيمة{" "}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm  m-0 p-0">
                      {current?.order?.paymentMethods[0]?.paymentMethod}
                    </td>
                    <td className="text-sm text-right m-0 p-0">
                      AED{current?.order?.total?.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style={{ borderBottom: "2px solid #000", padding: "5px 10px" }}>
              <table width="100%">
                <tbody>
                  <tr>
                    <td align="center">
                      <img
                        width={"70pt"}
                        style={{ margin: "0 auto" }}
                        src="../images/planetlog.png"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td
              style={{
                borderBottom: "2px solid #000",
                textAlign: "center",
                padding: "5px 10px",
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <table width={"80%"}>
                <tbody>
                  <tr>
                    <td>
                      <Barcode value={current?.receiptNumber || ""} />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm  m-0 p-0  text-center font-bold">
                      {current?.receiptNumber || ""}
                    </td>
                  </tr>

                  <tr>
                    <td className="text-sm  m-0 p-0 text-center font-bold">
                      Warning: Choking Hazard: small parts, not suitable for
                      children under (3) years of age. Exchange within 7 days
                      from the date of Purchase-Thank you
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <tr>
            <td
              style={{
                borderBottom: "2px solid #000",
                textAlign: "center",
                padding: "5px 10px",
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <table width={"80%"}>
                <tbody>
                  <tr>
                    <td className="text-sm  m-0 p-0  text-center font-bold">
                      حذير: خطر الإختناق: أجزاء صغيرة، لا تصلح للأطفال دون (3)
                      سنوات يمكن استبدال المنتج/البضاعة خلال (7) أيام من تاريخ
                      الشراء - شكراً
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td
              style={{
                textAlign: "center",
                padding: "0px 10px",
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <table cellPadding={"3pt"} width={"100%"}>
                <tbody>
                  <tr>
                    <td className="text-sm text-left m-0 p-0" width={"50%"}>
                      <b>Print Date:</b>
                    </td>
                    <td className="text-sm text-right m-0 p-0">
                      {formattedDate}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table cellPadding={"3pt"} width={"100%"}>
                <tbody>
                  <tr>
                    <td align="center">
                      <img src="../images/recieptlogo/logo1.jpg" />
                    </td>
                    <td align="center">
                      <img src="../images/recieptlogo/logo3.jpg" />
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <img src="../images/recieptlogo/logo4.jpg" />
                    </td>
                    <td align="center">
                      <img src="../images/recieptlogo/logo2.jpg" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      {!isPrinting && (
        <button
          type="submit"
          value="Submit"
          className="bg-[#3eb55f] float-right w-[50%] m-10 h-[300px]"
          onClick={printItems}
        >
          Print
        </button>
      )}

      <div className="clear-both"></div>
    </>
  );
};

export default Page;
