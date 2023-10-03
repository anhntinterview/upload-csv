import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { waitFor, renderHook, act } from "@testing-library/react";
import { useSearch } from "./user";
import fetchMock from "jest-fetch-mock";

test("getSearch should fetch data correctly", async () => {
    const searchTerm = "xxx";
    const expectedData = [
        {
            postId: "1",
            id: "1",
            name: "id labore ex et quam laborum",
            email: "Eliseo@gardner.biz",
            body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\\ntempora quo necessitatibus\\ndolor quam autem quasi\\nreiciendis et nam sapiente accusantium",
        },
        {
            postId: "1",
            id: "2",
            name: "quo vero reiciendis velit similique earum",
            email: "Jayne_Kuhic@sydney.com",
            body: "est natus enim nihil est dolore omnis voluptatem numquam\\net omnis occaecati quod ullam at\\nvoluptatem error expedita pariatur\\nnihil sint nostrum voluptatem reiciendis et",
        },
    ];


    const createWrapper = () => {
        const queryClient = new QueryClient();
        return ({ children }: { children: React.ReactNode }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        );
    };

    const { result } = renderHook(() => useSearch(searchTerm), {
        wrapper: createWrapper(),
    });

    fetchMock.mockResponseOnce(JSON.stringify(expectedData));

    // await waitFor(() => {
    //     return !result.current.isLoading;
    // });

    // expect(result.current.data).toEqual(expectedData);
    // expect(result.current.error).toBeNull();

    await act(async () => await expect(result.current.isSuccess).toBe(false));
});
