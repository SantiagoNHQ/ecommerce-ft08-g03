import React from "react"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import './Checkout.css'

export function Checkout({ productos, data, user }) {
    let history = useHistory()
    console.log("SOY ORDEID", productos)

    console.log("SOY ORDENID", productos[0].ordenId)
    const [state, setState] = useState({ordenId: productos[0].ordenId})
    const [stock, setStock] = useState({ordenId: productos[0].ordenId, productos: productos})

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
        axios.post("http://localhost:3001/user/tarjeta/"+ user.id, {data:state, stock: stock})
        .then(res => {
            console.log("SOY",res)
            history.push("/user/finalizarcompra");
        })
        .catch(err => {
            console.log("EEEEEEEEEEEEE",err)
        })

    }

    return (
        <div>
            <form id="form1">
                <h1 className='h1Checkout'>Checkout</h1>
                <div >
                    {productos.map((producto, i) => {
                        return (
                            <div className='listaProductosAComprar' key={i}>
                                <ul >
                                    <li>{producto.title}</li>
                                    <li>{"$" + producto.unit_price}</li>
                                    <li>{producto.quantity} Unidad/es.</li>
                                </ul>

                            </div>
                        )
                    })}
                    <h1>Pagar con Credito/Debito</h1>
                    <form onSubmit={submitTarjeta} className='finalizarCompra'>
                        <h1>Datos de la tarjeta</h1>
                        <input key="Numero de tarjeta" onChange={cambios} type="number" placeholder="Numero de tarjeta" name="numeroDeTarjeta" />
                        <input key="Nombre" onChange={cambios} type="text" placeholder="Nombre" name="nombreT" />
                        <input key="Fecha de expiracion" onChange={cambios} type="text" placeholder="Fecha de expiracion" name="fechaDeExpiracion" />
                        <input key="Codigo de Seguridad" onChange={cambios} type="number" placeholder="Codigo de Seguridad" name="codigoDeSeguridad" />
                        <div className='divBotonCargarDatosTarjeta'>    
                            <input className='botonCargarDatosTarjeta' key="boton" onChange={cambios} type="submit" value="Cargar datos" />
                        </div>
                    </form>

                    <h1>Pagar con Mercado Pago</h1>
                </div>
            </form >
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Checkout)