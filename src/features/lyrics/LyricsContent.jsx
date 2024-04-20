import { useQuery } from "@tanstack/react-query";
import { getLyrics } from "../../services/apiLyrics";
import { useParams } from "react-router-dom";

function LyricsContent() {
  const { id: songId } = useParams();
  const { isLoading, data: lyrics } = useQuery({
    queryKey: ["lyrics", songId],
    queryFn: () => getLyrics(songId),
  });

  console.log(lyrics);

  if (isLoading) return <p>Loading</p>;

  return (
    <div>
      <div className="pt-4">{lyrics[0].songs.artists.name}</div>
      <div className="pt-4">{lyrics[0].songs.title}</div>
      {lyrics.map((lyrics) => (
        <div key={lyrics.id} className="p-4">
          <p>{lyrics.lyrics}</p>
        </div>
      ))}
    </div>
  );
}

export default LyricsContent;
