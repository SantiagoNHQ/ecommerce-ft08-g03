import React/* , { useState } */ from "react";
import axios from 'axios';
import {Link} from "react-router-dom";
import { connect } from 'react-redux'
import { searchChange } from "../../redux/actions";

export default function NavAdmin(props) {

    return (
        <div className='div-navbar'>
            <nav className='links'>
            <Link to="/">Inicio</Link>
            <Link to="/user/products">Catalogo</Link>
            <Link to="/admin/formProduct">Añadir Producto</Link>
            <Link to="/admin/formCategory">Añadir Categoria</Link>
            <Link to="/admin/products/editar">Editar Producto</Link>
            </nav>
            
        </div>
    )
}
