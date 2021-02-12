import React from "react"
import {useState, useEffect} from "react"
import Checkout from "./Checkout"
import axios from "axios"
// import { checkout } from "../../../../api/src/app"

export default function MercadoPago(){

  const [datos, setDatos] = useState("")
 var obj = {data: [
  {title: "producto 1", quantity: 1, price: 5},
  {title: "producto 2", quantity: 1, price: 5}
]}
  useEffect(()=> {
    axios.post("http://localhost:3001/mercadopago", obj)
    .then(data => {
      setDatos(data.data)
      console.info("contenido de data:", data)
    })
    .catch(err =>{
      console.error(err)
    })
  },[])
  
  const productos = [
    {title: "producto 1", quantity: 5, price: 10},
    {title: "producto 2", quantity: 3, price: 5}
  ]

  return (
    <div>
      {!datos
        ? <p>aguarde un momento....</p>
        : <Checkout productos={productos} data={datos} />
      }
    </div>
  )

}

