import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import './EditarProduct.css'

export default function EditarProducto(props) {
    let history = useHistory()
    const [cards, setCards] =useState({})

    function product () {
        // console.log("Get: " + "http://localhost:3001/product/"+props.id)
        axios.get("http://localhost:3001/product/"+props.id)
        .then(res => {
            console.log("Data de respuesta: ", res.data)
            //setCards({...cards, productos: res.data})
            setCards((state) => ({productos: res.data}))
        })
    }

    useEffect(() => { 
        product()
    }, [])

    function submitEliminar(p) {
        console.log(" ELIMINAR: ", p)
        // var obj = {nombre: p}
        axios.delete("http://localhost:3001/product/", {data: {nombre: p}}
        )
        .then(res => {
            console.log ("bien", res)
            history.push("/user/products")
        })
        .catch (err => {
            console.log("mal", err)
        })
    }
    function CambiosEditar(e, id){
        e.preventDefault()
        console.log(cards.editar)
        setCards({...cards, editar: {...cards.editar, [e.target.name]: e.target.value, id} })
        
    }

    function submitEditar(id) {
        axios.put("http://localhost:3001/product", cards.editar)
        .then(res => {
            console.log ("bien", res)
            console.log("STATE EDITAR: ", cards.editar)
            history.push("/user/products")
        })
        .catch (err => {
            console.log("mal", err)
        })
    }


    return (
        <div className="div-productos1">
            {
                cards.productos && 
                <div className = 'card1'> 
                    <h5>NOMBRE</h5>
                    <h3 className ="textoEditar">{cards.productos.nombre}</h3>
                    <input className="inputEditar" key={cards.productos.nombre} type="text" onChange={(e) =>CambiosEditar(e, cards.productos.id)} /* value={cards.productos.nombre} */ placeholder="NOMBRE" name="nombre"/>
                   
                    <h5>TIPO</h5>
                    <h3 className ="textoEditar">{cards.productos.tipo}</h3>
                    <input className="inputEditar" key={cards.productos.tipo} type="text" onChange={(e) =>CambiosEditar(e, cards.productos.id)} /* value={cards.productos.tipo} */ placeholder="tipo" name="tipo"/>

                    <h5>EDAD</h5>
                    <h3 className ="textoEditar">{cards.productos.edad}</h3>
                    <input className="inputEditar" key={cards.productos.edad} type="number" onChange={(e) =>CambiosEditar(e, cards.productos.id)} /* value={cards.productos.edad} */ placeholder="edad" name="edad"/> 

                    <h5>ELABORACION</h5>
                    <h3 className ="textoEditar">{cards.productos.elaboracion}</h3>
                    <input className="inputEditar" key={cards.productos.elaboracion} type="number" onChange={(e) =>CambiosEditar(e, cards.productos.id)} /* value={cards.productos.elaboracion} */ placeholder="elaboracion" name="elaboracion"/>

                    <h5>STOCK</h5>
                    <h3 className ="textoEditar">{cards.productos.stock}</h3>
                    <input className="inputEditar" key={cards.productos.stock} type="number" onChange={(e) =>CambiosEditar(e, cards.productos.id)} /* value={cards.productos.stock} */ placeholder="stock" name="stock"/>

                    <h5>PRECIO</h5>
                    <h3 className ="textoEditar">{cards.productos.precio}</h3>
                    <input className="inputEditar" key={cards.productos.precio} type="number" onChange={(e) =>CambiosEditar(e, cards.productos.id)} /* value={cards.productos.precio} */ placeholder="precio" name="precio"/> 

                    <h5>ORIGEN</h5>
                    <h3 className ="textoEditar">{cards.productos.origen}</h3>
                    <input className="inputEditar" key={cards.productos.origen} type="text" onChange={(e) =>CambiosEditar(e, cards.productos.id)} /* value={cards.productos.origen} */ placeholder="origen" name="origen"/> 

                   

                    <h5>DESCRIPCION</h5>
                    <h3 className ="textoEditar">{cards.productos.descripcion}</h3> 
                    <input className="inputEditar" key={cards.productos.descripcion} type="text" onChange={(e) =>CambiosEditar(e, cards.productos.id)} /* value={cards.productos.descripcion} */ placeholder="descripcion" name="descripcion"/> 
                   <p></p>
                    <div>
                        <img alt="" src={cards.productos.img} className ="div-imagen1"></img> 
                    </div>
                    
                    <button className="botoneditar" onClick ={() => submitEliminar(cards.productos.nombre)}>ELIMINAR</button>
                    <button className="botoneditar" onClick={() =>submitEditar(cards.productos.id)}>EDITAR</button>
                </div>
            }
        </div>
        

    )
}