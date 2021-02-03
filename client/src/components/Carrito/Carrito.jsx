import React, {useState, useEffect}  from 'react';
import './Carrito.css'
import {connect} from 'react-redux' 
import {addCarrito} from "../../redux/actions";
import axios from 'axios';



export function Carrito ({carrito, user, onAddCarrito, products}) {

    const [total, setTotal] = useState("0")

    console.log("mi carrito", carrito )
    console.log("productso", products )

    function precioTotal() {
        var algo= 0
        carrito.map(carro => {
            algo = algo + carro.precio * carro.cantidad
            setTotal(algo)
        })
    }
        
    useEffect(() => {
        precioTotal()
    },[carrito])
    
    function editar (e, producto){
        precioTotal()
        var stock;
        products.map(pos => {
            if (pos.id === producto.productId) {
                stock = pos.stock
            }
        })
        var obj= {
            cantidad: e.target.value,
            productId: producto.productId
        }
        if (e.target.value > 0 && e.target.value <= stock ){
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
        }else if(e.target.value <= stock){
            e.target.value = 1
        } else{
            alert("No hay suficiente stock")
            e.target.value = stock
        }
    }

    function eliminar(e, producto){
        precioTotal()
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
        setTotal("0")
    }
    

    return(
        <div className='divCarrito'>
                <h1>Carrito de compras</h1>

                {carrito && carrito.map(producto => <div className='divProducto'>
                    <div className='divNombre'>
                    <h3>{producto.nombre}</h3>
                    </div>
                    <span>Precio Unidad: <span className='precio'>${producto.precio}</span></span>
                    <div className='cantidad'>
                    <span>Cantidad: </span>
                    <input key={producto.id*-1} type="number" onChange={(e, product= producto) => editar(e, product)} placeholder={producto.cantidad} name="cantidad"/> 
                    </div>
                    <span>Precio Total: <span className='precioTotal'>${producto.precio * producto.cantidad}</span></span>
                    <div className='divBoton'>
                    <img src='https://www.vhv.rs/dpng/d/446-4464515_trashcan-trash-can-clipart-png-garbage-can-clipart.png' className='eliminar' onClick={(e, product= producto) => eliminar(e, product)} ></img>
                    </div>
                </div>)}
                {carrito[0] && <div onClick={vaciarCarrito} className='vaciar'><button> vaciar carrito </button></div>}
        
                {carrito[0] && <h1>EL Precio Total: $ {total}</h1>}

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

const mapDispatchToProps = (dispatch) => {
    return {
        onAddCarrito: (text) => {
        dispatch(addCarrito(text))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carrito)