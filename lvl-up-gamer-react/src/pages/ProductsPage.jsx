import React, { useState } from 'react';
import products from '../data/products'; 

import ProductCard from '../components/ProductCard';
import { Search } from 'react-bootstrap-icons'; 

// 2. Extracción segura de categorías
// Comprobamos si 'products' es un array antes de mapearlo
const categoriasUnicas = Array.isArray(products)
  ? ["todos", ...new Set(products.map(p => p.category))]
  : ["todos"];

export default function ProductsPage() {
  
  const [categoria, setCategoria] = useState('todos');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  // 4. Lógica de filtrado (con comprobación de 'products')
  const productosFiltrados = (Array.isArray(products) ? products : [])
    .filter(p => {
      return categoria === 'todos' ? true : p.category === categoria;
    })
    .filter(p => {
      const t = terminoBusqueda.toLowerCase();
      const nombreCoincide = p.name && p.name.toLowerCase().includes(t);
      const marcaCoincide = p.signature && p.signature.toLowerCase().includes(t);
      return nombreCoincide || marcaCoincide;
    });

  return (
    <>
      <h2 className="titulo-principal">Catálogo de productos</h2>
      
      <div className="productos-toolbar">
        <select 
          id="filtro-categoria" 
          className="filtro-categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          {/* Este .map() AHORA tiene una 'key' segura */}
          {categoriasUnicas.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'todos' ? 'Todas las categorías' : cat}
            </option>
          ))}
        </select>
        
        <input 
          id="buscador" 
          className="buscador" 
          type="search" 
          placeholder="Buscar producto..." 
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
        />
        <button id="btnBuscar" className="btn btn-primary">
          <Search />
        </button>
      </div>

      <div className="contenedor-productos">
        {/* Este .map() AHORA tiene una 'key' segura */}
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(producto => (
            <ProductCard 
              key={producto.code} 
              product={producto}
            />
          ))
        ) : (
          <div className="no-resultados">
            <i className="bi bi-exclamation-triangle"></i> No se encontraron productos.
          </div>
        )}
      </div>
    </>
  );
}