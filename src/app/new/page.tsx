"use client";

import { Book } from "@/model/book";
import { FormEvent, useState } from "react";
import NewBookInput from "../components/NewBookInput";
import { useRouter } from "next/navigation";
import { makeDummyData } from "@/util/book";

export default function NewBookPage() {
    const [book, setBook] = useState<Partial<Book>>({
        title: makeDummyData("title") as string,
        author: makeDummyData("author") as string,
        genre: makeDummyData("genre") as string,
        publisher: makeDummyData("publisher") as string,
        rate: makeDummyData("rate") as number,
        price: makeDummyData("price") as number,
        quantity: makeDummyData("quantity") as number,
        content: makeDummyData("content") as string,
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setBook((prev) => (prev ? { ...prev, [name]: value } : prev));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await fetch("/api/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book),
        });

        if (res.ok) {
            alert("책이 성공적으로 등록되었습니다.");
            router.push("/");
        } else {
            alert("책 등록에 실패하였습니다.");
        }
        setIsLoading(false);
    };

    const BOOKINPUTS = [
        {
            title: "제목",
            inputClass: "w-full p-2 border rounded",
            inputName: "title",
            isTextArea: false,
        },
        {
            title: "저자",
            inputClass: "w-full p-2 border rounded",
            inputName: "author",
            isTextArea: false,
        },
        {
            title: "장르",
            inputClass: "w-full p-2 border rounded",
            inputName: "genre",
            isTextArea: false,
        },
        {
            title: "출판사",
            inputClass: "w-full p-2 border rounded",
            inputName: "publisher",
            isTextArea: false,
        },
        {
            title: "평점",
            inputClass: "w-full p-2 border rounded",
            inputName: "rate",
            isTextArea: false,
        },
        {
            title: "가격",
            inputClass: "w-full p-2 border rounded",
            inputName: "price",
            isTextArea: false,
        },
        {
            title: "재고",
            inputClass: "w-full p-2 border rounded",
            inputName: "quantity",
            isTextArea: false,
        },
        {
            title: "내용",
            inputClass: "w-full p-2 border rounded",
            inputName: "content",
            isTextArea: true,
        },
    ];
    return (
        <section>
            <h2 className="font-bold text-center text-xl my-3">
                새로운 책 등록
            </h2>
            <form onSubmit={handleSubmit}>
                {BOOKINPUTS.map(
                    ({ title, inputClass, inputName, isTextArea }, id) => {
                        return (
                            <NewBookInput
                                key={id}
                                title={title}
                                inputClass={inputClass}
                                inputName={inputName}
                                isTextArea={isTextArea}
                                value={book?.[inputName as keyof Book] ?? ""}
                                setValue={handleChange}
                            />
                        );
                    }
                )}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded mt-5"
                >
                    {isLoading ? "등록중" : "등록하기"}
                </button>
            </form>
        </section>
    );
}
