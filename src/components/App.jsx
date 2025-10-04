import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import { Suspense } from "react";
import Loader from "./Loader/Loader";

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
