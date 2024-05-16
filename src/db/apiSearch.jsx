import supabase from "./supabase";

export async function searchLyrics(value) {
  const { data, error } = await supabase
    .rpc("search_lyrics", { search_value: value })
    .limit(3);

  if (error) {
    console.error(error);
    return <div>Something went wrong: {error.message}</div>;
  }

  console.log(data);
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
    .from("artists_songs")
    .select("title, artist_name")
    .ilike("title", `%${value}%`)
    .limit(3);

  if (error) {
    console.error(error);
    return null;
  }

  console.log(data);
  return data;
}

export async function searchAll(value) {
  const [songTitlesResponse, lyricsResponse] = await Promise.all([
    supabase
      .from("artists_songs")
      .select("title, artist_name")
      .ilike("title", `%${value}%`)
      .limit(3),
    supabase
      .rpc("search_lyrics", { search_value: value })
      .limit(3)
  ]);

  const errors = [songTitlesResponse.error, lyricsResponse.error].filter(Boolean);
  if (errors.length > 0) {
    console.error(errors);
    return null;
  }

  const data = {
    songTitles: songTitlesResponse.data,
    lyrics: lyricsResponse.data
  };

  console.log(data);
  return data;
}