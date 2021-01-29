import axios from "axios";
import React, {useState, useEffect} from "react";
import "./ProductCard.css"
import {connect} from 'react-redux'
import { addCarrito } from "../../redux/actions";

//  *** S10 : Crear Componente ProductCard ***
export function ProductCard (props) {
    const [stock, setStock] = useState({stock: "", img: props.img})
    
    useEffect(() => {
        if(props.stock <= 0){
            setStock ((state) => ({...state, stock: "Sin disponibilidad"}))
        }
        else{
            setStock ((state) => ({...state, stock: props.stock}))
        }
        
        if (!props.img || !(props.img.includes("http") || props.img.includes("www"))) {
            //props.img = ""
            //console.log("Dir: ", __dirname)
            setStock ((state) => ({...state, img: "http://localhost:3001/upload/" + props.img}))
        }
    }, [props.stock, props.img])



    function comprar(e) {
        e.preventDefault()
        var obj = {
            productId : props.id,
            nombre: props.nombre,
            precio: props.precio,       
        }
        // el ${} lo recibo en el back desde params, y el obj {data: productId} seria mi producto a agregar, lo agarro en req.body
        axios.post(`http://localhost:3001/user/${props.user.userId}/cart`, {data: obj} )
        .then(res => {
            console.log('Todo Okey: ', res)
            return axios.get(`http://localhost:3001/user/cart/${props.user.userId}`)
        })
        .then(res =>{
            console.log("ESTOS SON TODOS LOS ELEMENTOS DEL CARRITO", res.data)
            props.onAddCarrito(res.data)
        })
        .catch(err => {
            if(err) return err;
        })
    }

    return (
        <div className='card'>
            <div className='titulo-y-precio'>
            <h1 className='titulo'>{props.nombre}</h1> 
            <h4 className='precio'>$ {props.precio}</h4>
            </div>
            <div className='div-imagen'>
                <img alt={props.nombre} src={stock.img}></img>
            </div>
            <p>{props.descripcion}</p> 
            <div className='boton-y-stock'>
            <div className='div-boton'>
                 <button className='boton-comprar' onClick={(e)=> comprar(e)}>Añadir al carrito</button>
            </div>
            <h3 className='stock'><span>Stock:</span> {stock.stock}</h3> 
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        carrito: state.carrito
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddCarrito: (text) => {
        dispatch(addCarrito(text))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)