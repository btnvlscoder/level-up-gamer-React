// Contenido de src/components/MainLayout.jsx

import React, { useState } from 'react'; // 1. Importar useState
import { Outlet } from 'react-router-dom';
import Header from './Header'; 
import { List } from 'react-bootstrap-icons'; // 2. Importar el ícono de "hamburguesa"

function MainLayout() {
  // 3. Crear el estado para el menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 4. Función para abrir/cerrar el menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="wrapper">
      {/* 5. Pasar el estado y la función al Header (aside) */}
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      {/* 6. Añadir el overlay (se mostrará solo si el CSS lo permite) */}
      {/* Este div DEBE estar justo después del Header para que el CSS funcione */}
      <div className="overlay-mobile" onClick={toggleMenu}></div>

      <main>
        {/* 7. Añadir el botón hamburguesa (se mostrará solo si el CSS lo permite) */}
        <button className="btn-menu-toggle" onClick={toggleMenu}>
          <List />
        </button>

        {/* El resto de tu página */}
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;