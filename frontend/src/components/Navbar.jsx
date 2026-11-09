import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  Sparkles,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useWishlistStore } from "../stores/useWishlistStore";
import ConfirmLogoutModal from "./ConfirmLogoutModal";
import WishlistModal from "./WishlistModal";
import AddToCartModal from "./AddToCartModal";
import { CATEGORIES } from "../data/categories";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart, addToCart } = useCartStore();
  const { wishlist } = useWishlistStore();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);

  // Quick add from wishlist modal
  const [selectedProductForCart, setSelectedProductForCart] = useState(null);
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);

  const totalCartItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    logout();
  };

  const handleOpenAddToCart = (product) => {
    setSelectedProductForCart(product);
    setIsAddToCartModalOpen(true);
  };

  const handleConfirmAddToCart = async (productWithOptions) => {
    await addToCart(productWithOptions);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl transition-all duration-300">
        {/* Full-width container from left to right edge */}
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo - starts cleanly on the left side */}
            <Link
              to="/"
              className="flex items-center gap-3 group shrink-0"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-pink-500 text-white shadow-xl shadow-violet-600/30 transition-transform duration-300 group-hover:scale-105">
                <Sparkles size={22} className="animate-pulse" />
              </div>
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Trend<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500">Wear</span>
              </span>
            </Link>

            {/* Desktop Navigation Links - Centered */}
            <nav className="hidden md:flex items-center gap-10">
              <Link
                to="/"
                className={`text-base sm:text-lg font-bold transition-all relative py-1 ${
                  isActive("/")
                    ? "text-fuchsia-400"
                    : "text-gray-200 hover:text-fuchsia-400"
                }`}
              >
                Home
                {isActive("/") && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
                )}
              </Link>

              {/* Categories dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
                onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-base sm:text-lg font-bold text-gray-200 hover:text-fuchsia-400 transition-colors py-2"
                >
                  <span>Categories</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      isCategoriesDropdownOpen ? "rotate-180 text-fuchsia-400" : ""
                    }`}
                  />
                </button>

                {isCategoriesDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-96 rounded-3xl border border-violet-500/25 bg-slate-900/98 p-4 shadow-2xl backdrop-blur-2xl grid grid-cols-2 gap-2.5 animate-in fade-in-50 zoom-in-95 duration-150 z-50">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category${cat.href}`}
                        onClick={() => setIsCategoriesDropdownOpen(false)}
                        className="flex items-center gap-2.5 p-2.5 rounded-xl text-sm font-semibold text-gray-200 hover:text-white hover:bg-violet-600/25 transition"
                      >
                        <span className="h-2 w-2 rounded-full bg-fuchsia-500 shrink-0" />
                        <span className="truncate">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {isAdmin && (
                <Link
                  to="/secret-dashboard"
                  className={`flex items-center gap-2 text-sm sm:text-base font-bold px-4 py-2 rounded-2xl border transition-all ${
                    isActive("/secret-dashboard")
                      ? "border-violet-500 bg-violet-600/30 text-violet-200 shadow-md shadow-violet-600/20"
                      : "border-violet-500/40 bg-violet-500/15 text-violet-300 hover:bg-violet-500/25"
                  }`}
                >
                  <Lock size={16} />
                  <span>Dashboard</span>
                </Link>
              )}
            </nav>

            {/* Right side actions - aligned cleanly to the right edge */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => setIsWishlistOpen(true)}
                className="relative rounded-2xl p-2.5 text-gray-200 hover:text-white hover:bg-slate-800 transition"
                title="Wishlist"
              >
                <Heart size={22} className={wishlist.length > 0 ? "text-rose-400" : ""} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[11px] font-bold text-white shadow-md shadow-rose-500/30">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              {user && (
                <Link
                  to="/cart"
                  className="relative rounded-2xl p-2.5 text-gray-200 hover:text-white hover:bg-slate-800 transition"
                  title="Shopping Cart"
                >
                  <ShoppingCart size={22} />
                  {totalCartItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-[11px] font-bold text-white shadow-md shadow-violet-600/30 animate-pulse">
                      {totalCartItems}
                    </span>
                  )}
                </Link>
              )}

              {/* User profile / Auth buttons */}
              {user ? (
                <div className="flex items-center gap-3.5 pl-3 border-l border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-sm font-bold text-white shadow-inner">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <span className="text-sm sm:text-base font-bold text-gray-200 hidden lg:inline max-w-[140px] truncate">
                      {user.name}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-sm font-bold text-gray-200 hover:bg-rose-500/20 hover:border-rose-500/40 hover:text-rose-400 transition"
                    title="Log Out"
                  >
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
                  <Link
                    to="/login"
                    className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800/90 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-700 hover:border-slate-600 transition"
                  >
                    <LogIn size={16} />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-600/30 hover:opacity-95 transition"
                  >
                    <UserPlus size={16} />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Controls */}
            <div className="flex md:hidden items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsWishlistOpen(true)}
                className="relative rounded-xl p-2 text-gray-200 hover:text-white"
              >
                <Heart size={22} className={wishlist.length > 0 ? "text-rose-400" : ""} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {user && (
                <Link
                  to="/cart"
                  className="relative rounded-xl p-2 text-gray-200 hover:text-white"
                >
                  <ShoppingCart size={22} />
                  {totalCartItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-fuchsia-500 text-[10px] font-bold text-white">
                      {totalCartItems}
                    </span>
                  )}
                </Link>
              )}

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-xl border border-slate-700 bg-slate-800/90 p-2.5 text-gray-200 hover:text-white"
                aria-label="Toggle navigation"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800/80 bg-slate-950/98 backdrop-blur-2xl px-5 pt-5 pb-7 space-y-5">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-3 rounded-xl text-base font-bold ${
                  isActive("/") ? "bg-violet-600/20 text-fuchsia-400" : "text-gray-200 hover:bg-slate-800/60"
                }`}
              >
                Home
              </Link>
              {isAdmin && (
                <Link
                  to="/secret-dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl text-base font-bold ${
                    isActive("/secret-dashboard")
                      ? "bg-violet-600/20 text-violet-300"
                      : "text-violet-400 hover:bg-slate-800/60"
                  }`}
                >
                  <Lock size={18} />
                  <span>Admin Dashboard</span>
                </Link>
              )}
            </nav>

            {/* Quick Categories Bar in Mobile */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 px-1 mb-2.5">
                Browse Collections
              </p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.slice(0, 8).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category${cat.href}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm font-semibold text-gray-200 hover:text-white hover:border-violet-500/50"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Auth Actions in Mobile */}
            <div className="pt-3 border-t border-slate-800/80">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-sm font-bold text-white">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <p className="text-base font-bold text-white">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate max-w-[160px]">{user.email}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsLogoutModalOpen(true);
                    }}
                    className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm font-bold text-rose-400 hover:bg-rose-500/20"
                  >
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 py-3 text-sm font-bold text-white"
                  >
                    <LogIn size={16} />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-sm font-bold text-white"
                  >
                    <UserPlus size={16} />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Logout Confirmation Modal */}
      <ConfirmLogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        userName={user?.name}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onAddToCartClick={handleOpenAddToCart}
      />

      {/* Add To Cart Confirmation Modal */}
      <AddToCartModal
        isOpen={isAddToCartModalOpen}
        onClose={() => setIsAddToCartModalOpen(false)}
        onConfirm={handleConfirmAddToCart}
        product={selectedProductForCart}
      />
    </>
  );
};

export default Navbar;
