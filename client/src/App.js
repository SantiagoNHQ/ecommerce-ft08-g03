import React from "react";
import "./App.css";
// import Product from "./components/Product/product";
// import SearchBar from "./components/SearchBar/SearchBar.jsx";
import ProductCards from "./components/ProductCards/ProductCards.jsx";
// import FormProduct from "./components/FormProduct/FormProduct.jsx";
// import FormCategory from "./components/FormCategory/FormCategory";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
// import {Link} from "react-router-dom";
 import axios from "axios";
>>>>>>> 02f9c41fffbb314b556a57f444b71dece0af441e

function App() {
  return (
    <div>
      <header>
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
<<<<<<< HEAD
      <ProductCards />
=======
      <ProductCards data={axios.get(`http://localhost:3001/product`)}/>

>>>>>>> 02f9c41fffbb314b556a57f444b71dece0af441e
    </div>
  );
}
// Linea de prueba
export default App;
