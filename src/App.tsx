import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Income from './pages/Income';
import SignIn from './pages/SignIn';
import RequireAuth from './RequireAuth';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Página de login sin Sidebar */}
        <Route path="/login" element={<SignIn />} />

        {/* Rutas protegidas */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<Customers />} />
            <Route path="income" element={<Income />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
