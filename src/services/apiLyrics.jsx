import supabase from "./supabase";

export async function getLyrics(songId) {
  const { data: lyrics, error } = await supabase
    .from("lyrics")
    .select(
      `
          *,
          songs (
              title,
              artists (
                  name
              )
          )
      `
    )
    .eq("song_id", songId);

  if (error) {
    console.error(error);
    throw new Error("Error fetching lyrics");
  }

  return lyrics;
}
