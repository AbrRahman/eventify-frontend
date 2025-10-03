"use client";
import BookingCancelModal from "@/component/booking/BookingCancelModal";
import ReviewModal from "@/component/review/ReviewModal";
import { useGetAllMyBookingQuery } from "@/redux/features/eventRegistration/eventBookingApi";
import { TBooking } from "@/types/booking.type";
import React, { useState } from "react";

const MyBooking = () => {
  const [isBookingCancelModalOpen, setIsBookingCancelModalOpen] =
    useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [deleteBookingId, setDeleteBookingId] = useState("");
  const [reviewEventId, setReviewEventId] = useState("");

  const { data: booking } = useGetAllMyBookingQuery(undefined);
  return (
    <>
      <div className="bg-slate-900 h-[80vh] overflow-y-auto">
        <div className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-20">
          {" "}
          <h1 className="text-slate-200 text-center pt-4 text-2xl lg:text-3xl">
            My Booking
          </h1>
          <div className="overflow-x-auto mt-8 lg:mt-12">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-slate-800 text-slate-200 border-b border-gray-400">
                  <th>Event Name</th>
                  <th>Event Date</th>
                  <th>Number of tickets</th>

                  <th>Payment status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {booking?.map((bookingItem: TBooking) => (
                  <tr
                    key={bookingItem?._id}
                    className="bg-slate-800 text-slate-200"
                  >
                    <th>{bookingItem?.event?.title}</th>

                    <td className="whitespace-nowrap">
                      {bookingItem?.event?.date}
                    </td>
                    <td>{bookingItem?.event?.title}</td>
                    <td>{bookingItem?.paymentStatus}</td>
                    <td>
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setIsBookingCancelModalOpen(true);
                            setDeleteBookingId(bookingItem?._id);
                          }}
                          className="text-white bg-amber-400 px-3 py-1 hover:bg-amber-500 cursor-pointer transition duration-300"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            setIsReviewModalOpen(true);
                            setReviewEventId(bookingItem?._id);
                          }}
                          className="text-white whitespace-nowrap bg-violet-400 px-3 py-1 hover:bg-violet-500 cursor-pointer transition duration-300"
                        >
                          Write a Review
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* delete booking modal */}
        <BookingCancelModal
          isBookingCancelModalOpen={isBookingCancelModalOpen}
          closeIsBookingCancelModal={() => setIsBookingCancelModalOpen(false)}
          id={deleteBookingId}
        />

        {/* edit event modal */}
        {isReviewModalOpen && (
          <ReviewModal
            isReviewModalOpen={isReviewModalOpen}
            closeIsReviewModal={() => setIsReviewModalOpen(false)}
            id={reviewEventId}
          />
        )}
      </div>
    </>
  );
};

export default MyBooking;
