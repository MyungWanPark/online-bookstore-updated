"use client";

import Link from "next/link";
import SearchInput from "./SearchInput";
import { AiFillPlusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

const menu = [
    {
        href: "/new",
        icon: <AiOutlinePlusSquare />,
        clickedIcon: <AiFillPlusSquare />,
        title: "추가하기",
    },
];

export default function Navbar() {
    const pathname = usePathname();
    return (
        <div className="flex justify-between items-center px-5 py-3 bg-slate-700 shadow-md">
            <Link href={"/"} className="text-white text-xl font-bold">
                Home
            </Link>
            <Suspense fallback={<p>Loading...</p>}>
                <SearchInput />
            </Suspense>
            <nav>
                <ul className="flex">
                    {menu.map(({ href, icon, clickedIcon, title }) => {
                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    aria-label={title}
                                    className="flex items-center text-white transition-colors duration-300 hover:text-yellow-400"
                                >
                                    {pathname === href ? clickedIcon : icon}
                                    <span className="ml-2">{title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
