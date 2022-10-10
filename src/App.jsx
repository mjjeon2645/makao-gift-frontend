import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import { useLocalStorage } from 'usehooks-ts';
import Header from './components/Header';
import OrderHistoryDetail from './components/OrderHistoryDetail';
import ProductDetail from './components/ProductDetail';
import ProductsBanner from './components/ProductsBanner';
import useUserStore from './hooks/useUserStore';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrderHistoriesPage from './pages/OrderHistoriesPage';
import OrderPage from './pages/OrderPage';
import ProductsPage from './pages/ProductsPage';
import SignUpPage from './pages/SignUpPage';
import WelcomePage from './pages/WelcomePage';
import { apiService } from './services/ApiService';
import defaultTheme from './styles/defaultTheme';
import GlobalStyle from './styles/GlobalStyle';

const Wrapper = styled.div`
  /* height: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function App() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const userStore = useUserStore();

  useEffect(() => {
    apiService.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      userStore.fetchBalance();
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Reset />
      <GlobalStyle />
      <Header />
      <Wrapper>
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
          <Route path="/orders" element={<OrderHistoriesPage />} />
          <Route
            path="/orders/:id"
            element={<OrderHistoryDetail />}
          />
          <Route path="/welcome" element={<WelcomePage />} />
        </Routes>
      </Wrapper>
    </ThemeProvider>
  );
}
