"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFoundPage() {
    const pathname = usePathname(); // 현재 URL 가져오기

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-gray-800 ">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mt-2">
                페이지를 찾을 수 없습니다.
            </h2>
            <p className="text-gray-600  mt-4">
                <span className="font-mono bg-gray-200 px-2 py-1 rounded-md">
                    {pathname}
                </span>{" "}
                페이지가 존재하지 않거나 이동되었습니다.
            </p>
            <Link
                href="/"
                className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
                홈으로 돌아가기
            </Link>
        </section>
    );
}
