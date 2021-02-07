import {useEffect, useState} from 'react'
import axios from 'axios'
import { connect, useStore } from 'react-redux'
import { ordersLoad, setUser } from "../../redux/actions";
import { useHistory } from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        user: state.user,
        categoria: state.categoria
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetUser: (user) => {
            dispatch(setUser(user))
        }
    }
}

function Perfil(props) {
    let history = useHistory()
    
    useEffect(() => {
        axios.get("http://localhost:3001/auth/me")
        .then(r => {
            props.onSetUser(r)
        })
        .catch(e => console.log("Error: ", e))
    }, [])

    function salir(){
        axios.get("http://localhost:3001/auth/logout")
        .then(r => {
            console.log(r)
            props.onSetUser({})
            history.push("/");
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            {props.user &&
            <div>
                <h3>
                    nombre: {props.user.nombre} 
                </h3>
                <h3>
                    apellido: {props.user.apellido} 
                </h3>
                <h3>
                    nombreDeUsuario: {props.user.nombreDeUsuario} 
                </h3>
                <h3>
                    email: {props.user.email} 
                </h3>
            </div>
            }
            <button onClick={salir}>CERRAR SESION</button>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Perfil)


