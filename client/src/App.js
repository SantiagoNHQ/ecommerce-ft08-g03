import React, { useEffect } from "react";
//import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ProductCards from "./components/ProductCards/ProductCards.jsx";
import { BrowserRouter, Route } from "react-router-dom";
import FormProduct from "./components/FormProduct/FormProduct";
import FormCategory from "./components/FormCategory/FormCategory";
import Product from "./components/Product/product";
import EditarProducto from "./components/EditarProduct/EditarProduct";
import Home from "./components/Home/Home";
// import Admin from "./components/Admin/Admin";
import NavAdmin from "./components/NavAdmin/NavAdmin";
import NavBarGuest from "./components/NavBarGuest/NavBarGuest";
import OrdersTable from "./components/OrdersTable/OrdersTable";
import NuevoUsuario from "./components/NuevoUsuario/NuevoUsuario";
import Carrito from "./components/Carrito/Carrito";
import NavSelect from "./components/NavSelect/NavSelect";
import axios from "axios";
import { connect } from "react-redux";
import { addCarrito } from "./redux/actions";
import Login from "./components/Login/Login";
import DetalleProducto from "./components/DetalleProducto/DetalleProducto";

function App(props) {
  
  function avoidWarnings() {
    if (props.logged !== true) return;

    axios
      .get(`http://localhost:3001/user/cart/${props.user.userId}`)
      .then((response) => {
        props.onAddCarrito(response.data);
      })
      .catch((response) => {
        console.log("ERROR", response);
      });
  }
  
  useEffect(() => {
    avoidWarnings()
  });

  return (
    <BrowserRouter>
      <React.Fragment>
        <Route
          path="/"
          component={() => {
            const string = localStorage.getItem('user');
            var value = JSON.parse(string);
            if (value && !value.admin) return <NavBar />;
            else if (value && value.admin) return <NavAdmin />;
            else return <NavBarGuest />
          }}
        />
        <Route path="/detalle/:id" component={DetalleProducto} />
        <Route path="/seleccionar" component={NavSelect} />
        <Route path="/products/:id" component={Product} />
        {/* <Route path="/user" component={NavBar} /> */}
        <Route exact path="/" component={Home} />
        {/* <Route path="/admin" component={NavAdmin} /> */}
        {/* <Route exact path="/admin" component={Admin} /> */}
        <Route exact path="/admin/ordenes" component={OrdersTable} />
        <Route path="/admin/ordenes/:status" component={OrdersTable} />
        <Route exact path="/admin/product/edit" component={() => <EditarProducto id={props.editProduct} />} />
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
        <Route exact path="/user/nuevo" component={NuevoUsuario} />
        <Route exact path="/user/ingresar" component={Login} />
        <Route exact path="/admin/formProduct" component={FormProduct} />
        <Route exact path="/admin/formCategory" component={FormCategory} />
        <Route path="/user/product/:id" component={Product} />
        <Route path="/admin/products/editar" component={EditarProducto} />
      </React.Fragment>
    </BrowserRouter>
  );
}
// Linea de prueba

const mapStateToProps = (state) => {
  return {
    logged: state.logged,
    user: state.user,
    carrito: state.carrito,
    editProduct: state.editarProducto
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCarrito: (text) => {
      dispatch(addCarrito(text));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
