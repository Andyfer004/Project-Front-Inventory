import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';

export default function Customers() {
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
          width: '90%',
          textAlign: 'left',
          pl: { xs: 2, md: 6 },
        }}
      >
        Bienvenido 👋
      </Typography>

      {/* Contenedor grande */}
      <Box
        sx={{
          width: { xs: '90%', sm: '80%', md: '750px' },
          backgroundColor: '#FFFFFF',
          borderRadius: '30px',
          boxShadow: '0px 10px 60px rgba(226, 236, 249, 0.5)',
          p: { xs: 3, md: 5 },
          maxWidth: '900px',
          ml: { xs: 0, md: '30px' },
          mr: { xs: 0, md: '30px' },
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={2}>
          Solicitud de combustible
        </Typography>
        <Typography color="success.main" fontWeight={500} mb={2}>
          Nueva Solicitud
        </Typography>

        {/* Primera fila de inputs */}
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} mb={3}>
          <TextField label="Nombres" variant="outlined" fullWidth />
          <TextField label="Apellidos" variant="outlined" fullWidth />
          <TextField label="Cargo" variant="outlined" fullWidth />
          <TextField label="Direccion/Oficina/Unidad" variant="outlined" fullWidth />
        </Box>

        <Typography variant="body1" mb={3}>
          Por medio del presente formulario se solicita se pueda proporcionar el combustible necesario
          para cumplir con la comisión asignada, de conformidad con la información siguiente:
        </Typography>

        {/* Información de la comisión */}
        <Typography fontWeight={600} mb={1}>
          1. Información de la comisión
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} mb={3}>
          <TextField label="Destino de comisión" variant="outlined" fullWidth />
          <TextField label="Duración de la comisión" variant="outlined" fullWidth />
          <TextField label="Km estimados a recorrer" variant="outlined" fullWidth />
          <TextField label="Km inicial" variant="outlined" fullWidth />
        </Box>

        {/* Datos del vehículo */}
        <Typography fontWeight={600} mb={1}>
          2. Datos del vehículo a utilizar
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} mb={3}>
          <TextField label="Tipo" variant="outlined" fullWidth />
          <TextField label="Color" variant="outlined" fullWidth />
          <TextField label="Marca" variant="outlined" fullWidth />
          <TextField label="Cilindraje del motor" variant="outlined" fullWidth />
          <TextField label="Placa" variant="outlined" fullWidth />
          <TextField select label="Propiedad Municipal" variant="outlined" fullWidth>
            <MenuItem value="Sí">Sí</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
          <TextField label="Modelo" variant="outlined" fullWidth />
        </Box>

        {/* Información del suministro requerido */}
        <Typography fontWeight={600} mb={1}>
          3. Información del suministro requerido
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} mb={3}>
          <TextField label="Cantidad solicitada (galones)" variant="outlined" fullWidth />
          <TextField select label="Combustible Requerido" variant="outlined" fullWidth>
            <MenuItem value="Gasolina">Gasolina</MenuItem>
            <MenuItem value="Diésel">Diésel</MenuItem>
          </TextField>
        </Box>

        {/* Información de vale entregado */}
        <Typography fontWeight={600} mb={1}>
          4. Información de vale entregado
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} mb={3}>
          <TextField label="Número de vale" variant="outlined" fullWidth />
          <TextField label="Valor" variant="outlined" fullWidth />
        </Box>

        {/* Recibe y entrega */}
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} mb={3}>
          <TextField label="Recibe: Nombre" variant="outlined" fullWidth />
          <TextField label="Cargo" variant="outlined" fullWidth />
          <TextField label="Cargo" variant="outlined" fullWidth />
          <TextField label="Entrega: Encargado de Suministro" variant="outlined" fullWidth />
        </Box>

        {/* Botón */}
        <Box display="flex" justifyContent="center">
          <Button variant="contained" color="primary" size="large">
            Enviar Solicitud
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
