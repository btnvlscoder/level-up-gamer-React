// Contenido de: src/pages/ProfilePage.jsx (Funcionalidad Completa Pre-Refactorización)

import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { PersonVcard, CheckCircleFill, InfoCircleFill } from 'react-bootstrap-icons';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // 1. Lógica de Ruta Protegida: Redirige si el usuario no está logueado.
  useEffect(() => {
    if (!currentUser) {
      toast.error("Debes iniciar sesión para ver tu perfil.");
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success("Has cerrado sesión.");
  };

  // Muestra un estado nulo si el usuario aún no está cargado (importante para evitar errores de renderizado)
  if (!currentUser) {
    return null; 
  }

  // 3. Formatear Nombre Completo (usando los campos de registro)
  const nombreCompleto = `${currentUser.nombre} ${currentUser.apellidoPaterno} ${currentUser.apellidoMaterno}`;

  return (
    <div className="profile-page">
      <h2 className="titulo-principal">Mi Perfil</h2>
      
      <div className="profile-header">
        <PersonVcard className="icon" />
        <div>
          <h3>{nombreCompleto}</h3>
          <span className="email">{currentUser.email}</span>
        </div>
      </div>

      <div className="profile-info">
        <p>Esta es tu información de usuario y beneficios.</p>
        
        {/* 4. Lógica de Mensaje de Descuento (condicional) */}
        {currentUser.tieneDescuentoDuoc ? (
          <div className="discount-banner duoc">
            <h4><CheckCircleFill /> Beneficio Duoc UC Activado</h4>
            <p>¡Felicidades! Tienes un <b>10% de descuento</b> en todas tus compras por ser estudiante de Duoc UC.</p>
          </div>
        ) : (
          <div className="discount-banner no-duoc">
            <h4><InfoCircleFill /> Beneficios Estudiantiles</h4>
            <p>¿Sabías que si te registras con tu correo @duocuc.cl obtienes un 10% de descuento? ¡Visita Duoc UC para más beneficios!</p>
          </div>
        )}
      </div>

      <button className="auth-button" style={{marginTop: '2rem', backgroundColor: 'var(--clr-accent-red)'}} onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
}