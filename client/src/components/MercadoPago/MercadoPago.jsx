import React from "react"
import { useState, useEffect } from "react"
import Checkout from "./Checkout"
import axios from "axios"
import { connect } from "react-redux"
// import state from "sweetalert/typings/modules/state"
// import { checkout } from "../../../../api/src/app"


const mapStateToProps = (state) => {
  return {
    carrito: state.carrito,
  }
}
export function MercadoPago(props) {

  const [datos, setDatos] = useState("")
  //  var obj = {data: [
  //   {title: "producto 1", quantity: 1, price: 5},
  //   {title: "producto 2", quantity: 1, price: 5}
  // ]}
  var carrito = props.carrito
  var obj = carrito.map(i => ({
    title: i.nombre,
    unit_price: i.precio,
    quantity: i.cantidad,
    ordenId: i.ordenId,
    id: i.productId
  }))
  console.log("OBJJJJ", obj)
  var obj1 = { data: obj }

  console.log("OBJJJJ1", obj1)
  console.log("ORDEN IDDD", props.carrito[0].ordenId)
  useEffect(() => {
    axios.post("/mercadopago/" + carrito[0].ordenId, obj1)
      .then(data => {
        setDatos(data.data)
        console.info("contenido de data:", data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  // const productos = [
  //   {title: "producto 1", quantity: 5, price: 10},
  //   {title: "producto 2", quantity: 3, price: 5}
  // ]

  return (
    <div>
      {!datos
        ? <p>aguarde un momento....</p>
        : <Checkout productos={obj} data={datos} />
      }
    </div>
  )

}

export default connect(mapStateToProps)(MercadoPago)
