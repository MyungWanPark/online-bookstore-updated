import { addBook, getBookCount, getBooks } from "@/APIs/book";
import { Book } from "@/model/book";

export async function getBooksWithPagination(
    page: number,
    perPage = 10,
    keyword?: string
) {
    const whereCondition = keyword
        ? {
              OR: [
                  { title: { contains: keyword } },
                  { author: { contains: keyword } },
              ],
          }
        : {};

    const numOfBooks = await getBookCount(whereCondition);
    const totalPages = Math.ceil(numOfBooks / perPage);

    const books = await getBooks({
        where: whereCondition,
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: { id: "desc" },
    });

    return { books, totalPages };
}

export async function addBookWithImg(bookData: Omit<Book, "id" | "imageUrl">) {
    const count = await getBookCount();
    const imageUrl = `https://picsum.photos/seed/${count + 1}/300/200`;
    const book = await addBook({ ...bookData, imageUrl });
    return book;
}
