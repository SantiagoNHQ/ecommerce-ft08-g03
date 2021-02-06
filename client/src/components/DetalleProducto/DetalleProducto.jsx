import axios from "axios";
import React, {useState, useEffect} from "react";
import {connect} from 'react-redux'
import { Reviews } from "../Reviews/Reviews";

//  *** S10 : Crear Componente ProductCard ***
export function DetalleProducto (props) {
    var id = props.match.params.id
    const [producto, setProducto] = useState(null)

    function avoidWarnings() {
        /* if (props.products) {
            props.products.forEach(pos => { // Cambié map por forEach xq no se estaba mapeando nada!
                if(pos.id === id){
                    setProducto(pos)
                }
            })
        } else {
            axios.get(`http://localhost:3001/product/${id}`)
                .then (response => {
                    console.log(response)
                    setProducto(response.data)
                })
                .catch(err => {
                    console.log ("ERROR")
                })
        } */
        if (!producto) axios.get(`http://localhost:3001/product/${id}`)
            .then (response => {
                console.log(response)
                setProducto(response.data)
            })
            .catch(err => {
                console.log ("ERROR")
            })
    }

    useEffect(() => { 
        avoidWarnings()
    },[])
    // useEffect(() => avoidWarnings())

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
                </div>
        }
            
            <Reviews id={id}/>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(DetalleProducto)