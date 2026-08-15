import { BrowserRouter, Routes, Route } from "react-router";
import ProductPage from "./products/ProductPage";
import ProductList from "./products/ProductList";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/shop" element={<ProductList />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
