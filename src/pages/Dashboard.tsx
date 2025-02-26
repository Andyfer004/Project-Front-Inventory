import { Box, Typography } from '@mui/material';
import DynamicFuelTable from './DynamicFuelTable';
import { mockFuelData } from './mockData';
const Dashboard = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
        p: { xs: 3, md: 6 },
        backgroundColor: '#f8f9fa'
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 500,
          mb: 4,
          alignSelf: 'flex-start',
          color: '#2d3748'
        }}
      >
        Municipalidad Zacapa
      </Typography>

      <Box sx={{ 
        width: '100%', 
        maxWidth: 1200,
        backgroundColor: 'white',
        borderRadius: '30px',
        p: { xs: 2, md: 4 }
      }}>
        <Typography
          variant="h6"
          sx={{ 
            mb: 3,
            fontWeight: 600,
            color: '#4a5568'
          }}
        >
          Reporte de combustible
        </Typography>

        <DynamicFuelTable
        dataUrl="mock" // Temporal
        initialSort="fecha"
        rowsPerPageOptions={[5, 10, 25]}
        initialData={mockFuelData} // Agrega esta prop
      />
      </Box>
    </Box>
  );
};

export default Dashboard;