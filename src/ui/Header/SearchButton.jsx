import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { searchArtists, searchSongsAndLyrics } from "@/db/apiSearch";
import { Link } from "react-router-dom";

import { ColorRing } from "react-loader-spinner";

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
  return index !== -1 ? [lines[index]] : [null];
}

//? SEARCH BUTTON
//? SEARCH BUTTON
//? SEARCH BUTTON
function SearchButton() {
  const [activeSearch, setActiveSearch] = useState([]);
  const [titleSearch, setTitleSearch] = useState([]);
  const [lyricsSearch, setLyricsSearch] = useState([]);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchTerm = useDebounce(searchText, 250);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setActiveSearch([]);
  };

  const handleSearch = async (value) => {
    if (!value) {
      setActiveSearch([]);
      setTitleSearch([]);
      setLyricsSearch([]);
      return;
    }
    setIsSearching(true);

    try {
      const data = await searchSongsAndLyrics(value);
      const artistData = await searchArtists(value);

      setActiveSearch([...artistData, ...data.lyrics]);
      setTitleSearch(data.songTitles);
      setLyricsSearch(data.lyrics);

      console.log(activeSearch);

      if (!artistData || !data.lyrics || !data.songTitles) {
        console.error("Error fetching data");
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    setIsSearching(searchText !== "");
  }, [searchText]);

  //?DEBOUNCE STUFF
  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch(debouncedSearchTerm);
    } else {
      setActiveSearch([]);
    }
  }, [debouncedSearchTerm]);

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
      <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
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

            {isSearching ? (
              <div className="cursor-pointer absolute p-4 top-36 z-20 bg-neutral-100 text-slate-600 w-full rounded-xl flex items-center justify-center gap-2">
                <div className="p-1">
                  <ColorRing
                    visible={true}
                    height="40"
                    width="40"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                </div>
              </div>
            ) : searchText === 0 ? (
              <div className="cursor-pointer absolute p-4 top-36 z-20 bg-neutral-100 text-slate-600 w-full rounded-xl flex flex-col gap-2">
                No results found
              </div>
            ) : (
              !isSearching &&
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
                                <DialogClose asChild key={index}>
                                  <Link
                                    to={`/artists/${artist.name}`}
                                    onClick={handleClick}
                                  >
                                    <div
                                      key={index}
                                      className="flex justify-between hover:bg-neutral-300 rounded-lg px-3 py-2"
                                    >
                                      <h3>{artist.name}</h3>

                                      <h2 className="bg-primary text-secondary rounded-full px-2">
                                        Artist
                                      </h2>
                                    </div>
                                  </Link>
                                </DialogClose>
                              );
                            }
                            return null;
                          })}
                      </div>
                    </>
                  )}

                  {(titleSearch.some((item) => item.title) || lyricsSearch.length > 0) && (
                    <div className="ml-2">
                      <>
                        Found{" "}
                        <span className="font-bold">
                          {titleSearch.filter((item) => item.title).length +
                            lyricsSearch.length}
                        </span>{" "}
                        result
                        {titleSearch.filter((item) => item.title).length +
                          lyricsSearch.length >
                        1
                          ? "s"
                          : ""}
                      </>
                    </div>
                  )}

                  {/* Song Titles */}
                  {titleSearch.some((item) => item.title) && (
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
                              <DialogClose asChild key={index}>
                                <Link
                                  to={`/artists/${song.artist_name}/${song.title}`}
                                  onClick={handleClick}
                                >
                                  <div className="flex justify-between hover:bg-neutral-300 items-center gap-1 rounded-lg px-3 py-2">
                                    <div className="flex flex-wrap">
                                      <span className="font-semibold mr-1">
                                        <h3>{song.title}</h3>
                                      </span>{" "}
                                      <span className="">
                                        - {song.artist_name}
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              </DialogClose>
                            );
                          }
                          return null;
                        })}
                    </div>
                  )}

                  {lyricsSearch.length > 0 && (
                    <div className="flex flex-col gap-2 p-1 bg-neutral-200 rounded-xl justify-center">
                      {activeSearch
                        .filter((item) => item.title)
                        .map((song) => {
                          const [line] = findMatchingLine(
                            song.lyrics,
                            searchText
                          );

                          console.log("song.title:", song.title);
                          console.log("searchText:", searchText);
                          console.log("line:", line);

                          if (
                            line &&
                            line
                              .toLowerCase()
                              .includes(searchText.toLowerCase())
                          ) {
                            return (
                              <>
                                <div className="flex flex-col gap-2 p-1 bg-neutral-200 rounded-xl justify-center">
                                  <div
                                    key={song.id}
                                    className="grid grid-cols-1 items-center hover:bg-neutral-300 rounded-lg pt-2 px-3"
                                  >
                                    <DialogClose asChild>
                                      <Link
                                        to={`/artists/${song.artist_name}/${song.title}`}
                                        onClick={handleClick}
                                      >
                                        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                                          {line && <span>{line}</span>}...
                                        </p>
                                        <h3 className="overflow-hidden overflow-ellipsis whitespace-nowrap font-semibold text-sm mt-2 mb-2">
                                          {song?.title} - {song?.artist_name}
                                        </h3>
                                      </Link>
                                    </DialogClose>
                                  </div>
                                </div>
                              </>
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
