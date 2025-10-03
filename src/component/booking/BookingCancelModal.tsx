"use client";

import { useCancelMyBookingMutation } from "@/redux/features/eventRegistration/eventBookingApi";
import { toast } from "sonner";

type BookingCancelModalProps = {
  isBookingCancelModalOpen: boolean;
  closeIsBookingCancelModal: () => void;
  id: string;
};

const BookingCancelModal = ({
  isBookingCancelModalOpen,
  closeIsBookingCancelModal,
  id,
}: BookingCancelModalProps) => {
  const [BookingCancel] = useCancelMyBookingMutation();

  const handleBookingCancel = async () => {
    try {
      const result = await BookingCancel(id);
      if (result?.data?.success) {
        toast.success("Delete successfully");
      } else {
        toast.error("Delete Failed");
      }
      closeIsBookingCancelModal();
    } catch (err) {
      console.log(err);
      toast.error("Delete Failed");
      closeIsBookingCancelModal();
    }
  };

  return (
    <>
      <div className={`modal ${isBookingCancelModalOpen ? "modal-open" : ""} `}>
        <div className="modal-box bg-slate-800 ">
          <h3 className="font-bold text-lg text-sky-50">Delete Event</h3>
          <h4 className="text-sky-50 text-base mt-8">
            Are you sure you want to delete this Event ?
          </h4>
          <div className="flex justify-end gap-2 text-sky-50 mt-8">
            <button
              type="button"
              onClick={() => closeIsBookingCancelModal()}
              className=" cursor-pointer hover:text-sky-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleBookingCancel}
              className="bg-lime-600 text-base mt-1 hover:bg-lime-500 text-slate-200 tracking-wide transition duration-300 rounded cursor-pointer px-6 py-1.5"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCancelModal;
