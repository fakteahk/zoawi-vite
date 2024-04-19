import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSongOfArtist } from "../../services/apiSongs";

function ArtistSongs() {
  const { id: artistId } = useParams();
  const { isLoading, data: songs } = useQuery({
    queryKey: ["songs", artistId],
    queryFn: () => getSongOfArtist(artistId),
  });

  if (isLoading) return <p>Loading</p>;

  return (
    <div>
      <div className="flex flex-col items-center justify-center text-xl mb-4">
        {songs[0].artists.image_url && (
          <img
            src={songs[0].artists.image_url}
            alt={songs[0].artists.name}
            className=" w-80 h-48 rounded-xl object-cover"
          />
        )}
        <div className="pt-4">{songs[0].artists.name}</div>
      </div>
      <div className="grid sm:grid-cols-2 gap-2 p-2 min-w-96">
        {songs.map((song) => (
          <div
            key={song.id}
            className="bg-teal-900/10 p-4 rounded-sm shadow-md font-atkinson text-lg sm:flex sm:space-x-1"
          >
            <Link to={`/songs/${song.id}`}>
            <p className="">{song.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtistSongs;
