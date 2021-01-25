import React from 'react'
import "./ProductCard.css"

//  *** S10 : Crear Componente ProductCard ***
export default function ProductCard (props) {

    return (
        <div className='card'>
            <h1>{props.nombre}</h1> 
            <div className='div-imagen'>
            <img src={props.img}></img>
            </div>
            <p>{props.descripcion}</p> 
            <div className='div-boton'>
            <button className='boton-editar'></button>
            </div>
            <h5>{props.stock}</h5> 
            <h4>{props.precio}</h4> 
        </div>
    )
}
