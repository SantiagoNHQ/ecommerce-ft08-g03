import React from "react";
import "./App.css";
// import Product from "./components/Product/product";

function App() {
  return (
    <div>
      <header>
        <nav>
          <a href="#">Inicio</a>
          <a href="#">Acerca de</a>
          <a href="#">Portfolio</a>
          <a href="#">Servicios</a>
          <a href="#">Contacto</a>
        </nav>
        <section className="textos-header">
          <h1>Winergy</h1>
          <h2>Vinos Nacionales e Internacionales</h2>
        </section>
        <div style="height: 150px; overflow: hidden;">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            style="height: 100%; width: 100%;"
          >
            <path
              d="M-20.04,-25.34 C100.16,251.92 303.88,-23.36 552.76,74.31 L500.00,149.98 L0.00,149.98 Z"
              style="stroke: none; fill: #08f;"
            ></path>
          </svg>
        </div>
      </header>
    </div>
  );
}

export default App;
