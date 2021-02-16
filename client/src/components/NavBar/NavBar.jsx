import React, { useState, useEffect } from 'react';
import "./NavBar.css"
import SearchBar from '../SearchBar/SearchBar'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        carrito: state.carrito,
        user: state.user,
        products: state.products
    }
}

export function NavBar(props) {
    var carrito = props.carrito
    const [cantidad, setCantidad] = useState(0)
    useEffect(() => {
        setCantidad(carrito.length)
        console.log("VERRRRRRRRRRRRRR", cantidad)
    }, [props.carrito])

    return (
        <div className='divNavbarUser'>
            <div className="divLinksUser">
                <nav className='links'>
                    <Link to="/">Inicio</Link>
                    <Link to="/user/products">Catalogo</Link>
                    <Link to="/user/carrito">Carrito <span className='spanCarrito'>{cantidad}</span></Link>
                    <Link to="/user/perfil">Mi Perfil</Link>
                    <Link to="/user/ordenes">Ordenes</Link>
                </nav>
            </div>
            <div className="SearchBar">
                <SearchBar history={props.history} />
            </div>  
            </div>
    )
}




export default connect(mapStateToProps)(NavBar)