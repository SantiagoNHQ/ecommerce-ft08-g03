import axios from "axios";
import React, {useState, useEffect} from "react";
import "./ProductCard.css"
import {connect} from 'react-redux'

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
        
        if (!(props.img.includes("http") || props.img.includes("www"))) {
            //props.img = ""
            //console.log("Dir: ", __dirname)
            setStock ((state) => ({...state, img: "http://localhost:3001/upload/" + props.img}))
        }
    }, [props.stock])

    // function stocks(props){
        // if(props.stock >= 0){
        //     setStock = {...stock, stock: "No disponible"}
        // }
        // else{
        //     setStock ={...stock, stock: props.stock}
        // }
    // }
    // stocks(props)


    function comprar(e) {
        const productId = {
            id : props.id,
            nombre: props.nombre,
            precio: props.precio,         
        }
        // el ${} lo recibo en el back desde params, y el obj seria mi producto a agregar, lo agarro en req.body
        axios.post(`http://localhost:3001/user/${props.user.id}/cart`, productId )
        .then(res => {
            console.log('Todo Okey: ', res)

        }).catch(err => {
            if(err) return err;
        })
    }

    return (
        <div className='card'>
            <h1>{props.nombre}</h1> 
            <div className='div-imagen'>
                <img alt={props.nombre} src={stock.img}></img>
            </div>
            <p>{props.descripcion}</p> 
            <div className='div-boton'>
                 <button className='boton-editar'></button>
                 <button className='boton-comprar' onClick={comprar}>COMPRAR</button>
            </div>
            <h3>Stock: {stock.stock}</h3> 
            <h4>$ {props.precio}</h4>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

const mapDispatchToProps = (dispatch) => {
    // return {
    //     onSearchChange: (text) => {
    //     dispatch(searchChange(text))
    //     }
    // }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)