import { prisma } from "@/lib/prisma";
import { Book } from "@/model/book";
import { Prisma } from "@prisma/client";

export async function addBook(book: Prisma.BookCreateInput) {
    return await prisma.book.create({ data: book });
}

export async function addManyBooks(books: Prisma.BookCreateManyInput[]) {
    return await prisma.book.createMany({ data: books });
}

export async function getBooks(condition: {}) {
    return await prisma.book.findMany(condition);
}

export async function getBookCount(condition: {}) {
    return await prisma.book.count({ where: condition });
}

export async function getBookById(id: number) {
    return prisma.book.findUnique({ where: { id } });
}

export async function updateBook(id: number, book: Partial<Book>) {
    return await prisma.book.update({ where: { id }, data: book });
}

export async function deleteBook(id: number) {
    return await prisma.book.delete({ where: { id } });
}
