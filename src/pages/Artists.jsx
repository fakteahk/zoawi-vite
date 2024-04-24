import ArtistTable from "../features/artists/ArtistTable";

function Artists() {
  return (
    <div className="sm:w-full flex flex-col items-center justify-center">
      <p className="mb-4 ml-4  font-bold text-xl">Artists</p>
      <ArtistTable />
    </div>
  );
}

export default Artists;
