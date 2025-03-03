import { getBooksWithPagination } from "@/service/book";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const keyword = searchParams.get("q") || "";
    const perPage = 10;
    const { books, totalPages } = await getBooksWithPagination(
        page,
        perPage,
        keyword
    );

    return NextResponse.json({
        books,
        totalPages,
    });
}
