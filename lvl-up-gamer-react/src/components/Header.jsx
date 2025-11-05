import React from 'react';
import { NavLink } from 'react-router-dom';

import { 
  Joystick, 
  HouseDoor, 
  Controller, 
  ChatDotsFill, 
  Cart 
} from 'react-bootstrap-icons';

function Header() {
  const numerito = 0; 

  return (
    <aside>
      <header>
        <NavLink to="/">
          <h1 className="logo"><Joystick /> Level-Up Gamer</h1>
        </NavLink>
        <img className="logojpg" src="/img/logo.jpg" alt="Logo Level-Up Gamer" />
      </header>
      <nav>
        <ul className="menu">
          <li>
            <NavLink className="boton-menu" to="/">
              <HouseDoor /> Inicio
            </NavLink>
          </li>
          <li>
            <NavLink className="boton-menu" to="/products">
              <Controller /> Productos
            </NavLink>
          </li>
          <li>
            <NavLink className="boton-menu" to="/contact">
              <ChatDotsFill /> Contáctanos
            </NavLink>
          </li>
          <li>
            <NavLink className="boton-menu boton-carrito" to="/cart">
              <Cart /> Carrito <span className="numerito">{numerito}</span>
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