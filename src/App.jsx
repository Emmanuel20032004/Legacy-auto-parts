import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import './App.css'
import { adminSessionKey } from './auth/adminAuth.js'
import AdminLogin from './Components/AdminLogin.jsx'
import { AdminSidebar } from './Components/administratornavbar.jsx'
import LandingPage from './Components/LandingPage.jsx'
import ProductList from './products/ProductList.jsx'
import ProductPage from './products/ProductPage.jsx'

function ProtectedAdminRoute() {
  const isAuthenticated = sessionStorage.getItem(adminSessionKey) === 'authenticated'

  return isAuthenticated ? <AdminSidebar /> : <Navigate to="/admin/login" replace state={{ from: '/admin' }} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/shop" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedAdminRoute />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
