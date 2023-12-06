import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  //   const { userId } = auth();

  //   if (!userId) {
  //     redirect("/sign-in");
  //   }
  //   const store = await prismaDb.store.findFirst({
  //     where: {
  //       id: params.storeId,
  //       userId,
  //     },
  //   });

  //   if (!store) {
  //     redirect("/");
  //   }
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
