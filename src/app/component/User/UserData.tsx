import { ErrorResponseType, IUser, ResponseSearchType } from "@/app/type/user";
import * as React from "react";
import SearchDataComponent from "../Search/SearchData";

interface IUserDataComponentProps {
    isFetching: boolean;
    users: IUser[];
    searchResult: ResponseSearchType | undefined;
}

const UserDataComponent: React.FunctionComponent<IUserDataComponentProps> = ({
    isFetching,
    users,
    searchResult,
}) => {
    return (
        <>
            {!searchResult || searchResult.success === false ? (
                isFetching ? (
                    <div className="">Post API is failed</div>
                ) : (
                    users.map((item: IUser) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.postId}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.body}</td>
                        </tr>
                    ))
                )
            ) : (
                <SearchDataComponent searchResult={searchResult} />
            )}
        </>
    );
};

export default UserDataComponent;
