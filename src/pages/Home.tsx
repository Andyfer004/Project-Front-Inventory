import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Bienvenido</h1>
      <Link to="/login">Iniciar Sesión</Link>
    </div>
  );
}
