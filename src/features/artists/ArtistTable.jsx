import { useQuery } from "@tanstack/react-query";
import { getArtists } from "../../services/apiArtists";
import { Link } from "react-router-dom";

function ArtistTable() {
  const { isLoading, data: artist } = useQuery({
    queryKey: ["artist"],
    queryFn: getArtists,
  });

  if (isLoading) return <p>Loading</p>;

  return (
    <div className="sm:max-w-[960px] gap-2 min-w-96 grid grid-rows-10">
      {artist.map((artist) => (
        <div
          key={artist.id}
          className="bg-secondary/30 hover:bg-secondary cursor-pointer p-4 rounded-sm shadow-md font-atkinson text-lg"
        >
          <Link to={`/artists/${artist.id}`}>
            <p>{artist.name}</p>
            <p>{artist.genre}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ArtistTable;
