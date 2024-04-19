import { useEffect } from "react";
import { getArtists } from "../services/apiArtists";

function Artists() {

  useEffect(function(){
    getArtists().then(data => console.log(data))
  }, [])

  return (
    <>
      <div>
        <p>Artist Page</p>
        {/* Will contain list of artists */}
      </div>
    </>
  );
}

export default Artists;
