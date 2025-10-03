import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
