const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="relative flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-violet-500/20 border-t-fuchsia-500 rounded-full animate-spin" />
        <div className="mt-4 text-sm font-bold uppercase tracking-widest text-violet-300 animate-pulse">
          Loading TrendWear...
        </div>
      </div>
    </div>
  );
};

export { LoadingSpinner };
export default LoadingSpinner;
