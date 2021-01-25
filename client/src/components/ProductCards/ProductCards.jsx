// import React, { useEffect, useState } from "react";
import React, {useState/* , useEffect */} from "react";
import "./ProductCards.css";
//import axios from 'axios';
import ProductCard from "../ProductCard/ProductCard.jsx"

export default function ProductCards(props) {
  const [cards , setCards] = useState([])
  
  props.data.then(r => {
    console.log("RESOLVIÓ: ", r)
    setCards(r.data)
  }).catch(e => console.log("NO RESOLVIÓ: ", e))

  /* useEffect(() => {
    /* async function obtenerData () {
      const result = await axios.get(`http://localhost:3001/product`)
    
      setCards(result.data)
    }
    obtenerData() /

    axios.get(`http://localhost:3001/product`)
    .then(r => setCards(r.data)).catch(e => console.log("ERROR: ", e))
  }, []) */

  return  (
    <div>
        { cards && cards.map(p => 
          <ProductCard key ={p.id} nombre={p.nombre} descripcion={p.descripcion} stock={p.stock} precio={p.precio} img={p.img} />
        )}
    </div>
  )
}