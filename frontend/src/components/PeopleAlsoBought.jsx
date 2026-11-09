import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import { Sparkles } from "lucide-react";
import { MOCK_PRODUCTS } from "../data/mockProducts";

const PeopleAlsoBought = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get("/products/recommendations");
        if (res.data && res.data.length > 0) {
          setRecommendations(res.data);
        } else {
          // Curated fallback
          setRecommendations([
            ...(MOCK_PRODUCTS["shoes"]?.slice(0, 1) || []),
            ...(MOCK_PRODUCTS["jackets"]?.slice(0, 1) || []),
            ...(MOCK_PRODUCTS["glasses"]?.slice(0, 1) || []),
          ]);
        }
      } catch (error) {
        // Soft fallback
        setRecommendations([
          ...(MOCK_PRODUCTS["shoes"]?.slice(0, 1) || []),
          ...(MOCK_PRODUCTS["jackets"]?.slice(0, 1) || []),
          ...(MOCK_PRODUCTS["glasses"]?.slice(0, 1) || []),
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (isLoading || recommendations.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-slate-800">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400">
          <Sparkles size={18} />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          People Also Paired With
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PeopleAlsoBought;
