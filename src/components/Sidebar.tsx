import { Box, List, ListItem, ListItemText, Typography, ListItemIcon, Avatar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { text: 'Tablero', link: '/dashboard', icon: <DashboardIcon fontSize="small" /> },
    { text: 'Product', link: '/products', icon: <Inventory2Icon fontSize="small" /> },
    { text: 'Customers', link: '/customers', icon: <PeopleIcon fontSize="small" /> },
    { text: 'Income', link: '/income', icon: <MonetizationOnIcon fontSize="small" /> },
  ];

  return (
    <Box
      sx={{
        width: { xs: 240, md: 280 },
        height: '100vh',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 8px 50px rgba(226, 236, 249, 0.5)',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        left: 0,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4, width: '100%', pl: 3 }}>
        <img src="/Zacapa.png" alt="Logo" width="50" height="50" />
        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '30px',
            color: '#000000',
          }}
        >
          Muni Zacapa
        </Typography>
      </Box>
      <List sx={{ width: '100%', mt: 1, flexGrow: 1, pl: 2, pr: 2, overflowY: 'auto', maxHeight: 'calc(100vh - 180px)' }}>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            component={Link}
            to={item.link}
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: location.pathname === item.link ? '#38B000' : 'transparent',
              color: location.pathname === item.link ? '#FFFFFF' : '#A0A0B0',
              fontWeight: location.pathname === item.link ? 'bold' : 'normal',
              padding: '12px 18px',
              borderRadius: '6px',
              mb: 1.5,
              transition: '0.3s',
              '&:hover': {
                backgroundColor: location.pathname === item.link ? '#38B000' : '#F5F5F5',
              },
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.link ? '#FFFFFF' : '#A0A0B0', minWidth: '30px' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary={item.text} />
            <Box component="span" sx={{ fontSize: '14px', fontWeight: 'bold', marginLeft: 'auto' }}>›</Box>
          </ListItem>
        ))}
      </List>
      
      {/* Sección del usuario */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3, width: '100%', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src="/profile.jpg" alt="Andy Solis" sx={{ width: 45, height: 45 }} />
          <Box>
            <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>Andy Solis</Typography>
            <Typography sx={{ fontSize: '13px', color: '#A0A0B0' }}>Administrador</Typography>
          </Box>
        </Box>
        <ExpandMoreIcon sx={{ color: '#A0A0B0', fontSize: '20px' }} />
      </Box>
    </Box>
  );
}