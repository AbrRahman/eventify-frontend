"use client";
import { ReactNode } from "react";
import Header from "@/component/header/Header";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Providers;
