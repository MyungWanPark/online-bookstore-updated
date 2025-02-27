import { Book } from "@/model/book";
import Image from "next/image";
import Link from "next/link";

type Props = {
    book: Book;
};

export default function BookCard({ book }: Props) {
    return (
        <Link
            href={`/book/${book.id}`}
            className="block rounded-lg shadow-md bg-white overflow-hidden hover:scale-105 transform transition-transform duration-300"
        >
            <Image
                src={book.imageUrl}
                alt={book.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis text-center">
                    {book.title}
                </h3>
                <p className="text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis text-center">
                    {book.author}
                </p>
            </div>
        </Link>
    );
}
