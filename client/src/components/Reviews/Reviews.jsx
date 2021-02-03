import axios from "axios";
import React, {useState, useEffect} from "react";

//  *** S10 : Crear Componente ProductCard ***
export function Reviews (props) {
    const [review, setReview] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/product/"+props.id+"/review")
            .then (response => {
                setReview(response.data)
            })
            .catch(err => {
                console.log ("ERROR")
            })
        },[]
    )

    return (
        <div>
            {!review[0] && <h3>No hay reviews para este producto.</h3>}
            {review && review.map((pos) => 
                <div>
                    <h1>descripcion: {pos.descripcion}</h1>
                    <h1>calificacion: {pos.calificacion}</h1>
                </div>
                ) 
            }
        </div>
    )
}
