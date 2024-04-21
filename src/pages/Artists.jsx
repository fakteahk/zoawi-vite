import ArtistTable from "../features/artists/ArtistTable";
import { Link } from "react-router-dom";

function Artists() {
  return (
    <>
      <div className="sm:w-full">
        <p className="mb-4 ml-2 flex font-atkinson font-bold text-xl">
          Artists
        </p>
        {/* Will contain list of artists */}
        <ArtistTable />

        <div className="flex items-center justify-center align-middle mt-4">
          <button
            className="bg-primary/70 hover:bg-primary text-white font-bold py-2 px-4 rounded"
          >
            <Link to="/addArtist">Add new Artist</Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Artists;
