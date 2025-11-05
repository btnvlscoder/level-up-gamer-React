import React, { useState } from 'react';
import { Envelope, Telephone } from 'react-bootstrap-icons';
import toast from 'react-hot-toast';

export default function ContactPage() {
  // Estado para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    // Simulación de envío de datos
    console.log("Formulario enviado:", { nombre, correo, asunto, mensaje });

    // Mostrar el mensaje de éxito usando toast
    toast.success('Mensaje enviado con éxito! Te contactaremos pronto.', { duration: 3000 });

    // Limpiar el formulario
    setNombre('');
    setCorreo('');
    setAsunto('');
    setMensaje('');
  };

  return (
    <>
      <h2 className="titulo-principal">Contáctanos</h2>

      <div className="contacto-simple">
        {/* El 'onSubmit' ahora llama a nuestra función handleSubmit */}
        <form className="contacto-form-simple" onSubmit={handleSubmit}>
          
          <div className="txt-formulario">
            <label htmlFor="nombre">Nombre completo</label>
            <input 
              type="text" 
              id="nombre" 
              required 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
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
          <p><Envelope /> contacto@levelupgamer.cl</p>
          <p><Telephone /> +56 9 4129 5631</p>
        </div>
      </div>
    </>
  );
}