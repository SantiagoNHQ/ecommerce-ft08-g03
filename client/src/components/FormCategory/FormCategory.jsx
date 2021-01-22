import React, { useState } from "react";
import axios from 'axios';
import "./FormCategory.css";

export default function FormCategory(props) {

    const [state, setState] = useState({nombre:"", descripcion:""})

    function submit(e) {
        axios.post("http://localhost:3001/category/add", state)
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
        <div>
            <h1>AGREGAR CATEGORIA</h1>
            <form onSubmit={ submit }>
                <input key="nombre" type="text" onChange={cambios} placeholder="nombre" name="nombre"/>
                <input key="descripcion" type="text" onChange={cambios} placeholder="descripcion" name="descripcion"/> 

                <input type="submit" key="boton" />
            </form>
        </div>
    )
}
