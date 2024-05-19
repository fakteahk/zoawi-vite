import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSongOfArtist } from "../../db/apiSongs";
import { LiaArrowLeftSolid } from "react-icons/lia";
import { Skeleton } from "@/components/ui/skeleton";

function ArtistBio() {
  const navigate = useNavigate();
  // const location = useLocation();
  // const imageUrl = location.state?.imageUrl;
  // const artistName = location.state?.artistName;

  const { artistName } = useParams();
  const { isLoading, data: songs } = useQuery({
    queryKey: ["songs", artistName],
    queryFn: () => getSongOfArtist(artistName),
  });

  if (isLoading)
    return (
      <div>
        <div className="flex flex-col items-center justify-center text-xl mb-4">
          <Skeleton className=" w-screen h-72 object-cover transform -translate-y-10 " />
          <Skeleton className="h-6 w-[250px]"></Skeleton>
        </div>
        <div className="grid gap-2 p-2 min-w-96">
          {/* Go back arrow */}
          <div className="mb-4 flex text-sm justify-end">
            <button
              className="flex items-center gap-2 mr-4"
              onClick={(e) => {
                e.preventDefault();
                navigate("/artists");
              }}
            >
              <LiaArrowLeftSolid />
              Go back
            </button>
          </div>
          <Skeleton className="h-14 w-[95%]"></Skeleton>
          <Skeleton className="h-14 w-[95%]"></Skeleton>
          <Skeleton className="h-14 w-[95%]"></Skeleton>
          <Skeleton className="h-14 w-[95%]"></Skeleton>
          <Skeleton className="h-14 w-[95%]"></Skeleton>
        </div>
      </div>
    );

  if (!songs || songs.length === 0) {
    return (
      <div className="flex flex-col min-w-full ">
        <div className="mb-4 flex text-sm justify-end">
          <Link to="/artists" className="flex items-center gap-2 mr-4">
            <LiaArrowLeftSolid />
            Go back
          </Link>
        </div>
        <div className="flex flex-grow items-center justify-center">
          No data found
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center text-xl mb-4">
        {songs[0].image_url && (
          <img
            // src={imageUrl}
            src={songs[0].image_url}
            alt={songs[0].image_url}
            className=" w-screen h-72 object-cover transform -translate-y-10 "
          />
        )}
        <div className="">{artistName}</div>
        {songs[0].bio ? (
          <div className="text-sm mt-2">{songs[0].bio}</div>
        ) : null}
      </div>
      <div className="grid gap-2 p-2 min-w-96 px-4">
        {/* Go back arrow */}
        <div className="mb-4 flex text-sm justify-end">
          <button
            className="flex items-center gap-2 mr-4"
            onClick={(e) => {
              e.preventDefault();
              navigate("/artists");
            }}
          >
            <LiaArrowLeftSolid />
            Go back
          </button>
        </div>
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

export default ArtistBio;
