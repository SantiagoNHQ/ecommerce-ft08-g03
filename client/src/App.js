import React/* , {useEffect} */ from "react";
import "./App.css";
import ProductCards from "./components/ProductCards/ProductCards.jsx";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar/SearchBar";
import FormProduct from "./components/FormProduct/FormProduct";
import FormCategory from "./components/FormCategory/FormCategory";
import Product from "./components/Product/product";
import EditarProducto from "./components/EditarProduct/EditarProduct";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import NavAdmin from "./components/NavAdmin/NavAdmin"

function App(location) {

  return (
    <BrowserRouter>
      <React.Fragment>
        <Route path="/products/:id" component={Product} />
        <Route path= "/user" component={SearchBar} />
        <Route exact path= "/" component={SearchBar} />
        <Route exact path="/" component={Home} />
        <Route path="/admin" component={NavAdmin} />
        <Route exact path="/admin" component={Admin} />
        <Route
          exact
          path="/user/products"
          component={() => (
            <ProductCards
              /* categoria={"Vinos"} *//>
          )}
        />
        <Route exact path="/admin/formProduct" component={FormProduct} />
        <Route exact path="/admin/formCategory" component={FormCategory} />
        <Route path="/user/product/:id" component={Product} />
        <Route path="/admin/products/editar" component={EditarProducto} />
      </React.Fragment>

      {/* <div>
        <header>
          <section className="textos-header">
            <h1>WeAreWine</h1>
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
          </div> /}
        </header>
        <ProductCards data={axios.get(`http://localhost:3001/product`)} />
      </div> */}
    </BrowserRouter>
  );
}
// Linea de prueba
export default App;
