import React from 'react'
import {
  Crosshair, Eye
} from 'react-bootstrap-icons';


export default function HomePage() { 
  return (

    <section id="nosotros" class="nosotros-section">
      <div class="container">
        <h2 class="titulo-principal">¡Bienvenido a Level-Up Gamer!</h2>
        <div class="mensaje-principal">
          <div class="caja-info2">
            <h3>🎮¡Desafía tus límites con Level-Up Gamer!👾</h3>
            <p class="small-mensaje-principal-up">Conviértete en el héroe de tu propia historia y únete a nuestra comunidad de jugadores.</p>
            <img 
              className = "logo-mensaje-principal"  
              src = "/img/logo.jpg" 
              width = "150px"
              alt = "Logo Tienda Level-Up"
            />               
            <p class="small-mensaje-principal-down">¡Explora, juega y gana con nosotros!</p>
          </div>
        </div>
        <div class="enunciado-lvl-up-gamer">
          <h3>¿Quiénes somos?</h3>
          <p>Level-Up Gamer es una tienda online dedicada a satisfacer las necesidades de los entusiastas de los videojuegos en Chile. Lanzada hace dos años como respuesta a la creciente demanda durante la pandemia, Leves-Up Gamer ofrece una amplia gama de productos para gamers, desde consolas y accesorios hasta computadores y sillas especializadas. Aunque no cuenta con una ubicación física, realiza despachos a todo el país.</p>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <div class="caja-info">
              <h3><Crosshair /> Nuestra Misión</h3>
              <p class="small-text-mision">Proporcionar productos de alta calidad para gamers en todo Chile, ofreciendo una experiencia de compra única y personalizada, con un enfoque en la satisfacción del cliente y el crecimiento de la comunidad gamer.</p>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="caja-info">
              <h3><Eye /> Nuestra Visión</h3>
              <p class="small-text-vision">Ser la tienda online líder en productos para gamers en Chile, reconocida por su innovación, servicio al cliente excepcional, y un programa de fidelización basado en gamificación que recompense a nuestros clientes más fieles.</p>
            </div>
          </div>
          <div class="imagen-tienda-box">
          <img 
            className = "tienda-mensaje-principal"  
            src = "/img/tienda.png" 
            alt = "Logo Tienda Level-Up"
          />          
          </div>
        </div>
      </div>
    </section>

  )
}