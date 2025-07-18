import { createBrowserRouter, RouterProvider } from "react-router";
import "quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const Blog = lazy(() => import("./pages/Blog"));
const Layout = lazy(() => import("./pages/admin/Layout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AddBlog = lazy(() => import("./pages/admin/AddBlog"));
const ListBlog = lazy(() => import("./pages/admin/ListBlog"));
const Comments = lazy(() => import("./pages/admin/Comments"));
const Login = lazy(() => import("./components/Admin/Login"));

import { useAppContext } from "./context/AppContext";

function App() {
  const { token } = useAppContext();
  // console.log(token);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense>
          <Home />
        </Suspense>
      ),
    },
    {
      path: "/blog/:id",
      element: (
        <Suspense>
          <Blog />
        </Suspense>
      ),
    },
    {
      path: "/admin",
      element: <Suspense>{token ? <Layout /> : <Login />}</Suspense>,
      children: [
        {
          index: true,
          element: (
            <Suspense>
              {" "}
              <Dashboard />
            </Suspense>
          ),
        },
        {
          path: "addBlog",
          element: (
            <Suspense>
              <AddBlog />
            </Suspense>
          ),
        },
        {
          path: "listBlog",
          element: (
            <Suspense>
              <ListBlog />
            </Suspense>
          ),
        },
        {
          path: "comments",
          element: (
            <Suspense>
              <Comments />
            </Suspense>
          ),
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
