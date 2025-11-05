// Contenido de src/components/VoucherModal.jsx

import React, { useState } from 'react'; // <--- useState ya está
import { useNavigate } from 'react-router-dom';
import { PriceFormat } from '../utils/formatter';
import { Receipt, Send, ArrowLeft, CheckCircleFill } from 'react-bootstrap-icons';

// Ya NO necesitamos la función 'generateEmailBody'

export default function VoucherModal({ cart, cartTotal, onClose }) {
  const [email, setEmail] = useState('');
  
  // --- ¡NUEVO ESTADO! ---
  // Para rastrear si el "envío" (simulado) ya se hizo
  const [isEmailSent, setIsEmailSent] = useState(false);
  
  const navigate = useNavigate();

  const fecha = new Date().toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // --- ¡NUEVO HANDLER! ---
  // Se llama cuando el usuario hace clic en "Enviar Copia"
  const handleSimulateEmailSend = (e) => {
    e.preventDefault(); // Previene que el formulario recargue la página
    
    // Solo "enviamos" si el email no está vacío
    if (email.trim() === '') {
      alert("Por favor, ingresa un correo.");
      return;
    }
    
    console.log(`Simulando envío de boleta a: ${email}`);
    setIsEmailSent(true);
  };

  const handleCloseAndNavigate = () => {
    onClose(); 
    navigate('/products');
  };

  return (
    <div className="voucher-simple">
      <div className="voucher-content">
        <h3><Receipt /> Compra Realizada</h3>
        <div className="voucher-details">
          <p><strong>Fecha:</strong> <span>{fecha}</span></p>
          
          <div className="voucher-items-list">
            {cart.map(item => (
              <div className="voucher-item" key={item.code}>
                <span>{item.name} (x{item.quantity})</span>
                <span>{PriceFormat(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          
          <p className="voucher-total">
            <strong>Total:</strong> <span>{PriceFormat(cartTotal)}</span>
          </p>
        </div>

        {/* --- Formulario de Email (ACTUALIZADO) --- */}
        {/* Lo envolvemos en una <form> para usar el 'onSubmit' */}
        <form className="voucher-email-form" onSubmit={handleSimulateEmailSend}>

          {/* Usamos renderizado condicional: */}
          {!isEmailSent ? (
            
            // 1. Si AÚN NO se envía, mostramos el input y el botón
            <>
              <p>Ingresa tu correo para enviar una copia:</p>
              <input 
                type="email" 
                placeholder="tu.correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required // Hacemos que el campo sea requerido
              />
              <button 
                type="submit" // El 'type="submit"' activará el 'onSubmit' del form
                className="btn-enviar-correo"
              >
                <Send /> Enviar Copia
              </button>
            </>

          ) : (
            
            // 2. Si YA se envió, mostramos el mensaje de éxito
            <div className="email-success-message">
              <CheckCircleFill />
              <p>¡Se ha enviado el comprobante al correo <strong>{email}</strong>!</p>
            </div>

          )}
        </form>

        <div className="voucher-actions">
          <button className="btn-volver" onClick={handleCloseAndNavigate}>
            <ArrowLeft /> Volver al Catálogo
          </button>
        </div>
      </div>
    </div>
  );
}