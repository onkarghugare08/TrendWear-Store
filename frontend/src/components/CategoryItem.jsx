import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const CategoryItem = ({ category }) => {
  return (
    <div className="group relative h-88 sm:h-96 w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl transition-all duration-500 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-900/25">
      <Link to={"/category" + category.href} className="block h-full w-full">
        {/* Background Image */}
        <img
          src={category.imageUrl}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            if (category.fallbackUrl && e.target.src !== category.fallbackUrl) {
              e.target.src = category.fallbackUrl;
            }
          }}
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          {category.badge && (
            <span className="rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-fuchsia-300 shadow">
              {category.badge}
            </span>
          )}
          {category.itemCount && (
            <span className="rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15 px-3 py-1 text-xs font-bold text-gray-200">
              {category.itemCount}
            </span>
          )}
        </div>

        {/* Bottom Content Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex items-end justify-between">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white transition-colors group-hover:text-fuchsia-300">
              {category.name}
            </h3>
            <p className="text-sm sm:text-base text-gray-200 line-clamp-1 mt-1 font-medium">
              {category.description || `Explore trending ${category.name}`}
            </p>
          </div>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-white transition-all duration-300 group-hover:bg-gradient-to-tr group-hover:from-violet-600 group-hover:to-fuchsia-600 group-hover:border-transparent group-hover:scale-110">
            <ArrowUpRight size={22} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
