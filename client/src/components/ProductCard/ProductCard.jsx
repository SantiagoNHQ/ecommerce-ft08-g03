import React from 'react'
import "./ProductCard.css"

//  *** S10 : Crear Componente ProductCard ***
export default function ProductCard (props) {

    return (
        <div>
            <h3>{props.nombre}</h3> 
            <img src={props.imagen}></img>
            <p>{props.descripcion}</p> 
            <h5>{props.stock}</h5> 
            <h4>{props.precio}</h4> 
        </div>
    )
}

