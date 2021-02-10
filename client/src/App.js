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
// import NavSelect from "./components/NavSelect/NavSelect";
import axios from "axios";
import { connect } from "react-redux";
import { addCarrito } from "./redux/actions";
import Login from "./components/Login/Login";
import NoAccess from "./components/NoAccess/NoAccess"
import DetalleProducto from "./components/DetalleProducto/DetalleProducto";
import Perfil from "./components/Perfil/Perfil";
import OrdenUser from "./components/OrdenUser/OrdenUser";
// import { ProductCard } from "./components/ProductCard/ProductCard";

function App(props) {

  function checkAdminRoutes(id) {
    if (!props.user.admin) id = -1

    switch (id) {
      case 0: return <FormProduct />
      case 1: return <FormCategory />
      case 2: return <OrdersTable />
      case 3: return <EditarProducto id={props.editProduct} />
      case 4: return <OrdersTable />
      case 5: return <EditarProducto />

      default: return <NoAccess access = "administradores" />
    }
  }

  function checkGuestRoutes(id) {
    if (props.user.id) id = -1

    switch (id) {
      case 0: return <NuevoUsuario />
      case 1: return <Login />

      default: return <NoAccess access = "invitados" />
    }
  }
  
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
        {/* NAVBAR! */}
        <Route
          path="/"
          component={() => {
            if (props.user.admin) return <NavAdmin />;
            else if (props.user.id) return <NavBar />;
            else return <NavBarGuest />;
            // return <NavSelect />; // ESTO ERA PA TESTEAR EL ADMIN/USER/GUEST VIEW HARDCODED
          }}
        />

        {/* HOME! */}
        <Route exact path="/" component={Home} />

        {/* ADMIN ROUTES! */}
        <Route exact path = "/admin/formProduct"  component = {() => checkAdminRoutes(0)} />
        <Route exact path = "/admin/formCategory" component = {() => checkAdminRoutes(1)} />
        <Route exact path = "/admin/ordenes"      component = {() => checkAdminRoutes(2)} />
        <Route exact path = "/admin/product/edit" component = {() => checkAdminRoutes(3)} />
        <Route path = "/admin/ordenes/:status"    component = {() => checkAdminRoutes(4)} />
        <Route path = "/admin/products/editar"    component = {() => checkAdminRoutes(5)} />

        {/* USER ROUTES! */}
        <Route exact path = "/user/carrito"       component = {Carrito} /> {/* Funciona también para guest*/}
        <Route exact path = "/user/products"      component = {ProductCards} /> {/* pero algo había que poner, no? */}
        <Route exact path = "/user/perfil"      component = {Perfil} />
        <Route exact path = "/user/ordenes"      component = {OrdenUser} />
        {/*                                                    categoria = {"Vinos"} */}

        {/* GUEST ROUTES! */}
        <Route exact path = "/user/nuevo"         component = {() => checkGuestRoutes(0)} />
        <Route exact path = "/user/ingresar"      component = {() => checkGuestRoutes(1)} />
        
        {/* OTHER ROUTES... */}
        <Route path = "/detalle/:id"              component = {DetalleProducto} />
        <Route path = "/products/:id"             component = {Product} />
        {/* <Route path="/seleccionar" component={NavSelect} /> // ESTO ERA PA TESTEAR EL ADMIN/USER/GUEST VIEW HARDCODED */}
        
        <Route path="/user/product/:id" component={Product} />
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
