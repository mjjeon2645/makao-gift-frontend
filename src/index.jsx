import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { apiService } from './services/ApiService';

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);

const data = localStorage.getItem('accessToken');
const accessToken = JSON.parse(data);

apiService.setAccessToken(accessToken);

root.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
));
