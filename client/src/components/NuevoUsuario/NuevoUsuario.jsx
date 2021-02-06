//S52 : Crear Formulario de Creación de Cuenta/Usuario

import React, { useState } from "react";
import axios from 'axios';
import "./NuevoUsuario.css";
import {connect} from 'react-redux'
import { useHistory } from "react-router-dom";

function NuevoUsuario(props) {
    let history = useHistory()
    const [state, setState] = useState({/* nombre:"", descripcion:"" */})

    function submit(e) {
        console.log("Probando: ", state)
        e.preventDefault()
        if(state.coinciden) {
            axios.post("http://localhost:3001/user/", {data: state, user: props.user})
                .then(res => {
                    history.push("/");
                    window.location.reload(true);
                })
                .catch (err => {
                    console.log("mal", err)
                })
        } else {
            alert("Las contraseñas no coinciden")
        }
    }

   function cambios (e){
        e.preventDefault()
        //setState({...state, [e.target.name]: e.target.value})
        if ((e.target.name === "repetirClave" && state.clave === e.target.value) || (e.target.name === "clave" && state.repetirClave === e.target.value)) {
            console.log('Las contraseñas coinciden');
            setState({...state, [e.target.name]: e.target.value, coinciden: true})
        } else if(e.target.name === "repetirClave" || e.target.name === "clave") {
            console.log('Las contraseñas no coinciden');
            setState({...state, [e.target.name]: e.target.value, coinciden: false})
        } else {
            setState({...state, [e.target.name]: e.target.value})
        }
    }
    function submitEnter (e) {
        if (e.key === 'Enter'){
            submit(e)
        }
    } 

    return (
        <div className = 'formulario    '>
           
            <form className = 'nuevoUsuario' onSubmit={ submit }>
                <h1>Crear Usuario</h1>
                <input key="nombre" type="text" onChange={cambios} placeholder="Nombre..." name="nombre"/>
                <input key="apellido" type="text" onChange={cambios} placeholder="Apellido..." name="apellido"/> 
                <input key="nombreDeUsuario" type="text" onChange={cambios} placeholder="Nombre de usuario..." name="nombreDeUsuario" />
                <input key="email" type="email" onChange={cambios} placeholder="Email..." name="email" />
                <input key="clave" type="password"  onChange={cambios} placeholder="Contraseña..." name="clave" />
                <input key="repetirClave" type="password" onKeyPress={ submitEnter } onChange={cambios} placeholder="Repita su contraseña" name="repetirClave" />
                <input className='botonRegister' type="submit" key="boton" />
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(NuevoUsuario)