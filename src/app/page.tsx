import Category from "@/component/home/Category";
import FeaturedEvents from "@/component/home/FeaturedEvents";
import HomeSearchBar from "@/component/home/HomeSearchBar";

export default function Home() {
  return (
    <div>
      <HomeSearchBar />
      <FeaturedEvents />
      <Category />
    </div>
  );
}
