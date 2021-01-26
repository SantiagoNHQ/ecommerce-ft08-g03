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
    </BrowserRouter>
  );
}
// Linea de prueba
export default App;
