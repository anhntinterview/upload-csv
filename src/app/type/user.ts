export interface IUser {
    postId: string;
    id: string;
    name: string;
    email: string;
    body: string;
}
export type ResponseUserType = {
    users: IUser[];
    page: number;
    total_pages: 100;
};

export type ErrorResponseType = {
    message: string;
};

export type ResponseSearchType = {
    success: boolean;
    message?: string;
    result?: IUser[];
};