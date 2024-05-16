import { useState, useEffect } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import supabase from "../db/supabase";

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
  const debouncedSearchTerm = useDebounce(searchText, 450);

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch(debouncedSearchTerm);
    } else {
      setActiveSearch([]);
    }
  }, [debouncedSearchTerm]);

  const handleSearch = async (value) => {
    console.log("Search term:", value);

    const { data, error } = await supabase
      .rpc("search_lyrics_v3", { search_value: value })
      .limit(2);

    console.log("Data:", data);
    console.log("Error:", error);

    if (error) {
      console.log(error);
      return null;
    }

    console.log(data);
    setActiveSearch(data);
  };

  return (
    <form className="relative w-[90vw]">
      <div className="relative">
        <input
          type="search"
          placeholder="Type Here"
          className="w-full p-4 rounded-xl border"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        {searchText ? (
          <button
            className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-white rounded-full"
            onClick={(e) => {
              e.preventDefault();
              setSearchText("");
            }}
          >
            <AiOutlineClose />
          </button>
        ) : (
          <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-transparent rounded-full">
            <AiOutlineSearch />
          </button>
        )}
      </div>

      {activeSearch.length > 0 && (
        <div className="cursor-pointer absolute p-4 top-16 z-20 bg-primary text-white w-full rounded-xl flex flex-col gap-2">
          {/* Songs */}
          {activeSearch.some((item) => item.lyrics) && (
            <div className="flex flex-col gap-2">
              {activeSearch
                .filter((item) => item.lyrics)
                .map((song) => {
                  return (
                    <div key={song.id} className="border-b border-neutral-500">
                      <h3 className="col-span-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                        {song.lyrics}
                      </h3>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}
    </form>
  );
}
