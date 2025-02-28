import * as React from 'react';
import { Box, Button, TextField, Typography, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import muniLogo from '../assets/munilogo.png';

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const [error, setError] = React.useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async () => {
    const { email, password } = formData;
    console.log(`Signing in with email: ${email}, password: ${password}`);

    if (email === '' || password === '') {
      setError('Please enter both username and password.');
    } else {
      navigate('/');
    }
  };

  return (
    
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0f2027, #204327, #33642c)',
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: 400,
          padding: 4,
          borderRadius: 15,
          backgroundColor: 'white',
          boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.9)',
          textAlign: 'center',
        }}
      >
        <Box component="img" src={muniLogo} alt="Municipio de Zacapa" sx={{ width: '100px', mb: 2 }} />

        <Typography variant="h5" fontWeight={700} mb={3} sx={{ fontFamily: 'Poppins, sans-serif', color: '#000000' }}>
          Municipalidad de Zacapa
        </Typography>

        <Typography variant="body2" fontWeight={500} textAlign="left" sx={{ fontFamily: 'Poppins, sans-serif', mb: 0.5 }}>
          Username
        </Typography>
        <TextField
          fullWidth
          name="email"
          type="text"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          sx={{ mb: 2, borderRadius: 1, fontFamily: 'Poppins, sans-serif' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="body2" fontWeight={500} textAlign="left" sx={{ fontFamily: 'Poppins, sans-serif', mb: 0.5 }}>
          Password
        </Typography>
        <TextField
          fullWidth
          name="password"
          type="password"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
          sx={{ mb: 2, borderRadius: 1, fontFamily: 'Poppins, sans-serif' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />

        {error && (
          <Typography color="red" fontSize="0.9rem" mb={2}>
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          onClick={handleSignIn}
          sx={{
            fontWeight: 'bold',
            backgroundColor: '#38B000',
            '&:hover': { backgroundColor: '#d43f3f' },
            transition: 'all 0.3s ease',
            fontFamily: 'Poppins, sans-serif',
            borderRadius: 5,
            padding: '12px 0',
          }}
        >
          LOGIN
        </Button>
      </Box>
    </Box>
  );
}
