import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail";
import ProductManage from "./components/admin/ProductManage";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store, useAppSelector } from "./redux/store";
import AuthWrapper from "./components/AuthWrapper";
import Admin from "./pages/Admin";
import Navbar from "./components/clients/Navbar"; 
import { selectAuthorizedUser } from "./redux/slices/authSlices";
import { useMemo } from "react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent /> 
      </PersistGate>
    </Provider>
  );
}

function AppContent() {
  const authorizedUser = useAppSelector(selectAuthorizedUser);
  const isAuthenticated = Boolean(authorizedUser);
  const location = useLocation();
 const isLoginPage = useMemo(()=> location.pathname === "/", [location.pathname]);

  return (
    <div>
      {isAuthenticated && !isLoginPage && <Navbar isAuthenticated={isAuthenticated} />} 
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/products" element={<AuthWrapper><ProductPage /></AuthWrapper>} />
        <Route path="/productDetails/:productId" element={<ProductDetail />} />
        <Route path="/admin" element={<AuthWrapper><Admin /></AuthWrapper>} />
        <Route path="/edit/:productId" element={<AuthWrapper><ProductManage /></AuthWrapper>} />
        <Route path="/addProduct" element={<AuthWrapper><ProductManage /></AuthWrapper>} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
