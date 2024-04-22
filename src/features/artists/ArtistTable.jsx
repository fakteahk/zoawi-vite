import { useQuery } from "@tanstack/react-query";
import { getArtists } from "../../services/apiArtists";
import { NavLink } from "react-router-dom";
import ArtistCard from "./ArtistCard";

function ArtistTable() {
  const { isLoading, data: artist } = useQuery({
    queryKey: ["artist"],
    queryFn: getArtists,
  });

  if (isLoading) return <p>Loading</p>;

  return (
    <div className="sm:max-w-[960px] gap-2 min-w-96 grid grid-cols-2 md:grid-cols-4 px-4">
      {artist.map((artist) => (
        <NavLink to={`/artists/${artist.id}`} key={artist.id}>
          <ArtistCard imgSrc={artist.image_url}>
              <p className="font-atkinson">{artist.name}</p>
          </ArtistCard>
        </NavLink>
      ))}
    </div>
  );
}

export default ArtistTable;
