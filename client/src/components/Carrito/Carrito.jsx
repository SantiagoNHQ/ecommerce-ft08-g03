import React, {useState} from 'react';
import './Carrito.css'
import {connect} from 'react-redux' 
import {addCarrito} from "../../redux/actions";
import axios from 'axios';



export function Carrito ({carrito, user, onAddCarrito}) {

    console.log("mi carrito", carrito )

    function editar (e, producto){

        var obj= {
            cantidad: e.target.value,
            productId: producto.productId
        }
        axios.put(`http://localhost:3001/user/cart/${user.userId}`, obj )
        .then(response => {
            return axios.get(`http://localhost:3001/user/cart/${user.userId}`)
        })
        .then(response => {
            onAddCarrito(response.data)
        })
        .catch(err => {
            console.log("ESTO ES UN ERROR", err)
        })

    }

    function eliminar(e, producto){

        axios.delete(`http://localhost:3001/user/delete/${producto.productId}/${user.userId}`)
        .then(response => {
            return axios.get(`http://localhost:3001/user/cart/${user.userId}`)
        })
        .then(response => {
            onAddCarrito(response.data)
        })
        .catch(err => {
            console.log("ESTO ES UN ERROR", err)
        })
    }
    function vaciarCarrito() {
        axios.delete(`http://localhost:3001/user/cart/${user.userId}`)
        .then(response => {
            return axios.get(`http://localhost:3001/user/cart/${user.userId}`)
        })
        .then(response => {
            onAddCarrito(response.data)
        })
        .catch(err => {
            console.log("ESTO ES UN ERROR", err)
        })
    }

    return(
        <div className='div-carrito'>

                <h1>Carrito de {user.nombre}</h1>
                 {carrito && carrito.map(producto => <div>
                    <h3>Producto: {producto.nombre}</h3>
                    <span>Precio Unidad: {producto.precio}</span>
                    <span>Cantidad: </span>
                    <input key={producto.id*-1} type="number" onChange={(e, product= producto) => editar(e, product)} placeholder={producto.cantidad} name="cantidad"/> 
                    <span>Precio Total: {producto.precio * producto.cantidad}</span>
                    <button onClick={(e, product= producto) => eliminar(e, product)} > ELIMINAR</button>
                 </div>)}
                {carrito && <button onClick={vaciarCarrito}> vaciar carrito </button>}


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
    return {
        onAddCarrito: (text) => {
        dispatch(addCarrito(text))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carrito)