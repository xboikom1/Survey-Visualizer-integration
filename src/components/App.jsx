import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./Loader/Loader";
import ScrollToTop from "./ScrollToTop/ScrollToTop";
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
      <ScrollToTop />
    </>
  );
}

export default App;
