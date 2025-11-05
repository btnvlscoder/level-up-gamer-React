import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // Importamos nuestro Header

function MainLayout() {
  return (
    <div className="wrapper">
      <Header />
      <main>
        {/* Aquí es donde React Router renderizará nuestras páginas (Inicio, Productos, etc.) */}
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;