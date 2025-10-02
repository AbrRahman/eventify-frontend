import Category from "@/component/home/Category";
import FeaturedEvents from "@/component/home/FeaturedEvents";
import HomeSearchBar from "@/component/home/HomeSearchBar";
import RecentReviews from "@/component/home/RecentReviews";

export default function Home() {
  return (
    <div>
      <HomeSearchBar />
      <FeaturedEvents />
      <Category />
      <RecentReviews />
    </div>
  );
}
