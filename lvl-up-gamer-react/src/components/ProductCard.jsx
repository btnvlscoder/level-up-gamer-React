import React from "react";
import { Link } from "react-router-dom";
import { Cart } from "react-bootstrap-icons"
import products from "../data/products";

const PriceFormat = (price) => {
    return new Intl.NumberFormat('es-CL',{
        style: 'currency',
        currency: 'clp'
    }).format(price);
}

function ProductCard({product}) {

    const {code, name, signature, price, img} = product;
    const imageUrl = img && img.length > 0 ? img [0] :
     '/img/placeholder.jpg'
    const handleAddToCart = () => {
        console.klog('Añadir al carrito: ${code}');
    }

    return (
        <div className="product">
        <Link to={`/product/${code}`}>
            <img className="product-img" src={imageUrl} alt={name} />
        </Link>
        <div className="product-details">
            {marca && <p className="product-signature">{signature}</p>}
            <h3 className="product-title">
            <Link to={`/product/${code}`}>{name}</Link>
            </h3>
            <p className="price">{formatPrice(price)}</p>
            <button className="product-add" onClick={handleAddToCart} data-code={code}>
            <Cart /> Agregar
            </button>
        </div>
        </div>
    );
    }

export default ProductCard;