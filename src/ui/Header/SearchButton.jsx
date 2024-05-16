import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { searchLyrics, searchArtists, searchSongTitles, searchAll } from "@/db/apiSearch";

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
  const [titleSearch, setTitleSearch] = useState([]);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchTerm = useDebounce(searchText, 1000);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch(debouncedSearchTerm);
    } else {
      setActiveSearch([]);
    }
  }, [debouncedSearchTerm]);

  const handleSearch = async (value) => {
    if (!value) {
      setActiveSearch([]);
      setTitleSearch([]);
      return;
    }
    setIsLoading(true);
    try {
      const data = await searchAll(value);

      const lyricsData = await searchLyrics(value);
      const artistData = await searchArtists(value);
      const titleData = await searchSongTitles(value);

      setActiveSearch([...lyricsData, ...artistData, ...data.lyrics]);
      setTitleSearch(titleData);

      if (!lyricsData || !artistData || !data.lyrics) {
        console.error("Error fetching data");
        return;
      }
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
            <DialogTitle>Search</DialogTitle>
            <DialogDescription>
              Search for artists, songs or lyrics
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
              <div className="cursor-pointer absolute p-4 top-36 z-20 bg-neutral-100 text-slate-600 w-full rounded-xl flex flex-col gap-2">
                Loading...
              </div>
            ) : searchText && activeSearch.length === 0 ? (
              <div className="cursor-pointer absolute p-4 top-36 z-20 bg-neutral-100 text-slate-600 w-full rounded-xl flex flex-col gap-2">
                No results found
              </div>
            ) : (
              activeSearch.length > 0 && (
                <div className="cursor-pointer absolute p-4 top-36 z-20 bg-neutral-100 text-slate-600 w-full rounded-xl flex flex-col gap-2 ">
                  {/* Artists */}
                  {activeSearch.some((item) => item.name) && (
                    <>
                      <div className="flex gap-1 flex-col justify-between bg-neutral-200 p-1 rounded-xl">
                        {activeSearch
                          .filter((item) => item.name)
                          .map((artist, index) => {
                            if (
                              artist.name
                                .toLowerCase()
                                .includes(searchText.toLowerCase())
                            ) {
                              return (
                                <div
                                  key={index}
                                  className="flex justify-between hover:bg-neutral-300 rounded-lg px-3 py-2"
                                >
                                  <h3>{artist.name}</h3>
                                  <h2 className="bg-primary text-secondary rounded-full px-2">
                                    Artist
                                  </h2>
                                </div>
                              );
                            }
                            return null;
                          })}
                      </div>
                    </>
                  )}

                  {/* Song Titles */}
                  {titleSearch.some((item) => item.title) && (
                    <>
                      <div className="ml-2">
                        <>
                          Found{" "}
                          <span className="font-bold">
                            {titleSearch.filter((item) => item.title).length}
                          </span>{" "}
                          matching Song Title
                          {titleSearch.filter((item) => item.title).length > 1
                            ? "s"
                            : ""}
                        </>
                      </div>
                      <div className="flex flex-col gap-2 p-1 bg-neutral-200 rounded-xl justify-center">
                        {titleSearch
                          .filter((item) => item.title)
                          .map((song, index) => {
                            if (
                              song.title
                                .toLowerCase()
                                .includes(searchText.toLowerCase())
                            ) {
                              return (
                                <div
                                  key={index}
                                  className="flex hover:bg-neutral-300 items-center gap-1 rounded-lg px-3 py-2"
                                >
                                  <span className="font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    {song.title}
                                  </span>
                                  <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    - {song.artist_name}
                                  </span>
                                </div>
                              );
                            }
                            return null;
                          })}
                      </div>
                    </>
                  )}

                  {/* Lyrics */}
                  {activeSearch.some((item) => item.title) && (
                    <>
                      <div className="ml-2">
                        Found{" "}
                        <span className="font-bold">
                          {activeSearch.filter((item) => item.title).length}
                        </span>{" "}
                        matching Lyrics
                      </div>
                      <div className="flex flex-col gap-2 p-1 bg-neutral-200 rounded-xl justify-center">
                        {activeSearch
                          .filter((item) => item.title)
                          .map((song) => {
                            const [line, nextLine] = findMatchingLine(
                              song.lyrics,
                              searchText
                            );

                            console.log("song.title:", song.title);
                            console.log("searchText:", searchText);
                            console.log("line:", line);
                            console.log("nextLine:", nextLine);

                            if (
                              song.title
                                .toLowerCase()
                                .includes(searchText.toLowerCase()) ||
                              (line)
                            ) {
                              return (
                                <div
                                  key={song.id}
                                  className="grid grid-cols-1 items-center hover:bg-neutral-300 rounded-lg pt-2 px-3"
                                >
                                  <p className="font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    {line && <span>{line}</span>}
                                    {/* {nextLine && <span> {nextLine}</span>} */}
                                  </p>
                                  <h3 className="overflow-hidden overflow-ellipsis whitespace-nowrap font-light text-sm mb-2">
                                    {song?.title} - {song?.artist_name}
                                  </h3>
                                </div>
                              );
                            }
                            return null;
                          })}
                      </div>
                    </>
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
