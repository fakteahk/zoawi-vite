import { useQuery } from "@tanstack/react-query";
import { getArtists } from "../../services/apiArtists";
import { useNavigate } from "react-router-dom";
import ArtistCard from "./ArtistCard";

function ArtistTable() {
  const { isLoading, data: artist } = useQuery({
    queryKey: ["artist"],
    queryFn: getArtists,
    staleTime: 1000 * 60 * 5,
  });

  const navigate = useNavigate();

  if (isLoading) return <p>Loading</p>;


  return (
    <div className="sm:max-w-[960px] gap-2 min-w-96 grid grid-cols-2 md:grid-cols-4 px-4">
      {artist.map((artist) => (
        <div
          onClick={() =>
            navigate(`/artists/${artist.id}`, {
              state: {
                imageUrl: artist.image_url,
                artistName: artist.name,
                example: "hello,world",
              },
            })
          }
          key={artist.id}
        >
          <ArtistCard imgSrc={artist.image_url}>
            <p className="">{artist.name}</p>
          </ArtistCard>
        </div>
      ))}
    </div>
  );
}

export default ArtistTable;
