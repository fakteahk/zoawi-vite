import { useState, useEffect, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

import { getArtists } from "../../db/apiArtists";
import ArtistCard from "./ArtistCard";
import { LiaArrowUpSolid } from "react-icons/lia";

export default function ArtistTable() {
  const itemsPerPage = 12;
  const navigate = useNavigate();

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery(
      ["artists"],
      ({ pageParam = 1 }) => getArtists(pageParam, itemsPerPage),
      {
        getNextPageParam: (lastPage, pages) =>
          lastPage.length ? pages.length + 1 : undefined,
      }
    );

  const [showScrollButton, setShowScrollButton] = useState(false);

  const checkScrollTop = useCallback(() => {
    if (!showScrollButton && window.scrollY > 400) {
      setShowScrollButton(true);
    } else if (showScrollButton && window.scrollY <= 400) {
      setShowScrollButton(false);
    }
  }, [showScrollButton]);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [checkScrollTop]);

  const scrollToTop = (event) => {
    event.stopPropagation();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <p>Loading</p>;

  return (
    <div className="relative">
      <InfiniteScroll
        className="sm:max-w-[960px] gap-4 min-w-96 grid grid-cols-2 md:grid-cols-4 px-4"
        dataLength={data?.pages.flatMap((page) => page).length || 0}
        next={fetchNextPage}
        hasMore={hasNextPage || false}
        loader={<h4>Loading...</h4>}
      >
        {data?.pages.flatMap((page) =>
          page.map((artist) => (
            <div
              onClick={() => {      
                navigate(`/artists/${artist.name}`, {
                  state: {
                    imageUrl: artist.image_url,
                    artistName: artist.name,
                  },
                });
              }}
              key={artist.id}
            >
              <ArtistCard imgSrc={artist.image_url}>
                <p className="">{artist.name}</p>
              </ArtistCard>
            </div>
          ))
        )}
      </InfiniteScroll>
      {!hasNextPage && (
        <p className="text-center mt-4">
          <b>Yay! You have seen it all</b>
        </p>
      )}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full hover:scale-110 transition-all duration-300 ease-in-out"
        >
          <LiaArrowUpSolid size={32} />
        </button>
      )}
    </div>
  );
}
