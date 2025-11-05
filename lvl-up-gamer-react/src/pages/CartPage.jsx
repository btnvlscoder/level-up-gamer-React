// Contenido de src/pages/CartPage.jsx

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PriceFormat } from '../utils/formatter';
import { EmojiFrown, Trash, ArrowLeft } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

// Importamos el nuevo modal
import VoucherModal from '../components/VoucherModal'; 

export default function CartPage() {
  // Estado para mostrar/ocultar el modal
  const [showVoucher, setShowVoucher] = useState(false);
  
  // Estados para guardar una "instantánea" del carrito al momento de comprar
  const [voucherCart, setVoucherCart] = useState([]);
  const [voucherTotal, setVoucherTotal] = useState(0);

  const { 
    cart, 
    cartTotal, 
    removeItem, 
    increaseQuantity, 
    decreaseQuantity, 
    clearCart 
  } = useCart();

  // Función para manejar la compra
  const handleCompra = () => {
    // No hacer nada si el carrito ya está vacío
    if (cart.length === 0) return;
    
    // 1. Guardamos una instantánea del carrito y el total ANTES de limpiarlo
    setVoucherCart([...cart]); 
    setVoucherTotal(cartTotal);
    
    // 2. Mostrar el modal
    setShowVoucher(true);
    
    // 3. Limpiar el carrito del contexto
    clearCart();
  };

  // Función para que el modal se cierre (se pasa como prop)
  const handleCloseVoucher = () => {
    setShowVoucher(false);
  };

  // Si el carrito está vacío Y el modal NO está activo, muestra el mensaje
  if (cart.length === 0 && !showVoucher) {
    return (
      <div className="contenedor-carrito">
        <h2 className="titulo-principal">Carro de compras</h2>
        <p className="carrito-vacio">
          Tu carrito está vacío <EmojiFrown />
        </p>
        <Link to="/products" className="btn-volver" style={{ textDecoration: 'none', display: 'inline-flex', margin: '0 auto' }}>
          <ArrowLeft /> Ir al catálogo
        </Link>
      </div>
    );
  }

  // Si el carrito TIENE items, muestra la lista
  return (
    <>
      <div className="contenedor-carrito">
        <h2 className="titulo-principal">Carro de compras</h2>
        
        <div className="carrito-productos">
          {cart.map(item => (
            <div className="carrito-producto" key={item.code}>
              <img src={item.img[0]} alt={item.name} className="carrito-producto-imagen" />
              <div className="carrito-producto-info">
                <h3 className="carrito-producto-nombre">{item.name}</h3>
                <p className="carrito-producto-marca">{item.signature}</p>
              </div>
              <div className="carrito-producto-precio-container">
                <span className="etiqueta-precio">Precio</span>
                <span className="carrito-producto-precio">{PriceFormat(item.price)}</span>
              </div>
              <div className="carrito-producto-cantidad-container">
                <span className="etiqueta-cantidad">Cantidad</span>
                <div className="carrito-producto-controls">
                  <button className="cantidad-btn menos" onClick={() => decreaseQuantity(item.code)}>-</button>
                  <input type="number" className="cantidad-numero" value={item.quantity} readOnly />
                  <button className="cantidad-btn mas" onClick={() => increaseQuantity(item.code)}>+</button>
                </div>
              </div>
              <div className="carrito-producto-subtotal-container">
                <span className="etiqueta-subtotal">Subtotal</span>
                <span className="carrito-producto-subtotal">{PriceFormat(item.price * item.quantity)}</span>
              </div>
              <div className="carrito-producto-eliminar-container">
                <span className="etiqueta-eliminar">Eliminar</span>
                <button className="carrito-producto-eliminar" onClick={() => removeItem(item.code)}>
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="carrito-resumen">
          <div className="resumen-total">
            <p>Total: <span>{PriceFormat(cartTotal)}</span></p>
          </div>
          
          <div className="carrito-botones">
            <button className="btn-vaciar" onClick={() => clearCart()}>Vaciar carrito</button>
            <button className="btn-comprar" onClick={handleCompra}>Comprar ahora</button>
          </div>
        </div>
      </div>

      {/* Finalmente, renderizamos el modal SÓLO SI showVoucher es true.
        Le pasamos la 'instantánea' (voucherCart y voucherTotal) que guardamos,
        ya que 'cart' y 'cartTotal' del contexto ya están vacíos en este punto.
      */}
      {showVoucher && (
        <VoucherModal 
          cart={voucherCart} 
          cartTotal={voucherTotal} 
          onClose={handleCloseVoucher} 
        />
      )}
    </>
  );
}