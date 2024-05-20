import { useQuery } from "@tanstack/react-query";

import { getSongsForHome } from "../../db/apiSongs";
import { Link, useNavigate } from "react-router-dom";

export default function ListHomeSongs() {
  const { isLoading: isLoading, data: songs } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongsForHome,
  });

  const navigate = useNavigate();

  console.log(songs);

  if (isLoading) return <p>Loading</p>;

  return (
    <div className="w-screen max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto px-4 py-0 md:px-6 md:py-0">
      <div className="border rounded-lg overflow-hidden ml-2">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 font-medium hidden md:block text-center border-r">
                #
              </th>
              <th className="px-4 py-3 font-medium">Song</th>
              <th className="px-4 py-3 font-medium text-left">Artist</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => {
              return (
                <tr className="border-b dark:border-gray-800 cursor-pointer" key={song.title} 
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/artists/${song.artist_name}/${song.title}`);
                }}
                >
                    <td className="px-4 py-3 font-medium hidden md:table-cell align-middle text-center border-r">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-left font-medium">
                      {song.title}
                    </td>
                    <td className="px-4 py-3 flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <img
                          alt="artist"
                          className="rounded"
                          height={40}
                          src={song.image_url || ""}
                          style={{
                            aspectRatio: "40/40",
                            objectFit: "cover",
                          }}
                          width={40}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {song.artist_name || "Undefined"}
                        </h3>
                      </div>
                    </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
