import { createBrowserRouter, RouterProvider } from "react-router";
import "quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddBlog from "./pages/admin/AddBlog";
import ListBlog from "./pages/admin/ListBlog";
import Comments from "./pages/admin/Comments";
import Login from "./components/Admin/Login";
import { useAppContext } from "./context/AppContext";

function App() {
  const { token } = useAppContext();
  console.log(token);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/blog/:id",
      element: <Blog />,
    },
    {
      path: "/admin",
      element: token ? <Layout /> : <Login />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "addBlog",
          element: <AddBlog />,
        },
        {
          path: "listBlog",
          element: <ListBlog />,
        },
        {
          path: "comments",
          element: <Comments />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
