import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import { useLocalStorage } from 'usehooks-ts';
import Header from './components/Header';
import ProductDetail from './components/ProductDetail';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrderPage from './pages/OrderPage';
import ProductsPage from './pages/ProductsPage';
import SignUpPage from './pages/SignUpPage';
import WelcomePage from './pages/WelcomePage';
import { apiService } from './services/ApiService';
import { giftshopStore } from './stores/GiftshopStore';

export default function App() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const [, setAmount] = useLocalStorage('amount', 0);

  useEffect(() => {
    apiService.setAccessToken(accessToken);
    setAmount(giftshopStore.amount);
  }, [accessToken]);

  return (
    <div>
      <Reset />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route
          path="/products/:id"
          element={<ProductDetail />}
        />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </div>
  );
}
