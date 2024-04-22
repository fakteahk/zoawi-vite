import ArtistTable from "../features/artists/ArtistTable";

function Artists() {
  return (
    <>
      <div className="sm:w-full mb-4">
        <p className="mb-4 ml-4 flex font-atkinson font-bold text-xl">
          Artists
        </p>
        <ArtistTable />
      </div>
    </>
  );
}

export default Artists;
