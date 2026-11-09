import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlistStore } from "../stores/useWishlistStore";
import { Link } from "react-router-dom";

const WishlistModal = ({ isOpen, onClose, onAddToCartClick }) => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlistStore();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          className="relative z-10 w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden rounded-2xl border border-violet-500/20 bg-slate-900/95 shadow-2xl backdrop-blur-xl"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 p-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                <Heart size={18} fill="currentColor" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Your Wishlist</h3>
                <p className="text-xs text-gray-400">
                  {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {wishlist.length > 0 && (
                <button
                  onClick={clearWishlist}
                  className="text-xs text-gray-400 hover:text-rose-400 transition mr-2"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-gray-400 transition hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {wishlist.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-gray-500">
                  <Heart size={24} />
                </div>
                <h4 className="text-base font-semibold text-white">Your wishlist is empty</h4>
                <p className="text-xs text-gray-400 max-w-xs mx-auto mt-1 mb-5">
                  Save your favorite styles and check back anytime for sales and restocks.
                </p>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-violet-600/20 hover:opacity-95"
                >
                  Explore Collections <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              wishlist.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/40 p-3 transition hover:border-slate-700"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg object-cover border border-white/5"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate">
                      {item.name}
                    </h4>
                    <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                      ${item.price?.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        onAddToCartClick(item);
                      }}
                      className="flex items-center gap-1 rounded-lg bg-violet-600/20 border border-violet-500/30 px-3 py-1.5 text-xs font-semibold text-violet-300 transition hover:bg-violet-600 hover:text-white"
                      title="Add to cart"
                    >
                      <ShoppingBag size={14} />
                      <span className="hidden sm:inline">Add</span>
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item._id)}
                      className="rounded-lg p-1.5 text-gray-400 transition hover:bg-rose-500/20 hover:text-rose-400"
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WishlistModal;

