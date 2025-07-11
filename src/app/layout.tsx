import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./styles/tailwind.css";
import "./styles/globals.scss";

const sora = Sora({
   variable: "--font-sora",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Rebet Coding Challenge",
   description: "Exercise built with Next.js",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={`${sora.className}`}>
            {children}
         </body>
      </html>
   );
}
