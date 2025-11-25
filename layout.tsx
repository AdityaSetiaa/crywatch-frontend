import type { Metadata } from "next";
import { Jura } from "next/font/google";
import "./../styles/globals.css";
import { ThemeProvider } from "next-themes";


const geistSans = Jura({
  variable: "--font-Jura-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crywatch",
  description: "Watch your crypto investments closely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} antialiased`}
      >
       <ThemeProvider attribute="class" defaultTheme="system">
      
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
