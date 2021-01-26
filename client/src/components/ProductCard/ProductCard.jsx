import React, {useState, useEffect} from "react";
import "./ProductCard.css"

//  *** S10 : Crear Componente ProductCard ***
export default function ProductCard (props) {
    const [stock, setStock] = useState({stock: ""})
    
    useEffect(() => {
        if(props.stock <= 0){
                setStock ( {...stock, stock: "No disponible"})
            }
            else{
                setStock ({...stock, stock: props.stock})
            }
    }, [])
    // function stocks(props){
        // if(props.stock >= 0){
        //     setStock = {...stock, stock: "No disponible"}
        // }
        // else{
        //     setStock ={...stock, stock: props.stock}
        // }
    // }
    // stocks(props)
    return (
        <div className='card'>
            <h1>{props.nombre}</h1> 
            <div className='div-imagen'>
                <img alt={props.nombre} src={props.img}></img>
            </div>
            <p>{props.descripcion}</p> 
            <div className='div-boton'>
                 <button className='boton-editar'></button>
            </div>
            <h3> {stock.stock}</h3> 
            <h4>{props.precio}</h4>
        </div>
    )
}
