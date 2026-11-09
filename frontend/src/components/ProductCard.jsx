import { useState } from "react";
import toast from "react-hot-toast";
import { ShoppingBag, Eye, Heart, Star, Sparkles } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useWishlistStore } from "../stores/useWishlistStore";
import AddToCartModal from "./AddToCartModal";
import ProductQuickViewModal from "./ProductQuickViewModal";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const isFavorited = isInWishlist(product._id);
  const rating = product.rating || 4.9;
  const reviewsCount = product.reviewsCount || 48;

  const handleInitiateAdd = (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to add products to your bag", { id: "login-prompt" });
      return;
    }
    setIsAddModalOpen(true);
  };

  const handleConfirmAddToCart = async (itemWithOptions) => {
    await addToCart(itemWithOptions);
  };

  const handleToggleFav = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <>
      <div className="group relative flex w-full flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-900/25">
        {/* Product Image Area */}
        <div className="relative aspect-[4/4.8] w-full overflow-hidden bg-slate-800">
          <img
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            src={product.image}
            alt={product.name}
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/25 opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Badges */}
          <div className="absolute top-3.5 left-3.5 flex flex-col gap-2 z-10">
            {product.badge && (
              <span className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                {product.badge}
              </span>
            )}
            {product.isFeatured && (
              <span className="flex items-center gap-1 rounded-full bg-amber-400 backdrop-blur-sm px-2.5 py-1 text-xs font-bold text-slate-950 shadow">
                <Sparkles size={12} /> Featured
              </span>
            )}
          </div>

          {/* Floating Action: Wishlist */}
          <button
            onClick={handleToggleFav}
            className={`absolute top-3.5 right-3.5 z-10 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-transform duration-200 hover:scale-110 ${
              isFavorited
                ? "bg-rose-500 text-white shadow-lg shadow-rose-500/40"
                : "bg-slate-950/70 text-gray-200 hover:bg-slate-900 hover:text-white"
            }`}
            title={isFavorited ? "Remove from wishlist" : "Save to wishlist"}
            aria-label="Wishlist"
          >
            <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
          </button>

          {/* Quick View Button on Hover */}
          <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 px-5">
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950/90 py-2.5 px-4 text-sm font-bold text-white backdrop-blur-md border border-white/15 shadow-xl hover:bg-violet-600 hover:border-violet-500 transition-colors"
            >
              <Eye size={16} /> Quick View
            </button>
          </div>
        </div>

        {/* Card Content */}
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            {/* Category Tag & Rating */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-violet-400">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-400">
                <Star size={14} fill="currentColor" />
                <span>{rating}</span>
                <span className="text-gray-400 font-normal">({reviewsCount})</span>
              </div>
            </div>

            {/* Product Title */}
            <h3
              onClick={() => setIsQuickViewOpen(true)}
              className="text-lg sm:text-xl font-bold text-white line-clamp-1 hover:text-fuchsia-400 transition-colors cursor-pointer"
              title={product.name}
            >
              {product.name}
            </h3>

            {/* Description */}
            <p className="mt-1.5 text-sm text-gray-300 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing & Add To Bag */}
          <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <div>
              <span className="text-xs text-gray-400 block font-medium">Price</span>
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300">
                ${product.price?.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleInitiateAdd}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 py-2.5 px-5 text-sm font-bold text-white shadow-lg shadow-violet-600/30 transition-all hover:scale-105 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              title="Add to shopping bag"
            >
              <ShoppingBag size={16} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Add to Cart */}
      <AddToCartModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={handleConfirmAddToCart}
        product={product}
      />

      {/* Quick View Modal */}
      <ProductQuickViewModal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={product}
        onAddToCartClick={() => setIsAddModalOpen(true)}
      />
    </>
  );
};

export default ProductCard;
