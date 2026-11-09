import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-md shadow-lg transition-all hover:border-slate-700">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Item Image & Title */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <img
            src={item.image}
            alt={item.name}
            className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl object-cover border border-white/5 bg-slate-800 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-violet-500/10 text-violet-300 border border-violet-500/20 mb-1">
              {item.category || "Apparel"}
            </span>
            <h4 className="text-sm sm:text-base font-semibold text-white truncate">
              {item.name}
            </h4>
            <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
              {item.description}
            </p>
            {item.selectedSize && (
              <span className="text-[11px] text-gray-400 mt-1 inline-block">
                Size: <span className="font-semibold text-gray-200">{item.selectedSize}</span>
              </span>
            )}
          </div>
        </div>

        {/* Quantity Controls & Price */}
        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
          {/* Quantity Selector */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 p-1">
            <button
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-300 hover:bg-slate-700 hover:text-white transition"
              aria-label="Decrease quantity"
            >
              <Minus size={13} />
            </button>
            <span className="w-7 text-center text-xs font-bold text-white">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-300 hover:bg-slate-700 hover:text-white transition"
              aria-label="Increase quantity"
            >
              <Plus size={13} />
            </button>
          </div>

          {/* Price */}
          <div className="text-right sm:w-24">
            <span className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            {item.quantity > 1 && (
              <span className="block text-[10px] text-gray-400">
                ${item.price.toFixed(2)} each
              </span>
            )}
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeFromCart(item._id)}
            className="rounded-xl p-2 text-gray-400 hover:bg-rose-500/20 hover:text-rose-400 transition"
            title="Remove item"
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
