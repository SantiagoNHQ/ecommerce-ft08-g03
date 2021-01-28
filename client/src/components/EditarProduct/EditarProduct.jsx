import React, { useState, useEffect } from "react";
import axios from 'axios';
import './EditarProduct.css'

export default function EditarProducto(props) {
 
    const [cards, setCards] =useState({})

    useEffect(() => {
        function product () {
            axios.get("http://localhost:3001/product/")
            .then(res => {
                console.log("Data de respuesta: ", res.data)
                //setCards({...cards, productos: res.data})
                setCards((state) => ({productos: res.data}))
            })
        }
            
        product()
    }, [])

    function submitEliminar(p) {
        console.log(" ELIMINAR: ", p)
        // var obj = {nombre: p}
        axios.delete("http://localhost:3001/product/", {data: {nombre: p}}
        )
        .then(res => {
            console.log ("bien", res)
        })
        .catch (err => {
            console.log("mal", err)
        })
    }
    function CambiosEditar(e, id){
        e.preventDefault()
        console.log(cards.editar)
        setCards({...cards, editar: {...cards.editar ,[e.target.name]:e.target.value, id} })
        
    }

    function submitEditar(id) {
        axios.put("http://localhost:3001/product", cards.editar)
        .then(res => {
            console.log ("bien", res)
            console.log("STATE EDITAR: ", cards.editar)
        })
        .catch (err => {
            console.log("mal", err)
        })
    }


    return (
        <div className="div-productos1" >
            { cards.productos && cards.productos.map(p => 
                <div className = 'card1' key={p.id} > 
                    <h5>NOMBRE</h5>
                    <h3 className ="textoEditar">{p.nombre}</h3>
                    <input className="inputEditar" key={p.nombre} type="text" onChange={(e) =>CambiosEditar(e, p.id)} value={cards.productos.nombre} placeholder="NOMBRE" name="nombre"/>
                   
                    <h5>TIPO</h5>
                    <h3 className ="textoEditar">{p.tipo}</h3>
                    <input className="inputEditar" key={p.tipo} type="text" onChange={(e) =>CambiosEditar(e, p.id)} value={cards.productos.tipo} placeholder="tipo" name="tipo"/>

                    <h5>EDAD</h5>
                    <h3 className ="textoEditar">{p.edad}</h3>
                    <input className="inputEditar" key={p.edad} type="number" onChange={(e) =>CambiosEditar(e, p.id)} value={cards.productos.edad} placeholder="edad" name="edad"/> 

                    <h5>ELABORACION</h5>
                    <h3 className ="textoEditar">{p.elaboracion}</h3>
                    <input className="inputEditar" key={p.elaboracion} type="number" onChange={(e) =>CambiosEditar(e, p.id)} value={cards.productos.elaboracion} placeholder="elaboracion" name="elaboracion"/>

                    <h5>STOCK</h5>
                    <h3 className ="textoEditar">{p.stock}</h3>
                    <input className="inputEditar" key={p.stock} type="number" onChange={(e) =>CambiosEditar(e, p.id)} value={cards.productos.stock} placeholder="stock" name="stock"/>

                    <h5>PRECIO</h5>
                    <h3 className ="textoEditar">{p.precio}</h3>
                    <input className="inputEditar" key={p.precio} type="number" onChange={(e) =>CambiosEditar(e, p.id)} value={cards.productos.precio} placeholder="precio" name="precio"/> 

                    <h5>ORIGEN</h5>
                    <h3 className ="textoEditar">{p.origen}</h3>
                    <input className="inputEditar" key={p.origen} type="text" onChange={(e) =>CambiosEditar(e, p.id)} value={cards.productos.origen} placeholder="origen" name="origen"/> 

                   

                    <h5>DESCRIPCION</h5>
                    <h3 className ="textoEditar">{p.descripcion}</h3> 
                    <input className="inputEditar" key={p.descripcion} type="text" onChange={(e) =>CambiosEditar(e, p.id)} value={cards.productos.descripcion} placeholder="descripcion" name="descripcion"/> 
                   <p></p>
                    <div>
                        <img alt="" src={p.img} className ="div-imagen1"></img> 
                    </div>
                    
                    <button className="botoneditar" onClick ={() => submitEliminar(p.nombre)}>ELIMINAR</button>
                    <button className="botoneditar" onClick={() =>submitEditar(p.id)}>EDITAR</button>
                </div> 
            )}
        </div>
        

    )
}