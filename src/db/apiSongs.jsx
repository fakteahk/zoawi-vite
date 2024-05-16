import supabase from "./supabase";

export async function getSongs(startIndex, endIndex) {
  let { data, error } = await supabase
    .from("artists_songs")
    .select(`song_id, title, artist_name`)
    .range(startIndex, endIndex);

  if (error) {
    console.error(error);
    throw new Error("Songs could not be loaded");
  }

  return data;
}

export async function getSongsCount() {
  const { error, count } = await supabase
    .from("songs")
    .select("*", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("Songs count could not be loaded");
  }

  return count;
}

export async function getSong(title) {
  let { data, error } = await supabase
    .from("artists_songs")
    .select("*")
    .eq("title", title);

  if (error) {
    console.error(error);
    throw new Error("Songs could not be loaded");
  }

  return data;
}

export async function getSongOfArtist(artistName) {
  let { data: songs, error } = await supabase
    .from("artists_songs")
    .select("artist_id, song_id, title, image_url")
    .eq("artist_name", artistName);

  if (error) {
    console.error(error);
    throw new Error("Error fetching songs");
  }

  if (songs.length === 0) {
    return [];
  }

  console.log(songs);

  return songs;
}

//Delete stuff

export async function deleteSong(songId) {
  const { error } = await supabase.from("songs").delete().eq("id", songId);

  if (error) {
    console.error(error);
    throw new Error("Error deleting song");
  }
}

export async function createSong(newSong) {
  const { title, artist_id, lyrics } = newSong;

  let { data, error } = await supabase
    .from("songs")
    .insert([{ title, artist_id, lyrics }])
    .single()
    .select();

  if (error) {
    console.error(error);
    throw new Error("Song could not be created");
  }

  // const song_id = data.id;

  // const { error: lyricsError } = await supabase
  //   .from("lyrics")
  //   .insert([{ song_id, lyrics }]);

  // if (lyricsError) {
  //   console.error(lyricsError);
  //   throw new Error("Lyrics could not be created");
  // }
  return data;
}

//

async function getSongById(id) {
  try {
    let { data: song, error: songError } = await supabase
      .from("artists_songs")
      .select("*")
      .eq("song_id", id)
      .single();

    if (songError) {
      console.error("Error fetching song: ", songError);
      return null;
    }

    let { data: lyrics, error: lyricsError } = await supabase
      .from("lyrics")
      .select("*")
      .eq("song_id", id)
      .single();

    if (lyricsError) {
      console.error("Error fetching lyrics: ", lyricsError);
      return null;
    }

    return { ...song, lyrics };
  } catch (error) {
    console.error("Unexpected error: ", error);
    return null;
  }
}
export { getSongById };

//?Edit Song

export async function updateSong(newSong) {
  const { title, artist_id, lyrics } = newSong;

  let { data, error } = await supabase
    .from("songs")
    .insert([{ title, artist_id }])
    .single()
    .select();

  if (error) {
    console.error(error);
    throw new Error("Song could not be created");
  }

  const song_id = data.id;

  const { error: lyricsError } = await supabase
    .from("lyrics")
    .insert([{ song_id, lyrics }]);

  if (lyricsError) {
    console.error(lyricsError);
    throw new Error("Lyrics could not be created");
  }
  return data;
}

export async function getSongsForHome() {
  let { data, error } = await supabase
    .from("artists_songs")
    .select("artist_name, title, image_url")
    .range(0, 9);

  console.log(data, error);

  if (error) {
    console.error(error);
    throw new Error("Songs could not be loaded");
  }

  return data;
}
