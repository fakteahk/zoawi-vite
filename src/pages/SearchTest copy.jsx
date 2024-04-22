import { useMemo, useRef, useState } from "react";

function SearchTest() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const inputRef = useRef();

  const filteredItems = useMemo(() => items.filter((item) => {
    return item.toLowerCase().includes(query.toLowerCase())}
  ), [query, items]);

  function onSubmit(e) {
    e.preventDefault();
    const value = inputRef.current.value;
    if (value === "") return;
    setItems((prev) => {
      return [...prev, value];
    });
    inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col gap-10 text-2xl">
      <div className="flex gap-2">
        Search here:
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
        />
      </div>
      <form onSubmit={onSubmit} className="flex">
        New Item: <input ref={inputRef} type="text" />
        <button type="submit" className="ml-12 bg-blue-300 px-2 py-1">
          add
        </button>
      </form>
      <h3 className="">items</h3>
      {filteredItems.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
}

export default SearchTest;
