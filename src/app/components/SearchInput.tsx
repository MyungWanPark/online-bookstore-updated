"use client";

import { Book } from "@/model/book";
import { useEffect, useState } from "react";
import useSWR from "swr";
import KeywordResult from "./KeywordResult";
import { useRouter, useSearchParams } from "next/navigation";
import { CiSearch } from "react-icons/ci";

export default function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [input, setInput] = useState(searchParams.get("q") || "");
    const [books, setBooks] = useState<Book[]>([]);
    const { data: realTimeData } = useSWR(
        input.length > 0 ? `/api/search?q=${input}` : null
    );

    useEffect(() => {
        if (input.length === 0) {
            setBooks([]);
            return;
        }
        if (realTimeData && realTimeData.books) {
            setBooks(realTimeData.books);
            return;
        }
    }, [realTimeData, input.length]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInput(e.target.value);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        setBooks([]);
        router.push(`/?q=${input}`);
    };

    return (
        <section className="relative">
            <form onSubmit={handleSearch} className="flex items-center">
                <input
                    type="text"
                    value={input}
                    onChange={handleInput}
                    placeholder="please type here..."
                    className="w-full px-4 py-2  rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-300"
                />
                <button
                    type="submit"
                    className="px-4 py-3 bg-blue-500 text-white rounded-r-md"
                >
                    <CiSearch />
                </button>
            </form>
            {books && books.length > 0 && (
                <KeywordResult books={books} setBooks={setBooks} />
            )}
        </section>
    );
}
