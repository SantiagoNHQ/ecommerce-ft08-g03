import "./NavBarGuest.css"
import SearchBar from '../SearchBar/SearchBar'
import {Link} from "react-router-dom";
import React ,{useState, useEffect} from 'react'
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        carrito: state.carrito,
        user: state.user,
        products: state.products
    }
}

export function NavBarGuest(props) {
    var carrito = props.carrito
    const [cantidad, setCantidad] = useState(0)
    useEffect(() => {
        setCantidad(carrito.length)
        console.log("VERRRRRRRRRRRRRR", cantidad)
    }, [props.carrito])
    return (
        <div className='divNavbarGuest'>
            <div className="divLinksGuest">
                <nav className='links'>
                    <Link to="/">Inicio</Link>
                    <Link to="/user/products">Catalogo</Link>
                    <Link to="/user/carrito">Carrito <span className='spanCarrito'>{cantidad}</span></Link>
                    <Link to="/user/nuevo">Registrarse</Link>
                    <Link to="/user/ingresar">Logearse</Link>
                </nav>
            </div>
            
            <div style={{marginRight: "10px"}}>
                <SearchBar history={props.history} />
            </div> {/* La propiedad history solo la reciben los hijos directos de Route, por eso la paso por param! ;)*/}
        </div>
    )
}


export default connect(mapStateToProps)(NavBarGuest)