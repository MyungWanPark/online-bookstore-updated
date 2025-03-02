import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SWRConfigContext from "./context/SWRConfigContext";
import Navbar from "./components/Navbar";
import { initializeDB } from "@/lib/serverInit";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Online-BookStore",
    description: "made by MyungWan",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await initializeDB();
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} w-full`}
            >
                <SWRConfigContext>
                    <header>
                        <Navbar />
                    </header>
                    <main className="">{children}</main>
                </SWRConfigContext>
            </body>
        </html>
    );
}
