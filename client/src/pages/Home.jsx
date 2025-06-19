import { lazy, Suspense } from "react";

const Loader = lazy(() => import("../components/Loader"));
const Navbar = lazy(() => import("../components/Navbar"));
const Header = lazy(() => import("../components/Header"));
const BlogList = lazy(() => import("../components/BlogList"));
const Newsletter = lazy(() => import("../components/Newsletter"));
const Footer = lazy(() => import("../components/Footer"));

const Home = () => {
  return (
    <>
      <Suspense fallback={Loader}>
        <Navbar />
        <Header />
        <BlogList />
        <Newsletter />
        <Footer />
      </Suspense>
    </>
  );
};

export default Home;
