import { useQuery } from "@tanstack/react-query";
import { getSong } from "../../db/apiSongs";
import { useNavigate, useParams } from "react-router-dom";

import { Skeleton } from "@/components/ui/skeleton";
import SimiliarSongOfArtist from "./SimilarSongsOfArtist";

function LyricsContent() {
  const navigate = useNavigate();
  const { title } = useParams();
  const { isLoading, data: song } = useQuery({
    queryKey: ["song", title],
    queryFn: () => getSong(title),
  });

  console.log(song);

  if (isLoading) {
    return (
      <div className="pl-4 sm:w-[540px] w-[24rem] md:w-[720px]">
        <div className="flex flex-col">
          <div className="space-y-2 mt-5">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[160px]" />
          </div>

          <div className="space-y-2 pt-24">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="pl-4 min-h-48 sm:w-[540px] w-[24rem] md:w-[720px]">
        <div className="mt-4 font-semibold">{song[0].title}</div>
        <div className="mt-1 pb-12 ">
          <span
            className="cursor-pointer hover:text-muted-foreground inline-block"
            onClick={() => navigate(`/artists/${song[0].artist_name}`)}
          >
            {isLoading ? (
              <Skeleton height="20px" width="100%" />
            ) : song[0].artist_name ? (
              song[0].artist_name
            ) : (
              "Unknown"
            )}
          </span>
        </div>
        <div className="mt-4">
          {song[0].lyrics ? (
            <p
              className="items-center"
              dangerouslySetInnerHTML={{ __html: song[0].lyrics }}
            ></p>
          ) : (
            <p>No lyrics found</p>
          )}
        </div>
      </div>
      <SimiliarSongOfArtist song_id={song[0].song_id} />
    </>
  );
}

export default LyricsContent;
