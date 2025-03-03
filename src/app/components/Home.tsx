"use client";

import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import BookCards from "./BookCards";
import PaginationButtons from "./PaginationButtons";

function getPaginaionButtons(currentPage: number, totalPages: number) {
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = startPage + maxButtons - 1;

    // 1,2 페이지에서는 1,2,3,4,5 표시
    if (currentPage <= Math.ceil(maxButtons / 2)) {
        startPage = 1;
        endPage = Math.min(totalPages, maxButtons);
    }

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxButtons + 1);
    }

    // 필요한 페이지 버튼의 숫자 배열을 리턴
    return Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
    );
}

export default function Home() {
    const searchParams = useSearchParams();
    const keyword = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const { data, isLoading, error } = useSWR(
        `/api/books?page=${page}&q=${keyword}`
    );

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>데이터를 불러오는 중 오류 발생</div>;

    const { totalPages } = data;
    const { books } = data;

    const PaginationButtonArr = getPaginaionButtons(page, totalPages);

    return (
        <div className="container mx-auto p-4">
            <BookCards books={books} />
            <PaginationButtons
                totalPages={totalPages}
                PaginationButtonArr={PaginationButtonArr}
            />
            {books.length === 0 && (
                <div>{keyword}에 대한 검색 결과가 없습니다.</div>
            )}
        </div>
    );
}
