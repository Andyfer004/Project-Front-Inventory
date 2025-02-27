import { Box, Typography, TextField, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export default function Products() {
  const totalRecords = 50; // Cantidad total de datos (debe ser dinámica)
  const rowsPerPage = 5; // Cantidad de filas por página
  const totalPages = Math.ceil(totalRecords / rowsPerPage); // Cálculo dinámico de páginas
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
        p: { xs: 3, md: 6 },
        backgroundColor: '#F9FAFB',
      }}
    >
      {/* Encabezado */}
      <Typography
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 500,
          fontSize: { xs: '20px', md: '24px' },
          color: '#000000',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 4,
          width: '90%',
          textAlign: 'left',
        }}
      >
        Bienvenido 👋,
      </Typography>

      {/* Contenedor principal */}
      <Box
        sx={{
          width: { xs: '90%', md: '80%' },
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: '0px 10px 60px rgba(226, 236, 249, 0.5)',
          p: { xs: 3, md: 5 },
        }}
      >
        {/* Tabla */}
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                {['No. Vale', 'Oficina/Recursos', 'Tipo de combustible', 'Valor de Vale', 'Fecha', 'Destino'].map((header) => (
                  <TableCell
                    key={header}
                    sx={{ fontWeight: 600, color: '#B5B7C0', textAlign: 'center', fontSize: '14px' }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(rowsPerPage)].map((_, index) => (
                <TableRow key={index} sx={{ height: '60px' }}>
                  <TableCell sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: '#292D32', verticalAlign: 'middle' }}>12345</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: '#292D32', verticalAlign: 'middle' }}>Recursos H</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: '#292D32', verticalAlign: 'middle' }}>{['Super', 'Diesel', 'Regular'][index % 3]}</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: '#292D32', verticalAlign: 'middle' }}>Q 300.00</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: '#292D32', verticalAlign: 'middle' }}>24-02-2025</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: '#292D32', verticalAlign: 'middle' }}>Varios</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginación */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            shape="rounded"
            siblingCount={1} // Muestra 1 número antes y después del seleccionado
            boundaryCount={1} // Muestra el primer y último número
            sx={{
              '& .MuiPaginationItem-root': {
                backgroundColor: '#F5F5F5',
                border: '1px solid #EEEEEE',
                borderRadius: '4px',
                padding: '6px 9px',
                margin: '0 5px',
              },
              '& .Mui-selected': {
                backgroundColor: '#38B000',
                color: '#FFFFFF',
                border: '1px solid #38B000',
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
