import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail";
import ProductManage from "./components/admin/ProductManage";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store, useAppSelector } from "./redux/store";
import AuthWrapper from "./components/AuthWrapper";
import Admin from "./pages/Admin";
import Navbar from "./components/clients/Navbar"; // Import the Navbar component
import { selectAuthorizedUser } from "./redux/slices/authSlices";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent /> {/* Render the main content inside the provider */}
      </PersistGate>
    </Provider>
  );
}

function AppContent() {
  const authorizedUser = useAppSelector(selectAuthorizedUser);
  const isAuthenticated = Boolean(authorizedUser);

  return (
    <div>
      {isAuthenticated && <Navbar isAuthenticated={isAuthenticated} />} 
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
