import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
	cart: [],
	coupon: null,
	total: 0,
	subtotal: 0,
	isCouponApplied: false,

	getMyCoupon: async () => {
		try {
			const response = await axios.get("/coupons");
			set({ coupon: response.data });
		} catch (error) {
			console.error("Error fetching coupon:", error);
		}
	},
	applyCoupon: async (code) => {
		try {
			const response = await axios.post("/coupons/validate", { code });
			set({ coupon: response.data, isCouponApplied: true });
			get().calculateTotals();
			toast.success(`Coupon "${code.toUpperCase()}" applied successfully! 🎉`);
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to apply coupon");
		}
	},
	removeCoupon: () => {
		set({ coupon: null, isCouponApplied: false });
		get().calculateTotals();
		toast.success("Coupon removed");
	},

	getCartItems: async () => {
		try {
			const res = await axios.get("/cart");
			set({ cart: res.data });
			get().calculateTotals();
		} catch (error) {
			set({ cart: [] });
			if (error.response?.status !== 401) {
				toast.error(error.response?.data?.message || "An error occurred");
			}
		}
	},
	clearCart: async () => {
		set({ cart: [], coupon: null, total: 0, subtotal: 0 });
	},
	addToCart: async (product) => {
		try {
			// If it's a real mongo id (length 24 hex), sync with backend
			const isMongoId = /^[0-9a-fA-F]{24}$/.test(product._id);
			if (isMongoId) {
				await axios.post("/cart", { productId: product._id });
			}
			toast.success(`"${product.name}" added to cart! 🛍️`, { id: "cart-add" });

			set((prevState) => {
				const existingItem = prevState.cart.find((item) => item._id === product._id);
				const quantityToAdd = product.quantity || 1;
				const newCart = existingItem
					? prevState.cart.map((item) =>
							item._id === product._id ? { ...item, quantity: item.quantity + quantityToAdd } : item
					  )
					: [...prevState.cart, { ...product, quantity: quantityToAdd }];
				return { cart: newCart };
			});
			get().calculateTotals();
		} catch (error) {
			toast.error(error.response?.data?.message || "Could not add item to cart");
		}
	},
	removeFromCart: async (productId) => {
		try {
			const isMongoId = /^[0-9a-fA-F]{24}$/.test(productId);
			if (isMongoId) {
				await axios.delete(`/cart`, { data: { productId } });
			}
			set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }));
			get().calculateTotals();
			toast.success("Item removed from cart");
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to remove item");
		}
	},
	updateQuantity: async (productId, quantity) => {
		if (quantity <= 0) {
			get().removeFromCart(productId);
			return;
		}

		try {
			const isMongoId = /^[0-9a-fA-F]{24}$/.test(productId);
			if (isMongoId) {
				await axios.put(`/cart/${productId}`, { quantity });
			}
			set((prevState) => ({
				cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
			}));
			get().calculateTotals();
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to update quantity");
		}
	},
	calculateTotals: () => {
		const { cart, coupon } = get();
		const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
		let total = subtotal;

		if (coupon) {
			const discount = subtotal * (coupon.discountPercentage / 100);
			total = subtotal - discount;
		}

		set({ subtotal, total });
	},
}));
