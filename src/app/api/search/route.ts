import { getAllBooks } from "@/service/book";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.toLowerCase() || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const perPage = 10;
    const totalBooks = await getAllBooks();

    const filteredBooks = totalBooks.filter(
        (book) =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query)
    );

    const totalPages = Math.ceil(filteredBooks.length / perPage);
    const paginatedBooks = filteredBooks.slice(
        (page - 1) * perPage,
        page * perPage
    );
    return NextResponse.json({
        books: paginatedBooks,
        totalPages,
    });
}
