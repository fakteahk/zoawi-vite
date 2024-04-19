import SongsTable from "../features/songs/SongsTable";

function Songs() {
  return (
    <>
      <div className="sm:w-full">
        <p className="mb-4 ml-2 flex font-atkinson font-bold text-xl">
          Songs
        </p>
        {/* Will contain list of artists */}
        <SongsTable />
      </div>
    </>
  );
}

export default Songs;
