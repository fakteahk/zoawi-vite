import supabase, { supabaseUrl } from "./supabase";

export async function getArtists(page, itemsPerPage = 10) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage - 1;

  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .order("id", { ascending: true })
    .range(startIndex, endIndex);

  if (error) {
    console.error(error);
    throw new Error("Artists could not be loaded");
  }

  return data;
}

export async function getArtistsCount() {
  const { error, count } = await supabase
    .from("artists")
    .select("*", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("Artists count could not be loaded");
  }

  return count;
}

export async function getArtistsForHomepage() {
  // Fetch the artists
  let { data: artists, error } = await supabase
    .from("artists")
    .select("*")
    .range(0, 9);

  if (error) {
    console.error(error);
    throw new Error("Artists could not be loaded");
  }

  // Fetch the click counts
  const { data: clickCounts, error: clickCountError } = await supabase
    .from("artist_click_count")
    .select("*");

  if (clickCountError) {
    console.error(clickCountError);
    throw new Error("Click counts could not be loaded");
  }

  // Join the artists with their click counts
  const artistsWithClickCounts = artists.map(artist => {
    const clickCount = clickCounts.find(cc => cc.artist_id === artist.id);
    return {
      ...artist,
      click_count: clickCount ? clickCount.click_count : 0
    };
  });

  // Sort the artists by click count in descending order
  artistsWithClickCounts.sort((a, b) => b.click_count - a.click_count);

  return artistsWithClickCounts;
}

// https://pwakmdomurtaxavvnhjk.supabase.co/storage/v1/object/public/artist_image/michael%20m%20sailo.jpeg

export async function createArtist(newArtist) {
  const imageName = `${Math.random()}-${newArtist.image_url.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/artist_image/${imageName}`;

  const { error } = await supabase
    .from("artists")
    .insert([{ ...newArtist, image_url: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Artist could not be created");
  }

  console.log(newArtist);

  const { data, error: storageError } = await supabase.storage
    .from("artist_image")
    .upload(imageName, newArtist.image_url, {
      cacheControl: "3600",
      upsert: false,
    });

  if (storageError) {
    await supabase.from("artists").delete().eq("id");
    console.log(storageError);
    throw new Error(
      "Cabin image could not be uploaded and artist was not created"
    );
  }

  return data;
}

export async function deleteArtist(artistId) {
  const { data, error } = await supabase
    .from("artists")
    .delete()
    .match({ id: artistId });

  if (error) {
    console.error(error);
    throw new Error("Artist could not be deleted");
  }

  return data;
}

export async function createArtistFromSongs(newArtist) {
  const { name } = newArtist;

  let { data, error } = await supabase
    .from("artists")
    .insert([{ name }])
    .single()
    .select();

  if (error) {
    console.error(error);
    throw new Error("Artist could not be created");
  }

  return data;
}
