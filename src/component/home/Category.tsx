import {
  Music,
  Cpu,
  Trophy,
  Briefcase,
  HeartPulse,
  Palette,
  Utensils,
  Clapperboard,
  Leaf,
} from "lucide-react";

const Category = () => {
  const categories = [
    { name: "Music", Icon: Music, color: "#9D4EDD" },
    { name: "Tech", Icon: Cpu, color: "#00B4D8" },
    { name: "Sports", Icon: Trophy, color: "#F77F00" },
    { name: "Business", Icon: Briefcase, color: "#4361EE" },
    { name: "Health", Icon: HeartPulse, color: "#06D6A0" },
    { name: "Art", Icon: Palette, color: "#F72585" },
    { name: "Food", Icon: Utensils, color: "#9B2226" },
    { name: "Entertainment", Icon: Clapperboard, color: "#FFB703" },
    { name: "Environment", Icon: Leaf, color: "#2A9D8F" },
  ];

  return (
    <div className="bg-slate-900">
      <div className="container mx-auto px-4 lg:px-8 pb-12 lg:pb-20">
        <h1 className="text-slate-200 text-2xl lg:text-3xl">Category</h1>
        <div className="flex flex-wrap mt-8 lg:mt-12 gap-3 lg:gap-4">
          {categories?.map(({ name, Icon, color }, index) => (
            <div key={index} className="tooltip" data-tip={name}>
              <div
                className="w-12 h-12 lg:w-20 lg:h-20 rounded-full flex items-center justify-center text-slate-200 cursor-pointer"
                style={{ backgroundColor: color }}
              >
                <Icon className="w-5 h-5 lg:w-8 lg:h-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
