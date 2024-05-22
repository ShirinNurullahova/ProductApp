import {Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import ProductPage from "./pages/ProductPage"
import ProductDetail from "./pages/ProductDetail"
import Admin from "./pages/Admin"
import ProductManage from "./components/admin/ProductManage"
import { PersistGate } from "redux-persist/integration/react"
import { Provider } from "react-redux"
import { persistor, store } from "./redux/store"



function App() {

  return (
    <div>
       <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
         <Route path="/products" element={<ProductPage/>}/>
         <Route path="/productDetails/:productId" element={<ProductDetail/>}/>
         <Route path="/admin" element={<Admin/>}/>
         <Route path="/edit/:productId" element={<ProductManage/>}/>
         <Route path="/addProduct" element={<ProductManage/>}/>

      </Routes>
      </PersistGate>
    </Provider>
    </div>
  )
}

export default App
