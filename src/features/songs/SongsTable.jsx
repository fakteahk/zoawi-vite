import { useQuery } from "@tanstack/react-query";
import { getSongs } from "../../services/apiSongs";

import { Link } from "react-router-dom";

function SongsTable() {
  const { isLoading, data: songs } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongs,
  });

  if (isLoading) return <p>Loading</p>;

  return (
    <div className="grid sm:grid-cols-2 gap-2 p-2 min-w-96">
      {songs.map((song) => (
        <div
          key={song.id}
          className="bg-teal-900/10 p-4 rounded-sm shadow-md font-atkinson text-lg sm:flex sm:space-x-1"
        >
          <Link to={`/songs/${song.id}`}>
            <p className="">{song.title}</p>
            <p>{song.artists.name}</p>
            {song.id}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SongsTable;
