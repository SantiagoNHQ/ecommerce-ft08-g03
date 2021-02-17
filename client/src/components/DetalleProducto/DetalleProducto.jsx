import axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Reviews } from "../Reviews/Reviews";
import './DetalleProducto.css'

//  En este componente vamos a trabajar con styled-component
//  Hacer npm install --save styled-components

//  *** S10 : Crear Componente ProductCard ***

function DetalleProducto(props) {
    var id = props.match.params.id
    const [producto, setProducto] = useState(null)
    const [imagen, setImagen] = useState(null)

    function avoidWarnings() {
        if (!producto) axios.get(`http://localhost:3001/product/${id}`)
            .then(response => {
                console.log(response)
                setProducto(response.data)
                if (!response.data.img || !(response.data.img.includes("http") || response.data.img.includes("www"))) {
                    setImagen("http://localhost:3001/upload/" + response.data.img)
                } else setImagen(response.data.img)
            })
            .catch(err => {
                console.log("ERROR")
            })
    }

    useEffect(() => avoidWarnings(), [])


    return (
        <div className='divFondoDeDetalleDeProducto'>
            <div>
                {!producto && <h1>CARGANDO...</h1>}
                {producto &&
                    <div className='divGeneralDetalleProducto'>
                        <div className='divDetallesDeProducto'>
                            <h1>{producto.nombre}</h1>
                            <div className='divImagenDetalleProducto'>
                                <img alt={producto.nombre} src={imagen}/>
                            </div>
                        </div>
                        <div className='divDescripcionDetalleProducto'>
                            {/* <h4 className='precioP'><span>$</span>{producto.precio}</h4> */}
                            {/* <h3 className='stock'><span>Stock:</span> {producto.stock}</h3>  */}
                            <h3>"{producto.descripcion}"</h3>
                            {/* <h3><span>elaboracion:</span> {producto.elaboracion}</h3>
                            <h3><span>origen:</span> {producto.origen}</h3>
                            <h3><span>tipo:</span> {producto.tipo}</h3>
                            <h3><span>edad:</span> {producto.edad}</h3> */}
                        </div>
                    </div>
                }
                <Reviews id={id} />
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(DetalleProducto)