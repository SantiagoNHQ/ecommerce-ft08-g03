import axios from "axios";
import React, { useState, useEffect } from "react";
import './Review.css'


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
        <div className='review'>
            {!review[0] && <h2>No hay reviews para este producto.</h2>}
            <h3 >Lo que opinan los clientes...</h3>
            {review && review.map((pos) =>
                <div className>
                    -{pos.user.nombre} {pos.user.apellido}: {pos.descripcion}
                    -calificacion: {pos.calificacion} {'estrellas...'}
                </div>)
            }
        </div>
    )
}
