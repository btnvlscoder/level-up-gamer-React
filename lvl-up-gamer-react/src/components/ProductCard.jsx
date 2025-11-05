import React from "react";
import { Link } from "react-router-dom";
import { Cart } from "react-bootstrap-icons";
// NO necesitamos importar 'products' aquí. Este componente solo recibe uno.
import { PriceFormat } from '../utils/formatter.js';

function ProductCard({product}) {

  // 'product' viene de las props, no de una importación
  const {code, name, signature, price, img} = product;
  
  const imageUrl = img && img.length > 0 ? img[0] : '/img/placeholder.jpg';

  const handleAddToCart = () => {
    console.log(`Añadir al carrito: ${code}`); 
  }

  return (
    <div className="product">
      <Link to={`/product/${code}`}>
        <img className="product-img" src={imageUrl} alt={name} />
      </Link>
      <div className="product-details">
        {/* 2. Arreglo: La variable 'marca' no existía. Era 'signature' */}
        {signature && <p className="product-signature">{signature}</p>}
        <h3 className="product-title">
          <Link to={`/product/${code}`}>{name}</Link>
        </h3>
        {/* 3. Arreglo: La función se llama 'PriceFormat', no 'formatPrice' */}
        <p className="price">{PriceFormat(price)}</p>
        <button className="product-add" onClick={handleAddToCart} data-code={code}>
          <Cart /> Agregar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;