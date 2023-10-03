"use client";
import * as React from "react";
import { ResponseSearchType } from "../type/user";

interface IPaginationProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    availablePages: number[];
    setSearchResult: React.Dispatch<
        React.SetStateAction<ResponseSearchType | undefined>
    >;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Pagination: React.FunctionComponent<IPaginationProps> = ({
    page,
    setPage,
    availablePages,
    setSearchResult,
    setSearchTerm,
}) => {
    function handlePageChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSearchTerm("");
        setSearchResult(undefined);
        setPage(parseInt(event.target.value));
    }

    return (
        <>
            <select id="filter-page" value={page} onChange={handlePageChange}>
                {availablePages.map((pageNum) => (
                    <option key={pageNum} value={pageNum}>
                        {pageNum}
                    </option>
                ))}
            </select>
        </>
    );
};

export default Pagination;
