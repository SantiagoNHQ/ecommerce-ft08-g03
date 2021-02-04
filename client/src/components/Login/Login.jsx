import React, { useState } from "react";
import axios from 'axios';
import "./Login.css";

//  S61 : Crear Componente Login


export default function NuevoUsuario(props) {

    const [state, setState] = useState({/* nombre:"", descripcion:"" */})

    function submit(e) {
        console.log("Usuario y contraseña: ", state)
        e.preventDefault()
        axios.post("http://localhost:3001/register/login", state)
        .then(res => {
            console.log("RESPONDI")
            props.history.push("/");
            window.location.reload(true);
        })
        .catch (err => {
            console.log("Mal", err)
        })
    }

   function cambios (e){
        e.preventDefault()
        setState({...state, [e.target.name]: e.target.value})
        }
    
    function submitEnter (e) {
        if (e.key === 'Enter'){
            submit(e)
        }
    } 

    return (
        <div className = 'formulario'>
           
            <form className='iniciarSesion' action='/login' method='POST' onSubmit={ submit }>
                <h1>Iniciar Sesion</h1>
                <input key="email" type="text" onChange={cambios} placeholder="nombre de usuario" name="username" />
                <input key="clave" type="password" onKeyPress={ submitEnter }  onChange={cambios} placeholder="contraseña" name="password" />
                <input type="submit" key="boton" />
            </form>
        </div>
    )
}

