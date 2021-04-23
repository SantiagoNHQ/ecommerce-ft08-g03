/* import React/* , { useState } / from "react";
import SearchBar from '../SearchBar/SearchBar'
//import axios from 'axios';
import {Link} from "react-router-dom";
//import { connect } from 'react-redux'
//import { searchChange } from "../../redux/actions";

export default function NavAdmin(props) {

    return (
        <div className='div-navbar'>
            <nav className='links'>
            <Link to="/">Inicio</Link>
            <Link to="/user/products">Catalogo</Link>
            <Link to="/admin/formProduct">Añadir Producto</Link>
            <Link to="/admin/formCategory">Añadir Categoria</Link>
            <Link to="/admin/products/editar">Editar Producto</Link>
            <Link to="/admin/ordenes">Ver ordenes</Link>
            </nav>
            <SearchBar history={props.history}/>
        </div>
    )
} */

import "./NavAdmin.css"
import SearchBar from '../SearchBar/SearchBar'
import {Link} from "react-router-dom";
import axios from "axios";

export default function NavAdmin(props) {

    function salir(){
        axios.get("/auth/logout", {withCredentials: true})
        .then(respuesta =>{
            window.location.replace("http://localhost:3000/")
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <div className='divNavbarAdmin'>
            <div className="divLinksAdmin">
                <nav /* className='links' */>
                    <Link to="/">Inicio</Link>
                    <Link to="/user/products">Catalogo</Link>
                    <Link to="/admin/formProduct">Agregar producto</Link>
                    {/* <Link style={{marginRight: "10px"}} to="/admin/product">Editar/borrar producto</Link> */}
                    <Link to="/admin/formCategory">Agregar categoria</Link>
                    {/* <Link style={{marginRight: "10px"}} to="/admin/categorias">Editar/borrar categoria</Link> */}
                    <Link to="/admin/ordenes">Ver ordenes</Link>
                    <Link to="/admin/usuarios">Usuarios</Link>

                </nav>
            </div>
            <button className='botonCerrarSesionAdmin' onClick={salir}>Salir</button>
            <div>
                <SearchBar history={props.history} />
            </div> {/* La propiedad history solo la reciben los hijos directos de Route, por eso la paso por param! ;)*/}
        </div>
    )
}