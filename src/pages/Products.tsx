import { Box, Typography, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from '@mui/material';
import { SetStateAction, useState } from 'react';
import { vehicles } from './data'; // Importamos los datos

export default function Products() {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]); // Vehículo seleccionado
  const rowsPerPage = 5;
  const [page, setPage] = useState(1);
  const totalRecords = selectedVehicle.fuelLogs.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const handleChangePage = (_event: any, value: SetStateAction<number>) => {
    setPage(value);
  };

  const handleSelectVehicle = (event: { target: { value: string; }; }) => {
    const vehicle = vehicles.find((v) => v.placas === event.target.value);
    if (vehicle) {
      setSelectedVehicle(vehicle);
    }
    setPage(1); // Reiniciar la paginación al cambiar de vehículo
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
        {/* Sección superior dentro del contenedor */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', mb: 3 }}>
          <Box>
            <Typography sx={{ fontSize: '24px', fontWeight: 500, mb: 2, fontFamily: 'Poppins, sans-serif' }}>
              Bitácora de combustible
            </Typography>
            <Typography sx={{ color: '#16C098', fontSize: '14px', mb: 6, fontFamily: 'Poppins, sans-serif' }}>
              Vehículos activos
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 2, fontFamily: 'Poppins, sans-serif' }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography sx={{ fontWeight: 600 }}>Marca:</Typography>
                <Typography>{selectedVehicle.marca}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography sx={{ fontWeight: 600 }}>Color:</Typography>
                <Typography>{selectedVehicle.color}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography sx={{ fontWeight: 600 }}>Tipo:</Typography>
                <Typography>{selectedVehicle.tipo}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography sx={{ fontWeight: 600 }}>Año:</Typography>
                <Typography>{selectedVehicle.anio}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography sx={{ fontWeight: 600 }}>Placas:</Typography>
                <Typography>{selectedVehicle.placas}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Select
              size="small"
              value={selectedVehicle.placas}
              onChange={handleSelectVehicle}
              sx={{ width: '250px' }}
            >
              {vehicles.map((vehicle) => (
                <MenuItem key={vehicle.placas} value={vehicle.placas}>
                  {vehicle.marca} - {vehicle.placas}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

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
              {selectedVehicle.fuelLogs.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((log, index) => (
                <TableRow key={index} sx={{ height: '60px' }}>
                  <TableCell sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: '#292D32' }}>
                    {log.noVale}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: '#292D32' }}>
                    {log.oficina}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: '#292D32' }}>
                    {log.tipoCombustible}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: '#292D32' }}>
                    {log.valorVale}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: '#292D32' }}>
                    {log.fecha}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: '#292D32' }}>
                    {log.destino}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginación y conteo de datos */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography sx={{ fontSize: '14px', color: '#6B7280' }}>
            Showing data {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, totalRecords)} of {totalRecords} entries
          </Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            shape="rounded"
            siblingCount={1}
            boundaryCount={1}
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
