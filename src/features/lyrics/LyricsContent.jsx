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
    <div className="pl-4 h-screen sm:w-[540px] w-[24rem] md:w-[720px]">
      <div className="mt-4 font-semibold">{lyrics[0].songs.title}</div>
      <div className="mt-1 pb-12">{lyrics[0].songs.artists.name}</div>
      {lyrics.map((lyrics) => (
        <div key={lyrics.id} className="mt-4">
          <p className="flex justify-center items-center">{lyrics.lyrics}</p>
        </div>
      ))}
    </div>
  );
}

export default LyricsContent;
