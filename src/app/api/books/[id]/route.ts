import { deleteBookById, getBookById, updateBookById } from "@/service/book";
import { NextRequest, NextResponse } from "next/server";

type Context = {
    params: {
        id: string;
    };
};

export async function GET(request: NextRequest, context: Context) {
    const { id } = context.params;
    const parsedId = parseInt(id, 10);

    return getBookById(parsedId).then((data) => NextResponse.json(data));
}

export async function PUT(request: NextRequest, context: Context) {
    const { id } = context.params;
    const parsedId = parseInt(id, 10);
    const updatedData = await request.json();

    const updatedBook = await updateBookById(parsedId, updatedData);

    return NextResponse.json(updatedBook);
}

export async function DELETE(request: NextRequest, context: Context) {
    const { id } = context.params;
    const parsedId = parseInt(id, 10);

    await deleteBookById(parsedId);

    return NextResponse.json({ message: "책이 정상적으로 삭제되었습니다." });
}
