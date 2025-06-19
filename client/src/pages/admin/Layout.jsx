import { Outlet, useNavigate } from "react-router";
import { lazy, Suspense } from "react";

import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext.jsx";

const Loader = lazy(() => import("../../components/Loader.jsx"));
const Sidebar = lazy(() => import("../../components/Admin/Sidebar.jsx"));

const Layout = () => {
  const navigate = useNavigate();

  const { axios, setToken } = useAppContext();

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null);
    navigate("/");
  };

  return (
    <>
      {/*//-> navbar */}
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200">
        <img
          src={assets.logo}
          alt=""
          onClick={() => navigate("/")}
          className="w-32 sm:w-40 cursor-pointer"
        />
        <button
          onClick={logout}
          className="text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div className="flex h-[calc(100vh - 70px)]">
        <Suspense fallback={Loader}>
          <Sidebar />
        </Suspense>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
