import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Mail, ShieldCheck, Truck, RotateCcw, Headphones, Heart } from "lucide-react";
import toast from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thank you for subscribing to TrendWear VIP drops! 🎁", {
      id: "newsletter",
    });
    setEmail("");
  };

  return (
    <footer className="relative mt-20 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl text-gray-300">
      {/* Value props bar */}
      <div className="border-b border-slate-800/60 bg-slate-900/40">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
                <Truck size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Free Express Shipping</h4>
                <p className="text-xs text-gray-400">On all orders over $99</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="p-2.5 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">100% Genuine Apparel</h4>
                <p className="text-xs text-gray-400">Verified luxury curation</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
                <RotateCcw size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">30-Day Hassle Returns</h4>
                <p className="text-xs text-gray-400">Instant store credit or refund</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Headphones size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">24/7 Dedicated Support</h4>
                <p className="text-xs text-gray-400">Priority concierge team</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-2xl font-black tracking-tight">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-600/30">
                <Sparkles size={18} />
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-200 to-fuchsia-400">
                TrendWear
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Curating forward-thinking street fashion, luxury essentials, and statement silhouettes. Designed for the modern trendsetter.
            </p>
            {/* Newsletter form */}
            <form onSubmit={handleSubscribe} className="space-y-2 pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
                Subscribe for 15% off your first drop
              </span>
              <div className="flex max-w-md gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 pl-9 pr-3 text-sm text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-600/30 hover:opacity-95 transition whitespace-nowrap"
                >
                  Join VIP
                </button>
              </div>
            </form>
          </div>

          {/* Quick Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Trending Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/category/t-shirts" className="hover:text-fuchsia-400 transition">
                  T-Shirts & Tops
                </Link>
              </li>
              <li>
                <Link to="/category/shoes" className="hover:text-fuchsia-400 transition">
                  Shoes & Footwear
                </Link>
              </li>
              <li>
                <Link to="/category/jeans" className="hover:text-fuchsia-400 transition">
                  Jeans & Denim
                </Link>
              </li>
              <li>
                <Link to="/category/jackets" className="hover:text-fuchsia-400 transition">
                  Jackets & Outerwear
                </Link>
              </li>
              <li>
                <Link to="/category/watches" className="hover:text-fuchsia-400 transition">
                  Watches & Luxury
                </Link>
              </li>
            </ul>
          </div>

          {/* More collections */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Collections
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/category/suits" className="hover:text-fuchsia-400 transition">
                  Suits & Formals
                </Link>
              </li>
              <li>
                <Link to="/category/hoodies" className="hover:text-fuchsia-400 transition">
                  Hoodies & Sweats
                </Link>
              </li>
              <li>
                <Link to="/category/bags" className="hover:text-fuchsia-400 transition">
                  Bags & Travel
                </Link>
              </li>
              <li>
                <Link to="/category/jewelry" className="hover:text-fuchsia-400 transition">
                  Jewelry & Chains
                </Link>
              </li>
              <li>
                <Link to="/category/glasses" className="hover:text-fuchsia-400 transition">
                  Glasses & Shades
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Customer Care
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/cart" className="hover:text-fuchsia-400 transition">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <a href="#support" onClick={(e) => { e.preventDefault(); toast("Support email: concierge@trendwear.fashion", { icon: "📧" }); }} className="hover:text-fuchsia-400 transition">
                  Concierge Support
                </a>
              </li>
              <li>
                <a href="#track" onClick={(e) => { e.preventDefault(); toast("Order tracking is active on your profile!", { icon: "📦" }); }} className="hover:text-fuchsia-400 transition">
                  Track Your Package
                </a>
              </li>
              <li>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full inline-block mt-2">
                  Stripe SSL Encrypted
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} TrendWear Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart size={13} className="text-fuchsia-500" fill="currentColor" /> for ultimate fashion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

