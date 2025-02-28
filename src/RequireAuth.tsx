import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
  // Verifica si el usuario está autenticado (usando localStorage)
  const isAuth = localStorage.getItem('auth') === 'true';
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;