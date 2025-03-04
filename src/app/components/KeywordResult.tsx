import { Book } from "@/model/book";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

type Props = {
    books: Book[];
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function KeywordResult({ books, setIsOpen }: Props) {
    const router = useRouter();

    const handleClick = (id: number) => {
        setIsOpen(false);
        router.push(`/book/${id}`);
    };
    return (
        <ul className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
            {books.map((book: Book) => (
                <li key={book.id} className="border-b last:border-none">
                    <button
                        onClick={() => handleClick(book.id)}
                        className="block w-full px-4 py-2 hover:bg-gray-100 whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                        <span className="font-semibold mr-2">{book.title}</span>
                        <span className="text-gray-500">{book.author}</span>
                    </button>
                </li>
            ))}
        </ul>
    );
}
