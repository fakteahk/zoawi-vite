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
    return [];
  }

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
    .insert([{ title, artist_id }])
    .single()
    .select()

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

//

async function getSongById(id) {
  try {
    let { data: song, error: songError } = await supabase
      .from('songs')
      .select('*')
      .eq('id', id)
      .single();

    if (songError) {
      console.error('Error fetching song: ', songError);
      return null;
    }

    let { data: lyrics, error: lyricsError } = await supabase
      .from('lyrics')
      .select('*')
      .eq('song_id', id)
      .single();

    if (lyricsError) {
      console.error('Error fetching lyrics: ', lyricsError);
      return null;
    }

    return { ...song, lyrics };
  } catch (error) {
    console.error('Unexpected error: ', error);
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
    .select()
    .single()

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


