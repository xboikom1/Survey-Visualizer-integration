import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./Loader/Loader";
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
