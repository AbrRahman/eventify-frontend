"use client";

import { useDeleteEventMutation } from "@/redux/features/event/eventApi";
import { toast } from "sonner";

type deleteEventModalProps = {
  isDeleteEventModalOpen: boolean;
  closeIsDeleteEventModal: () => void;
  id: string;
};

const DeleteEventModal = ({
  isDeleteEventModalOpen,
  closeIsDeleteEventModal,
  id,
}: deleteEventModalProps) => {
  const [deleteEvent, { isLoading }] = useDeleteEventMutation();

  const handleDeleteEvent = async () => {
    try {
      const result = await deleteEvent(id);
      if (result?.data?.success) {
        toast.success("Delete successfully");
      } else {
        toast.error("Delete Failed");
      }
      closeIsDeleteEventModal();
    } catch (err) {
      console.log(err);
      toast.error("Delete Failed");
      closeIsDeleteEventModal();
    }
  };

  return (
    <>
      <div className={`modal ${isDeleteEventModalOpen ? "modal-open" : ""} `}>
        <div className="modal-box bg-slate-800 ">
          <h3 className="font-bold text-lg text-sky-50">Delete Event</h3>
          <h4 className="text-sky-50 text-base mt-8">
            Are you sure you want to delete this Event ?
          </h4>
          <div className="flex justify-end gap-2 text-sky-50 mt-8">
            <button
              type="button"
              onClick={() => closeIsDeleteEventModal()}
              className=" cursor-pointer hover:text-sky-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeleteEvent}
              className="bg-lime-600 text-base mt-1 hover:bg-lime-500 text-slate-200 tracking-wide transition duration-300 rounded cursor-pointer px-6 py-1.5"
            >
              {isLoading ? (
                <span className="loading loading-spinner mx-7 loading-md"></span>
              ) : (
                <span>Delete</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteEventModal;
