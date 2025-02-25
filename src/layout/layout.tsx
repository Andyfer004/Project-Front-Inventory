import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
      {/* Sidebar toma su espacio sin estar fixed */}
      <Sidebar />

      {/* Contenido dinámico con flex-grow */}
      <Box sx={{ flexGrow: 1, padding: 3, overflowX: 'hidden' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
