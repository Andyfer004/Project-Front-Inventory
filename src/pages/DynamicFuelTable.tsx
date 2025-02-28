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
  Button,
  MenuItem,
  Grid,
  Pagination
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
  initialData = []
}) => {
  const [data, setData] = useState<FuelData[]>(initialData);
  const [totalItems, setTotalItems] = useState(13);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
const totalPages = Math.ceil(totalItems / rowsPerPage);
const [selectedRow, setSelectedRow] = useState<FuelData | null>(null);

const [cantidad, setCantidad] = useState('');
const [importe, setImporte] = useState('');
const [montoTotal, setMontoTotal] = useState('');

useEffect(() => {
  const cantidadNum = parseFloat(cantidad) || 0;
  const importeNum = parseFloat(importe) || 0;
  setMontoTotal((cantidadNum * importeNum).toFixed(2));
}, [cantidad, importe])

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

  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [selectedFuelType1, setSelectedFuelType1] = useState('');


  
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
  

  const handleOpenAcceptModal = (row: FuelData) => {
    setSelectedRow(row);
    setOpenAcceptModal(true);
  };
  
  
  const handleView = (id: number) => {

  };
  

  const handleCloseAcceptModal = () => {
    setOpenAcceptModal(false);
  };
  
  const handleAcceptSubmit = () => {
    setOpenAcceptModal(false); // Cerrar el modal de confirmación
    setOpenVoucherModal(true); // Abrir el modal del vale
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
    <Paper sx={{ width: '100%', borderRadius: '30px', overflow: 'hidden', boxShadow: '0px 10px 60px rgba(226, 236, 249, 0.5)' }}>
      <TableContainer>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && <Typography color="error" sx={{ p: 2, textAlign: 'center' }}>{error}</Typography>}

        <Table>
        <TableHead>
  <TableRow>
    {['Piloto', 'Placas', 'Vehículo Kms', 'Cantidad en Quetzales', 'Cantidad de Galones', 'Fecha', 'Status', 'Acciones'].map((header) => (
      <TableCell
        key={header}
        sx={{
          fontWeight: 600,
          color: '#B5B7C0', // Color del encabezado
          textAlign: 'center',
          fontSize: '14px',
          backgroundColor: '#FFFFFF' // Asegurar fondo blanco
        }}
      >
        {header}
      </TableCell>
    ))}
  </TableRow>
</TableHead>
<TableBody>
  {data.map((row) => (
    <TableRow hover key={row.id} sx={{ height: '60px' }}>
      <TableCell sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: '#292D32' }}>{row.piloto}</TableCell>
      <TableCell sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: '#292D32' }}>{row.placas}</TableCell>
      <TableCell sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: '#292D32' }}>{row.kilometros.toLocaleString()}</TableCell>
      <TableCell sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: '#292D32' }}>Q {row.monto.toFixed(2)}</TableCell>
      <TableCell sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: '#292D32' }}>{row.cantidadGalones.toFixed(2)}</TableCell>
      <TableCell sx={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: '#292D32' }}>{formatDate(row.fecha)}</TableCell>
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
                        <IconButton onClick={() => handleOpenAcceptModal(row)} sx={{ backgroundColor: '#e8f5e9', borderRadius: '50%' }}>
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
  <Pagination
    count={Math.ceil(totalItems / rowsPerPage)}
    page={page + 1} // Asegura que la numeración comience desde 1
    onChange={(_event, newPage) => setPage(newPage - 1)} // Ajusta el estado correctamente
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
        minWidth: '26px', // Ajustar tamaño
        minHeight: '24px'
      },
      '& .MuiPaginationItem-ellipsis': {
        color: '#292D32',
        fontSize: '14px',
      },
      '& .Mui-selected': {
        backgroundColor: '#38B000',
        color: '#FFFFFF',
        border: '1px solid #38B000',
      },
      '& .MuiPaginationItem-previousNext': {
        backgroundColor: 'transparent',
        color: '#292D32',
      }
    }}
  />
</Box>

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
<Dialog open={openAcceptModal} onClose={() => setOpenAcceptModal(false)}>
  <DialogTitle sx={{ fontSize: '1.25rem', fontWeight: 'bold', textAlign: 'center' }}>
    ¿Está seguro de aceptar la solicitud?
  </DialogTitle>

  <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
    <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
      Si está de acuerdo, haga clic en "Aceptar" para continuar con la generación del vale.
    </Typography>
  </DialogContent>

  <DialogActions sx={{ justifyContent: 'center' }}>
    <Button onClick={() => setOpenAcceptModal(false)} sx={{ backgroundColor: '#F44336', color: 'white' }}>
      Cancelar
    </Button>

    <Button onClick={handleAcceptSubmit} sx={{ backgroundColor: '#4CAF50', color: 'white' }}>
      Aceptar
    </Button>
  </DialogActions>
</Dialog>
<Dialog open={openVoucherModal} onClose={() => setOpenVoucherModal(false)}>
        <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', pb: 2 }}>
          Generar Vale de Combustible
        </DialogTitle>
        <DialogContent>
          {selectedRow && (
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Numero de Formulario Relacionado" value={selectedRow.id} variant="outlined" fullWidth disabled InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Proveedor del Combustible" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Nombre del Solicitante" value={selectedRow.piloto} variant="outlined" fullWidth disabled InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Tipo de Combustible" select value={selectedFuelType} onChange={(e) => setSelectedFuelType(e.target.value)} variant="outlined" fullWidth>
                    <MenuItem value="">Seleccione...</MenuItem>
                    <MenuItem value="Gasolina Súper">Súper</MenuItem>
                    <MenuItem value="Gasolina Regular">Regular</MenuItem>
                    <MenuItem value="Gasolina Diesel">Diesel</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField label="Cantidad" variant="outlined" fullWidth value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField label="Importe" select variant="outlined" fullWidth value={importe} onChange={(e) => setImporte(e.target.value)}>
                    <MenuItem value="">Seleccione...</MenuItem>
                    <MenuItem value="20">Q 20</MenuItem>
                    <MenuItem value="50">Q 50</MenuItem>
                    <MenuItem value="100">Q 100</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Monto Total" variant="outlined" fullWidth value={montoTotal} disabled InputLabelProps={{ shrink: true }} />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2, px: 3 }}>
          <Button onClick={() => setOpenVoucherModal(false)} sx={{ backgroundColor: '#F44336', color: 'white', fontWeight: 'bold', px: 3, borderRadius: '8px' }}>
            Cancelar
          </Button>
          <Button onClick={() => console.log('Vale generado')} sx={{ backgroundColor: '#4CAF50', color: 'white', fontWeight: 'bold', px: 3, borderRadius: '8px' }}>
            Generar Vale
          </Button>
        </DialogActions>
      </Dialog>


    </Paper>
  );
};

export default DynamicFuelTable;
