import ArtistTable from "../features/artists/ArtistTable";
import { Link } from "react-router-dom";

function Artists() {
  return (
    <>
      <div className="sm:w-full">
        <p className="mb-4 ml-2 flex font-atkinson font-bold text-xl">
          Artists
        </p>
        <ArtistTable />
      </div>
    </>
  );
}

export default Artists;
