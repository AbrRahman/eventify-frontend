"use client";
import { TReview } from "@/types/review.types";
import ReviewCard from "./ReviewCard";
import { useGetAllReviewQuery } from "@/redux/features/review/reviewApi";

const RecentReviews = () => {
  const { data: reviews } = useGetAllReviewQuery(undefined);

  return (
    <div className="bg-slate-900">
      <div className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-20">
        <h1 className="text-slate-200 text-2xl lg:text-3xl">Recent Reviews</h1>
        <div className="grid gap-3 grid-cols-1 lg:grid-cols-4 mt-8 lg:mt-12">
          {reviews?.map((review: TReview) => (
            <ReviewCard key={review?._id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentReviews;
