const Loader = () => {
  return (
    <div className="flex  flex-col justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-white border-gray-700 mb-4"></div>
      <h1 className="font-bold text-3xl ">Loading...</h1>
    </div>
  );
};

export default Loader;
