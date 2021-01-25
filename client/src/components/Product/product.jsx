import React, { useState, useEffect } from "react";
import axios from "axios";
import {Card, Container, Row, Col} from 'react-bootstrap'


//  *** S6 : Crear Componente Producto ***
// El Componente Producto es un componente presentacional y debe 
// recibir por `props` los datos definidos en el modelo 
// `Productos`: titulo, descripcion, precio, cantidad, 
// const Product = ({ titulo, descripcion, precio, cantidad}) => { }

export default function Product(props) {
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
                <h3 className='name'>{product.nombre}</h3>
                <p>{product.precio}</p>
                <img className='productImg' src={product.img} alt="img" />

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
        </div>
    )
}

