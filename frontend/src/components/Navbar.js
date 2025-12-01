import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

export default function Navbar() {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">VentasApp</Link>
        <div>
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/products">Productos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/sales">Ventas</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/inventory">Inventario</Link></li>
          </ul>
        </div>
        <div>
          {state.user ? (
            <>
              <span className="me-2">Hola, {state.user.username}</span>
              <button className="btn btn-outline-secondary btn-sm" onClick={logout}>Salir</button>
            </>
          ) : (
            <Link className="btn btn-primary btn-sm" to="/login">Iniciar</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
