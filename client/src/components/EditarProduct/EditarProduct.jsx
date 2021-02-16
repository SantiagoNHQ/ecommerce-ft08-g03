import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import './EditarProduct.css'

export default function EditarProducto(props) {
    let history = useHistory()
    const [cards, setCards] =useState({})

    function product () {
        // console.log("Get: " + "http://localhost:3001/product/"+props.id)
        axios.get("http://localhost:3001/product/"+ props.id)
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
        <div className="divEditarProductos">
            {
                cards.productos && 
                <div className = 'edicion'> 
                    <h5>NOMBRE</h5>
                    <h3 className ="textoEditar">Actual: <span>{cards.productos.nombre}</span></h3>
                    <input className="inputEditar" key={cards.productos.nombre} type="text" onChange={(e) =>CambiosEditar(e, cards.productos.id)} /* value={cards.productos.nombre} */ placeholder="Nombre" name="nombre"/>
                   
                    <h5>TIPO</h5>
                    <h3 className ="textoEditar">Actual: <span>{cards.productos.tipo}</span></h3>
                    <input className="inputEditar" key={cards.productos.tipo} type="text" onChange={(e) =>CambiosEditar(e, cards.productos.id)} /* value={cards.productos.tipo} */ placeholder="Tipo" name="tipo"/>

                    <h5>EDAD</h5>
                    <h3 className ="textoEditar">Actual:<span>{cards.productos.edad}</span></h3>
                    <input className="inputEditar" key={cards.productos.edad} type="number" onChange={(e) =>CambiosEditar(e, cards.productos.id)} /* value={cards.productos.edad} */ placeholder="Edad" name="edad"/> 

                    <h5>ELABORACION</h5>
                    <h3 className ="textoEditar">Actual: <span>{cards.productos.elaboracion}</span></h3>
                    <input className="inputEditar" key={cards.productos.elaboracion} type="number" onChange={(e) =>CambiosEditar(e, cards.productos.id)} /* value={cards.productos.elaboracion} */ placeholder="Elaboracion" name="elaboracion"/>

                    <h5>STOCK</h5>
                    <h3 className ="textoEditar">Actual: <span>{cards.productos.stock}</span></h3>
                    <input className="inputEditar" key={cards.productos.stock} type="number" onChange={(e) =>CambiosEditar(e, cards.productos.id)} /* value={cards.productos.stock} */ placeholder="Stock" name="stock"/>

                    <h5>PRECIO</h5>
                    <h3 className ="textoEditar">Actual: <span>{cards.productos.precio}</span></h3>
                    <input className="inputEditar" key={cards.productos.precio} type="number" onChange={(e) =>CambiosEditar(e, cards.productos.id)} /* value={cards.productos.precio} */ placeholder="Precio" name="precio"/> 

                    <h5>ORIGEN</h5>
                    <h3 className ="textoEditar">Actual: <span>{cards.productos.origen}</span></h3>
                    <input className="inputEditar" key={cards.productos.origen} type="text" onChange={(e) =>CambiosEditar(e, cards.productos.id)} /* value={cards.productos.origen} */ placeholder="Origen" name="origen"/> 

                   

                    <h5>DESCRIPCION</h5>
                    <h3 className ="textoEditar">Actual: <span>{cards.productos.descripcion}</span></h3> 
                    <input className="inputEditar" key={cards.productos.descripcion} type="text" onChange={(e) =>CambiosEditar(e, cards.productos.id)} /* value={cards.productos.descripcion} */ placeholder="Descripcion" name="descripcion"/> 
                   <p></p>
                    <div className='divImagenEditar'>
                        <img alt="" src={cards.productos.img} className ="imagenEdit"></img> 
                    </div>
                    <div className='divBotonesEditar'>              
                        <button className="botonEliminar" onClick ={() => submitEliminar(cards.productos.nombre)}>Eliminar</button>
                        <button className="botonListo" onClick={() =>submitEditar(cards.productos.id)}>Listo</button>                   
                    </div>
                </div>
            }
        </div>
        

    )
}