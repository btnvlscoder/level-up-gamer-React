// Contenido de: src/pages/LoginPage.jsx (Funcionalidad Completa Pre-Refactorización)

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Intenta iniciar sesión (la validación de credenciales ocurre en AuthContext)
      await login(email, password);
      
      toast.success('¡Bienvenido de vuelta!');
      navigate('/'); // Redirigir al inicio después de un login exitoso
    } catch (err) {
      // Captura y muestra errores (ej. "Correo o contraseña incorrectos.")
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="titulo-principal" style={{ margin: '0 0 2rem 0' }}>Iniciar Sesión</h2>
      <form className="auth-form" onSubmit={handleSubmit}>

        {/* Muestra el mensaje de error si existe */}
        {error && <div className="auth-error">{error}</div>}

        {/* Campo: Correo Electrónico */}
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        {/* Campo: Contraseña */}
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="auth-button">Entrar</button>
      </form>
      
      {/* Enlace para ir a la página de registro */}
      <div className="auth-switch-link">
        ¿No tienes cuenta? <a onClick={() => navigate('/register')} style={{cursor: 'pointer'}}>Regístrate</a>
      </div>
    </div>
  );
}