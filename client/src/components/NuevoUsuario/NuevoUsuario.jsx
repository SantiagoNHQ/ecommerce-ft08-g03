import React, { useState } from "react";
import axios from 'axios';
import "./NuevoUsuario.css";

export default function NuevoUsuario(props) {

    const [state, setState] = useState({/* nombre:"", descripcion:"" */})

    function submit(e) {
        axios.post("http://localhost:3001/user/", state)
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
        <div className = 'nuevoUsuario'>
            <h1>Crear Cuenta</h1>
            <form onSubmit={ submit }>
                <input key="nombre" type="text" onChange={cambios} placeholder="nombre" name="nombre"/>
                <input key="apellido" type="text" onChange={cambios} placeholder="apellido" name="apillido"/> 
                <input key="nombreDeUsuario" type="text" onChange={cambios} placeholder="nombreDeUsuario" name="nombreDeUsuario" />
                <input key="email" type="email" onChange={cambios} placeholder="email" name="email" />
                <input key="clave" type="clave" onChange={cambios} placeholder="clave" name="clave" />
                <input type="submit" key="boton" />
            </form>
        </div>
    )
}