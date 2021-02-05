import React, { useState } from "react";
import axios from 'axios';
import "./Login.css";
import { connect } from 'react-redux'
import { setUser } from "../../redux/actions";

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetUser: (text) => {
            dispatch(setUser(text))
        }
    }
}
//  S61 : Crear Componente Login


function NuevoUsuario(props) {

    const [state, setState] = useState({})

    function submit(e) {
        console.log("Usuario y contraseña: ", state)
        e.preventDefault()
        axios.post("http://localhost:3001/auth/login", state)
        .then(res => {
            var user = res.data
            props.onSetUser(user)
            props.history.push("/");
        })
        .catch (err => {
            console.log("Mallllllllllllllllllll", err)
            alert("No logueado")
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

export default connect(mapStateToProps, mapDispatchToProps)(NuevoUsuario)

