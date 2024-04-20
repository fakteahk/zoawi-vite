import { Link } from "react-router-dom";
import LyricsContent from "../features/lyrics/LyricsContent"
import { LiaArrowLeftSolid } from "react-icons/lia";

function Lyrics() {
  return (
    <>
      <div className="max-w-[720px]">
      <div className="mb-4 flex text-sm justify-end">
          <Link to="/songs" className="flex items-center gap-2">
            <LiaArrowLeftSolid />
            Go back
          </Link>
        </div>
        {/* Will contain lyrics of songs */}
        <LyricsContent />
      </div>
    </>
  );
}

export default Lyrics;
