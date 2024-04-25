import { useQuery } from "@tanstack/react-query";
import { getSong } from "../../services/apiSongs";
import { useParams } from "react-router-dom";

function LyricsContent() {
  const { id: songId } = useParams();
  const { isLoading, data: song } = useQuery({
    queryKey: ["song", songId],
    queryFn: () => getSong(songId),
  });

  console.log(song);

  if (isLoading) return <p>Loading</p>;

  return (
    <div className="pl-4 min-h-screen sm:w-[540px] w-[24rem] md:w-[720px]">
      <div className="mt-4 font-semibold">{song[0].title}</div>
      <div className="mt-1 pb-12">
        {song[0].artists.name ? song[0].artists.name : "Unknown"}
      </div>
      {song.map((song) => (
        <div key={song.id} className="mt-4">
          {song.lyrics ? (
            <p
              className="items-center"
              dangerouslySetInnerHTML={{ __html: song.lyrics }}
            ></p>
          ) : (
            "No lyrics found"
          )}
        </div>
      ))}
    </div>
  );
}

export default LyricsContent;
