import axios from "axios";
import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

import {connect} from 'react-redux'
import { addCarrito, changeEditProduct } from "../../redux/actions";

//  *** S10 : Crear Componente ProductCard ***
export function Reviews (props) {
    console.log("ESTAS SON LAS PROPS DE REVIEW", props.id)
    const [reviews, setReviews] = useState()
    
    // useEffect(() => {
    //         axios.get(`http://localhost:3001/product/${}`)
    //         .then (response => {
    //             setReviews(response.data)
    //         })
    //         .catch(err => {
    //             console.log ("ERROR")
    //         })
    // },[props.products])


    return (
        <div>
            {reviews && 
                <div>
                    <h2>Estas son las opiniones de otros compradores</h2>
                    <div>
                            <h3>descripcion: {reviews.descripcion}</h3>
                    </div>
                    <div>
                            <h3>valoracion: {reviews.valoracion}</h3>
                    </div>

                </div>
            }
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        carrito: state.carrito,
        admin: state.logged === "admin",
        products: state.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddCarrito: (text) => {
        dispatch(addCarrito(text))
        },
        onChangeEditProduct: (id) => {
            dispatch(changeEditProduct(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)