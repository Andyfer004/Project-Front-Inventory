import React, { useEffect, useState } from 'react';

import { Tooltip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Chip,
  CircularProgress,
  Typography
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button';


export interface FuelData {
  id: number;
  piloto: string;
  placas: string;
  kilometros: number;
  monto: number;
  fecha: string;
  estado: 'Aprobado' | 'Cancelado';
}

interface HeadCell {
  id: keyof FuelData;
  label: string;
  numeric: boolean;
  sortable?: boolean;
}

interface DynamicFuelTableProps {
    dataUrl: string;
    initialSort?: keyof FuelData;
    rowsPerPageOptions?: number[];
    initialData?: FuelData[]; // Nueva prop
  }
  
  

type Order = 'asc' | 'desc';

const headCells: HeadCell[] = [
  { id: 'piloto', label: 'Piloto', numeric: false, sortable: true },
  { id: 'placas', label: 'Placas', numeric: false, sortable: true },
  { id: 'kilometros', label: 'Vehículo Kms', numeric: true, sortable: true },
  { id: 'monto', label: 'Cantidad en Quetzales', numeric: true, sortable: true },
  { id: 'fecha', label: 'Fecha', numeric: false, sortable: true },
  { id: 'estado', label: 'Status', numeric: false, sortable: false }
];

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
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof FuelData>(initialSort);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${dataUrl}?page=${page + 1}&per_page=${rowsPerPage}&sort=${orderBy}&order=${order}`
      );
      
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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-GT', options);
  };

  return (
    <Paper sx={{ 
      width: '100%',
      borderRadius: '30px',
      boxShadow: '0px 10px 60px rgba(226, 236, 249, 0.5)',
      overflow: 'hidden'
    }}>
      <TableContainer>
        {loading && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            p: 3,
            position: 'absolute',
            width: '100%',
            background: 'rgba(255, 255, 255, 0.7)'
          }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && (
          <Typography color="error" sx={{ p: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}

        <Table sx={{ minWidth: 750 }}>
          <TableHead sx={{ background: '#f5f5f5' }}>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  {headCell.sortable ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => handleSort(headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    headCell.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row) => (
              <TableRow hover key={row.id}>
                <TableCell>{row.piloto}</TableCell>
                <TableCell>{row.placas}</TableCell>
                <TableCell align="right">{row.kilometros.toLocaleString()}</TableCell>
                <TableCell align="right">Q {row.monto.toFixed(2)}</TableCell>
                <TableCell>{formatDate(row.fecha)}</TableCell>
                <TableCell align="center">
                <Tooltip title={row.estado} arrow>
                    <Box
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        backgroundColor: row.estado === 'Aprobado' ? '#e8f5e9' : '#ffebee',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        border: `2px solid ${row.estado === 'Aprobado' ? '#4CAF50' : '#F44336'}`
                    }}
                    >
                    {row.estado === 'Aprobado' ? (
                        <CheckIcon 
                        sx={{ 
                            color: '#4CAF50',
                            fontSize: '1.2rem',
                            strokeWidth: 2
                        }} 
                        />
                    ) : (
                        <CloseIcon 
                        sx={{ 
                            color: '#F44336',
                            fontSize: '1.2rem',
                            strokeWidth: 2
                        }} 
                        />
                    )}
                    </Box>
                </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }: { from: number; to: number; count: number }) => 
          `Mostrando ${from}-${to} de ${count} registros`}
        sx={{ borderTop: '1px solid #eee' }}
      />
    </Paper>
  );
};

export default DynamicFuelTable;