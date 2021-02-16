import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from 'styled-components';

const ReviewsDiv = styled.div`
font-family: "Poiret One", cursive;
color: maroon;
padding: 10px;
// box-shadow: 1px 1px 0px hsl(33,42%,40%);
width: 70%;

`;

const Reviewsp = styled.h6`
margin-left: 2rem;
margin-top: 0;
margin-bottom: 0;
font-size: 1.5em;
color: black;
`;

const DivA = styled.div`
// background-color: #ac9b8e;
margin-bottom: 5px;
`;


//  *** S10 : Crear Componente ProductCard ***
export function Reviews(props) {
    const [review, setReview] = useState([])

    let avoidWarnings = () => {
        axios.get("http://localhost:3001/product/" + props.id + "/review")
            .then(response => {
                console.log("Hola es Armando :", response.data);
                setReview(response.data)

            })
            .catch(err => {
                console.log("ERROR")
            })
    }

    useEffect(() => {
        avoidWarnings()
    }, [])


    return (
        <ReviewsDiv>
            {!review[0] && <h3>No hay reviews para este producto.</h3>}
            <h2 >Lo que opinan los clientes...</h2>
            <hr></hr>
            {review && review.map((pos) =>
                <DivA>
                    <Reviewsp>-{pos.user.nombre} {pos.user.apellido}: {pos.descripcion}</Reviewsp>
                    <Reviewsp>-calificacion: {pos.calificacion} {'estrellas...'}</Reviewsp>
                    <hr></hr>
                </DivA>
            )
            }
        </ReviewsDiv>
    )
}
