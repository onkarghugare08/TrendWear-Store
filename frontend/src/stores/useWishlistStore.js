import { create } from "zustand";
import toast from "react-hot-toast";

export const useWishlistStore = create((set, get) => ({
  wishlist: JSON.parse(localStorage.getItem("trendwear_wishlist") || "[]"),

  isInWishlist: (productId) => {
    return get().wishlist.some((item) => item._id === productId);
  },

  toggleWishlist: (product) => {
    const { wishlist } = get();
    const exists = wishlist.some((item) => item._id === product._id);

    let updatedWishlist;
    if (exists) {
      updatedWishlist = wishlist.filter((item) => item._id !== product._id);
      toast.success(`Removed "${product.name}" from your wishlist!`, {
        icon: "💔",
      });
    } else {
      updatedWishlist = [...wishlist, product];
      toast.success(`Added "${product.name}" to your wishlist!`, {
        icon: "💖",
      });
    }

    localStorage.setItem("trendwear_wishlist", JSON.stringify(updatedWishlist));
    set({ wishlist: updatedWishlist });
  },

  removeFromWishlist: (productId) => {
    const { wishlist } = get();
    const target = wishlist.find((i) => i._id === productId);
    const updatedWishlist = wishlist.filter((item) => item._id !== productId);
    localStorage.setItem("trendwear_wishlist", JSON.stringify(updatedWishlist));
    set({ wishlist: updatedWishlist });
    if (target) {
      toast.success(`Removed "${target.name}" from wishlist!`);
    }
  },

  clearWishlist: () => {
    localStorage.removeItem("trendwear_wishlist");
    set({ wishlist: [] });
    toast.success("Wishlist cleared");
  },
}));

