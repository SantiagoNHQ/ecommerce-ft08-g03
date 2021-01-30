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

export default function NavAdmin(props) {
    return (
        <div className='divNavbar'>
            <div className="divLinks">
                <nav /* className='links' */>
                    <Link style={{marginRight: "10px"}} to="/">Inicio</Link>
                    <Link style={{marginRight: "10px"}} to="/user/products">Catalogo</Link>
                    <Link style={{marginRight: "10px"}} to="/admin/formProduct">Agregar producto</Link>
                    <Link style={{marginRight: "10px"}} to="/admin/product">Editar/borrar producto</Link>
                    <Link style={{marginRight: "10px"}} to="/admin/formCategory">Agregar categoria</Link>
                    <Link style={{marginRight: "10px"}} to="/admin/categorias">Editar/borrar categoria</Link>
                    <Link style={{marginRight: "10px"}} to="/admin/ordenes">Ver ordenes</Link>

                </nav>
            </div>
            
            <div style={{marginRight: "10px"}}>
                <SearchBar history={props.history} />
            </div> {/* La propiedad history solo la reciben los hijos directos de Route, por eso la paso por param! ;)*/}
        </div>
    )
}