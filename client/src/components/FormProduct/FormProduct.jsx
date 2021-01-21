import React, { useState } from "react";
import "./FormProduct.css";
import axios from 'axios';

export default function FormProduct(props) {
 
    const [state, setState] = useState({})

   function submit(e) {
        console.log()
        axios.post("http://localhost:3001/product/", state)
        .then(res => {
            console.log ("bien", res)
        })
        .catch (err => {
            console.log("mal", err)
        })
    }
   function cambios (e){
        e.preventDefault()
        console.log("ACA ESTOY" ,e)
        setState({formulario: {...state.formulario, [e.target.name]: e.target.value}})
        
    }
    function eliminar(e){
        e.preventDefault()
        console.log("Aca estoy!!!" ,e)
        setState({eliminado: {...state, [e.target.name]: e.target.value}})
    }

    return (
        <div>
            <form onSubmit={ submit }>
                <input key="nombre" type="text" onChange={cambios} placeholder="nombre" name="nombre"/>
                <input key="tipo" type="text" onChange={cambios} placeholder="tipo" name="tipo"/>
                <input key="edad" type="number" onChange={cambios} placeholder="edad" style={{width: 30}} name="edad"/> 
                <input key="elaboracion" type="number" onChange={cambios} placeholder="elaboracion" name="elaboracion"/>
                <input key="stock" type="number" onChange={cambios} placeholder="stock" name="stock"/>
                <input key="precio" type="number" onChange={cambios} placeholder="precio" style={{width: 30}} name="precio"/> 
                <input key="origen" type="text" onChange={cambios} placeholder="origen" style={{width: 30}} name="origen"/> 
                <input key="descripcion" type="text" onChange={cambios} placeholder="descripcion" style={{width: 30}} name="descripcion"/> 
                <input type="submit" key="boton" />
            </form>
            <h3>Eliminar</h3>
            <form>
                <input key="nombre" type="text" onChange={eliminar} placeholder="nombre" name="nombre"/>
                <input type="submit" key="boton" />
            </form>
        </div>
    )
}

