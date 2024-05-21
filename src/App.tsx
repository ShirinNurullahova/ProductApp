import {Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import ProductPage from "./pages/ProductPage"
import ProductDetail from "./pages/ProductDetail"



function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
         <Route path="/products" element={<ProductPage/>}/>
         <Route path="/productDetails/:productId" element={<ProductDetail/>}/>

      </Routes>
    </div>
  )
}

export default App
