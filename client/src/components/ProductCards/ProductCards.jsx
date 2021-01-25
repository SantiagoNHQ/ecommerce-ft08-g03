// import React, { useEffect, useState } from "react";
import React, {useState, useEffect} from "react";
import "./ProductCards.css";
//import axios from 'axios';
import ProductCard from "../ProductCard/ProductCard.jsx"
import axios from "axios";

export default function ProductCards(props) {
  const [cards , setCards] = useState([])
  console.log("TEST: ", props)

  useEffect((promesita = props.data, categoria = props.categoria) => {

    /* axios.get(`http://localhost:3001/product`)
    .then(r => setCards(r.data)).catch(e => console.log("ERROR: ", e)) */

    promesita.then(r => {
      // Iterar sobre r y filtrar por categoría

      if (categoria) {
        axios.get("http://localhost:3001/category").then(rr => {
          // Data es la categoria
          let data = rr.data
          data = data.filter(v => categoria === v.nombre)[0].id
          console.log("Id cat: ", data)
          console.log("R: ", r)

          r = r.data.filter(v => {
            for (var i = 0; i < v.categories.length; i++) {
              if (v.categories[i].id == data) return true
            }
            return false
          })
          console.log("R filtrado por categoria: ", r)
          setCards(r)
        }).catch(err => console.log("Axios err: ", err))
        
      }

      setCards(r.data)
    }).catch(e => console.log("NO RESOLVIÓ: ", e))
  }, [props.data, props.categoria])

  return  (
    <div className='div-producto'>
        { cards && cards.map(p => 
          <ProductCard key ={p.id} nombre={p.nombre} descripcion={p.descripcion} stock={p.stock} precio={p.precio} img={p.img} />
          )}
          <div className='nuevo-div'>
            <div className='div-img-dada'>
              <img src="https://lh3.googleusercontent.com/proxy/9RQZK6buVg98yHwVq2eDf82bjjzcziVP4im3F-CJAfHdYeWuI1r_Gjo1-fxI_NqXL81lZqt-WbFsvxuJ3ch9pXvi2Ru4GEJv5yo" />
            </div>
          </div>
    </div>
  )
}