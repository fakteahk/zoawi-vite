import ArtistTable from "../features/artists/ArtistTable";

function Artists() {
  return (
    <>
      <div className="sm:w-full">
        <p className="mb-4 ml-2 flex font-atkinson font-bold text-xl">
          Artists
        </p>
        {/* Will contain list of artists */}
        <ArtistTable />
      </div>
    </>
  );
}

export default Artists;
