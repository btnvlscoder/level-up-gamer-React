import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products'; // Importamos TODOS los productos
import { Cart, ArrowLeft, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { PriceFormat } from '../utils/formatter.js';

export default function ProductDetailPage() {
  // 1. Obtener el 'code' de la URL
  const { code } = useParams();
  
  // 2. Buscar el producto en nuestro array
  const product = products.find(p => p.code === code);

  // 3. Estado para el slider de imágenes (recreando tu 'detalle.js')
  const [currentIndex, setCurrentIndex] = useState(0);

  // 4. Si el producto no se encuentra (mala URL)
  if (!product) {
    return (
      <div className="producto-detalle-container">
        <h2>Producto no encontrado</h2>
        <Link to="/productos" className="btn-volver">
          <ArrowLeft /> Volver al catálogo
        </Link>
      </div>
    );
  }

  // Desestructuramos el producto encontrado
  const { name, signature, category, description, price, img } = product;

  // 5. Lógica del Slider
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

  const handleAddToCart = () => {
    // TODO: Conectar al Context del carrito
    console.log(`Añadir ${product.code} al carrito`);
  }

  // 6. Renderizar el JSX (basado en tu 'detalle-producto.html')
  return (
    <div className="producto-detalle-container">
      <div className="producto-detalle">
        
        <div className="producto-slider">
          <button className="slider-btn prev" onClick={prevSlide}>
            <ChevronLeft />
          </button>
          <div className="slider-container">
            {/* Mostramos solo la imagen activa */}
            <img src={img[currentIndex]} alt={`${name} - imagen ${currentIndex + 1}`} className="slider-img active" />
          </div>
          <button className="slider-btn next" onClick={nextSlide}>
            <ChevronRight />
          </button>
        </div>

        <div className="producto-info">
          <h2 className="producto-titulo-detalle">{name}</h2>
          <p className="producto-marca-detalle">{signature}</p>
          <p className="producto-codigo">Código: {code}</p>
          <p className="producto-categoria">Categoría: {category}</p>
          <p className="producto-descripcion">{description}</p>
          <p className="producto-precio">{PriceFormat(price)}</p>
          
          {/* OJO: Tu CSS espera la clase '.producto-agregar'.
            Tu ProductCard usa '.product-add'.
            ¡Asegúrate de que tu CSS tenga la clase correcta!
            Usaré '.producto-agregar' como en tu style.css original.
          */}
          <button className="producto-agregar" id="agregar-detalle" onClick={handleAddToCart}>
            <Cart /> Agregar al carrito
          </button>
          
          <Link to="/productos" className="btn-volver">
            <ArrowLeft /> Volver al catálogo
          </Link>
        </div>
        
      </div>
    </div>
  );
}