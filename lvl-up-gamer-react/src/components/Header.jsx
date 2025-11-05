// Contenido de src/components/Header.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Joystick, 
  HouseDoor, 
  Controller, 
  ChatDotsFill, 
  Cart 
} from 'react-bootstrap-icons';
import { useCart } from '../context/CartContext'; 

// 1. Aceptar 'isMenuOpen' y 'toggleMenu' como props
function Header({ isMenuOpen, toggleMenu }) {
  const { totalItems } = useCart(); 

  // 2. Función para cerrar el menú si se hace clic en un link (en móvil)
  const handleLinkClick = () => {
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    // 3. Aplicar la clase 'active' si 'isMenuOpen' es true
    <aside className={isMenuOpen ? 'active' : ''}>
      <header>
        {/* 4. Añadir el 'onClick' a los links para que cierren el menú */}
        <NavLink to="/" onClick={handleLinkClick}>
          <h1 className="logo"><Joystick /> Level-Up Gamer</h1>
        </NavLink>
        <img className="logojpg" src="/img/logo.jpg" alt="Logo Level-Up Gamer" />
      </header>
      <nav>
        <ul className="menu">
          <li>
            <NavLink className="boton-menu" to="/" onClick={handleLinkClick}>
              <HouseDoor /> Inicio
            </NavLink>
          </li>
          <li>
            <NavLink className="boton-menu" to="/products" onClick={handleLinkClick}>
              <Controller /> Productos
            </NavLink>
          </li>
          <li>
            <NavLink className="boton-menu" to="/contact" onClick={handleLinkClick}>
              <ChatDotsFill /> Contáctanos
            </NavLink>
          </li>
          <li>
            <NavLink className="boton-menu boton-carrito" to="/cart" onClick={handleLinkClick}>
              <Cart /> Carrito <span className="numerito">{totalItems}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <footer>
        <p className="texto-footer">&copy; 2025 Level-Up Gamer</p>
        <small className="texto-small-footer">
          Tu tienda online de confianza para todos tus productos gamers.
        </small>
      </footer>
    </aside>
  );
}

export default Header;