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
    let url = `/api/search?term=${searchTerm}`;
    return useQuery<ResponseSearchType, ErrorResponseType>(
        ["search", { searchTerm }],
        () => fetch(url).then((res) => res.json()),
        { keepPreviousData: true, staleTime: 5 * 60 * 1000 }
    );
}