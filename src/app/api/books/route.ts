import { addBookWithImg, getBooksWithPagination } from "@/service/book";
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

export async function POST(request: NextRequest) {
    const bookData = await request.json();

    try {
        const Book = await addBookWithImg(bookData);
        return NextResponse.json(Book);
    } catch (err) {
        return NextResponse.json(
            { err: `책 등록에 실패하였습니다. 메세지: ${err}` },
            { status: 500 }
        );
    }
}
