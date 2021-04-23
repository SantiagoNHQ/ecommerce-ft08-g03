import axios from 'axios'
import { connect } from 'react-redux'
//import { useHistory } from "react-router-dom";
import './Perfil.css'

const mapStateToProps = (state) => {
    return {
        user: state.user,
        categoria: state.categoria
    }
}

function Perfil(props) {
    //let history = useHistory()

    function salir(){
        axios.get("/auth/logout", {
            withCredentials: true
        })
        .then(r => {
            console.log(r)
            //props.onSetUser({})
            //history.push("/");
            window.location.replace("http://localhost:3000/")
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='divGeneralPerfil'>
            {props.user &&
            <div className='divPerfil'>
                <h3>
                    <span>Nombre:</span> {props.user.nombre} 
                </h3>
                <h3>
                <span>Apellido:</span> {props.user.apellido} 
                </h3>
                <h3>
                <span>NombreDeUsuario:</span> {props.user.nombreDeUsuario} 
                </h3>
                <h3>
                <span>Email:</span> {props.user.email} 
                </h3>
            </div>
            }
            <button className='botonPerfil' onClick={salir}>CERRAR SESION</button>
        </div>
    )
}

export default connect(mapStateToProps)(Perfil)


