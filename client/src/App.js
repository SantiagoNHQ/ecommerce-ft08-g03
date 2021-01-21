import React from "react";
import "./App.css";
// import Product from "./components/Product/product";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import ProductCards from "./components/ProductCards/ProductCards.jsx";
import FormProduct from "./components/FormProduct/FormProduct.jsx";

function App() {
  return (
    <div>
      <header>
        <nav>
          <a href="#a">Inicio</a>
          <a href="#b">Acerca de</a>
          <a href="#c">Portfolio</a>
          <a href="#d">Servicios</a>
          <a href="#e">Contacto</a>
        </nav>
        <section className="textos-header">
          <h1>Winergy</h1>
          <h2>Vinos Nacionales e Internacionales</h2>
        </section>
        <div style={({ height: "150px" }, { overflow: "hidden" })}>
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            style={({ height: "100%" }, { width: "100%" })}
          >
            <path
              d="M-20.04,-25.34 C100.16,251.92 303.88,-23.36 552.76,74.31 L500.00,149.98 L0.00,149.98 Z"
              style={({ stroke: "none" }, { fill: "#08f" })}
            ></path>
          </svg>
        </div>
      </header>
      <SearchBar />
      <ProductCards />
      <FormProduct />
    </div>
  );
}
// Linea de prueba
export default App;
