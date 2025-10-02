import { TReview } from "@/types/review.types";
import ReviewCard from "./ReviewCard";

const RecentReviews = () => {
  const reviews = [
    {
      _id: 1,
      name: "Emily Carter",
      rating: 5,
      comment:
        "Amazing event! The atmosphere was electric and everything was organized perfectly.",
    },
    {
      _id: 2,
      name: "James Rodriguez",
      rating: 4,
      comment:
        "Great experience overall, though the seating could have been more comfortable.",
    },
    {
      _id: 3,
      name: "Sophia Lee",
      rating: 5,
      comment:
        "Loved it! The performances were top-notch and I’ll definitely attend again.",
    },
    {
      _id: 4,
      name: "Michael Johnson",
      rating: 3,
      comment:
        "The event was decent, but it started late which was a bit frustrating.",
    },
    {
      _id: 5,
      name: "Olivia Brown",
      rating: 4,
      comment: "Good vibes, great crowd, and smooth registration process!",
    },
    {
      _id: 6,
      name: "William Davis",
      rating: 2,
      comment:
        "Not very well organized, and the food stalls ran out too quickly.",
    },
    {
      _id: 7,
      name: "Ava Wilson",
      rating: 5,
      comment:
        "Incredible! Everything from the music to the venue was perfect.",
    },
    {
      _id: 8,
      name: "Daniel Thompson",
      rating: 4,
      comment:
        "Solid event with good networking opportunities. Could use more variety in food options.",
    },
  ];

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
