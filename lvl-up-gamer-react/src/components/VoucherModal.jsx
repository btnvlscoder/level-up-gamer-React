// Contenido de: src/components/VoucherModal.jsx (Funcionalidad Completa Pre-Refactorización)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PriceFormat } from '../utils/formatter';
import { Receipt, Send, ArrowLeft, CheckCircleFill } from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext'; 
import toast from 'react-hot-toast';

export default function VoucherModal({ cart, subtotal, discount, cartTotal, onClose }) {
  const { currentUser } = useAuth();
  
  // Usa el email del usuario autenticado por defecto
  const [email, setEmail] = useState(currentUser?.email || ''); 
  const [isEmailSent, setIsEmailSent] = useState(false);
  
  const navigate = useNavigate();

  const fecha = new Date().toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleSimulateEmailSend = (e) => {
    e.preventDefault(); 
    
    if (email.trim() === '') {
      toast.error("Por favor, ingresa un correo.");
      return;
    }
    
    console.log(`Simulando envío de boleta a: ${email}`);
    setIsEmailSent(true);
    toast.success("Comprobante enviado (simulado)!");
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
          
          {/* Resumen de totales, incluyendo subtotal y descuento */}
          <div className="voucher-total-summary">
            <p className="voucher-line">
              <strong>Subtotal:</strong> <span>{PriceFormat(subtotal)}</span>
            </p>
            {discount > 0 && (
              <p className="voucher-line descuento">
                <strong>Descuento Duoc (10%):</strong> <span>- {PriceFormat(discount)}</span>
              </p>
            )}
            <p className="voucher-total">
              <strong>Total:</strong> <span>{PriceFormat(cartTotal)}</span>
            </p>
          </div>
        </div>

        <form className="voucher-email-form" onSubmit={handleSimulateEmailSend}>

          {!isEmailSent ? (
            // Vista inicial: pide el email
            <>
              <p>Ingresa tu correo para enviar una copia:</p>
              <input 
                type="email" 
                placeholder="tu.correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit" 
                className="btn-enviar-correo"
              >
                <Send /> Enviar Copia
              </button>
            </>

          ) : (
            // Vista de éxito: muestra la confirmación
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