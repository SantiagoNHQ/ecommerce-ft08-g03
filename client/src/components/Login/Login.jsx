import React, { useState } from "react";
import axios from 'axios';
import "./Login.css";

//  S61 : Crear Componente Login


export default function NuevoUsuario(props) {

    const [state, setState] = useState({/* nombre:"", descripcion:"" */})

    function submit(e) {
        console.log("Usuario y contraseña: ", state)
        e.preventDefault()
        axios.post("http://localhost:3001/auth/login",{ data: state})
        // axios({
        //     method: 'post', 
        //     url: 'http://localhost:3001/auth/login',
        //     data: {
        //       state
        //     }
        //   })
        .then(res => {
            console.log("RESPONDI", res)
            alert("USER LOGUEADO")
            // props.history.push("/");
            // window.location.reload(true);
        })
        .catch (err => {
            console.log("Mallllllllllllllllllll", err)
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
           
            <form className='iniciarSesion' /*action="http://localhost:3001/auth/login" method='POST' */>
                <h1>Iniciar Sesion</h1>
                <input key="username" type="text" placeholder="username" onChange={cambios} name="username" />
                <input key="password" type="password" placeholder="password" onChange={cambios} name="password" />
                <input type="submit" key="boton" onSubmit={submit} value="Enviar" />
            </form>
        </div>
    )
}

