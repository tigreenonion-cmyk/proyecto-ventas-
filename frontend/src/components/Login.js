import React, { useState, useContext } from 'react';
import api from '../api';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await api.post('/auth/login', { username, password });
      const token = res.data.token;
      // solicitud me para obtener user
      localStorage.setItem('token', token);
      const me = await api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` }});
      dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user: me.data }});
      navigate('/');
    } catch (err) {
      dispatch({ type: 'LOGIN_FAIL', payload: err.response?.data?.error || err.message });
      alert('Error en login: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-4">
        <h3>Iniciar sesión</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>Usuario</label>
            <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} required/>
          </div>
          <div className="mb-2">
            <label>Contraseña</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required/>
          </div>
          <button className="btn btn-primary">Entrar</button>
        </form>
      </div>
    </div>
  );
}
