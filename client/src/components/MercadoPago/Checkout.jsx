import React from "react"
import {useEffect} from "react"

export default function Checkout({productos, data}){

    useEffect(() => {
        const script = document.createElement("script")

        const attr_data_preference = document.createAttribute("data-preference-id")
        attr_data_preference.value = data.id

        script.src= "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
        script.setAttributeNode(attr_data_preference)

        console.log(data)

        document.getElementById("form1").appendChild(script)
        return() => {
            document.getElementById("form1").removeChild(script)
        }
    },[])

    return(
        <div>
            <form id= "form1">
                <h4>Checkout</h4>
                <div >
                    {productos.map ((producto, i)=> {
                        return (
                            <div  key={i}>
                                <ul >
                                    <li>{producto.tilte}</li>
                                    <li>{"s" +producto.price}</li>
                                    <li>{producto.quantity}</li>
                                </ul>

                            </div>
                        )
                    })}

                </div>

            </form>


        </div>


    )


}