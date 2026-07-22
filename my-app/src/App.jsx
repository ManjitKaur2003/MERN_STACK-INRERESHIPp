import { Routes, Route, Navigate } from "react-router-dom";
import ProductDetail from "./productDetail";
import Products from "./products";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;