import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Estilos Globales
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// Layout Principal
import MainLayout from './components/MainLayout';

// Páginas
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';

// Definición de las rutas
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, 
    children: [
      {
        index: true, // ¡Importante para la página de inicio!
        element: <HomePage />,
      },
      {
        path: 'productos',
        element: <ProductsPage />,
      },
      {
        path: 'contacto',
        element: <ContactPage />,
      },
      {
        path: 'carrito',
        element: <CartPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

//git push origin dev --force