import { useNavigate } from "react-router-dom";
import LyricsContent from "../features/lyrics/LyricsContent";
import { LiaArrowLeftSolid } from "react-icons/lia";

function Lyrics() {
  const navigate = useNavigate();

  return (
      <div className="max-w-[720px] flex flex-col align-center justify-center mx-auto">
        <div className="mb-4 flex text-sm justify-end">
          <button
            className="flex items-center gap-2 mr-4"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            <LiaArrowLeftSolid />
            Go back
          </button>
        </div>
        {/* Will contain lyrics of songs */}
        <LyricsContent />
      </div>
  );
}

export default Lyrics;
