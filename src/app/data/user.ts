import { useQuery } from "@tanstack/react-query";
import { ErrorResponseType, ResponseUserType, ResponseSearchType } from "../type/user";

export function usePaginationUsers(page: number) {
    const limit = 5;
    let url = `/api/user?_page=${page}&_limit=${limit}`;
    return useQuery<ResponseUserType, ErrorResponseType>({
        queryKey: ["user", { page }],
        queryFn: () => fetch(url).then((res) => res.json()),
        keepPreviousData: true,
    });
}

export function useUsers() {
    let url = `/api/user`;
    return useQuery(["user"], () => fetch(url).then((res) => res.json()));
}

export function useSearch(searchTerm: string) {
    let url = `http://localhost:3000/api/search?term=${searchTerm}`;
    console.log(`----- url:`,url);
    return useQuery<ResponseSearchType, ErrorResponseType>(
        ["search", { searchTerm }],
        () => fetch(url).then((res) => res.json()),
        { keepPreviousData: true, staleTime: 5 * 60 * 1000 }
    );
}