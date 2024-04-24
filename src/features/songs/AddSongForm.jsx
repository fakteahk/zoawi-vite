import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Creatable from "react-select/creatable";
import toast from "react-hot-toast";

import { LiaArrowLeftSolid } from "react-icons/lia";

import { createSong } from "../../services/apiSongs";
import { getArtists, createArtistFromSongs } from "../../services/apiArtists"; // Import your API function
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AddSongForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, control } = useForm();
  const [artists, setArtists] = useState([]);

  const options = artists.map((artist) => ({
    value: artist.id,
    label: artist.name,
  }));

  useEffect(() => {
    const fetchArtists = async () => {
      const artistList = await getArtists();
      setArtists(artistList);
    };

    fetchArtists();
  }, []);

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createSong,
    onSuccess: () => {
      toast.success("Song created successfully");
      queryClient.invalidateQueries({ queryKey: "songs" });
      reset();
    },
    onError: () => {
      toast.error("Song could not be created");
    },
  });

  function onSubmit(data) {
    const formData = {
      title: data.title,
      lyrics: data.lyrics,
      artist_id: data.artist_id ? data.artist_id.value : null,
    };

    if (data.artist_id && data.artist_id.__isNew__) {
      createArtistFromSongs({ name: data.artist_id.label })
        .then((newArtist) => {
          formData.artist_id = newArtist.id;
          setArtists((prevArtists) => [...prevArtists, newArtist]);
          mutate(formData);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Artist could not be created");
        });
    } else {
      mutate(formData);
    }
  }

  const handleSelectChange = async (selectedOption, field) => {
    field.onChange(selectedOption || null);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12 px-4">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mb-4 flex text-sm justify-end">
              <button
                className="flex items-center gap-2 mr-4"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/home');
                }}
              >
                <LiaArrowLeftSolid />
                Go back
              </button>
            </div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Song
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Song Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-secondary/50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Songname"
                      {...register("title")}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="artist"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Artist
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-secondary/50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">
                    <Controller
                      name="artist_id"
                      control={control}
                      render={({ field }) => (
                        <Creatable
                          className="block flex-1"
                          {...field}
                          options={options}
                          isClearable
                          onChange={(selectedOption) => {
                            handleSelectChange(selectedOption, field);
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="lyrics"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Lyrics
                </label>
                <div className="mt-2">
                  <textarea
                    id="lyrics"
                    name="lyrics"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-secondary/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6 bg-transparent"
                    defaultValue={""}
                    {...register("lyrics")}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Add lyrics to the song here
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6 px-4">
          <button
            type="reset"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={isCreating}
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
