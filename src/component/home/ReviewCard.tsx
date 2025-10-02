import { TReview } from "@/types/review.types";
import { User } from "lucide-react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
type TRatingProps = {
  value: number;
  outOf?: number;
};
const ReviewCard = ({ review }: { review: TReview }) => {
  const Rating = ({ value, outOf = 5 }: TRatingProps) => {
    const star = [];
    for (let i = 1; i <= outOf; i++) {
      if (i <= value) {
        star.push(<FaStar key={i} className="text-yellow-400 text-xl" />);
      } else if (i === Math.ceil(value) && !Number.isInteger(value)) {
        star.push(
          <FaStarHalfAlt key={i} className="text-yellow-400 text-xl" />
        );
      } else {
        star.push(<FaRegStar key={i} className="text-yellow-400 text-xl" />);
      }
    }
    return <div className="flex space-x-1">{star}</div>;
  };

  return (
    <div>
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg space-y-2">
        <Rating value={Number(review?.rating)} />
        <p className="text-slate-400 text-base font-semibold  tracking-wide">
          {review?.comment?.length >= 40
            ? `${review?.comment?.slice(0, 40)}...`
            : review?.comment}
        </p>
        <div className="flex gap-3 items-center">
          <User className="w-10 h-10 rounded-full text-violet-500" />
          <h1 className="text-slate-200 text-base font-bold mt-1">
            {review?.name}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
