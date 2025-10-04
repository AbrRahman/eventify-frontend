"use client";
import CreateEventModal from "@/component/eventManagement/CreateEventModal";
import DeleteEventModal from "@/component/eventManagement/DeleteEventModal";
import UpdateEventModal from "@/component/eventManagement/UpdateEventModal";
import ProtectedRoute from "@/ProtectedRoute/ProtectedRoute";
import { useGetAllEventQuery } from "@/redux/features/event/eventApi";
import { TEvent } from "@/types/events.types";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
const EventManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteEventModalOpen, setIsDeleteEventModalOpen] = useState(false);
  const [isUpdateEventModalOpen, setIsUpdateEventModalOpen] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState("");
  const [updateEventId, setUpdateEventId] = useState("");

  const { data: events } = useGetAllEventQuery(undefined);
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="bg-slate-900 h-[80vh] overflow-y-auto">
        <div className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-20">
          {" "}
          <h1 className="text-slate-200 text-center pt-4 text-2xl lg:text-3xl ">
            Event Management
          </h1>
          <div className="mt-4">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="text-white bg-ca px-3 bg-lime-600 py-1 hover:bg-lime-500 cursor-pointer transition duration-300 flex items-center justify-center gap-3.5"
            >
              <FaPlus className="size-4" />
              Add a Event
            </button>
          </div>
          <div className="overflow-x-auto mt-5 lg:mt-8">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-slate-800 text-slate-200 border-b border-gray-400">
                  <th>Event Name</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Organizer</th>
                  <th>Seats</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events?.map((event: TEvent) => (
                  <tr key={event?._id} className="bg-slate-800 text-slate-200">
                    <td className="">{event?.title}</td>
                    <td className="">{event?.category}</td>
                    <td className="">{event?.date}</td>
                    <td className="">{event?.organizer}</td>
                    <td className="">{event?.seats}</td>
                    <td className="">{event?.price}</td>
                    <td>
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setUpdateEventId(event?._id);
                            setIsUpdateEventModalOpen(true);
                          }}
                          className="text-white bg-violet-500 px-3 py-1 hover:bg-violet-600 cursor-pointer transition duration-300"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => {
                            setDeleteEventId(event?._id);
                            setIsDeleteEventModalOpen(true);
                          }}
                          className="text-white whitespace-nowrap bg-red-500 px-3 py-1 hover:bg-red-600 cursor-pointer transition duration-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/*  create event modal */}
        <CreateEventModal
          isCreateModalOpen={isCreateModalOpen}
          closeCreateModal={() => setIsCreateModalOpen(false)}
        />
        {/* delete Event modal */}
        <DeleteEventModal
          isDeleteEventModalOpen={isDeleteEventModalOpen}
          closeIsDeleteEventModal={() => setIsDeleteEventModalOpen(false)}
          id={deleteEventId}
        />

        {/* edit event modal */}
        {isUpdateEventModalOpen && (
          <UpdateEventModal
            isUpdateModalOpen={isUpdateEventModalOpen}
            closeUpdateModal={() => setIsUpdateEventModalOpen(false)}
            id={updateEventId}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default EventManagement;
