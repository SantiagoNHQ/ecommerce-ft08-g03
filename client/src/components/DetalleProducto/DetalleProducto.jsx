import axios from "axios";
import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

import {connect} from 'react-redux'
import { addCarrito, changeEditProduct } from "../../redux/actions";
import { Reviews } from "../Reviews/Reviews";

//  *** S10 : Crear Componente ProductCard ***
export function DetalleProducto (props) {
    var id = props.match.params.id
    const [producto, setProducto] = useState()
    
    useEffect(() => {
        if(props.products){
            props.products.map(pos =>{
                if(pos.id == id){
                return setProducto(pos)
                }
            })
        } else {
            axios.get(`http://localhost:3001/product/${id}`)
            .then (response => {
                setProducto(response.data)
            })
            .catch(err => {
                console.log ("ERROR")
            })
        }
    },[props.products])

    console.log(producto)

    return (
        <div>
            {!producto && <h1>CARGANDO...</h1>}
            {producto &&
                <div>
                    <div className='card'>
                        <div className='titulo'>
                            <h1 className='titulo'>{producto.nombre}</h1> 
                        </div>
                        <div className='div-imagen'>
                            <img alt={producto.nombre} src={producto.img}></img>
                        </div>
                        <div className='div-precio'>
                            <h4 className='precio'><span>$</span>{producto.precio}</h4>
                        </div>
                        <div className='boton-y-stock'>
                            <h3 className='stock'><span>Stock:</span> {producto.stock}</h3> 
                            <h3 className='stock'><span>descripcion:</span> {producto.descripcion}</h3> 
                            <h3 className='stock'><span>elaboracion:</span> {producto.elaboracion}</h3>
                            <h3 className='stock'><span>origen:</span> {producto.origen}</h3>
                            <h3 className='stock'><span>tipo:</span> {producto.tipo}</h3>
                            <h3 className='stock'><span>edad:</span> {producto.edad}</h3>
                        </div>
                    </div>
                    <Reviews id={producto.id}/>
                </div>
        } 
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        carrito: state.carrito,
        admin: state.logged === "admin",
        products: state.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddCarrito: (text) => {
        dispatch(addCarrito(text))
        },
        onChangeEditProduct: (id) => {
            dispatch(changeEditProduct(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalleProducto)