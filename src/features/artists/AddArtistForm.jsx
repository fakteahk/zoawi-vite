import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LiaUserCircle, LiaArrowLeftSolid } from "react-icons/lia";
import toast from "react-hot-toast";

import { createArtist } from "../../db/apiArtists";
import { Button } from "@/components/ui/button";

export default function AddArtistForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createArtist,
    onSuccess: () => {
      toast.success("Artist created successfully");
      queryClient.invalidateQueries({ queryKey: "artists" });
      reset();
    },
    onError: () => {
      toast.error("Artist could not be created");
    },
  });

  function onSubmit(data) {
    console.log(data);
    mutate({ ...data, image_url: selectedFile });
  }

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
                  navigate(-1);
                }}
              >
                <LiaArrowLeftSolid />
                Go back
              </button>
            </div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Artist
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-secondary/50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      Artist Name/
                    </span> */}
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      className="block flex-1 border-2 rounded-md bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Artist"
                      {...register("name")}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Bio
                </label>
                <div className="mt-2">
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    className="block w-full rounded-md border-2 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-secondary/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6 bg-transparent"
                    defaultValue={""}
                    {...register("bio")}
                  />
                </div>
                <p className="mt-3 font-thin text-sm leading-6 text-gray-600">
                  Add some relevant details about the artist.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="image_url"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image
                </label>
                <div className=" font-thin text-sm">
                  Add a photo for the artist
                </div>
                <div className="flex flex-col gap-4 mt-2">
                  {selectedImageUrl ? (
                    <div className="flex gap-2">
                      <img
                        src={selectedImageUrl}
                        alt="Selected"
                        className="w-28 h-28 object-cover rounded-md ml-1"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedImageUrl(null);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="w-28 h-28 rounded-xl bg-primary ml-1">
                      <LiaUserCircle className="object-cover w-full h-full text-secondary" />
                    </div>
                  )}

                  <label htmlFor="image_url" className="cursor-pointer">
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("image").click();
                      }}
                    >
                      Upload Image
                    </Button>
                  </label>
                  <input
                    className="hidden"
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    {...register("image_url")}
                    onChange={(e) => {
                      setSelectedImageUrl(
                        URL.createObjectURL(e.target.files[0])
                      );
                      setSelectedFile(e.target.files[0]); // Store the selected file
                    }}
                  />
                </div>
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
