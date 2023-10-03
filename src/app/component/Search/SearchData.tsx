import { IUser, ResponseSearchType } from "@/app/type/user";
import * as React from "react";

interface ISearchInputProps {
    searchResult: ResponseSearchType;
}

const SearchDataComponent: React.FunctionComponent<ISearchInputProps> = ({
    searchResult,
}) => {
    return (
        <>
            {searchResult.result!.map((item: IUser) => (
                <tr key={item.id}>
                    <td>{item.postId}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.body}</td>
                </tr>
            ))}
        </>
    );
};

export default SearchDataComponent;
