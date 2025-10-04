"use client";
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/auth/authApi";
import { editProfileValidation } from "@/schemas/editProfileValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
type TProfileInput = {
  name?: string;
  phone?: string;
  image: FileList;
};

type EditProfileModalProps = {
  isEditProfileModalOpen: boolean;
  closeIsEditProfileModal: () => void;
};

const EditProfileModal = ({
  isEditProfileModalOpen,
  closeIsEditProfileModal,
}: EditProfileModalProps) => {
  const { data: profile } = useGetUserProfileQuery(undefined);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProfileInput>({
    resolver: zodResolver(editProfileValidation),
  });
  const HandleProfileEdit: SubmitHandler<Partial<TProfileInput>> = async (
    data
  ) => {
    // generate profile form data
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key !== "image") {
        formData.append(key, value as string);
      }
    }
    //  if user upload image file set image file from data
    Array.from(data.image ?? []).forEach((file) => {
      formData.append("file", file);
    });

    try {
      const result = await updateProfile(formData)?.unwrap();
      if (result?.success) {
        toast.success("Profile Updated");
      }
      closeIsEditProfileModal();
    } catch (err) {
      toast.error("Profile update failed");
      console.log(err);
    }
  };

  return (
    <div>
      <div className={`modal ${isEditProfileModalOpen ? "modal-open" : ""} `}>
        <div className="modal-box  bg-slate-800">
          <h3 className="font-bold text-lg text-sky-50">Edit profile</h3>
          <form
            onSubmit={handleSubmit(HandleProfileEdit)}
            className="space-y-4 lg:space-y-6 mt-8"
          >
            {/* text input */}
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  defaultValue={profile?.name}
                  {...register("name")}
                  placeholder="Enter your name"
                  className="bg-slate-900 text-slate-400 px-2.5 py-1.5 w-full border-lime-500 border rounded"
                />
                <p className="text-red-400 ">{errors?.name?.message}</p>
              </div>
              <div>
                <input
                  type="text"
                  defaultValue={profile?.email}
                  disabled={true}
                  placeholder="Enter event location"
                  className="bg-slate-900 text-slate-400 px-2.5 py-1.5 w-full border-lime-500 border rounded"
                />
              </div>
              <div>
                <input
                  type="text"
                  {...register("phone")}
                  defaultValue={profile?.phone}
                  placeholder="Add your phone"
                  className="bg-slate-900 text-slate-400 px-2.5 py-1.5 w-full border-lime-500 border rounded"
                />
                <p className="text-red-400 ">{errors?.phone?.message}</p>
              </div>
              <div>
                <input
                  {...register("image")}
                  type="file"
                  placeholder="Event image *"
                  className="bg-slate-900 text-slate-400 px-2.5 py-1.5 w-full border-lime-500 border rounded"
                ></input>
                <p className="text-red-400 text-sm ml-1">
                  {errors?.image?.message}
                </p>
              </div>
            </div>
            {/* action btns */}
            <div className="flex justify-end gap-2 text-sky-50 mt-8">
              <button
                type="button"
                onClick={() => closeIsEditProfileModal()}
                className=" cursor-pointer hover:text-sky-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-lime-600 text-base mt-1 hover:bg-lime-500 text-slate-200 tracking-wide transition duration-300 rounded cursor-pointer px-3 py-1.5"
              >
                {isLoading ? (
                  <span className="loading loading-spinner mx-10 loading-md"></span>
                ) : (
                  <span> Save Changes</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
