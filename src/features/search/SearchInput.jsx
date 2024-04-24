const SearchInput = ({
    value,
    onChange,
    onKeyDown,
    inputRef,
    placeholder = "Search products",
}) => {
    return (
        <input
            type="text"
            className="px-4 py-1 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:border-blue-500"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            ref={inputRef}
            placeholder={placeholder}
        />
    );
};

export default SearchInput;