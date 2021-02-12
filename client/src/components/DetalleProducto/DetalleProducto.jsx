import axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Reviews } from "../Reviews/Reviews";

//  En este componente vamos a trabajar con styled-component
//  Hacer npm install --save styled-components
import styled from 'styled-components'

const DivContN1 = styled.div`
display: flex;
justify-content: center;
height: 1200px;
background-color: white;
background-image: url("https://i.postimg.cc/VNGVXRjF/wood-4466.jpg");
background-repeat: no-repeat;
background-size: 100% 100%;
// opacity: 0.6;
`
const DivContN2 = styled.div`
margin-top: 2%;
width: 60%;
// border: 1px solid black;
// background-image: url("https://i.postimg.cc/VNGVXRjF/wood-4466.jpg");
background-repeat: no-repeat;
background-size: 100% 100%;
// background-color: #faebd7;

`
const DivContColumns = styled.div`
    display: flex;
    align-items: center;
`;
const DivContTitImg = styled.div`
    margin: 1rem;
`;
const DivCenter = styled.div`
    display: flex;
    justify-content: center;
`;
const Title = styled.h1`
    font-family: "Amatic SC", cursive;
    color: black;
    font-size: 3em; 
    margin-bottom: 0;
    text-decoration: underline;
`;

const Imagen = styled.img`
    margin-top: 2%;         
    width: 80%;
    height: 60%; 
    // border: 1px solid black;
    opacity: 0.6;

`;

const DivContDescrip = styled.div`
    margin: 1rem;
    width: 70%;
    font-size: 1.2em;
    font-family: "Poiret One", cursive;
    color: maroon;
    padding-right: 5%;
`;

// const ReviewsDiv= styled.div`
//     font-family: "Poiret One", cursive;
//     color: maroon;
// `;

//  *** S10 : Crear Componente ProductCard ***

function DetalleProducto(props) {
    var id = props.match.params.id
    const [producto, setProducto] = useState(null)
    const [imagen, setImagen] = useState(null)

    function avoidWarnings() {
        if (!producto) axios.get(`http://localhost:3001/product/${id}`)
            .then(response => {
                console.log(response)
                setProducto(response.data)
                if (!response.data.img || !(response.data.img.includes("http") || response.data.img.includes("www"))) {
                    setImagen("http://localhost:3001/upload/" + response.data.img)
                } else setImagen(response.data.img)
            })
            .catch(err => {
                console.log("ERROR")
            })
    }

    useEffect(() => avoidWarnings(), [])


    return (
        <DivContN1>
            <DivContN2>
                {!producto && <h1>CARGANDO...</h1>}
                {producto &&
                    <DivContColumns>
                        <DivContTitImg>
                            <Title>{producto.nombre}</Title>
                            <DivCenter>
                                <Imagen alt={producto.nombre} src={imagen}></Imagen>
                            </DivCenter>
                        </DivContTitImg>
                        <DivContDescrip>
                            {/* <h4 className='precioP'><span>$</span>{producto.precio}</h4> */}
                            {/* <h3 className='stock'><span>Stock:</span> {producto.stock}</h3>  */}
                            <h3>{producto.descripcion}</h3>
                            {/* <h3><span>elaboracion:</span> {producto.elaboracion}</h3>
                            <h3><span>origen:</span> {producto.origen}</h3>
                            <h3><span>tipo:</span> {producto.tipo}</h3>
                            <h3><span>edad:</span> {producto.edad}</h3> */}
                        </DivContDescrip>
                    </DivContColumns>
                }
                <Reviews id={id} />
            </DivContN2>
            {/* <ReviewsDiv> */}
            {/* </ReviewsDiv> */}
        </DivContN1>
    )
}
const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(DetalleProducto)