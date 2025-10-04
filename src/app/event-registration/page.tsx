"use client";
import ProtectedRoute from "@/ProtectedRoute/ProtectedRoute";
import { setRegisterEventId } from "@/redux/features/auth/authSlice";
import { useBookingEventMutation } from "@/redux/features/eventRegistration/eventBookingApi";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { bookingEventValidation } from "@/schemas/bookingEventValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type TRegisterInput = {
  ticket: string;
  phone: string;
  paymentMethod?: string;
};

const EventRegistration = () => {
  const { user, registerEventId } = useAppSelector((state) => state?.auth);
  const [registerEvent] = useBookingEventMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TRegisterInput>({
    resolver: zodResolver(bookingEventValidation),
  });

  // handle create Event form
  const handleCreateEventForm: SubmitHandler<TRegisterInput> = async (data) => {
    const eventRegisterData = {
      user: user?._id,
      event: registerEventId,
      ...data,
    };
    try {
      const result = await registerEvent(eventRegisterData);
      console.log(result);
      if (result && result?.data?.success) {
        toast?.success("Event registration successfully");
      } else {
        toast.error("Event registration Failed");
      }
      router.replace("/my-booking");
      dispatch(setRegisterEventId(""));
      reset();
    } catch (err) {
      toast.error("Event registration Failed");
      console.log(err);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin", "user"]}>
      <div className="bg-slate-900">
        <div className="container mx-auto px-4 lg:px-8 h-[85vh]">
          <div className="flex items-center pt-15 lg:pt-8">
            <div className="w-11/12 lg:w-1/2 mx-auto bg-slate-800 py-8 px-6 lg:py-10 lg:px-12  rounded shadow">
              <h1 className="text-slate-200 text-2xl lg:text-3xl">
                Booking Event
              </h1>
              <form
                onSubmit={handleSubmit(handleCreateEventForm)}
                className="mt-8"
              >
                <div className="space-y-3.5">
                  {/* phone number */}
                  <div>
                    <input
                      {...register("phone")}
                      type="text"
                      placeholder="Enter phone number"
                      className="bg-slate-900 text-slate-400 px-3 py-2 w-full border-lime-500 border rounded"
                    />
                    <p className="text-red-400 ">{errors?.phone?.message}</p>
                  </div>
                  {/* number of sets */}
                  <div>
                    <input
                      type="text"
                      {...register("ticket")}
                      placeholder="Number of tickets"
                      className="bg-slate-900 text-slate-400 px-3 py-2 w-full border-lime-500 border rounded"
                    />
                    <p className="text-red-400 ">{errors?.ticket?.message}</p>{" "}
                  </div>
                  {/* payment method */}
                  <div>
                    <input
                      {...register("paymentMethod")}
                      type="text"
                      placeholder="Write payment method types"
                      className="bg-slate-900 text-slate-400 px-3 py-2 w-full border-lime-500 border rounded"
                    />
                    <p className="text-red-400 ">
                      {errors?.paymentMethod?.message}
                    </p>
                  </div>
                </div>
                <button className="bg-lime-600 mt-8 hover:bg-lime-500 text-slate-200 tracking-wide text-lg transition duration-300 rounded cursor-pointer px-4 py-1.5">
                  Booking Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default EventRegistration;
