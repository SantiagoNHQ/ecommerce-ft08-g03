<<<<<<< HEAD
import React, {useState, useEffect} from "react";
import axios from 'axios';
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import {Card, Container, Row, Col} from 'react-bootstrap'

>>>>>>> 02f9c41fffbb314b556a57f444b71dece0af441e

//  *** S6 : Crear Componente Producto ***
// El Componente Producto es un componente presentacional y debe 
// recibir por `props` los datos definidos en el modelo 
// `Productos`: titulo, descripcion, precio, cantidad, 
// const Product = ({ titulo, descripcion, precio, cantidad}) => { }

export default function Product(props) {
<<<<<<< HEAD

    // https://stackoverflow.com/questions/44318631/how-get-the-value-of-match-params-id-on-react-router#:~:text=Just%20create%20constructor%20i.e%20constructor,hope%20it%20solves%20your%20problem.
    let prodId = parseInt(props.match.params.id);

    const [prod, setProd] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/products/${prodId}`)
            .then(res => {
                console.log(res.data)
                setProd([res.data])
            })
            .catch(err => {
                console.log(err)
            })
    },)


    return (
        <div>
            <h3 className='name'>{prod.nombre}</h3>
            <p>{prod.precio}</p>
            <img  src={props.img} alt="img" />
=======
    const [product, setProduct] = useState(null)
    var id2 = props.match.params.id

    useEffect((id = id2) => {
        axios.get("http://localhost:3001/product/"+id).then(r => {
        setProduct(r.data)
        console.log("Respondió: ", r.data)
        }).catch(e => console.log("Error: ", e))
      }, [id2])

    return (
        <div>
            {product && <div>
                <h3 className='name'>{props.nombre}</h3>
                <p>{props.precio}</p>
                <img className='productImg' src={props.img} alt="img" />
                {/*ACA ESTABA JUGANDO CON BOOTSTRAP*/}
                <Card style={{width: "100%", height: "400px"}}>
                    <Container fluid>
                        <Row className="justify-content-center" style={{backgroundColor: "green"}}>
                        <Col variant="warning" className="justify-content-center">test</Col>
                        </Row>
                    </Container>
                </Card>
            </div>}

            {!product && <div>
                <h3>CARGANDO...</h3>
            </div>}
>>>>>>> 02f9c41fffbb314b556a57f444b71dece0af441e
        </div>
    )
}

