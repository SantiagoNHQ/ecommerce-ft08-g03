import React, { useState } from "react";
import "./SearchBar.css";
import {Link} from "react-router-dom";
import axios from 'axios';


//  *** S7 : Crear Componente Search Bar ***
export default function SearchBar(props) {
    const [input, setInput] = useState ("")

    function buscador (e) {
        e.preventDefault()
        setInput (e.target.value)
    }
    function submitEnter (e) {
        if (e.key === 'Enter'){
            submit(e)
    }        
    }
    function submit (e) {
        //llamado a la api que retorne los poductos por nombre
        //pasar e.target.value por params
        axios.get("http://localhost:3001/product/" + input)
        .then(response => {
            console.log("RESPUESTA: ", response.data)
        })
        .catch(err => {
            console.log("esto es un error" , err)
        })
    }
    return (
        <div>
            <nav>
            <Link to="/">INICIO</Link>
              <Link to="/products">Catalogo</Link>
              <Link to="/formProduct">Añadir Producto</Link>
              <Link to="/formCategory">Añadir Categoria</Link>
            </nav>
            <input onKeyPress={ submitEnter } onChange={ buscador }/>
            <button onClick={ submit } > Buscar!! </button>
        </div>
    )
}

