import { getAllBooks } from "@/service/book";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const perPage = 10;
    const books = await getAllBooks();
    const numOfBooks = books.length;
    const totalPages = Math.ceil(numOfBooks / perPage);

    const start = (page - 1) * 10;
    const end = start + perPage;
    const paginatedBooks = books.slice(start, end);

    return NextResponse.json({
        books: paginatedBooks,
        totalPages,
    });
}
