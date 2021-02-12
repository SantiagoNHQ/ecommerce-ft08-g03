
import { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { ordersLoad } from "../../redux/actions";
import swal from "sweetalert";

const mapStateToProps = (state) => {
    return {
        user: state.user,
        categoria: state.categoria
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrdersLoad: (orders) => {
            dispatch(ordersLoad(orders))
        }
    }
}

function OrdenUser(props) {
    const [orden, setOrden] = useState()
    const [review, setReview] = useState({ userId: props.user.id })
    // var {orders, onOrdersLoad} = props
    var estado;
    if (props.match) {
        estado = props.match.params.status
    }
    console.log("Status: ", estado)

    useEffect(() => {
        axios.get("http://localhost:3001/user/" + props.user.id + "/orders/completas")
            .then(r => {
                setOrden(r.data)
                console.log(r.data)
            })
            .catch(e => console.log("Error: ", e))
    }, [])
    function cambios(e) {
        console.log("estadooo", review)
        if (e.target.name === "calificacion") {
            if (e.target.value > 5) {
                e.target.value = 5
            }
            if (e.target.value < 1) {
                e.target.value = 1
            }
        }
        setReview({ ...review, [e.target.name]: e.target.value })
    }
    function subirReview(e, data) {
        axios.post("http://localhost:3001/product/" + data.productId + "/review", review)
            .then(respuesta => {
                swal({
                    title: "Gracias por dejarnos su opinion!!",
                    icon: "success",
                });
            })
            .catch(respuesta => {
                console.log("HUBO UN ERROR AL CARGAR REVIEW")
                swal({
                    title: "Ya hay un review suya para este producto",
                    text: "Gracias por compartir su opinion.",
                    icon: "info",
                });
            })
    }

    return (
        <div>
            {orden && orden.map(pos => <div>
                <h3>{pos.nombre}</h3>
                <form onSubmit={(e, data = pos) => subirReview(e, data)}>
                    <input key="descripcion" type="text" onChange={cambios} placeholder="descripcion" id="descripcion" name="descripcion" />
                    <input key="calificacion" type="number" onChange={cambios} placeholder="calificacion" id="calificacion" name="calificacion" />
                    <input type="submit" key="boton" id="boton" />
                </form>
            </div>)}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdenUser)