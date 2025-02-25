import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Income from './pages/Income';
import Home from './pages/Home';
import SignIn from './pages/SignIn';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Página de login sin Sidebar */}
        <Route path="/login" element={<SignIn />} />

        {/* Páginas con Sidebar usando Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customers />} />
          <Route path="income" element={<Income />} />
        </Route>
      </Routes>
    </Router>
  );
}
