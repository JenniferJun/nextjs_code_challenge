import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Jeny.J Property",
    default: "Jeny.J Property",
  },
  description: "Sell and buy properties!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-400 via-orange-300 to-blue-400`}
      >
        <div className="w-[800px] h-[750px] w-min-[400px] border-2 bg-[#F8F6F5] ">
          {children}
        </div>
      </body>
    </html>
  );
}
