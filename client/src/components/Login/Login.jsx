import React, { useState } from "react";
import axios from 'axios';
import "./Login.css";
import swal from "sweetalert"

//  S61 : Crear Componente Login
export default function NuevoUsuario(props) {
    const [state, setState] = useState({})

    function submit(e) {
        e.preventDefault()
        axios.post("http://localhost:3001/auth/login", state, { withCredentials: true })
            .then(res => {
                window.location.replace("http://localhost:3000/")
            })
            .catch(err => {
                console.log("Mallllllllllllllllllll", err)
                console.log("ESTADO: ", state)
                swal({
                    title: "No logueado",
                    text: "Intente nuevamente o cree un cuenta",
                    icon: "error",
                });
            })
    }

    // function sendEmail (e) {
    //     e.preventDefault()
    //     var email = [e.target.value]
    //     console.log(email)
    //     axios.post('/http://localhost:3001/auth/send-email', email)
    //     .then(res => {
    //         console.log("Todo ok...")
    //     }).catch(err => {
    //         console.log("Todo mal", err.message)
    //     })
    // }





    function cambios(e) {
        e.preventDefault()
        setState({ ...state, [e.target.name]: e.target.value })
    }

    function submitEnter(e) {
        if (e.key === 'Enter') {
            submit(e)
        }
    }

    function google(e) {
        e.preventDefault()
        window.open("http://localhost:3001/auth/google")
    }
    return (
        <div className='divLogin'>
            <form onSubmit={submit} className='iniciarSesion' >
                <h1>Iniciar Sesion</h1>
                <input key="username" type="text" placeholder="Nombre de Usuario" onChange={cambios} name="username" />
                <input key="password" onKeyPress={submitEnter} type="password" placeholder="Contraseña" onChange={cambios} name="password" />
                <div className='divBotonLogin'>
                    <input className='botonLogin' type="submit" key="boton" value="Entrar" />
                </div>
                <span>o continue con</span>
                <button className='botonGoogle' onClick={google}><div className="imagenGoogle"></div>
                    <span className='spanG' >G</span>
                    <span className='spanO' >o</span>
                    <span className='spanO2' >o</span>
                    <span className='spanG2' >g</span>
                    <span className='spanL' >l</span>
                    <span className='spanE' >e</span>
                </button>
            </form>
        </div>
    )
}
