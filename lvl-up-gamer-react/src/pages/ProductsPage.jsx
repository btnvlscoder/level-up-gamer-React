import React, { useState } from 'react';

// 1. Importar nuestros datos y el nuevo componente
import productos from '../data/products'; // Asumiendo que products.js está en src/data/
import ProductCard from '../components/ProductCard'; // El card que acabamos de crear
import { Search } from 'react-bootstrap-icons'; // Icono para el botón de búsqueda

// 2. Extraer categorías únicas para el <select>
const categoriasUnicas = ["todos", ...new Set(productos.map(p => p.categoria))];

export default function ProductsPage() {
  
  // 3. Crear "estados" para manejar los filtros
  const [categoria, setCategoria] = useState('todos');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  // 4. Lógica de filtrado
  const productosFiltrados = productos
    .filter(p => {
      // Filtro por categoría
      return categoria === 'todos' ? true : p.categoria === categoria;
    })
    .filter(p => {
      // Filtro por término de búsqueda
      const t = terminoBusqueda.toLowerCase();
      return (
        p.nombre.toLowerCase().includes(t) ||
        (p.marca && p.marca.toLowerCase().includes(t))
      );
    });

  return (
    <>
      <h2 className="titulo-principal">Catálogo de productos</h2>
      
      {/* 5. Conectar los filtros al "estado" */}
      <div className="productos-toolbar">
        <select 
          id="filtro-categoria" 
          className="filtro-categoria"
          value={categoria} // El valor está atado al estado
          onChange={(e) => setCategoria(e.target.value)} // El onChange actualiza el estado
        >
          {categoriasUnicas.map(cat => (
            <option key={cat} value={cat}>{cat === 'todos' ? 'Todas las categorías' : cat}</option>
          ))}
        </select>
        
        <input 
          id="buscador" 
          className="buscador" 
          type="search" 
          placeholder="Buscar producto..." 
          value={terminoBusqueda} // El valor está atado al estado
          onChange={(e) => setTerminoBusqueda(e.target.value)} // El onChange actualiza el estado
        />
        <button id="btnBuscar" className="btn btn-primary">
          <Search />
        </button>
      </div>

      {/* 6. Renderizado de la lista */}
      <div className="contenedor-productos">
        {/* Usamos un renderizado condicional */}
        {productosFiltrados.length > 0 ? (
          // Si hay productos, los mapeamos
          productosFiltrados.map(producto => (
            <ProductCard 
              key={producto.codigo} // La 'key' es crucial para React
              producto={producto}   // Pasamos el objeto producto como 'prop'
            />
          ))
        ) : (
          // Si no hay productos, mostramos un mensaje
          <div className="no-resultados">
            <i className="bi bi-exclamation-triangle"></i> No se encontraron productos.
          </div>
        )}
      </div>
    </>
  );
}