import * as React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const [error, setError] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async () => {
    const { email, password } = formData;
    console.log(`Signing in with email: ${email}, password: ${password}`);

    if (email === '' && password === '') {
      navigate('/');
    } else {
      setError('Invalid email or password. Try again.');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #121212 0%, #1a1a2e 100%)',
      }}
    >
      <Box
        sx={{
          width: 380,
          padding: 4,
          borderRadius: 2,
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={2}>
          Welcome Back
        </Typography>

        <TextField
          fullWidth
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          sx={{
            mb: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': { borderRadius: 1, color: 'white' },
            '& .MuiInputLabel-root': { color: 'white' },
          }}
        />

        <TextField
          fullWidth
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
          sx={{
            mb: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': { borderRadius: 1, color: 'white' },
            '& .MuiInputLabel-root': { color: 'white' },
          }}
        />

        {error && (
          <Typography color="#ff4d4d" fontSize="0.9rem" mb={2}>
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          onClick={handleSignIn}
          sx={{
            fontWeight: 'bold',
            backgroundColor: '#ff4d4d',
            '&:hover': { backgroundColor: '#d43f3f' },
            transition: 'all 0.3s ease',
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
