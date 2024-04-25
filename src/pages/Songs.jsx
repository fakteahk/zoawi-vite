import SongsTable from "../features/songs/SongsTable";

function Songs() {
  return (
    <div className="sm:w-[90vw] mx-auto">
      <p className="flex  font-bold text-xl ml-2">Songs</p>
      {/* Will contain list of artists */}
      <SongsTable />
    </div>
  );
}

export default Songs;
