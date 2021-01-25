import React from "react";
import "./App.css";
// import Product from "./components/Product/product";
// import SearchBar from "./components/SearchBar/SearchBar.jsx";
import ProductCards from "./components/ProductCards/ProductCards.jsx";
// import FormProduct from "./components/FormProduct/FormProduct.jsx";
// import FormCategory from "./components/FormCategory/FormCategory";
// import {Link} from "react-router-dom";
import axios from "axios";

function App() {
  return (
    <div>
      <header>
        <section className="textos-header">
          <h1>Winergy</h1>
          <h2>Vinos Nacionales e Internacionales</h2>
        </section>
        {/* <div style={({ height: "150px" }, { overflow: "hidden" })}>
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
        </div> */}
      </header>
      <ProductCards data={axios.get(`http://localhost:3001/product`)} />
    </div>
  );
}
// Linea de prueba
export default App;
