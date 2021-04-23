import React, { useState } from "react";
import axios from 'axios';
import "./FormCategory.css";

export default function FormCategory(props) {

    const [state, setState] = useState({/* nombre:"", descripcion:"" */})

    function submit(e) {
        axios.post("/category/add", state)
        .then(res => {
            console.log ("bien", res)
        })
        .catch (err => {
            console.log("mal", err)
        })
    }

   function cambios (e){
        e.preventDefault()
        setState({...state, [e.target.name]: e.target.value})
        
    }

    return (
        <div className = 'divAgregarCategoria'>
            
            <form className = 'agregarCategoria' onSubmit={ submit }>
                <h1>Agregar Categoria</h1>
                <input key="nombre" type="text" onChange={cambios} placeholder="Nombre" name="nombre"/>
                <input key="descripcion" type="text" onChange={cambios} placeholder="Descripcion" name="descripcion"/> 
                <div className='divBotonAC'>
                <input className='botonAC' type="submit" key="boton" />
                </div>
                
            </form>
        </div>
    )
}
