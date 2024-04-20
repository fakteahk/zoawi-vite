import supabase from "./supabase";

export async function getArtists() {
  const { data, error } = await supabase.from("artists").select("*");

  if (error) {
    console.error(error);
    throw new Error("Artists could not be loaded");
  }

  return data;
}

export async function createArtist(newArtist) {
  const { data, error } = await supabase
    .from("artists")
    .insert([newArtist])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Artist could not be created");
  }

  return data;
}
