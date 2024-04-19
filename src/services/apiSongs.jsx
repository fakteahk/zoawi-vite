import supabase from "./supabase";

export async function getSongs() {
  let { data, error } = await supabase.from("songs").select(`
    *,
    artists (
        name
    )
`);

  if (error) {
    console.error(error);
    throw new Error("Songs could not be loaded");
  }

  return data;
}

export async function getSongOfArtist(artistId) {
  let { data: songs, error } = await supabase
    .from("songs")
    .select(
      `
        *,
        artists (
            name,
            image_url
        )
    `
    )
    .eq("artist_id", artistId);

  if (error) {
    console.error(error);
    throw new Error("Error fetching songs");
  }

  if (songs.length === 0) {
    throw new Error("No songs by this artist");
  }

  return songs;
}
