import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSimliarSongOfArtist } from "../../db/apiSongs";
import { LiaArrowLeftSolid } from "react-icons/lia";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

function SimiliarSongOfArtist({song_id}) {
  const navigate = useNavigate();

  const { artistName } = useParams();
  const { isLoading, data: songs } = useQuery({
    queryKey: ["songs", artistName, song_id],
    queryFn: () => getSimliarSongOfArtist(artistName, song_id),
  });

    useEffect(() => {
    window.scrollTo(0, 0);
  }, [artistName, song_id]);

  if (isLoading)
    return (
      <div className="pt-24">
        <div className="grid md:grid-cols-3 gap-2 p-2 min-w-96 px-4">
          <Skeleton className="h-14 w-[95%]"></Skeleton>
          <Skeleton className="h-14 w-[95%]"></Skeleton>
          <Skeleton className="h-14 w-[95%]"></Skeleton>
        </div>
      </div>
    );

  if (!songs || songs.length === 0) {
    return null;
  }

  return (
    <div className="pt-24">
      <p className="pl-4 uppercase">Other songs by <span className="font-bold">{songs[0].artist_name}</span></p>
      <div className="grid md:grid-cols-3 gap-2 p-2 min-w-96 px-4">
        {songs.map((song) => (
          <Link
            to={`/artists/${encodeURIComponent(
              song.artist_name
            )}/${encodeURIComponent(song.title)}`}
            key={song.song_id}
          >
            <div className="bg-secondary/30 p-2    sm:flex bg-white hover:bg-card hover:ring-2 hover:ring-gray-200 cursor-pointer rounded-sm shadow-sm border-2 border-primary/20 border-dashed  text-lg sm:space-x-1 mb-2">
              <p className="">{song.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SimiliarSongOfArtist;
