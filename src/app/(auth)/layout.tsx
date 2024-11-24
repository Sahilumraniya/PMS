"use client";

// import type { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(process.env.AUTH_COOKIE_NAME || "auth");
    if (token) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  return (<> {loader ? <Loading /> : children}</>);
}
