import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import supabase from "@/services/supabase";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

function decodeHtml(html) {
  var doc = new DOMParser().parseFromString(html, "text/html");
  return doc.documentElement.textContent;
}

function findMatchingLine(lyrics, searchText) {
  const decodedLyrics = decodeHtml(lyrics.replace(/<br>/g, "\n"));
  const lines = decodedLyrics.split("\n");
  const index = lines.findIndex((line) =>
    line.toLowerCase().includes(searchText.toLowerCase())
  );
  return index !== -1 ? [lines[index], lines[index + 1]] : [null, null];
}

function SearchButton() {
  const [activeSearch, setActiveSearch] = useState([]);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchTerm = useDebounce(searchText, 250);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      const { data: songData, error: songError } = await supabase
        .from("songs")
        .select("title, lyrics, artist_id(name)")
        .filter("tsv", "fts", value)
        .limit(5);

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
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
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

  return (
    <div className="text-white cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out ">
      <Dialog>
        <DialogTrigger>
          <AiOutlineSearch size={24} />
        </DialogTrigger>
        <DialogContent className="top-20 left-1/2 transform -translate-x-1/2 md:max-w-[50%] rounded-2xl w-[90%]">
          <DialogHeader>
            {/* <DialogTitle>Search</DialogTitle> */}
            <DialogDescription>
              Search for songs or artists
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Search"
              className="border-b-2 border-primary/60 outline-none flex-grow"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />

            {searchText ? (
              <AiOutlineClose
                size={32}
                className="btn bg-primary text-white ml-2 p-1 px-2 rounded-full hover:scale-105 transition-transform ease-in-out duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  setSearchText("");
                }}
              />
            ) : (
              <AiOutlineSearch
                size={32}
                className="btn bg-primary text-white ml-2 p-1 px-2 rounded-full hover:scale-105 transition-transform ease-in-out duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  handleSearch(searchText);
                }}
              />
            )}

            {isLoading ? (
              <div className="cursor-pointer absolute p-4 top-40 z-20 bg-neutral-100 text-slate-600 w-full rounded-xl flex flex-col gap-2">
                Loading...
              </div>
            ) : searchText && activeSearch.length === 0 ? (
              <div className="cursor-pointer absolute p-4 top-40 z-20 bg-neutral-100 text-slate-600 w-full rounded-xl flex flex-col gap-2">
                No songs found
              </div>
            ) : (
              activeSearch.length > 0 && (
                <div className="cursor-pointer absolute p-4 top-32 z-20 bg-neutral-100 text-slate-600 w-full rounded-xl flex flex-col gap-2">
                  {/* Artists */}
                  {activeSearch.some((item) => item.name) && (
                    <div className="flex gap-3 items-center justify-between">
                      {activeSearch
                        .filter((item) => item.name)
                        .map((artist, index) => {
                          if (
                            artist.name
                              .toLowerCase()
                              .includes(searchText.toLowerCase())
                          ) {
                            return (
                              <div key={index}>
                                <h3>{artist.name}</h3>
                              </div>
                            );
                          }
                          return null;
                        })}
                      <h2 className="bg-primary text-secondary rounded-full px-2">
                        Artist
                      </h2>
                    </div>
                  )}
                  {/* Songs */}
                  {activeSearch.some((item) => item.title) && (
                    <div className="flex flex-col gap-3">
                      {activeSearch
                        .filter((item) => item.title)
                        .map((song) => {
                          const [line, nextLine] = findMatchingLine(
                            song.lyrics,
                            searchText
                          );
                          if (
                            song.title
                              .toLowerCase()
                              .includes(searchText.toLowerCase()) ||
                            line ||
                            nextLine
                          ) {
                            return (
                              <div
                                key={song.id}
                                className="border-b border-neutral-500"
                              >
                                <p className="col-span-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
                                  {line && <span>{line}</span>}
                                  {nextLine && <span>{nextLine}</span>}
                                </p>
                                <h3 className="col-span-2 overflow-hidden overflow-ellipsis whitespace-nowrap font-light text-sm mb-2">
                                  {song.title} - {song.artist_id.name}
                                </h3>
                              </div>
                            );
                          }
                          return null;
                        })}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SearchButton;
