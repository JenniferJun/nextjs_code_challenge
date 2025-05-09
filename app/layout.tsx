import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Jeny.J Tweet",
    default: "Jeny.J Tweet",
  },
  description: "Tweet and share your thoughts!",
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
        <div className="w-[800px] flex justify-between items-center space-x-4">
          <nav className="flex justify-between items-center space-x-4 text-gray-800">
            <div className="p-2 w-[5px]">|</div>
            <Link href="/">Home</Link>
            <div className="p-2 w-[5px]">|</div>
            <Link href="/profile">Profile</Link>
            <div className="p-2 w-[5px]">|</div>
            <Link href="/search">Search</Link>
            <div className="p-2 w-[5px]">|</div>
          </nav>
        </div>
        <div className="w-[800px] h-[750px] w-min-[400px] border-2 bg-[#F8F6F5] ">
          {children}
        </div>
      </body>
    </html>
  );
}
