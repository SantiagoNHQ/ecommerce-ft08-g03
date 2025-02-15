import React, { useState } from "react";
import axios from "axios";
import "./FinalizarCompra.css";
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import swal from 'sweetalert';


//Crear form para direccion de envio y boton de confirmar compra
//Hacer la coneccion con el usuario logueado para que tome la compra
//Direccion guardar en un estado local para luego mandar al user que lo almacene (useState)
export function FinalizarCompra(props) {

    // let history = useHistory()
    const [state, setState] = useState()

    function cambios(e) {
        e.preventDefault()
        setState({ ...state, [e.target.name]: e.target.value })
    };

    function submitEnter(e) {
        if (e.key === 'Enter') {
            submit(e)
        }
    };

    function submit(e) {
        e.preventDefault()
        // history.push("/user/finalizarcompra");

        if (state.calle && state.numero && state.localidad && state.provincia && state.codigoPostal) {
            axios.post(`http://localhost:3001/user/compra/${props.user.id}`, state, { withCredentials: true })
                .then(respuesta => {
                    swal({
                        title: "Compra finalizada con éxito!",
                        icon: "success"
                    })
                    console.log("SOY EMAIL", props.user.email)
                    var mailOptions = {
                        from: "WeAreWine",
                        to: props.user.email,
                        subject: "Gracias por su compra en WeAreWine",
                        text: "Este es el texto del email",
                    }
                    axios.get("http://localhost:3001/auth/send-email/" + props.user.email)
                        .then(respuesta => {
                            console.log("SI", respuesta)
                            window.location.replace("http://localhost:3000/")
                        })
                        .catch(err => {
                            console.log("NO", err)
                        })
                })
                .catch(err => { console.log("SOY", err) })
        } else {
            swal({
                title: "Faltan llenar campos",
                text: "...todos los campos son obligatorios",
                icon: "info",
            });
        }

    }

    return (
        <div className='divFinalizarCompra'>
            <form onSubmit={submit} className='direccionDeEnvio'>

                <h1>Direccion de envio</h1>
                <input key="calle" onChange={cambios} type="text" placeholder="Calle" name="calle" />
                <input key="numero" onChange={cambios} type="number" placeholder="Número" name="numero" />
                <input key="localidad" onChange={cambios} type="text" placeholder="Localidad" name="localidad" />
                <input key="provincia" onChange={cambios} type="text" placeholder="Provincia" name="provincia" />
                <input key="codigoPostal" onKeyPress={submitEnter} onChange={cambios} type="number" placeholder="Código Postal" name="codigoPostal" />
                <button key="boton" onChange={cambios} type="submit" value="Finalizar Compra" />
            </form>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(FinalizarCompra)