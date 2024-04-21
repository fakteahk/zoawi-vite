import { useQuery } from "@tanstack/react-query";
import { getSongs } from "../../services/apiSongs";
// import { useMutation } from "@tanstack/react-query";
// import { deleteSong } from "../../services/apiSongs";


import { Link } from "react-router-dom";
// import toast from "react-hot-toast";

export default function SongsTable() {
  const { isLoading: isLoading, data: songs } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongs,
  });

  if (isLoading) return <p>Loading</p>;

  return (
    <div className="grid sm:grid-rows-10 gap-2 p-2 min-w-96">
      {songs.map((song) => (
        <SongRow key={song.id} song={song} />
      ))}
    </div>
  );
}

function SongRow({ song }) {
  const { id: songId, title, artists: {name} } = song;

  // const queryClient = useQueryClient();

  // const { isLoading: isDeleting, mutate } = useMutation(
  //   {
  //     mutationFn: () => deleteSong(songId),
  //     onSuccess: () => {
  //       toast.success("Song deleted");
  //       queryClient.invalidateQueries({
  //         queryKey: ["songs"],
  //       })
  //     },

  //     onError: (error) => {
  //       toast.error(error.message);
  //     },
  //   }
  // )

  return (
    <div
          key={song.id}
          className="bg-secondary/30 hover:bg-secondary cursor-pointer p-4 rounded-sm shadow-md font-atkinson text-lg sm:flex sm:space-x-1"
        >
          <div>
            <Link to={`/songs/${songId}`}>
              <p className="font-semibold">{title}</p>
              <p className="text-primary">{name}</p>
            </Link>
            {/* <button onClick={() => mutate(songId)} disabled={isDeleting}>Delete</button> */}
          </div>
        </div>
  );
}
