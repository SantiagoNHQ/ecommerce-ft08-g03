import React, {useState, useEffect} from "react";
import axios from 'axios';

//  *** S6 : Crear Componente Producto ***
// El Componente Producto es un componente presentacional y debe 
// recibir por `props` los datos definidos en el modelo 
// `Productos`: titulo, descripcion, precio, cantidad, 
// const Product = ({ titulo, descripcion, precio, cantidad}) => { }

export default function Product(props) {

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
        </div>
    )
}

