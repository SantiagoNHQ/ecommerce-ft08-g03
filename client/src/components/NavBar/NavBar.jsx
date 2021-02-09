import React, {useState, useEffect}  from 'react';
import "./NavBar.css"
import SearchBar from '../SearchBar/SearchBar'
import {Link} from "react-router-dom";
import {connect} from 'react-redux' 

 function NavBar(props) {
    var cantidad;
   var carrito = props.carrito
    useEffect(() => {
    cantidad = 0
    cantidad = carrito.length
    console.log("VERRRRRRRRRRRRRR", cantidad)
    }, [])
    return (
        <div className='divNavbarUser'>
            <div className="divLinksUser">
                <nav /* className='links' */>
                    <Link to="/">Inicio</Link>
                    <Link to="/user/products">Catalogo</Link>
                    <Link to="/user/carrito">Carrito {cantidad}</Link>
                    <Link to="/user/perfil">Mi Perfil</Link>
                    <Link to="/user/ordenes">Ordenes</Link>
                </nav>
            </div>
            
            <div>
                <SearchBar history={props.history} />
            </div> {/* La propiedad history solo la reciben los hijos directos de Route, por eso la paso por param! ;)*/}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
       carrito: state.carrito,
       user: state.user,
       products: state.products
    }
}



export default connect(mapStateToProps)(NavBar)