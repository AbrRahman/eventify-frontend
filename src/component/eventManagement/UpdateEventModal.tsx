import {
  useGetSingleEventQuery,
  useUpdateEventMutation,
} from "@/redux/features/event/eventApi";
import { updateEventValidation } from "@/schemas/eventValidation";
import { TEventInput } from "@/types/events.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type UpdateModalProps = {
  isUpdateModalOpen: boolean;
  closeUpdateModal: () => void;
  id: string;
};

const UpdateEventModal = ({
  isUpdateModalOpen,
  closeUpdateModal,
  id,
}: UpdateModalProps) => {
  const [updateEvent] = useUpdateEventMutation();
  const { data: event } = useGetSingleEventQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<TEventInput>>({
    resolver: zodResolver(updateEventValidation),
  });

  // handle Update Event form
  const handleUpdateEventForm: SubmitHandler<Partial<TEventInput>> = async (
    data
  ) => {
    // generate form data
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (value && key !== "image") {
        formData.append(key, value as string);
      }
    }

    //  if user upload image file set image file from data
    Array.from(data.image ?? []).forEach((file) => {
      formData.append("file", file);
    });
    try {
      const result = await updateEvent({ formData, id });
      console.log(result);
      if (result && result?.data?.success) {
        toast?.success("Event Update successfully");
      } else {
        toast.error("Event Update Failed");
      }
      reset();
      closeUpdateModal();
    } catch (err) {
      toast.error("Event Update Failed");
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
      <div className={`modal ${isUpdateModalOpen ? "modal-open" : ""} `}>
        <div className="modal-box md:w-1/2 max-w-none bg-slate-800">
          <h3 className="font-bold text-lg text-sky-50">Upload a Event</h3>
          <form
            onSubmit={handleSubmit(handleUpdateEventForm)}
            className="space-y-4 lg:space-y-6 mt-8"
          >
            {/* text input */}
            <div className="space-y-4">
              <div>
                <input
                  defaultValue={event?.title}
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
                    {event?.category}
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
                  defaultValue={event?.description}
                  {...register("description")}
                  placeholder="Enter event description"
                  className="bg-slate-900 text-slate-400 px-2.5 py-1.5 w-full border-lime-500 border rounded"
                />
                <p className="text-red-400 ">{errors?.description?.message}</p>
              </div>
              <div>
                <input
                  type="text"
                  defaultValue={event?.date}
                  {...register("date")}
                  placeholder="Enter event date"
                  className="bg-slate-900 text-slate-400 px-2.5 py-1.5 w-full border-lime-500 border rounded"
                />
                <p className="text-red-400 ">{errors?.date?.message}</p>
              </div>
              <div>
                <input
                  type="text"
                  defaultValue={event?.location}
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
                  defaultValue={event?.seats}
                  placeholder="Enter number of seats"
                  className="bg-slate-900 text-slate-400 px-2.5 py-1.5 w-full border-lime-500 border rounded"
                />
                <p className="text-red-400 ">{errors?.seats?.message}</p>
              </div>
              <div>
                <input
                  type="text"
                  {...register("price")}
                  defaultValue={event?.price}
                  placeholder="Enter event ticket price"
                  className="bg-slate-900 text-slate-400 px-2.5 py-1.5 w-full border-lime-500 border rounded"
                />
                <p className="text-red-400 ">{errors?.price?.message}</p>
              </div>
              <div>
                <input
                  type="text"
                  {...register("organizer")}
                  defaultValue={event?.organizer}
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
                onClick={() => closeUpdateModal()}
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

export default UpdateEventModal;
