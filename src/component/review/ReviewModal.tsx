"use client";

import { useAppSelector } from "@/redux/features/hooks";
import { useSubmitReviewMutation } from "@/redux/features/review/reviewApi";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type ReviewModalProps = {
  isReviewModalOpen: boolean;
  closeIsReviewModal: () => void;
  id: string;
};
type TReviewInput = {
  comment: string;
};

const ReviewModal = ({
  isReviewModalOpen,
  closeIsReviewModal,
  id,
}: ReviewModalProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const [rating, setRating] = useState(1.5);

  const [submitReview, { isLoading }] = useSubmitReviewMutation();

  const { register, handleSubmit, reset } = useForm<TReviewInput>();

  const handelReview: SubmitHandler<TReviewInput> = async (data) => {
    try {
      const result = await submitReview({
        comment: data?.comment,
        rating: rating,
        user: user?._id,
        event: id,
      });
      if (result && result?.data?.success) {
        toast.success("Review submitted successfully!");
        reset();
        setRating(1.5);
        closeIsReviewModal();
      }
    } catch (err) {
      toast.error("Review submitted Failed!");
      console.log(err);
    }
  };

  return (
    <>
      <div className={`modal ${isReviewModalOpen ? "modal-open" : ""} `}>
        <div className="modal-box bg-slate-800 ">
          <h3 className="font-bold text-lg text-sky-50">Give a review</h3>
          <form
            onSubmit={handleSubmit(handelReview)}
            className="space-y-4 lg:space-y-6"
          >
            {/* rating star */}
            <div>
              <div
                className="rating rating-lg rating-half text-lg"
                onChange={(e) =>
                  setRating(Number((e.target as HTMLInputElement).value))
                }
              >
                <input
                  type="radio"
                  name="rating-11"
                  className="rating-hidden"
                />
                <input
                  type="radio"
                  name="rating-11"
                  className="mask mask-star-2 mask-half-1 bg-cyan-500"
                  aria-label="0.5 star"
                  value={0.5}
                />
                <input
                  type="radio"
                  name="rating-11"
                  className="mask mask-star-2 mask-half-2 bg-cyan-500"
                  aria-label="1 star"
                  value={1}
                />
                <input
                  type="radio"
                  name="rating-11"
                  className="mask mask-star-2 mask-half-1 bg-cyan-500"
                  aria-label="1.5 star"
                  value={1.5}
                  defaultChecked={rating == 1.5}
                />
                <input
                  type="radio"
                  name="rating-11"
                  className="mask mask-star-2 mask-half-2 bg-cyan-500"
                  aria-label="2 star"
                  value={2}
                />
                <input
                  type="radio"
                  name="rating-11"
                  className="mask mask-star-2 mask-half-1 bg-cyan-500"
                  aria-label="2.5 star"
                  value={2.5}
                />
                <input
                  type="radio"
                  name="rating-11"
                  className="mask mask-star-2 mask-half-2 bg-cyan-500"
                  aria-label="3 star"
                  value={3}
                />
                <input
                  type="radio"
                  name="rating-11"
                  className="mask mask-star-2 mask-half-1 bg-cyan-500"
                  aria-label="3.5 star"
                  value={3.5}
                />
                <input
                  type="radio"
                  name="rating-11"
                  className="mask mask-star-2 mask-half-2 bg-cyan-500"
                  aria-label="4 star"
                  value={4}
                />
                <input
                  type="radio"
                  name="rating-11"
                  className="mask mask-star-2 mask-half-1 bg-cyan-500"
                  aria-label="4.5 star"
                  value={4.5}
                />
                <input
                  type="radio"
                  name="rating-11"
                  className="mask mask-star-2 mask-half-2 bg-cyan-500"
                  aria-label="5 star"
                  value={5}
                />
              </div>
            </div>
            {/* text input */}
            <div>
              <textarea
                {...register("comment")}
                placeholder="Write your feedback..."
                className="bg-slate-900 text-slate-400 px-2.5 py-1.5 w-full border-lime-500 border rounded"
              ></textarea>
            </div>
            <div className="flex justify-end gap-2 text-sky-50 mt-8">
              <button
                type="button"
                onClick={() => closeIsReviewModal()}
                className=" cursor-pointer hover:text-sky-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-lime-600 text-base mt-1 hover:bg-lime-500 text-slate-200 tracking-wide transition duration-300 rounded cursor-pointer px-6 py-1.5"
              >
                {isLoading ? (
                  <span className="loading loading-spinner mx-14 loading-md"></span>
                ) : (
                  <span> Submit a Review</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;
