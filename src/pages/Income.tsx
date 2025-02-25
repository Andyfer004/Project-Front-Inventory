import { Box, Typography } from '@mui/material';

export default function Income() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
        p: { xs: 3, md: 6 },
      }}
    >
      {/* Encabezado */}
      <Typography
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 500,
          fontSize: { xs: '20px', md: '24px' },
          lineHeight: '36px',
          color: '#000000',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 4,
          width: '90%', // Reducción del ancho del título
          textAlign: 'left',
          pl: { xs: 0, md: 0 }, // Ajuste de margen izquierdo para mejor alineación
        }}
      >
        Bienvenido 👋,
      </Typography>

      {/* Contenedor grande */}
      <Box
        sx={{
          width: { xs: '80%', sm: '70%', md: '680px' }, // Reducción del ancho del contenedor
          minHeight: '1000px', // Ajuste de altura
          backgroundColor: '#FFFFFF',
          borderRadius: '30px',
          boxShadow: '0px 10px 60px rgba(226, 236, 249, 0.5)',
          p: { xs: 3, md: 5 },
          maxWidth: '900px', // Límite de ancho
          ml: { xs: 0, md: '0' }, // Ajuste del margen izquierdo
          mr: { xs: 0, md: '50px' }, // Añadir margen derecho para balancear
        }}
      >
        {/* Contenido aquí */}
      </Box>
    </Box>
  );
}