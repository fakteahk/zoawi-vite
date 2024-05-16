import { useQuery } from "@tanstack/react-query";
import { getSong } from "../../db/apiSongs";
import { useNavigate, useParams } from "react-router-dom";

function LyricsContent() {
  const navigate = useNavigate();
  const { title, artist_name } = useParams();
  const { isLoading, data: song } = useQuery({
    queryKey: ["song", title],
    queryFn: () => getSong(title),
  });

  console.log(song);

  if (isLoading) return <p>Loading</p>;

  return (
    <div className="pl-4 min-h-screen sm:w-[540px] w-[24rem] md:w-[720px]">
      <div className="mt-4 font-semibold">{song[0].title}</div>
      <div className="mt-1 pb-12 ">
          <span
            className="cursor-pointer hover:text-muted-foreground inline-block"
            onClick={() => navigate(`/artists/${song[0].artist_name}`)}
          >
            {song[0].artist_name ? song[0].artist_name : "Unknown"}
          </span>
      </div>
      <div className="mt-4">
        {song[0].lyrics ? (
          <p
            className="items-center"
            dangerouslySetInnerHTML={{ __html: song[0].lyrics }}
          ></p>
        ) : (
          "No lyrics found"
        )}
      </div>
    </div>
  );
}

export default LyricsContent;
