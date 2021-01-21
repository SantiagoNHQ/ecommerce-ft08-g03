// import React, { useEffect, useState } from "react";
import React from "react";
import "./ProductCards.css";
import axios from 'axios';
import ProductCard from "../ProductCard/ProductCard.jsx"

// export default function ProductCards (props) {
    // const [respuesta, setRespuesta] = useState([])
    // var id = 0
    //var mapeado = "TEST";
    // async function cardsP = () {} 
    // axios.get("http://localhost:3001/product")
    // .then(response => {
    //     // console.log("Respuesta:", response.data)
    //     // mapeado = response.data.map(p => <ProductCard nombre={p.nombre} descripcion={p.descripcion}
    //     //     stock={p.stock} precio={p.precio} />)
    //     // console.log("MAP: ", mapeado)
    //     // setRespuesta(mapeado)
    //     setRespuesta([response.data])
    // })
    
    // .catch(err => {
    //     console.log("Error: ", err)
    // })
    // var algo;
    // useEffect(() => {
    //     axios.get("http://localhost:3001/product")
    //     .then(res => {
    //         const cardrss = res.data;
    //         algo= cardrss
    //       })
    // },)

    // return (
    //     <div>
    //         {/* {algo.length && algo.map(p =>  */}
    //         <ProductCards  nombre={p.nombre} descripcion={p.descripcion}
    //         stock={p.stock} precio={p.precio} /> )
    //     </div>
    // )
// }
// }


export default class ProductCards extends React.Component {
  state = {
    cards: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/product`)
      .then(res => {
        const cards = res.data;
        this.setState({ cards });
      })
  }

 render(){
     return (
        <div>
            { this.state.cards.map(p => 
            <div key={p.id}>
                <ProductCard key ={p.id} nombre={p.nombre} descripcion={p.descripcion} stock={p.stock} precio={p.precio} />
            </div>
            )}
        </div>
    )
    }
}


































