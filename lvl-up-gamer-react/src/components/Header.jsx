// Contenido de: src/components/Header.jsx (Funcional y Corregido)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Joystick,
  HouseDoor,
  Controller,
  ChatDotsFill,
  Cart,
  BoxArrowRight,
  PersonCircle,
  PersonPlusFill,
  PersonVcard
} from 'react-bootstrap-icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function Header({ isMenuOpen, toggleMenu }) {
  const { totalItems } = useCart();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    if (isMenuOpen) {
      toggleMenu();
    }
    navigate(path); 
  };

  const handleLogout = () => {
    if (isMenuOpen) {
      toggleMenu();
    }
    logout();
    navigate('/'); 
    toast.success("Has cerrado sesión.");
  };

  return (
    <aside className={isMenuOpen ? 'active' : ''}>
      <header>
        <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('/'); }}>
          {/* CORREGIDO: Todos los íconos y contenedores usan className */}
          <h1 className="logo"><Joystick /> Level-Up Gamer</h1>
        </a>
        <img className="logojpg" src="/img/logo.jpg" alt="Logo Level-Up Gamer" />
      </header>
      <nav>
        <ul className="menu">
          <li>
            <a href="#" className="boton-menu" onClick={(e) => { e.preventDefault(); handleLinkClick('/'); }}>
              <HouseDoor /> Inicio
            </a>
          </li>
          <li>
            <a href="#" className="boton-menu" onClick={(e) => { e.preventDefault(); handleLinkClick('/products'); }}>
              <Controller /> Productos
            </a>
          </li>
          <li>
            <a href="#" className="boton-menu" onClick={(e) => { e.preventDefault(); handleLinkClick('/contact'); }}>
              <ChatDotsFill /> Contáctanos
            </a>
          </li>

          {/* Lógica de Autenticación */}
          {!currentUser ? (
            // Vista de Invitado
            <>
              <li>
                <a href="#" className="boton-menu" onClick={(e) => { e.preventDefault(); handleLinkClick('/login'); }}>
                  <PersonCircle /> Iniciar Sesión
                </a>
              </li>
              <li>
                <a href="#" className="boton-menu" onClick={(e) => { e.preventDefault(); handleLinkClick('/register'); }}>
                  <PersonPlusFill /> Registrarse
                </a>
              </li>
            </>
          ) : (
            // Vista de Usuario Autenticado
            <>
              <li>
                <a href="#" className="boton-menu" onClick={(e) => { e.preventDefault(); handleLinkClick('/profile'); }}>
                  <PersonVcard /> Mi Perfil
                </a>
              </li>
              <li>
                <a href="#" className="boton-menu" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                  <BoxArrowRight /> Cerrar Sesión
                </a>
              </li>
            </>
          )}
          {/* Fin Lógica de Autenticación */}

          <li>
            <a href="#" className="boton-menu boton-carrito" onClick={(e) => { e.preventDefault(); handleLinkClick('/cart'); }}>
              <Cart /> Carrito <span className="numerito">{totalItems}</span> {/* CORREGIDO: className */}
            </a>
          </li>
        </ul>
      </nav>
      <footer>
        <p className="texto-footer">&copy; 2025 Level-Up Gamer</p> {/* CORREGIDO: className */}
        <small className="texto-small-footer">
          Tu tienda online de confianza para todos tus productos gamers.
        </small>
      </footer>
    </aside>
  );
}

export default Header;