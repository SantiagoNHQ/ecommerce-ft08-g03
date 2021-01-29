import React, {useState} from 'react';
import './Carrito.css'
import {connect} from 'react-redux' 
import {addCarrito} from "../../redux/actions";
import axios from 'axios';



export function Carrito ({carrito, user, addCarrito, onAddCarrito}) {

    const [boton, setBoton] = useState()

    console.log("mi carrito", carrito )

    function editar (e){
        setBoton(e.target.value)
    }

    function cambiarCantidad(e, producto){
        console.log("bbbbbbbbb", producto)
        var obj= {
            cantidad: boton,
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

    return(
        <div className='div-carrito'>

                <h1>Carrito de {user.name}</h1>
                 {carrito && carrito.map(producto => <div>
                    <h3>Producto: {producto.nombre}</h3>
                    <span>Precio Unidad: {producto.precio}</span>
                    <span>Cantidad: </span>
                    <input key={producto.id*-1} type="number" onChange={editar} placeholder={producto.cantidad} name="cantidad"/> 
                    <span>Precio Total: {producto.precio * producto.cantidad}</span>
                    <input onClick={(e, product= producto) => cambiarCantidad(e, product)} type="submit" key={producto.id} name="productId" />
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
    return {
        onAddCarrito: (text) => {
        dispatch(addCarrito(text))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carrito)