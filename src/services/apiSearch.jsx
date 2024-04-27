import supabase from "./supabase";

export async function searchLyrics(value) {
  const { data, error } = await supabase
    .from("songs")
    .select("title, lyrics, artist_id(name)")
    .filter("tsv", "fts", value)
    .limit(5);

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function searchArtists(value) {
  const { data, error } = await supabase
    .from("artists")
    .select("name")
    .ilike("name", `%${value}%`)
    .limit(2);

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function searchSongTitles(value) {
  const { data, error } = await supabase
    .from("songs")
    .select("title, artist_id(name)")
    .ilike("title", `%${value}%`)
    .limit(3);

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
