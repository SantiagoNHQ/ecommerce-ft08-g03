import React, { useState, useEffect } from "react";
import axios from 'axios';


export default function EditarProducto(props) {
 
    const [cards, setCards] =useState({})

    useEffect(() => {
        function product () {
        axios.get("http://localhost:3001/product/")
        .then(res => 
            {
                console.log(res.data)
            setCards({...cards, productos: res.data})
            }
            )}
            
        product()
    }, [])
    function submitEliminar(p) {
        console.log(" ELIMINAR: ", p)
        var obj = {nombre: p}
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
        <div>
            { cards.productos && cards.productos.map(p => 
                <div key={p.id} > 
                    <h5>NOMBRE</h5>
                    <h3>{p.nombre}</h3>
                    <input key={p.nombre} type="text" onChange={(e) =>CambiosEditar(e, p.id)} value={cards.productos.nombre} placeholder="NOMBRE" name="nombre"/>
                   
                    <h5>TIPO</h5>
                    <h3>{p.tipo}</h3>
                    <input key={p.tipo} type="text" onChange={(e) =>CambiosEditar(e, p.id)} value={cards.productos.tipo} placeholder="tipo" name="tipo"/>

                    <h5>EDAD</h5>
                    <h3>{p.edad}</h3>
                    <input key={p.edad} type="number" onChange={(e) =>CambiosEditar(e, p.id)} value={cards.productos.edad} placeholder="edad" name="edad"/> 

                    <h5>ELABORACION</h5>
                    <h3>{p.elaboracion}</h3>
                    <input key={p.elaboracion} type="number" onChange={(e) =>CambiosEditar(e, p.id)} value={cards.productos.elaboracion} placeholder="elaboracion" name="elaboracion"/>

                    <h5>STOCK</h5>
                    <h3>{p.stock}</h3>
                    <input key={p.stock} type="number" onChange={(e) =>CambiosEditar(e, p.id)} value={cards.productos.stock} placeholder="stock" name="stock"/>

                    <h5>PRECIO</h5>
                    <h3>{p.precio}</h3>
                    <input key={p.precio} type="number" onChange={(e) =>CambiosEditar(e, p.id)} value={cards.productos.precio} placeholder="precio" style={{width: 30}} name="precio"/> 

                    <h5>ORIGEN</h5>
                    <h3>{p.origen}</h3>
                    <input key={p.origen} type="text" onChange={(e) =>CambiosEditar(e, p.id)} value={cards.productos.origen} placeholder="origen" style={{width: 30}} name="origen"/> 

                    <img alt="" src={p.img}></img>

                    <h5>DESCRIPCION</h5>
                    <p>{p.descripcion}</p> 
                    <input key={p.descripcion} type="text" onChange={(e) =>CambiosEditar(e, p.id)} value={cards.productos.descripcion} placeholder="descripcion" style={{width: 30}} name="descripcion"/> 


                    <button onClick ={() => submitEliminar(p.nombre)}>ELIMINAR</button>
                    <button onClick={() =>submitEditar(p.id)}>EDITAR</button>
                </div> 
            )}
            </div>
        

    )
}