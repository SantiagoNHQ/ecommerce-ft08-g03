import React from "react"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";

export default function Checkout({ productos, data }) {
    let history = useHistory()
    const [state, setState] = useState()

    useEffect(() => {
        const script = document.createElement("script")

        const attr_data_preference = document.createAttribute("data-preference-id")
        attr_data_preference.value = data.id

        script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
        script.setAttributeNode(attr_data_preference)

        console.log(data)

        document.getElementById("form1").appendChild(script)
        return () => {
            document.getElementById("form1").removeChild(script)
        }
    }, [])


    function cambios(e) {
        e.preventDefault()
        setState({ ...state, [e.target.name]: e.target.value })
    };

    function submitTarjeta(e) {
        e.preventDefault()
        history.push("/user/finalizarcompra");

    }

    return (
        <div>
            <form id="form1">
                <h4>Checkout</h4>
                <div >
                    {productos.map((producto, i) => {
                        return (
                            <div key={i}>
                                <ul >
                                    <li>{producto.title}</li>
                                    <li>{"$" + producto.unit_price}</li>
                                    <li>{producto.quantity}</li>
                                </ul>

                            </div>
                        )
                    })}
                    <h3>PAGAR </h3>
                    <form onSubmit={submitTarjeta} className='finalizarCompra'>
                        <h1>Datos de la tarjeta</h1>
                        <input key="Numero de tarjeta" onChange={cambios} type="text" placeholder="Numero de tarjeta" name="Numero de tarjeta" />
                        <input key="Nombre" onChange={cambios} type="Nombre" placeholder="Número" name="Nombre" />
                        <input key="Fecha de expiracion" onChange={cambios} type="text" placeholder="Fecha de expiracion" name="Fecha de expiracion" />
                        <input key="Codigo de Seguridad" onChange={cambios} type="text" placeholder="Codigo de Seguridad" name="Codigo de Seguridad" />
                        <input className='botonfinalizarCompra' key="boton" onChange={cambios} type="submit" value="Cargar datos de la tarjeta" />
                    </form>

                    <h3>PAGAR CON MERCADO PAGO</h3>

                </div>

            </form>


        </div>


    )


}