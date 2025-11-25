'use client'
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/Component/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Jura } from "next/font/google";
import Background from "@/Component/Background";
import "@/lib/config"; 

const jura = Jura({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], 
});


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

  
    if (token && ["/", "/login", "/signup"].includes(router.pathname)) {
      router.replace("/dashboard");
    }

    
    if (!token && ["/dashboard", "/profile"].includes(router.pathname)) {
      router.replace("/home");
    }
  }, [router.pathname]);

  return (
    <>
     <Background/>
      <div className={jura.className}>
        <Navbar />
      <div className="mt-19">
        <Component {...pageProps} />
      </div>
     
      </div>
    </>
  );
}
