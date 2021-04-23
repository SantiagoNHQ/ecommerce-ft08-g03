import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ordersLoad } from "../../redux/actions";
import MaterialTable from "material-table";
import axios from 'axios';
import { Modal, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import OrderCard from '../OrderCard/OrderCard'

const columns = [
    { title: '# Orden', field: 'id' },
    { title: 'Estado', field: 'estado' },
    { title: 'ID Usuario', field: 'user.id' },
    { title: 'Nombre', field: 'user.nombre' },
    { title: 'Apellido', field: 'user.apellido' }
];

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%'
    }
}));

const baseUrl = "/user/orders";
var firstObj;


function OrdersTable(props) {

    const styles = useStyles();
    const [orders, setOrders] = useState();
    const [modal, setModal] = useState(false);

    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                console.log('response :', response.data)
                setOrders(response.data);//Guarda la petición en el estado
            }).catch(error => {
                console.log(error);
            })
    }

    console.log('orders :', orders)
    useEffect(() => {
        peticionGet();
    }, [])

    const abrirCerrarModal = () => {
        setModal(!modal);
    }
    const seleccionarOrden = (orden) => {
        var result = orders.filter(ind => (ind.id === orden));
        firstObj = result[0];
        abrirCerrarModal()
    }


    const body = (
        <div className={styles.modal}>
            <h3>Orden Seleccionada { }</h3>
            <>
                { <OrderCard data={firstObj} />}
            </>
            <div align="right">
                <Button color="black" onClick={() => abrirCerrarModal()}>Cerrar</Button>
            </div>
        </div>
    )

    return (
        <div className="App">
            <br />
            {/* <Button onClick={() => abrirCerrarModalInsertar()}>Insertar Artista</Button> */}
            <br /><br />
            <MaterialTable
                columns={columns}
                data={orders}
                title={"Ordenes de los usuarios"}
                actions={[
                    {
                        icon: 'save',
                        tooltip: 'Editar',
                        onClick: (event, rowData) => seleccionarOrden(rowData.id, "Editar")
                    }
                ]}
                options={{
                    actionsColumnIndex: -1,
                    filtering: true,
                    headerStyle: {
                        backgroundColor: 'rgba(158, 22, 22, 0.733)',
                        color: '#FFF',
                        fontSize: '1.5em'
                    }
                }}
                localization={{
                    header: {
                        actions: "Ver Orden"
                    }
                }}
            />

            <Modal
                open={modal}
                onClose={abrirCerrarModal}>
                {body}
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setOrders: (orders) => {
            dispatch(ordersLoad(orders))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable)