import React /* , {useEffect} */ from "react";
import "./App.css";
import ProductCards from "./components/ProductCards/ProductCards.jsx";
import { BrowserRouter, Route } from "react-router-dom";
import FormProduct from "./components/FormProduct/FormProduct";
import FormCategory from "./components/FormCategory/FormCategory";
import Product from "./components/Product/product";
import EditarProducto from "./components/EditarProduct/EditarProduct";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import NavAdmin from "./components/NavAdmin/NavAdmin";
import OrdersTable from "./components/OrdersTable/OrdersTable";
import NuevoUsuario from "./components/NuevoUsuario/NuevoUsuario";
import Carrito from "./components/Carrito/Carrito";
import NavBar from "./components/NavBar/NavBar";

function App(location) {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Route path="/products/:id" component={Product} />
        <Route path="/user" component={NavBar} />
        <Route exact path="/" component={NavBar} />
        <Route exact path="/" component={Home} />
        <Route path="/admin" component={NavAdmin} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin/ordenes" component={OrdersTable} />
        <Route path="/admin/ordenes/:status" component={OrdersTable} />
        <Route exact path="/user/carrito" component={Carrito} />
        <Route
          exact
          path="/user/products"
          component={() => (
            <ProductCards
            /* categoria={"Vinos"} */
            />
          )}
        />
        <Route exact path="/user" component={NuevoUsuario} />
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
