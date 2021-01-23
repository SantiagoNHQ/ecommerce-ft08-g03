import React, { useState } from "react";
import './product.css'


//  *** S6 : Crear Componente Producto ***

export default function Product(props) {
    return (
        <div>
            <h3 className='name'>{props.nombre}</h3>
            <p>{props.precio}</p>
            <img className='productImg' src={props.img} alt="img" />
        </div>
    )
}

