import * as React from "react";

interface ISearchInputProps {
    searchTerm: string;
    setSearchTerm: (value: React.SetStateAction<string>) => void;
}

const SearchInputComponent: React.FunctionComponent<ISearchInputProps> = ({
    searchTerm,
    setSearchTerm,
}) => {
    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
    }
    return (
        <input
            id="filter-search"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Find by postId, id, name, email, or body..."
        />
    );
};

export default SearchInputComponent;
