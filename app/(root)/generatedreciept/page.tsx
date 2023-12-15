"use client";

import {
  formatDateTime,
  slip_logo,
  o_name,
  o_phone,
  o_pos_lcoation,
  o_website,
} from "@/utils/constrant";
// import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import useGeneratePrint from "@/hooks/use-generate-slip";

interface Window {
  JsBarcode: (target: string, data: any, options?: any) => void;
}
const Barcode = ({ value }: any) => {
  const svgRef = useRef(null);

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src =
  //     "https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/barcodes/JsBarcode.code128.min.js";
  //   script.async = true;
  //   script.onload = () => {
  //     if (window.JsBarcode as any  && svgRef.current) {
  //       window.JsBarcode<any>(svgRef.current, value, {
  //         format: "CODE128",
  //         displayValue: true,
  //         fontSize: 20,
  //         textMargin: 10,
  //         width: 200,
  //         height: 100,
  //         margin: 0,
  //       });
  //     }
  //   };
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, [value]);

  return (
    <img
      ref={svgRef}
      style={{ height: "45.8pt", width: "200.4pt", borderWidth: "0px" }}
    />
  );
};

const page = () => {
  const now = new Date();
  const items = useGeneratePrint((state) => state.items);
  console.log("🚀 ~ file: page.tsx:65 ~ page ~ items:", items);

  const formattedToday: string = formatDateTime(now);
  const [isPrinting, setIsPrinting] = useState(false);

  //   let ta = router?.Tender_Amount;
  //   let tt = router?.Tender_Type;

  //   let items = router?.invitemsdt;
  //   let cusfname = router?.CusFirstName;
  //   let cuslname = router?.CustLastName;

  const printItems = () => {
    setIsPrinting(true);
    setIsPrinting(true);

    setTimeout(function () {
      window.print();
    }, 500);
  };

  const {
    receiptNumber,
    date,
    order,
    sales,
    shopper,
    quantity,
    discountAmount,
    totalTaxableAmount,
  } = items[items?.length - 1];

  return (
    <>
      <table
        className="printTable"
        style={{
          borderWidth: "0px",
          width: "209.7pt",
        }}
      >
        <tr>
          <td style={{ borderBottom: "2px solid #000" }}>
            {/* MAIN LOGO */}

            <table cellPadding={"2pt"}>
              <tr>
                <td style={{ padding: "5pt" }} className="sc4540588">
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
                <td className="s87c8a8b6">{o_name}</td>
              </tr>
              <tr>
                <td className="s550ec40c">{o_pos_lcoation}</td>
              </tr>
              <tr>
                <td className="s550ec40c">Phone: {o_phone}</td>
              </tr>
              <tr>
                <td className="s550ec40c">Website: {o_website}</td>
              </tr>
              <tr>
                <td className="s61cbe606">TAX INVOICE</td>
              </tr>
              <tr>
                <td className="s61cbe606">TRN:100308821600003</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style={{ borderBottom: "2px solid #000", padding: "10px 10px" }}>
            <table cellPadding={"3pt"} width={"100%"}>
              <tr>
                <td className="s33a089c8">Invoice No./رقم الفاتورة :</td>
                <td className="s33a089c8">{receiptNumber}</td>
              </tr>
              <tr>
                <td className="s33a089c8">Invoice Date/تاريخ الفاتورة :</td>
                <td className="s33a089c8">{date}</td>
              </tr>
              <tr>
                <td className="s33a089c8">Sales Person/مندوب مبيعات:</td>
                <td className="s33a089c8">
                  {sales?.salesID} {sales?.firstName} {sales?.lastName}
                </td>
              </tr>
              <tr>
                <td className="s33a089c8">POS/نقاط البيع :</td>
                <td className="s33a089c8">{o_name}</td>
              </tr>
              <tr>
                <td className="s33a089c8">Customer Name/إسم العميل:</td>
                <td className="s33a089c8">
                  {shopper?.firstName} {shopper?.lastName}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style={{ borderBottom: "2px dashed #000", padding: "10px 10px" }}>
            <table cellPadding={"3pt"} width={"100%"}>
              <tr>
                <td className="s1158b399" width={"30%"}>
                  Description
                </td>
                <td className="s1158b399" width={"10%"}>
                  Qty
                </td>
                <td className="s1158b399" width={"10%"}>
                  Price
                </td>
                <td className="s1158b399" width={"10%"}>
                  Disc
                </td>
                <td
                  className="s1158b399"
                  width={"40%"}
                  style={{ textAlign: "right" }}
                >
                  Total
                </td>
              </tr>
              <tr>
                <td className="s1158b399" width={"30%"}>
                  رقم المنتج{" "}
                </td>
                <td className="s1158b399" width={"10%"}>
                  الكمية
                </td>
                <td className="s1158b399" width={"10%"}>
                  السعر
                </td>
                <td className="s1158b399" width={"10%"}>
                  الخصم
                </td>
                <td
                  className="s1158b399"
                  width={"40%"}
                  style={{ textAlign: "right" }}
                >
                  الإجمالي
                </td>
              </tr>
              <tr>
                <td className="s1158b399"></td>
                <td className="s1158b399"></td>
                <td className="s1158b399"></td>
                <td className="s1158b399"></td>
                <td
                  className="s1158b399"
                  width={"40%"}
                  style={{ textAlign: "right" }}
                >
                  (Price in AED)
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style={{ borderBottom: "2px dashed #000", padding: "5px 10px" }}>
            <table cellPadding={"3pt"} width={"100%"}>
              {order?.items ? (
                Object.keys(items).map((index, j) => (
                  <>
                    <tr>
                      <td className="sc1e34f53" width={"30%"}>
                        {items[index].description}{" "}
                      </td>
                      <td className="s34782d8faa" width={"10%"}>
                        {items[index].quantity}
                      </td>
                      <td className="s34782d8f" width={"10%"}>
                        {items[index].OriginalPrice}
                      </td>
                      <td className="s34782d8f" width={"10%"}>
                        {items[index].DiscountAmount}
                      </td>
                      <td className="s34782d8f" width={"40%"}>
                        {Math.round(items[index].Total * 100) / 100}
                      </td>
                    </tr>
                  </>
                ))
              ) : (
                <div></div>
              )}
            </table>
          </td>
        </tr>

        <tr>
          <td style={{ borderBottom: "2px solid #000", padding: "5px 10px" }}>
            <table cellPadding={"3pt"} width={"100%"}>
              <tr>
                <td className="scce78ed5">No.of Items/ عدد القطع: </td>
                <td className="s4d750f9a">{order?.items?.length}</td>
              </tr>
              <tr>
                <td className="scce78ed5">Quantity/كمية: </td>
                <td className="s4d750f9a"> {quantity}</td>
              </tr>
              <tr>
                <td className="scce78ed5">Discount/الخصم: </td>
                <td className="s4d750f9a">AED{discountAmount}</td>
              </tr>
              <tr>
                <td className="scce78ed5">Bill Total/إجمالي الفاتورة: </td>
                <td className="s4d750f9a">AED{totalTaxableAmount}</td>
              </tr>
              <tr>
                <td className="scce78ed5">VAT/ضريبة: </td>
                {/* <td className="s4d750f9a">AED{router?.Vattotal}</td> */}
              </tr>
              <tr>
                <td className="se2005964">
                  Net Value(incl. VAT)/
                  <br />
                  الإجمالي شامل الضريبة: <br />
                </td>
                {/* <td className="sace2ea46">AED{router?.Netvalue}</td> */}
              </tr>
              <tr>
                <td className="scce78ed5">Tender Amount/ مبلغ العطاء: </td>
                <td className="s4d750f9a">AED</td>
              </tr>
              <tr>
                <td className="scce78ed5">Change Due/التغيير المستحق: </td>
                <td className="s4d750f9a">AED0.00</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style={{ borderBottom: "2px solid #000", padding: "5px 10px" }}>
            <table cellPadding={"3pt"} width={"100%"}>
              <tr>
                <td className="scce78ed5">Tender Type/ وصف الخدمة </td>
                <td className="s4d750f9a">Amount/ القيمة </td>
              </tr>
              <tr>
                {/* <td className="scce78ed5">{tt}</td> */}
                {/* <td className="s4d750f9a">AED{ta}</td> */}
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style={{ borderBottom: "2px solid #000", padding: "5px 10px" }}>
            <table width="100%">
              <tr>
                <td align="center">
                  <img
                    width={"70pt"}
                    style={{ margin: "0 auto" }}
                    src="../images/planetlog.png"
                  />
                </td>
              </tr>
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
              <tr>
                <td>
                  <Barcode value={receiptNumber} />
                </td>
              </tr>
              <tr>
                <td className="s1158b399" style={{ textAlign: "center" }}>
                  {receiptNumber}
                </td>
              </tr>

              <tr>
                <td className="s1158b399" style={{ textAlign: "center" }}>
                  Warning: Choking Hazard: small parts, not suitable for
                  children under (3) years of age. Exchange within 7 days from
                  the date of Purchase-Thank you
                </td>
              </tr>
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
              <tr>
                <td className="s1158b399" style={{ textAlign: "center" }}>
                  حذير: خطر الإختناق: أجزاء صغيرة، لا تصلح للأطفال دون (3) سنوات
                  يمكن استبدال المنتج/البضاعة خلال (7) أيام من تاريخ الشراء -
                  شكراً
                </td>
              </tr>
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
              <tr>
                <td className="s33a089c8" width={"50%"}>
                  <b>Print Date:</b>
                </td>
                <td className="s4d750f9a">{date}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <table cellPadding={"3pt"} width={"100%"}>
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
            </table>
          </td>
        </tr>
      </table>

      {!isPrinting && (
        <button
          type="submit"
          value="Submit"
          className="bg-[#3eb55f]"
          onClick={printItems}
        >
          Print
        </button>
      )}
    </>
  );
};

export default page;
