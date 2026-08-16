import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "./components/LandingPage";
import ProductList from "./products/ProductList";
import ProductPage from "./products/ProductPage";
import { AdminSidebar } from "./components/administratornavbar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/shop" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/admin" element={<AdminSidebar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
