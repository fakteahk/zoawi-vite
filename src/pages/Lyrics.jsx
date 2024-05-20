import LyricsContent from "../features/lyrics/LyricsContent";


function Lyrics() {
  return (
    <div className="max-w-[720px] flex flex-col align-center justify-center mx-auto">
      {/* Will contain lyrics of songs */}
      <LyricsContent />
    </div>
  );
}

export default Lyrics;
