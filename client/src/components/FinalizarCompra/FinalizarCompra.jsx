import React,{ useState } from "react";
import axios from "axios";
import "./FinalizarCompra.css";
import {useHistory} from 'react-router-dom';


//Crear form para direccion de envio y boton de confirmar compra
//Hacer la coneccion con el usuario logueado para que tome la compra
//Direccion guardar en un estado local para luego mandar al user que lo almacene (useState)

export default function finalizarCompra(props){
    function FormAdress () {
        let history = useHistory()
        const [state, setState] = useState({/* nombre:"", descripcion:"" */})
    };

    // function NuevoUsuario(props) {
        
    // };

    function submitEnter (e) {
        if (e.key === 'Enter'){
            submit(e)
        }
    };

    function submit(e) {
        // history.push("/user/finalizarcompra")
    }

    return (
        <div className='formulario'>
            <form onSubmit={submit} className='finalizarCompra'>
                <h1>Añadir una direccion</h1>
                <input key="calle" type="text" placeholder="Calle" name="calle"/>
                <input key="numero" type="text" placeholder="Número" name="numero"/>
                <input key="localidad" type="text" placeholder="Localidad" name="localidad" />
                <input key="provincia" type="text" placeholder="Provincia" name="provinvcia" />
                <input key="codigoPostal" type="text" placeholder="Código Postal" name="codigoPostal" />
                <input key="pais" type="text" placeholder="País" name="pais" />
                <input key="email" onKeyPress={submitEnter} type="email" placeholder="Correo electrónico" name="email" />
                <input  className='botonfinalizarCompra' key="boton" type="submit" value="Finalizar compra" />
            </form>
        </div>
    )

}
