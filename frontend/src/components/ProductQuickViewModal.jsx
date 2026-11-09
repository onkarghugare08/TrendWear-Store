import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { useWishlistStore } from "../stores/useWishlistStore";

const ProductQuickViewModal = ({ isOpen, onClose, product, onAddToCartClick }) => {
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  if (!isOpen || !product) return null;

  const isFavorited = isInWishlist(product._id);
  const rating = product.rating || 4.9;
  const reviewsCount = product.reviewsCount || 84;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-violet-500/30 bg-slate-900/98 shadow-2xl backdrop-blur-2xl"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 rounded-full bg-slate-800/90 p-2.5 text-gray-200 transition-colors hover:bg-slate-700 hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image side */}
            <div className="relative h-80 md:h-full min-h-[380px] bg-slate-800 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-5 left-5 flex flex-col gap-2">
                {product.badge && (
                  <span className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                    {product.badge}
                  </span>
                )}
                {product.isFeatured && (
                  <span className="rounded-full bg-amber-400 backdrop-blur-sm px-3 py-1 text-xs font-bold text-slate-950">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Details side */}
            <div className="p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-violet-400">
                    {product.category || "Collection"}
                  </span>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`rounded-full p-2.5 transition ${
                      isFavorited
                        ? "bg-rose-500/20 text-rose-500"
                        : "bg-slate-800 text-gray-400 hover:text-white"
                    }`}
                    title={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart size={20} fill={isFavorited ? "currentColor" : "none"} />
                  </button>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={17}
                        fill="currentColor"
                        className={i < Math.floor(rating) ? "text-amber-400" : "text-slate-600"}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-white">{rating}</span>
                  <span className="text-sm text-gray-400">({reviewsCount} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
                    ${product.price?.toFixed(2)}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                    In Stock
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Perks Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-300 mb-8 border-t border-slate-800 pt-5">
                  <div className="flex items-center gap-2">
                    <Truck size={17} className="text-violet-400 shrink-0" />
                    <span>Free express delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={17} className="text-violet-400 shrink-0" />
                    <span>100% Authentic guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw size={17} className="text-violet-400 shrink-0" />
                    <span>30-day easy returns</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onAddToCartClick(product);
                  }}
                  className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 py-4 px-6 text-base font-bold text-white shadow-xl shadow-violet-600/30 transition hover:opacity-95"
                >
                  <ShoppingBag size={20} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductQuickViewModal;
