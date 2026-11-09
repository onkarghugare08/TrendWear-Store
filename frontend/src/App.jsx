import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import ScrollToTop from "./components/ScrollToTop";

import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;
    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative selection:bg-fuchsia-600 selection:text-white flex flex-col justify-between overflow-x-hidden">
      {/* Scroll to top automatically on route changes */}
      <ScrollToTop />

      {/* Ambient background glows spanning full width */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[650px] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.18)_0%,rgba(217,70,239,0.1)_45%,rgba(15,23,42,0)_80%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />
        <main className="pt-20 flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/signup"
              element={!user ? <SignUpPage /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <Navigate to="/" />}
            />
            <Route
              path="/secret-dashboard"
              element={
                user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />
              }
            />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route
              path="/cart"
              element={user ? <CartPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/purchase-success"
              element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/purchase-cancel"
              element={user ? <PurchaseCancelPage /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
      </div>

      {/* Modern Luxury Footer (hidden on authentication pages for a focused auth experience) */}
      {!isAuthPage && <Footer />}

      {/* Top-Right Toaster */}
      <Toaster
        position="top-right"
        gutter={8}
        toastOptions={{
          duration: 3500,
          style: {
            background: "#0f172a",
            color: "#f8fafc",
            border: "1px solid rgba(139, 92, 246, 0.35)",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.6)",
            borderRadius: "14px",
            padding: "14px 20px",
            fontSize: "14px",
            fontWeight: 600,
            backdropFilter: "blur(12px)",
          },
          success: {
            iconTheme: {
              primary: "#c084fc",
              secondary: "#0f172a",
            },
          },
          error: {
            iconTheme: {
              primary: "#f43f5e",
              secondary: "#0f172a",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
