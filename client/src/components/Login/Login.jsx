import React, { useState } from "react";
import axios from 'axios';
import "./Login.css";
//  S61 : Crear Componente Login


export default function NuevoUsuario(props) {

    const [state, setState] = useState({})

    function submit(e) {
        console.log("Usuario y contraseña: ", state)
        e.preventDefault()
        axios.post("http://localhost:3001/auth/login", state)
        .then(res => {
            var user = res.data
            var value = JSON.stringify(user);       //nos pasa el objeto a JSON
            localStorage.setItem('user', value);        //guardamos ese JSON en el store
            
            props.history.push("/");
            window.location.reload(true);

            // const string = localStorage.getItem('user');
            // value = JSON.parse(string);
            // console.log("mi store es: ", value)
        })
        .catch (err => {
            console.log("Mallllllllllllllllllll", err)
            alert("No logueado")
            props.history.push("/user/ingresar");
            window.location.reload(true);
        })
    }

   function cambios (e){
       console.log("ESTADO", state)
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
           
            <form onSubmit={submit} className='iniciarSesion' >
                <h1>Iniciar Sesion</h1>
                <input key="username" type="text" placeholder="username" onChange={cambios} name="username" />
                <input key="password" onKeyPress={submitEnter} type="password" placeholder="password" onChange={cambios} name="password" />
                <input type="submit" key="boton" value="Enviar" />
            </form>
        </div>
    )
}