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

function decodeHtml(html) {
  var doc = new DOMParser().parseFromString(html, "text/html");
  return doc.documentElement.textContent;
}

function findMatchingLine(lyrics, searchText) {
  const decodedLyrics = decodeHtml(lyrics.replace(/<br>/g, "\n"));
  const lines = decodedLyrics.split("\n");
  const index = lines.findIndex((line) => line.toLowerCase().includes(searchText.toLowerCase()));
  return index !== -1 ? [lines[index], lines[index + 1]] : [null, null];
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

  useEffect(() => {
  handleSearch(searchText);
}, [searchText]);

  const handleSearch = async (value) => {
    const { data: songData, error: songError } = await supabase
      .from("songs")
      .select("title, lyrics, artist_id(name)")
      .filter("tsv", "fts", value)
      .limit(5)

    if (songError) {
      console.error(songError);
      return;
    }

    const { data: artistData, error: artistError } = await supabase
      .from("artists")
      .select("name")
      .filter("tsv", "fts", value);

    if (artistError) {
      console.error(artistError);
      return;
    }

    setActiveSearch([...songData, ...artistData]);
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
           {/* Artists */}
           {activeSearch.some(item => item.name) && (
            <div className="flex gap-2 items-center justify-between">
              
              {activeSearch.filter(item => item.name).map((artist, index) => {
                if (artist.name.toLowerCase().includes(searchText.toLowerCase())) {
                  return (
                    <div key={index}>
                      <h3>{artist.name}</h3>
                    </div>
                  );
                }
                return null;
              })}
              <h2 className="bg-secondary text-primary rounded-full px-2">Artist</h2>
            </div>
          )}  
          {/* Songs */}
          {activeSearch.some(item => item.title) && (
            <div className="flex flex-col gap-2">
              {activeSearch.filter(item => item.title).map((song) => {
                const [line, nextLine] = findMatchingLine(song.lyrics, searchText);
                if (song.title.toLowerCase().includes(searchText.toLowerCase()) || line || nextLine) {
                  return (
                    <div key={song.id} className=" border-b border-neutral-500">
                      <p className="col-span-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
                        {line && <span>{line}</span>}
                        {nextLine && <span>{nextLine}</span>}
                      </p>
                      <h3 className="col-span-2 overflow-hidden overflow-ellipsis whitespace-nowrap">{song.title} - {song.artist_id.name}</h3>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      )}
    </form>
  );
}
