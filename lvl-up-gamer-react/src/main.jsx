// Contenido de src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter,
  RouterProvider 
} from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

// Estilos Globales
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// Layout Principal
import MainLayout from './components/MainLayout';
import ProductDetailPage from './pages/ProductDetailPage';

// Páginas
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';

import { CartProvider } from './context/CartContext';

// Definición de las rutas
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, 
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'product/:code', element: <ProductDetailPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'cart', element: <CartPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
      
      {/* --- ¡AQUÍ ESTÁ EL CAMBIO! --- */}
      <Toaster 
        position="top-right" // ANTES: "bottom-right"
        toastOptions={{
          // Dejamos los mismos estilos geniales
          style: {
            background: 'var(--clr-main-light)',
            color: 'var(--clr-accent-green)',
            border: '1px solid var(--clr-accent-green)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
          },
          success: {
            iconTheme: {
              primary: 'var(--clr-accent-green)',
              secondary: 'var(--clr-main)',
            },
          },
        }}
      />
    </CartProvider>
  </React.StrictMode>
);