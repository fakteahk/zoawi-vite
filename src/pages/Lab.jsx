import { Link } from "react-router-dom";

function Lab() {
  return (
        // ADD NEW ARTIST BUTTON 
        <div className="flex flex-col items-center justify-center align-middle mt-4">
          Lab for experimentation
          <button className="bg-primary/70 hover:bg-primary text-white font-bold py-2 px-4 mt-4 rounded">
            <Link to="/addArtist">Add new Artist</Link>
          </button>

          <button className="bg-primary/70 hover:bg-primary text-white font-bold py-2 px-4 mt-4 rounded">
            <Link to="/addSong">Add new Song</Link>
          </button>
        </div>
  );
}

export default Lab;
