import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSongs, getSongsCount } from "../../db/apiSongs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { deleteSong } from "../../services/apiSongs";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

// import toast from "react-hot-toast";

export default function SongsTable() {
  const { pageNumber } = useParams();
  const [page, setPage] = useState(Number(pageNumber) - 1);
  const itemsPerPage = 10;

  const queryClient = useQueryClient();

  const { isLoading, data: songs } = useQuery(
    ["songs", page],
    () => getSongs(page * itemsPerPage, (page + 1) * itemsPerPage - 1),
    {
      onSuccess: () => {
        // Prefetch the next page
        if (page < totalPages - 1) {
          queryClient.prefetchQuery(["artist", page + 1], () =>
            getSongs((page + 1) * itemsPerPage, (page + 2) * itemsPerPage - 1)
          );
        }

        // Prefetch the previous page
        if (page > 0) {
          queryClient.prefetchQuery(["artist", page - 1], () =>
            getSongs((page - 1) * itemsPerPage, page * itemsPerPage - 1)
          );
        }
      },
    }
  );

  const { isLoading: isCountLoading, data: totalArtists } = useQuery(
    ["artistsCount"],
    getSongsCount
  );

  const totalPages = Math.ceil(totalArtists / itemsPerPage);
  // console.log(totalArtists, totalPages);

  const navigate = useNavigate();

  return (
    <>
      <div className="grid sm:grid-rows-10 gap-2 p-2 min-w-96">
        {isLoading ? (
          <div className="grid sm:grid-rows-10 gap-5 p-2 min-w-96">
            {Array.from({ length: 10 }, (_, i) => (
              <Skeleton
                key={i}
                className="p-4 rounded-sm shadow-sm border-2 border-secondary border-dashed text-lg sm:space-x-1 mb-1"
              >
                <div>
                  <Skeleton className="h-10 w-[250px]" />
                </div>
              </Skeleton>
            ))}
          </div>
        ) : (
          <>
            {songs.map((song) => (
              <SongRow key={song.id} song={song} />
            ))}
          </>
        )}

        <div className="mt-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    const newPage = Math.max(0, page - 1);
                    setPage(newPage);
                    navigate(`/songs/page/${newPage + 1}`);
                  }}
                  className="cursor-pointer"
                />
              </PaginationItem>
              {Array.from({ length: 3 }, (_, i) => {
                const pageNumber =
                  page < 2
                    ? i
                    : page < totalPages - 2
                    ? page - 1 + i
                    : totalPages - 3 + i;
                return (
                  <PaginationItem key={i}>
                    <PaginationLink
                      className={`cursor-pointer px-4 py-2 ${
                        page === pageNumber ? "bg-blue-500 hover:bg-blue-600 text-white" : ""
                      }`}
                      onClick={() => {
                        setPage(pageNumber);
                        navigate(`/songs/page/${pageNumber + 1}`);
                      }}
                    >
                      {pageNumber + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                {page < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    const newPage = Math.min(totalPages - 1, page + 1);
                    setPage(newPage);
                    navigate(`/songs/page/${newPage + 1}`);
                  }}
                  className="cursor-pointer"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}

function SongRow({ song }) {
  // const queryClient = useQueryClient();

  // const { isLoading: isDeleting, mutate } = useMutation(
  //   {
  //     mutationFn: () => deleteSong(songId),
  //     onSuccess: () => {
  //       toast.success("Song deleted");
  //       queryClient.invalidateQueries({
  //         queryKey: ["songs"],
  //       })
  //     },

  //     onError: (error) => {
  //       toast.error(error.message);
  //     },
  //   }
  // )

  return (
    <div
      key={song.song_id}
      className="bg-white hover:bg-card hover:ring-4 hover:ring/20 cursor-pointer p-3 rounded-sm shadow-sm border-2 border-secondary border-dashed  text-lg sm:space-x-1 mb-2"
    >
      <div>
        <Link
          to={`/artists/${encodeURIComponent(
            song.artist_name
          )}/${encodeURIComponent(song.title)}`}
        >
          <p className="font-semibold">{song.title}</p>
          <p className="text-primary">{song.artist_name}</p>
        </Link>
        {/* <button onClick={() => mutate(songId)} disabled={isDeleting}>Delete</button> */}
      </div>
    </div>
  );
}
