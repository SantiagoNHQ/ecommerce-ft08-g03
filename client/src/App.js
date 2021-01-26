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

function App() {

  return (
    <BrowserRouter>
      <React.Fragment>
        <Route path="/products/:id" component={Product} />
        <Route path="/" component={SearchBar} />
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/products"
          component={() => (
            <ProductCards
              /* categoria={"Vinos"} *//>
          )}
        />
        <Route exact path="/formProduct" component={FormProduct} />
        <Route exact path="/formCategory" component={FormCategory} />
        <Route path="/product/:id" component={Product} />
        <Route path="/products/editar" component={EditarProducto} />
      </React.Fragment>
    </BrowserRouter>
  );
}
// Linea de prueba
export default App;
