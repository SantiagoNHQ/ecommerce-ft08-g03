import React, { useState, useEffect } from 'react';
// import './App.css';
import MaterialTable from "material-table";
import axios from 'axios';
import { Modal, TextField, Button } from '@material-ui/core';
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
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%'
    }
}));

const baseUrl = "http://localhost:3001/user/orders";


export default function OrdersTable() {
    const styles = useStyles();
    const [orders, setOrders] = useState([]);
    const [modal, setModal] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setOrders(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setOrders(response.data);//Guarda la petición en el estado
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        peticionGet();
    }, [])

    const abrirCerrarModal = () => {
        setModal(!modal);
    }
    const seleccionarOrden = (orden) => {
        setOrders(orden);
        abrirCerrarModal()
    }


    const body = (
        <div className={styles.modal}>
            <h3>Orden Seleccionada { }</h3>
            <>
                { <OrderCard data={1} />}
                {/* {orders && orders.map(v => <OrderCard data={v} />)} */}
            </>
            <TextField className={styles.inputMaterial} label="Artista" name="artista" onChange={handleChange} />
            {/* <br />
          <TextField className={styles.inputMaterial} label="País" name="pais" onChange={handleChange} />
          <br />
          <TextField className={styles.inputMaterial} label="Ventas" name="ventas" onChange={handleChange} />
          <br />
          <TextField className={styles.inputMaterial} label="Género" name="genero" onChange={handleChange} />
          <br /><br /> */}
            <div align="right">
                <Button color="primary" onClick={() => peticionGet()}>Insertar</Button>
                <Button onClick={() => abrirCerrarModal()}>Cancelar</Button>
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
                title="Ordenes de los usuarios"
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Editar Artista',
                        onClick: (event, rowData) => seleccionarOrden(rowData.id, "Editar")
                    }
                ]}
                options={{
                    actionsColumnIndex: -1,
                }}
                localization={{
                    header: {
                        actions: "Acciones"
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


















/*
import { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { ordersLoad } from "../../redux/actions";
import OrderCard from '../OrderCard/OrderCard'
// import DataTable from 'react-data-table-component';
import DataTable, { createTheme } from 'react-data-table-component';

createTheme('solarized', {
    text: {
        primary: '#268bd2',
        secondary: '#2aa198',
    },
    background: {
        default: 'white',
    },
    context: {
        background: '#cb4b16',
        text: '#FFFFFF',
    },
    divider: {
        default: '#073642',
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
    },
});


function OrdersTable(props) {
    const [orders, setOrdersLoad] = useState(props);
    // const [editar, setEditar] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const columns = [
        {
            name: '# Orden',
            selector: 'id',
            sortable: true
        },
        {
            name: 'Estado',
            selector: 'estado',
            sortable: true
        },
        {
            name: 'ID Usuario',
            selector: 'user.id',
            sortable: true
        },
        {
            name: 'Nombre',
            selector: 'user.nombre',
            sortable: true
        },
        {
            name: 'Apellido',
            selector: 'user.apellido',
            sortable: true
        },
        {
            name: 'correo',
            selector: 'user.email',
        },
        {
            name: 'Ver Orden',
            cell: () => <button onClick={() => openModal()}>Ver Orden</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];


    const peticionGet = async () => {
        await axios.get("http://localhost:3001/user/orders")
            .then(response => {
                setOrdersLoad(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        peticionGet();
    }, [])

    // const abrirCerrarOrden = () => {
    //     setEditar(!editar);
    // }

    const openModal = () => {
        setShowModal(prev => !prev);
    };

    // const seleccionarOrden = (orders) => {
    //     setOrdersLoad(orders);
    //     abrirCerrarOrden()
    // }


    return (
        <div>
            <DataTable
                columns={columns}
                data={orders}
                title='Ordenes de los usuarios'
                theme="solarized"
            />
            <div>
                { <OrderCard data={orders} /> }
                {orders && orders.map(v => <OrderCard data={v} />)}
            </div>
        </div>
    )
}

/*
const mapStateToProps = (state) => {
    return {
        orders: state.orders,
        categoria: state.categoria
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setOrdersLoad: (orders) => {
            // onOrdersLoad: (orders) => {
            dispatch(ordersLoad(orders))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable)
*/

/*
ARCHIVO ORIGINAL...
import { useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { ordersLoad } from "../../redux/actions";
import OrderCard from '../OrderCard/OrderCard'



function OrdersTable(props) {
    var { orders, onOrdersLoad } = props
    var estado;
    if (props.match) {
        estado = props.match.params.status
    }
    console.log("Status: ", estado)

    useEffect(() => {
        axios.get("http://localhost:3001/user/orders" + (!estado ? "" : `/${estado}`))
            .then(r => {
                onOrdersLoad(r.data)
                console.log(r.data)
            })
            .catch(e => console.log("Error: ", e))
    }, [estado, onOrdersLoad])

    return (
        <div>
            {orders && orders.map(v => <OrderCard data={v} />)}
        </div>
    )
}


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

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable)
*/