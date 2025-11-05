import React from 'react';
import { NavLink } from 'react-router-dom';

// Importamos los iconos con los nombres correctos (sin 'Bi')
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
          {/* Usamos las etiquetas correctas */}
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
            <NavLink className="boton-menu" to="/productos">
              <Controller /> Productos
            </NavLink>
          </li>
          <li>
            <NavLink className="boton-menu" to="/contacto">
              <ChatDotsFill /> Contáctanos
            </NavLink>
          </li>
          <li>
            <NavLink className="boton-menu boton-carrito" to="/carrito">
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