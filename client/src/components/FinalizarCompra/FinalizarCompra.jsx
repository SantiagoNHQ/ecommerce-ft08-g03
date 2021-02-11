import React,{ useState } from "react";
import axios from "axios";
import "./Finalizarcompra.css";


//Crear form para direccion de envio y boton de confirmar compra
//Hacer la coneccion con el usuario logueado para que tome la compra
//Direccion guardar en un estado local para luego mandar al user que lo almacene (useState)

export default function finalizarCompra(props){
    function FormAdress () {

    };
    function submitEnter (e) {
        if (e.key === 'Enter'){
            submit(e)
        }
    };

    return (
        <div>
            <form>
                <h1>Añadir una direccion</h1>
                <input key="calle" type="text" placeholder="Calle" name="calle"/>
                <input key="numero" type="text" placeholder="Número" name="numero"/>
                <input key="localidad" type="text" placeholder="Localidad" name="localidad" />
                <input key="provincia" type="text" placeholder="Provincia" name="provinvcia" />
                <input key="codigoPostal" type="text" placeholder="Código Postal" name="codigoPostal" />
                <input key="pais" type="text" placeholder="País" name="pais" />
                <input key="email" onKeyPress={submitEnter} type="email" placeholder="Correo electrónico" name="email" />
                <input key="boton" type="submit" value="Finalizar Compra" />
            </form>
        </div>
    )

}
