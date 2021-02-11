import axios from 'axios'
import { connect } from 'react-redux'
//import { useHistory } from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        user: state.user,
        categoria: state.categoria
    }
}

function Perfil(props) {
    //let history = useHistory()

    function salir(){
        axios.get("http://localhost:3001/auth/logout", {
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

export default connect(mapStateToProps)(Perfil)


