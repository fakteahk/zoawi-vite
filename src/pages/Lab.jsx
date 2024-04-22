import { Link } from "react-router-dom";

function Lab() {
  return (
    <div>
      Lab for experimentation
      <div>
        {/* ADD NEW ARTIST BUTTON */}
        <div className="flex items-center justify-center align-middle mt-4">
          <button className="bg-primary/70 hover:bg-primary text-white font-bold py-2 px-4 rounded">
            <Link to="/addArtist">Add new Artist</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Lab;
