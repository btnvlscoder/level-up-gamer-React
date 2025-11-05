import React, { useState } from 'react';
import { Envelope, Telephone } from 'react-bootstrap-icons';

export default function ContactPage() {
  // 1. Estados para cada campo del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');

  // 2. Estado para mostrar el mensaje de éxito (en lugar de alert())
  const [showSuccess, setShowSuccess] = useState(false);

  // 3. Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene que la página se recargue
    
    // Aquí es donde enviarías los datos a un backend
    // Por ahora, solo los mostraremos en la consola
    console.log("Formulario enviado:", { nombre, correo, asunto, mensaje });

    // 4. Mostrar el mensaje de éxito
    setShowSuccess(true);

    // 5. Limpiar el formulario
    setNombre('');
    setCorreo('');
    setAsunto('');
    setMensaje('');

    // 6. Ocultar el mensaje de éxito después de 3 segundos
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <>
      <h2 className="titulo-principal">Contáctanos</h2>

      {/* 7. Mensaje de éxito condicional */}
      {showSuccess && (
        <div 
          className="mensaje-exito" 
          // Anulamos el 'position: fixed' del CSS para que se muestre en línea
          style={{ position: 'relative', top: 0, right: 0, marginBottom: '1.5rem' }}
        >
          <i className="bi bi-check-circle"></i>
          <span>¡Mensaje enviado con éxito! Te contactaremos pronto.</span>
        </div>
      )}
      
      <div className="contacto-simple">
        {/* 8. El 'onSubmit' ahora llama a nuestra función handleSubmit */}
        <form className="contacto-form-simple" onSubmit={handleSubmit}>
          
          <div className="txt-formulario">
            {/* 'for' en HTML es 'htmlFor' en JSX */}
            <label htmlFor="nombre">Nombre completo</label>
            <input 
              type="text" 
              id="nombre" 
              required 
              value={nombre} // El valor está atado al estado
              onChange={(e) => setNombre(e.target.value)} // El onChange actualiza el estado
            />
          </div>
          
          <div className="txt-formulario">
            <label htmlFor="correo">Correo electrónico</label>
            <input 
              type="email" 
              id="correo" 
              required 
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          
          <div className="txt-formulario">
            <label htmlFor="asunto">Asunto</label>
            <input 
              type="text" 
              id="asunto" 
              required 
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
            />
          </div>
          
          <div className="txt-formulario">
            <label htmlFor="mensaje">Mensaje</label>
            {/* Los <textarea> en React también usan 'value' */}
            <textarea 
              id="mensaje" 
              rows="5" 
              required
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
          </div>
          
          <button type="submit" className="btn-enviar">Enviar mensaje</button>
        </form>
        
        <div className="contacto-info">
          <h3>Información de contacto</h3>
          {/* 9. Iconos de React-Bootstrap-Icons */}
          <p><Envelope /> contacto@levelupgamer.cl</p>
          <p><Telephone /> +56 9 4129 5631</p>
        </div>
      </div>
    </>
  );
}