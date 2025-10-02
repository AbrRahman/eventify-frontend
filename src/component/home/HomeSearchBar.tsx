import { Search } from "lucide-react";

const HomeSearchBar = () => {
  return (
    <div className="bg-slate-900">
      <div className=" container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <h1 className="text-center text-2xl lg:text-4xl text-white">
          Smart Event Discovery Made Simple.
        </h1>
        <div className="mx-auto mt-8 lg:mt-12 w-11/12 lg:w-4/5 relative">
          <input
            className="bg-slate-800 text-white w-full px-5 py-5 rounded-4xl border border-lime-500"
            type="text"
            placeholder="Search events..."
          />
          <button className="absolute right-7 top-1/2 -translate-y-1/2 text-lime-500 hover:text-lime-400 transition cursor-pointer duration-300">
            {" "}
            <Search className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeSearchBar;
