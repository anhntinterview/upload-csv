"use client";

import React, { useState, useEffect } from "react";
import { useCallbackDebounce } from "../hook/debounce";
import Pagination from "./Pagination";
import { usePaginationUsers, useSearch } from "../data/user";
import { ResponseSearchType } from "../type/user";
import SearchInputComponent from "./Search/SearchInput";
import UserDataComponent from "./User/UserData";
import CustomerTable from "../template/Table";
import ProgressBar from "./ProgressBar";

const HomeComponent: React.FunctionComponent = () => {
    const [page, setPage] = React.useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [searchResult, setSearchResult] = useState<ResponseSearchType>();
    const [progress, setProgress] = useState(0);

    useCallbackDebounce(searchTerm, 0.5 * 1000, (debounced) => {
        setDebouncedSearch(debounced);
    });

    const { isFetching, data, isError } = useSearch(debouncedSearch);
    useEffect(() => {
        if (isFetching) {
            setSearchResult(undefined);
        } else if (isError) {
            setSearchResult(undefined);
        } else {
            setSearchResult(data);
        }
    }, [debouncedSearch, isFetching, isError]);

    const paginatedUsersApi = usePaginationUsers(page);
    if (paginatedUsersApi.isFetching) {
        return <ProgressBar progress={progress} setProgress={setProgress} />;
    } else if (paginatedUsersApi.isError) {
        return <div className="">{paginatedUsersApi.error.message}</div>;
    }
    const availablePages = Array.from(
        { length: paginatedUsersApi.data!.total_pages },
        (_, index) => index + 1
    );

    return (
        <div>
            <div id="users-container">
                <SearchInputComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
                <Pagination
                    page={page}
                    setPage={setPage}
                    availablePages={availablePages}
                    setSearchResult={setSearchResult}
                    setSearchTerm={setSearchTerm}
                />
                <CustomerTable>
                    <UserDataComponent
                        isFetching={paginatedUsersApi.isFetching}
                        users={paginatedUsersApi.data!.users}
                        searchResult={searchResult}
                    />
                </CustomerTable>
            </div>
        </div>
    );
};

export default HomeComponent;
