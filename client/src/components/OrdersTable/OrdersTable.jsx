import {useEffect} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { ordersLoad } from "../../redux/actions";

const mapStateToProps = (state) => {
    return {
        orders: state.orders,
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

function OrdersTable(props) {
    var {orders, onOrdersLoad} = props
    var estado = props.match.params.status
    useEffect(() => {
        axios.get("http://localhost:3001/user/orders" /*+ !estado ? "" : `/${estado}`*/)
        .then(r => {
            onOrdersLoad(r.data)
        }).catch(e => console.log("Error: ", e))
    }, [estado, onOrdersLoad])

    return (
        <div>
            {orders && orders.map(v => 
                <div>
                    <p>  Nombre del Usuario: {v.user.nombre} {v.user.apellido}  |  Estado: {v.estado}  |  Numero de usuario: {v.id}  |  Correo: {v.user.email}</p>

                </div>
            ) }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable)