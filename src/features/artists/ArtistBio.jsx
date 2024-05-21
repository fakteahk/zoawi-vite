import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSongOfArtist } from "../../db/apiSongs";
import { LiaArrowLeftSolid } from "react-icons/lia";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  console.log(songs);

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
    <div className="md:flex justify-center items-center mx-auto">
      <div className="flex flex-col items-center justify-center text-xl mb-4">
        {songs[0].image_url && (
          <img
            src={songs[0].image_url}
            alt={songs[0].image_url}
            className=" w-72 h-72 object-cover rounded-xl shadow-lg mb-4"
          />
        )}
        <div className="">{artistName}</div>
        {songs[0].bio ? (
          <div className="text-sm mt-2 px-2">{songs[0].bio}</div>
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
            Previous
          </button>
        </div>
        {/* {songs.map((song) => (
          <Link
            to={`/artists/${encodeURIComponent(
              song.artist_name
            )}/${encodeURIComponent(song.title)}`}
            key={song.song_id}
          >
            <div className="bg-secondary/30 p-2 sm:flex bg-white hover:bg-card hover:ring-2 hover:ring-gray-200 cursor-pointer rounded-sm shadow-sm border-2 border-primary/20 border-dashed  text-lg sm:space-x-1 mb-2">
              <p className="">{song.title}</p>
            </div>
          </Link>
        ))} */}

        <Tabs defaultValue="songs" className="max-w-[400px]">
          <TabsList>
            <TabsTrigger value="songs">Songs</TabsTrigger>
            <TabsTrigger value="albums">Albums</TabsTrigger>
            <TabsTrigger value="ep" className="px-6">
              EPs
            </TabsTrigger>
            <TabsTrigger value="socials">Socials</TabsTrigger>
          </TabsList>
          <TabsContent value="songs" className="px-1">
            {/* {songs.map((song) => (
              <Link
                to={`/artists/${encodeURIComponent(
                  song.artist_name
                )}/${encodeURIComponent(song.title)}`}
                key={song.song_id}
              >
                <div className="bg-secondary/30 p-2 bg-white hover:bg-card hover:ring-2 hover:ring-gray-200 cursor-pointer rounded-sm shadow-sm border-2 border-primary/20 text-lg sm:space-x-1 mb-2">
                  <p className="">{song.title}</p>
                </div>
              </Link>
            ))} */}

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <tbody>
                  {songs.map((song, index) => {
                    return (
                      <tr
                        className="border-b dark:border-gray-800 cursor-pointer hover:ring-2 hover:ring-gray-200 hover:bg-neutral-00"
                        key={song.title}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(
                            `/artists/${song.artist_name}/${song.title}`
                          );
                        }}
                      >
                        <td className="px-4 py-3 font-medium hidden md:table-cell align-middle text-center border-r">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 text-left font-medium">
                          {song.title}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="albums" className="px-1">
            Albums by {artistName}
          </TabsContent>

          <TabsContent value="ep" className="px-1">
            EPs by {artistName}
          </TabsContent>

          <TabsContent value="socials" className="px-1">
            Socials of {artistName}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default ArtistBio;
