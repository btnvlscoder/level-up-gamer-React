import React from 'react';
import { useCart } from '../context/CartContext'; // 1. Importamos el hook
import { PriceFormat } from '../utils/formatter'; // Importamos el formateador
import { TrashFill } from 'react-bootstrap-icons'; // Icono

export default function CartPage() {
  // 2. Obtenemos todo lo que necesitamos del contexto
  const { 
    cart, 
    removeItem, 
    increaseQuantity, 
    decreaseQuantity, 
    clearCart, 
    totalItems, 
    cartTotal 
  } = useCart();

  // 3. Recreamos tu lógica de "Comprar" (sin el voucher por ahora)
  const handleComprar = () => {
    if (cart.length === 0) {
      // (Podemos añadir un toast aquí más adelante)
      console.log("El carrito está vacío");
      return;
    }
    // Lógica de compra...
    console.log("Compra realizada:", cart);
    // (Mostramos el voucher...)
    
    // Vaciamos el carrito
    clearCart();
  };

  // 4. Recreamos tu lógica de "Vaciar" (sin el 'confirm' por ahora)
  const handleVaciar = () => {
    if (cart.length === 0) return;
    // const confirmacion = window.confirm("¿Seguro...?"); // No usamos window.confirm
    // if (confirmacion) {
      clearCart();
    // }
  };

  // 5. Renderizado
  return (
    <>
      <h2 className="titulo-principal">Carro de compras</h2>
      <div className="contenedor-carrito">
        
        {/* --- Vista de Carrito Vacío --- */}
        {cart.length === 0 ? (
          <p className="carrito-vacio">
            Tu carrito está vacío <i className="bi bi-emoji-frown"></i>
          </p>
        ) : (
          /* --- Vista de Carrito Lleno --- */
          <>
            <div className="carrito-productos">
              {cart.map(item => (
                <div className="carrito-producto" key={item.code}>
                  <img 
                    src={item.img[0]} 
                    alt={item.name} 
                    className="carrito-producto-imagen" 
                  />
                  <div className="carrito-producto-info">
                    <h3 className="carrito-producto-nombre">{item.name}</h3>
                    <p className="carrito-producto-marca">{item.signature || ""}</p>
                  </div>
                  <div className="carrito-producto-precio-container">
                    <span className="etiqueta-precio">Precio</span>
                    <span className="carrito-producto-precio">
                      {PriceFormat(item.price)}
                    </span>
                  </div>
                  <div className="carrito-producto-cantidad-container">
                    <span className="etiqueta-cantidad">Cantidad</span>
                    <div className="carrito-producto-controls">
                      <button 
                        className="cantidad-btn menos" 
                        onClick={() => decreaseQuantity(item.code)}
                      >
                        -
                      </button>
                      {/* Usamos un 'input' de solo lectura por ahora, 
                          actualizarlo es más complejo (pero se puede hacer) */}
                      <input 
                        type="number" 
                        className="cantidad-numero" 
                        value={item.quantity} 
                        readOnly 
                      />
                      <button 
                        className="cantidad-btn mas" 
                        onClick={() => increaseQuantity(item.code)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="carrito-producto-subtotal-container">
                    <span className="etiqueta-subtotal">Subtotal</span>
                    <span className="carrito-producto-subtotal">
                      {PriceFormat(item.price * item.quantity)}
                    </span>
                  </div>
                  <div className="carrito-producto-eliminar-container">
                    <span className="etiqueta-eliminar">Eliminar</span>
                    <button 
                      className="carrito-producto-eliminar"
                      onClick={() => removeItem(item.code)}
                    >
                      <TrashFill />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="carrito-resumen">
              <div className="resumen-total">
                <p>Total: <span id="total">{PriceFormat(cartTotal)}</span></p>
              </div>
              <div className="carrito-botones">
                <button className="btn-vaciar" onClick={handleVaciar}>
                  Vaciar carrito
                </button>
                <button className="btn-comprar" onClick={handleComprar}>
                  Comprar ahora
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* El <div class="voucher-simple">...</div>
        Podemos añadirlo aquí y controlarlo con un estado local [showVoucher, setShowVoucher]
        Lo dejaremos para el siguiente paso para mantener esto simple.
      */}
    </>
  );
}