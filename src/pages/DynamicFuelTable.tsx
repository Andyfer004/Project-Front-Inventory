import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableSortLabel,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  CircularProgress,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';

import { Visibility, CheckCircleOutline, CancelOutlined } from '@mui/icons-material';

export interface FuelData {
  id: number;
  piloto: string;
  placas: string;
  kilometros: number;
  monto: number;
  fecha: string;
  cantidadGalones: number;  // NUEVO CAMPO
  estado: 'Aprobado' | 'Rechazado' | 'Pendiente';
}

interface HeadCell {
  id: keyof FuelData | 'acciones';
  label: string;
  numeric: boolean;
  sortable?: boolean;
}

interface DynamicFuelTableProps {
  dataUrl: string;
  initialSort?: keyof FuelData;
  rowsPerPageOptions?: number[];
  initialData?: FuelData[];
}

const DynamicFuelTable: React.FC<DynamicFuelTableProps> = ({
  dataUrl,
  initialSort = 'fecha',
  rowsPerPageOptions = [10, 25, 50],
  initialData = []
}) => {
  const [data, setData] = useState<FuelData[]>(initialData);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [orderBy, setOrderBy] = useState<keyof FuelData>(initialSort);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estado para el modal de rechazo
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [openAcceptModal, setOpenAcceptModal] = useState(false);
const [selectedAcceptId, setSelectedAcceptId] = useState<number | null>(null);
// Estado para el modal del vale
const [openVoucherModal, setOpenVoucherModal] = useState(false);


  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${dataUrl}?page=${page + 1}&per_page=${rowsPerPage}&sort=${orderBy}&order=${order}`);
      if (!response.ok) throw new Error('Error al cargar datos');
      const { data: apiData, total } = await response.json();
      setData(apiData);
      setTotalItems(total);
      setError('');
    } catch (err) {
      setError('Error al cargar el reporte de combustible');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, orderBy, order]);

  const handleOpenVoucherModal = () => {
    setOpenAcceptModal(false); // Cerrar el modal de aceptación
    setOpenVoucherModal(true); // Abrir el modal del vale
  };
  
  const handleCloseVoucherModal = () => {
    setOpenVoucherModal(false);
  };

  
  const handleSort = (property: keyof FuelData) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  

  const handleOpenAcceptModal = (id: number) => {
    setSelectedAcceptId(id);
    setOpenAcceptModal(true);
  };
  
  const handleCloseAcceptModal = () => {
    setOpenAcceptModal(false);
  };
  
  const handleAcceptSubmit = () => {
    console.log(`Registro ${selectedAcceptId} aceptado`);
    handleOpenVoucherModal(); // Abrir el modal del vale
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-GT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Manejador para aceptar
  const handleAccept = (id: number) => {
    console.log(`Aceptar registro con id: ${id}`);
    // Aquí podrías hacer una llamada a la API
  };

  // Manejador para abrir el modal de rechazo
  const handleOpenRejectModal = (id: number) => {
    setSelectedId(id);
    setOpenRejectModal(true);
  };

  // Manejador para cerrar el modal
  const handleCloseRejectModal = () => {
    setOpenRejectModal(false);
    setRejectReason('');
  };

  // Manejador para confirmar el rechazo
  const handleRejectSubmit = () => {
    console.log(`Registro ${selectedId} rechazado con motivo: ${rejectReason}`);
    // Aquí puedes hacer una llamada a la API para guardar el rechazo
    handleCloseRejectModal();
  };

  
  return (
    <Paper sx={{ width: '100%', borderRadius: '30px', overflow: 'hidden' }}>
      <TableContainer>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && <Typography color="error" sx={{ p: 2, textAlign: 'center' }}>{error}</Typography>}

        <Table>
        <TableHead sx={{ background: '#f5f5f5' }}>
          <TableRow>
            <TableCell>Piloto</TableCell>
            <TableCell>Placas</TableCell>
            <TableCell align="right">Vehículo Kms</TableCell>
            <TableCell align="right">Cantidad en Quetzales</TableCell>
            <TableCell align="right">Cantidad de Galones</TableCell> {/* NUEVA COLUMNA */}
            <TableCell>Fecha</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>

          <TableBody>
            {data.map((row) => (
              <TableRow hover key={row.id}>
                <TableCell>{row.piloto}</TableCell>
                <TableCell>{row.placas}</TableCell>
                <TableCell align="right">{row.kilometros.toLocaleString()}</TableCell>
                <TableCell align="right">Q {row.monto.toFixed(2)}</TableCell>
                 <TableCell align="right">{row.cantidadGalones.toFixed(2)}</TableCell> 
    
                <TableCell>{formatDate(row.fecha)}</TableCell>

                <TableCell align="center">
                  <Tooltip title={row.estado} arrow>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: row.estado === 'Aprobado' ? '#4CAF50' :
                                        row.estado === 'Rechazado' ? '#F44336' :
                                        '#888888',
                        display: 'inline-block',
                        cursor: 'pointer'
                      }}
                    />
                  </Tooltip>
                </TableCell>

                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Tooltip title="Ver detalles">
                      <IconButton onClick={() => handleView(row.id)} sx={{ backgroundColor: '#f5f5f5', borderRadius: '50%' }}>
                        <Visibility sx={{ color: '#616161' }} />
                      </IconButton>
                    </Tooltip>

                    {row.estado === 'Pendiente' && (
                      <>
                       <Tooltip title="Aceptar">
                        <IconButton onClick={() => handleOpenAcceptModal(row.id)} sx={{ backgroundColor: '#e8f5e9', borderRadius: '50%' }}>
                          <CheckCircleOutline sx={{ color: '#4CAF50' }} />
                        </IconButton>
                      </Tooltip>


                        <Tooltip title="Rechazar">
                          <IconButton onClick={() => handleOpenRejectModal(row.id)} sx={{ backgroundColor: '#ffebee', borderRadius: '50%' }}>
                            <CancelOutlined sx={{ color: '#F44336' }} />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

{/* Modal de Rechazo */}
<Dialog
  open={openRejectModal}
  onClose={handleCloseRejectModal}
  sx={{
    '& .MuiDialog-paper': {
      borderRadius: '12px',
      padding: '20px',
      width: '420px',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
    }
  }}
>
  <DialogTitle sx={{ fontSize: '1.25rem', fontWeight: 'bold', textAlign: 'center', color: '#333' }}>
    Razón de rechazo
  </DialogTitle>

  <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
    <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
      Por favor, proporciona una razón clara para el rechazo de esta solicitud.
    </Typography>
    <TextField
      label="Motivo de rechazo *"
      fullWidth
      multiline
      rows={4}
      variant="outlined"
      value={rejectReason}
      onChange={(e) => setRejectReason(e.target.value)}
      sx={{
        backgroundColor: '#F9FAFB',
        borderRadius: '8px',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#D1D5DB',
          },
          '&:hover fieldset': {
            borderColor: '#9CA3AF',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#4CAF50',
          },
        },
      }}
    />
  </DialogContent>

  <DialogActions sx={{ justifyContent: 'center', pb: 1 }}>
    <Button
      onClick={handleCloseRejectModal}
      sx={{
        backgroundColor: '#F44336',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '8px',
        textTransform: 'none',
        px: 3,
        '&:hover': { backgroundColor: '#D32F2F' }
      }}
    >
      Cancelar
    </Button>

    <Button
      onClick={handleRejectSubmit}
      disabled={!rejectReason.trim()}
      sx={{
        backgroundColor: !rejectReason.trim() ? '#A5D6A7' : '#4CAF50',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '8px',
        textTransform: 'none',
        px: 3,
        '&:hover': { backgroundColor: '#388E3C' },
        '&:disabled': { backgroundColor: '#C8E6C9', color: '#FFF' }
      }}
    >
      Guardar
    </Button>
  </DialogActions>
</Dialog>

{/* Modal de Aceptación */}
<Dialog
  open={openAcceptModal}
  onClose={handleCloseAcceptModal}
  sx={{
    '& .MuiDialog-paper': {
      borderRadius: '12px',
      padding: '20px',
      width: '420px',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
    }
  }}
>
  <DialogTitle sx={{ fontSize: '1.25rem', fontWeight: 'bold', textAlign: 'center', color: '#333' }}>
  ¿Está seguro de aceptar la solicitud? 
  </DialogTitle>

  <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
    <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
      Si está de acuerdo, favor dar click en aceptar para poder generar el vale.
    </Typography>
  </DialogContent>

  <DialogActions sx={{ justifyContent: 'center', pb: 1 }}>
    <Button
      onClick={handleCloseAcceptModal}
      sx={{
        backgroundColor: '#F44336',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '8px',
        textTransform: 'none',
        px: 3,
        '&:hover': { backgroundColor: '#D32F2F' }
      }}
    >
      Cancelar
    </Button>

    <Button
      onClick={handleAcceptSubmit}
      sx={{
        backgroundColor: '#4CAF50',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '8px',
        textTransform: 'none',
        px: 3,
        '&:hover': { backgroundColor: '#388E3C' }
      }}
    >
      Aceptar
    </Button>
  </DialogActions>
</Dialog>

<Dialog
  open={openVoucherModal}
  onClose={handleCloseVoucherModal}
  sx={{
    '& .MuiDialog-paper': {
      borderRadius: '12px',
      padding: '20px',
      width: '500px',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
    }
  }}
>
  <DialogTitle sx={{ fontSize: '1.25rem', fontWeight: 'bold', textAlign: 'center', color: '#333' }}>
    Generar Vale de Combustible
  </DialogTitle>

  <DialogContent sx={{ pb: 2 }}>
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Placas" variant="outlined" fullWidth />
      <TextField label="Destino" variant="outlined" fullWidth />
      <TextField label="Proveedor del Combustible" variant="outlined" fullWidth />
      <TextField label="Nombre del Solicitante" variant="outlined" fullWidth />
      
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
        Detalle del Combustible
      </Typography>
      <TextField label="Galones de Gasolina Súper" type="number" variant="outlined" fullWidth />
      <TextField label="Galones de Gasolina Regular" type="number" variant="outlined" fullWidth />
      <TextField label="Galones de Diesel" type="number" variant="outlined" fullWidth />
      <TextField label="Total Consumo (Q)" type="number" variant="outlined" fullWidth />
    </Box>
  </DialogContent>

  <DialogActions sx={{ justifyContent: 'center', pb: 1 }}>
    <Button
      onClick={handleCloseVoucherModal}
      sx={{
        backgroundColor: '#F44336',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '8px',
        textTransform: 'none',
        px: 3,
        '&:hover': { backgroundColor: '#D32F2F' }
      }}
    >
      Cancelar
    </Button>

    <Button
      onClick={() => {
        console.log("Vale generado");
        handleCloseVoucherModal();
      }}
      sx={{
        backgroundColor: '#4CAF50',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '8px',
        textTransform: 'none',
        px: 3,
        '&:hover': { backgroundColor: '#388E3C' }
      }}
    >
      Generar Vale
    </Button>
  </DialogActions>
</Dialog>



    </Paper>
  );
};

export default DynamicFuelTable;
