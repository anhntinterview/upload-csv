import * as React from "react";

interface ITableProps {
    children: React.ReactNode;
}

const headerTable = ["User id", "Post id", "Name", "Email", "Body"];

const CustomerTable: React.FunctionComponent<ITableProps> = ({ children }) => {
    return (
        <table>
            <thead>
                <tr>
                    {headerTable.map((item, index) => (
                        <th key={index}>{item}</th>
                    ))}
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    );
};

export default CustomerTable;
