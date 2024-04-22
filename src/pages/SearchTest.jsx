import { useState, useEffect } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import supabase from "../services/supabase";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchTest() {
  const [activeSearch, setActiveSearch] = useState([]);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchTerm = useDebounce(searchText, 250);

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch(debouncedSearchTerm);
    } else {
      setActiveSearch([]);
    }
  }, [debouncedSearchTerm]);

  const handleSearch = async (value) => {
    const { data, error } = await supabase
      .from("artists")
      .select()
      .ilike("name", `%${value}%`)
      .limit(10);

    if (error) {
      console.error(error);
      return;
    }

    setActiveSearch(data);
  };

  return (
    <form className="w-[500px] relative">
      <div className="relative">
        <input
          type="search"
          placeholder="Type Here"
          className="w-full p-4 rounded-xl"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        {searchText ? (
          <button
            className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-background rounded-full"
            onClick={() => setSearchText("")}
          >
            <AiOutlineClose />
          </button>
        ) : (
          <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-background rounded-full">
            <AiOutlineSearch />
          </button>
        )}
      </div>

      {activeSearch.length > 0 && (
        <div className="cursor-pointer absolute top-16 p-4 bg-primary text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
          {activeSearch.map((artist) => (
            <span key={artist.id}>{artist.name}</span>
          ))}
        </div>
      )}
    </form>
  );
}
