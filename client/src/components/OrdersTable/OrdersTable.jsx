import {useEffect} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { ordersLoad } from "../../redux/actions";
import OrderCard from '../OrderCard/OrderCard'

const mapStateToProps = (state) => {
    return {
        orders: state.orders
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
    console.log("Status: ", estado)
    
    useEffect(() => {
        axios.get("http://localhost:3001/user/orders" + (!estado ? "" : `/${estado}`)).then(r => {
            onOrdersLoad(r.data)
        }).catch(e => console.log("Error: ", e))
    }, [estado, onOrdersLoad])

    return (
        <div>
            {orders && orders.map(v => <OrderCard data={v} />)}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable)