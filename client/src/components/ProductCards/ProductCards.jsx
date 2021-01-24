// import React, { useEffect, useState } from "react";
import React, {useState, useEffect} from "react";
import "./ProductCards.css";
import axios from 'axios';
import ProductCard from "../ProductCard/ProductCard.jsx"

export default function ProductCards() {
  const [cards , setCards] = useState([])

  useEffect(() => {
    /* async function obtenerData () {
      const result = await axios.get(`http://localhost:3001/product`)
    
      setCards(result.data)
    }
    obtenerData() */

    axios.get(`http://localhost:3001/product`)
    .then(r => setCards(r.data))
    .catch(e => console.log("ERROR: ", e))
  }, [])

  return  (
    <div>
        { cards.map(p => 
          <ProductCard key ={p.id} nombre={p.nombre} descripcion={p.descripcion} stock={p.stock} precio={p.precio} />
        )}
    </div>
  )
}

/* export default class ProductCards extends React.Component {
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
} */


































