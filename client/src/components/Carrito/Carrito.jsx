import React, {useState} from 'react';
import './Carrito.css'
import {connect} from 'react-redux' 



export function Carrito ({carrito, user}) {
    return(
        <div className='div-carrito'>

                <h1>Carrito de {user.name}</h1>
            {carrito && carrito.map(producto => <div>
                <h3>Producto: {producto.nombre}</h3>
                <span>Precio Unidad: {producto.precio}</span>
                <span>Cantidad: {producto.cantidad}</span>
                <span>Precio Total: {producto.precio * producto.cantidad}</span>
            </div>)}



        </div>
    )
}


const mapStateToProps = (state) => {
    return {
       carrito: state.carrito,
       user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    // return {
    //     onSearchChange: (text) => {
    //     dispatch(searchChange(text))
    //     }
    // }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carrito)