import { BrowserRouter, Routes, Route } from 'react-router'
import ProductPage from './products/ProductPage'
import ProductList from './products/ProductList'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/shop" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
