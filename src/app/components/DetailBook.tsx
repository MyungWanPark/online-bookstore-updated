"use client";

import { Book } from "@/model/book";
import Image from "next/image";
import StarRating from "./ui/StarRating";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { useParams, useRouter } from "next/navigation";

export default function DetailBook() {
    const { id } = useParams();
    const router = useRouter();

    const { data: book, isLoading } = useSWR<Book>(`/api/books/${id}`);
    const [isEditing, setIsEditing] = useState(false);
    const [editedBook, setEditedBook] = useState<Book | null>(null);

    useEffect(() => {
        if (book) {
            setEditedBook(book);
        }
    }, [book]);

    if (isLoading) return <div>로딩 중...</div>;
    if (!book || !editedBook) return <div>책 정보를 찾을 수 없습니다.</div>;

    const {
        imageUrl,
        title,
        price,
        quantity,
        author,
        genre,
        content,
        rate,
        publisher,
    } = book;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setEditedBook((prev) => (prev ? { ...prev, [name]: value } : prev));
    };

    const handleSave = async () => {
        const res = await fetch(`/api/books/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedBook),
        });

        if (res.ok) {
            const updatedBook = await res.json();
            mutate(`/api/books/${id}`, updatedBook, false);
            mutate("/api/books");
            setIsEditing(false);
        }
    };

    const handleDelete = async () => {
        const res = await fetch(`/api/books/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            alert("책이 정상적으로 삭제되었습니다.");
            mutate("/api/books");
            router.push("/");
        } else {
            alert("삭제에 실패했습니다.");
        }
    };

    const INPUT_CSS = "p-1 outline-none border border-gray-300 rounded";

    return (
        <section className="flex p-4">
            {isLoading && <div>로딩 중입니다...</div>}
            {book && (
                <div className="grid md:grid-cols-2 place-items-center gap-5 md:gap-2">
                    <div className="">
                        <Image
                            src={imageUrl}
                            alt={title}
                            width={500}
                            height={800}
                            className="rounded-lg object-cover h-full"
                        />
                    </div>
                    <div className="">
                        <p className="flex items-center">
                            <span className="mr-2">제목:</span>
                            {!isEditing ? (
                                <h1 className="text-3xl font-bold">{title}</h1>
                            ) : (
                                <input
                                    className="w-1/2 p-2 rounded outline-none border border-gray-300"
                                    value={editedBook.title}
                                    name="title"
                                    onChange={handleChange}
                                />
                            )}
                        </p>

                        <p className="my-2">
                            저자:{" "}
                            {!isEditing ? (
                                <span>{author}</span>
                            ) : (
                                <input
                                    className={`${INPUT_CSS} w-1/5`}
                                    value={editedBook.author}
                                    name="author"
                                    onChange={handleChange}
                                />
                            )}
                            <span> | </span>
                            {!isEditing ? (
                                <span>{publisher}</span>
                            ) : (
                                <input
                                    className={`${INPUT_CSS} w-1/5`}
                                    value={editedBook.publisher}
                                    name="publisher"
                                    onChange={handleChange}
                                />
                            )}
                            <span> | </span>
                            장르:{" "}
                            {!isEditing ? (
                                <span>{genre}</span>
                            ) : (
                                <input
                                    className={`${INPUT_CSS} w-1/5`}
                                    value={editedBook.genre}
                                    name="genre"
                                    onChange={handleChange}
                                />
                            )}
                        </p>
                        <div className="flex items-center my-1">
                            <StarRating rate={rate} />
                            {!isEditing ? (
                                <span className="ml-2 relative top-[2px]">
                                    {rate}
                                </span>
                            ) : (
                                <input
                                    className={`${INPUT_CSS} w-5 relative top-[2px] py-[1px]`}
                                    value={editedBook.rate}
                                    name="rate"
                                    onChange={handleChange}
                                />
                            )}
                            <span className="relative top-[2px]">점</span>
                        </div>
                        <div>
                            <p>
                                <span>정가: </span>
                                {!isEditing ? (
                                    <span>{price}</span>
                                ) : (
                                    <input
                                        className={`${INPUT_CSS} w-[10%] py-[1px]`}
                                        value={editedBook.price}
                                        name="price"
                                        onChange={handleChange}
                                    />
                                )}
                                <span>원</span>
                            </p>
                            <p>
                                <span>판매가: </span>
                                <span>{price * 0.9}</span>원
                                <span>(10% 할인)</span>
                            </p>
                            <p>
                                <span>재고: </span>
                                {!isEditing ? (
                                    <span>{quantity}</span>
                                ) : (
                                    <input
                                        className={`${INPUT_CSS} w-[5%] py-[1px]`}
                                        value={editedBook.quantity}
                                        name="quantity"
                                        onChange={handleChange}
                                    />
                                )}
                                <span>권</span>
                            </p>
                        </div>
                        <div>
                            <span>줄거리:</span>
                            {!isEditing ? (
                                <p>{content}</p>
                            ) : (
                                <textarea
                                    className={`${INPUT_CSS} w-full border p-1 rounded h-20`}
                                    value={editedBook.content}
                                    name="content"
                                    onChange={handleChange}
                                />
                            )}
                        </div>
                        <button
                            className="bg-blue-500 p-2 text-white rounded"
                            onClick={
                                !isEditing
                                    ? () => setIsEditing(true)
                                    : () => setIsEditing(false)
                            }
                        >
                            {!isEditing ? "수정" : "취소"}
                        </button>
                        {isEditing && (
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 p-2 text-white rounded ml-2"
                            >
                                저장
                            </button>
                        )}
                        {!isEditing && (
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 p-2 text-white rounded ml-2"
                            >
                                삭제
                            </button>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
