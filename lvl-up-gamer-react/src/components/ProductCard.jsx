// Contenido de: src/components/ProductCard.jsx (Funcionalidad Completa Pre-Refactorización)

import React from "react";
import { Link } from "react-router-dom";
import { Cart } from "react-bootstrap-icons";
import { PriceFormat } from '../utils/formatter.js';

import { useCart } from '../context/CartContext'; 
import toast from 'react-hot-toast'; 

function ProductCard({product}) {
  const { addItem } = useCart(); 

  const {code, name, signature, price, img} = product;
  const imageUrl = img && img.length > 0 ? img[0] : '/img/placeholder.jpg';

  const handleAddToCart = () => {
    addItem(product); 
    toast.success(`"${name}" agregado al carrito!`); 
  }

  return (
    <div className="product">
      <Link to={`/product/${code}`}>
        <img className="product-img" src={imageUrl} alt={name} />
      </Link>
      <div className="product-details">
        {signature && <p className="product-signature">{signature}</p>}
        <h3 className="product-title">
          <Link to={`/product/${code}`}>{name}</Link>
        </h3>
        <p className="price">{PriceFormat(price)}</p>
        
        <button className="product-add" onClick={handleAddToCart} data-code={code}>
          <Cart /> Agregar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;