import { useCreateEventMutation } from "@/redux/features/event/eventApi";
import { crateEventValidation } from "@/schemas/eventValidation";
import { TEventInput } from "@/types/events.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type createModalProps = {
  isCreateModalOpen: boolean;
  closeCreateModal: () => void;
};

const CreateEventModal = ({
  isCreateModalOpen,
  closeCreateModal,
}: createModalProps) => {
  const [createEvent] = useCreateEventMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TEventInput>({ resolver: zodResolver(crateEventValidation) });

  // handle create Event form
  const handleCreateEventForm: SubmitHandler<TEventInput> = async (data) => {
    // generate form data
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
      const result = await createEvent(formData);
      console.log(result);
      if (result && result?.data?.success) {
        toast?.success("Event create successfully");
      } else {
        toast.error("Event create Failed");
      }
      reset();
      closeCreateModal();
    } catch (err) {
      toast.error("Event create Failed");
      console.log(err);
    }
  };

  const categories = [
    "Music",
    "Tech",
    "Sports",
    "Business",
    "Health",
    "Art",
    "Food",
    "Entertainment",
    "Environment",
  ];

  return (
    <>
      <div className={`modal ${isCreateModalOpen ? "modal-open" : ""} `}>
        <div className="modal-box md:w-1/2 max-w-none bg-slate-800">
          <h3 className="font-bold text-lg text-sky-50">Upload a Event</h3>
          <form
            onSubmit={handleSubmit(handleCreateEventForm)}
            className="space-y-4 lg:space-y-6 mt-8"
          >
            {/* text input */}
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  {...register("title")}
                  placeholder="Enter event name"
                  className="bg-slate-900 text-slate-400 px-2.5 py-1.5 w-full border-lime-500 border rounded"
                />
                <p className="text-red-400 ">{errors?.title?.message}</p>
              </div>
              <div>
                <select
                  {...register("category")}
                  className="bg-slate-900 text-slate-400 px-2.5 py-1.5 w-full border-lime-500 border rounded"
                >
                  <option selected value="">
                    Select a service
                  </option>

                  {categories?.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <p className="text-red-400 ">{errors?.category?.message}</p>
              </div>
              <div>
                <input
                  type="text"
                  {...register("description")}
                  placeholder="Enter event description"
                  className="bg-slate-900 text-slate-400 px-2.5 py-1.5 w-full border-lime-500 border rounded"
                />
                <p className="text-red-400 ">{errors?.description?.message}</p>
              </div>
              <div>
                <input
                  type="text"
                  {...register("date")}
                  placeholder="Enter event date"
                  className="bg-slate-900 text-slate-400 px-2.5 py-1.5 w-full border-lime-500 border rounded"
                />
                <p className="text-red-400 ">{errors?.date?.message}</p>
              </div>
              <div>
                <input
                  type="text"
                  {...register("location")}
                  placeholder="Enter event location"
                  className="bg-slate-900 text-slate-400 px-2.5 py-1.5 w-full border-lime-500 border rounded"
                />
                <p className="text-red-400 ">{errors?.location?.message}</p>
              </div>
              <div>
                <input
                  type="text"
                  {...register("seats")}
                  placeholder="Enter number of seats"
                  className="bg-slate-900 text-slate-400 px-2.5 py-1.5 w-full border-lime-500 border rounded"
                />
                <p className="text-red-400 ">{errors?.seats?.message}</p>
              </div>
              <div>
                <input
                  type="text"
                  {...register("price")}
                  placeholder="Enter event ticket price"
                  className="bg-slate-900 text-slate-400 px-2.5 py-1.5 w-full border-lime-500 border rounded"
                />
                <p className="text-red-400 ">{errors?.price?.message}</p>
              </div>
              <div>
                <input
                  type="text"
                  {...register("organizer")}
                  placeholder="Enter event organizer name"
                  className="bg-slate-900 text-slate-400 px-2.5 py-1.5 w-full border-lime-500 border rounded"
                />
                <p className="text-red-400 ">{errors?.organizer?.message}</p>
              </div>
              <div>
                <input
                  {...register("image")}
                  type="file"
                  placeholder="Event image *"
                  className="bg-slate-900 text-slate-400 px-2.5 py-1.5 w-full border-lime-500 border rounded"
                ></input>
                <p className="text-red-500 text-sm ml-1">
                  {errors?.image?.message}
                </p>
              </div>
            </div>
            {/* action btns */}
            <div className="flex justify-end gap-2 text-sky-50 mt-8">
              <button
                type="button"
                onClick={() => closeCreateModal()}
                className=" cursor-pointer hover:text-sky-200"
              >
                Cancel
              </button>
              <button className="bg-lime-600 text-base mt-1 hover:bg-lime-500 text-slate-200 tracking-wide transition duration-300 rounded cursor-pointer px-6 py-1.5">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateEventModal;
