import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { Tag, Check, X, Sparkles } from "lucide-react";

const GiftCouponCard = () => {
  const [userInputCode, setUserInputCode] = useState("");
  const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } =
    useCartStore();

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  useEffect(() => {
    if (coupon) setUserInputCode(coupon.code);
  }, [coupon]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!userInputCode.trim()) return;
    applyCoupon(userInputCode.trim());
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setUserInputCode("");
  };

  return (
    <motion.div
      className="rounded-3xl border border-violet-500/20 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
        <div className="p-1.5 rounded-lg bg-fuchsia-500/10 text-fuchsia-400">
          <Tag size={16} />
        </div>
        <h4 className="text-sm font-bold text-white">Promotional Voucher</h4>
      </div>

      <form onSubmit={handleApplyCoupon} className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            id="voucher"
            placeholder="e.g. TREND20"
            value={userInputCode}
            onChange={(e) => setUserInputCode(e.target.value.toUpperCase())}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 px-3.5 text-xs sm:text-sm font-mono uppercase text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
          />
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-600/30 hover:opacity-95 transition whitespace-nowrap"
          >
            Apply
          </button>
        </div>
      </form>

      {/* Applied Coupon Banner */}
      {isCouponApplied && coupon && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check size={16} className="text-emerald-400" />
            <div>
              <p className="text-xs font-bold text-emerald-300">
                {coupon.code} Applied
              </p>
              <p className="text-[11px] text-emerald-400/80">
                You saved {coupon.discountPercentage}% on this purchase!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemoveCoupon}
            className="rounded-lg p-1 text-emerald-400 hover:bg-emerald-500/20 transition"
            title="Remove discount"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Available Coupon Suggestion */}
      {coupon && !isCouponApplied && (
        <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-violet-400" />
            <div>
              <p className="text-xs font-bold text-violet-300">
                Available: {coupon.code}
              </p>
              <p className="text-[11px] text-gray-400">
                Claim {coupon.discountPercentage}% off your order
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => applyCoupon(coupon.code)}
            className="rounded-lg bg-violet-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-violet-500 transition"
          >
            Use Code
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default GiftCouponCard;
