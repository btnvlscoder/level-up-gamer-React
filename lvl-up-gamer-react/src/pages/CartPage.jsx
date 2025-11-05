import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PriceFormat } from '../utils/formatter';
import { EmojiFrown, Trash, ArrowLeft } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom'; 
import VoucherModal from '../components/VoucherModal';
import { useAuth } from '../context/AuthContext'; 
import toast from 'react-hot-toast';

export default function CartPage() {
  const [showVoucher, setShowVoucher] = useState(false);
  
  // Estados para guardar la instantánea del carrito para el voucher (pre-limpieza)
  const [voucherCart, setVoucherCart] = useState([]);
  const [voucherSubtotal, setVoucherSubtotal] = useState(0); 
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherTotal, setVoucherTotal] = useState(0);

  const {
    cart,
    subtotal,
    discount,
    cartTotal,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const { currentUser } = useAuth(); // Para proteger la compra
  const navigate = useNavigate();

  const handleCompra = () => {
    // 1. PROTEGER RUTA
    if (!currentUser) {
      toast.error("Debes iniciar sesión para comprar.");
      navigate('/login'); 
      return;
    }

    if (cart.length === 0) return;

    // 2. Guardar instantánea del carrito y totales
    setVoucherCart([...cart]);
    setVoucherSubtotal(subtotal);
    setVoucherDiscount(discount);
    setVoucherTotal(cartTotal);

    // 3. Mostrar Voucher y Limpiar Carrito
    setShowVoucher(true);
    clearCart();
  };

  const handleCloseVoucher = () => {
    setShowVoucher(false);
  };

  // Vista de Carrito Vacío
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

  // Vista de Carrito con Items
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

        {/* Resumen del Carrito con Descuento */}
        <div className="carrito-resumen">
          <div className="resumen-total">
            <p className="resumen-linea">Subtotal: <span>{PriceFormat(subtotal)}</span></p>
            {discount > 0 && (
              <p className="resumen-linea descuento">
                Descuento Duoc (10%): <span>- {PriceFormat(discount)}</span>
              </p>
            )}
            <p className="resumen-linea total">
              Total: <span>{PriceFormat(cartTotal)}</span>
            </p>
          </div>

          <div className="carrito-botones">
            <button className="btn-vaciar" onClick={() => clearCart()}>Vaciar carrito</button>
            <button className="btn-comprar" onClick={handleCompra}>
              {currentUser ? "Comprar ahora" : "Inicia sesión para comprar"}
            </button>
          </div>
        </div>
      </div>

      {/* Voucher Modal */}
      {showVoucher && (
        <VoucherModal
          cart={voucherCart}
          subtotal={voucherSubtotal}
          discount={voucherDiscount}
          cartTotal={voucherTotal}
          onClose={handleCloseVoucher}
        />
      )}
    </>
  );
}