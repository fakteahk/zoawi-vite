import { LiaUserCircle } from "react-icons/lia";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { LiaArrowLeftSolid } from "react-icons/lia";

import { createArtist } from "../../services/apiArtists";
import { Link } from "react-router-dom";

export default function AddArtistForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

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
    mutate(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12 px-4">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mb-4 flex justify-end">
              <Link to="/artists" className="flex items-center gap-2 mr-4">
                <LiaArrowLeftSolid />
                Go back
              </Link>
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
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-secondary/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6 bg-transparent"
                    defaultValue={""}
                    {...register("bio")}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Add some relevant details about the artist.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <LiaUserCircle
                    className="h-12 w-12 text-slate-700"
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    className="rounded-md bg-primary px-2.5 py-1.5 text-sm font-medium text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-primary/70"
                  >
                    Change
                  </button>
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
