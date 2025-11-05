// Contenido de src/pages/ProductDetailPage.jsx

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products'; // <--- Asegúrate de que esta ruta también sea correcta
import { Cart, ArrowLeft, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { PriceFormat } from '../utils/formatter.js';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast'; // <--- Importar toast

export default function ProductDetailPage() {
  const { code } = useParams();
  const product = products.find(p => p.code === code);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addItem } = useCart(); 

  if (!product) {
    return (
      <div className="producto-detalle-container">
        <h2>Producto no encontrado</h2>
        <Link to="/products" className="btn-volver">
          <ArrowLeft /> Volver al catálogo
        </Link>
      </div>
    );
  }

  const { name, signature, category, description, price, img } = product;

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? img.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === img.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const jumpToSlide = (index) => {
    setCurrentIndex(index);
  };
  
  const handleAddToCart = () => {
    addItem(product);
    toast.success(`"${name}" agregado al carrito!`); // <--- Llamar a toast
  }

  return (
    <div className="producto-detalle-container">
      <div className="producto-detalle">
        
        <div className="producto-slider">
          <button className="slider-btn prev" onClick={prevSlide}>
            <ChevronLeft />
          </button>
          <div className="slider-container">
            <img src={img[currentIndex]} alt={`${name} - imagen ${currentIndex + 1}`} className="slider-img active" />
          </div>
          <button className="slider-btn next" onClick={nextSlide}>
            <ChevronRight />
          </button>

          {img.length > 1 && (
            <div className="miniaturas-container">
              {img.map((imagenSrc, index) => (
                <img
                  key={index}
                  src={imagenSrc}
                  alt={`miniatura ${index + 1}`}
                  className={`miniatura ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => jumpToSlide(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="producto-info">
          <h2 className="producto-titulo-detalle">{name}</h2>
          <p className="producto-marca-detalle">{signature}</p>
          <p className="producto-codigo">Código: {code}</p>
          <p className="producto-categoria">Categoría: {category}</p>
          <p className="producto-descripcion">{description}</p>
          <p className="producto-precio">{PriceFormat(price)}</p>
          
          <div className="acciones-botones"> 
            <button className="producto-agregar" id="agregar-detalle" onClick={handleAddToCart}>
              <Cart /> Agregar al carrito
            </button>
            
            <Link to="/products" className="btn-volver">
              <ArrowLeft /> Volver al catálogo
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}