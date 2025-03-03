import { getBookCount, getBooks } from "@/APIs/book";

export async function getBooksWithPagination(
    page: number,
    perPage = 10,
    keyword?: string
) {
    const whereCondition = keyword
        ? {
              OR: [
                  { title: { contains: keyword, mode: "insensitive" } },
                  { author: { contains: keyword, mode: "insensitive" } },
              ],
          }
        : {};

    const numOfBooks = await getBookCount(whereCondition);
    const totalPages = Math.ceil(numOfBooks / perPage);

    const books = await getBooks({
        where: whereCondition,
        skip: (page - 1) * perPage,
        take: perPage,
    });

    return { books, totalPages };
}
