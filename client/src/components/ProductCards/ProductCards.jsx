// import React, { useEffect, useState } from "react";
import React, {useEffect, useState} from "react";
import "./ProductCards.css";
import ProductCard from "../ProductCard/ProductCard.jsx"
import axios from "axios";
import { connect } from 'react-redux'
import { productsLoad } from "../../redux/actions";

const mapStateToProps = (state) => {
  return {
      search: state.searchFilter,
      products: state.products,
      filtrarCategoria: state.filtrarCategoria
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onProductsLoad: (products) => {
          dispatch(productsLoad(products))
      }
  }
}

function ProductCards({search, products, filtrarCategoria, onProductsLoad}) {
  //const [cards , setCards] = useState([]) ahora es products
  console.log("Productos: ", products)

  const [state, setState] = useState()

  useEffect(() => {
    /* axios.get(`/product`)
    .then(r => setCards(r.data)).catch(e => console.log("ERROR: ", e)) */
    let ruta = ""
    if (search) ruta = "http://localhost:3001/product/busqueda/"+search
    else ruta = "http://localhost:3001/product"

    axios.get(ruta /* + !search ? `` : `/busqueda/${search}` */
    ).then(r => {
      // Iterar sobre r y filtrar por categoría
      
      if (filtrarCategoria) {
        axios.get("/product/categoria/"+filtrarCategoria)
        .then(rr => {
          // Data es la categoria
          let data = rr.data
          // data = data.filter(v => categoria === v.nombre)[0].id
          // console.log("Id cat: ", data)
          // console.log("R: ", r)
          
          // r = r.data.filter(v => {
          //   for (var i = 0; i < v.categories.length; i++) {
          //     if (v.categories[i].id === data) return true
          //   }
          //   return false
          // })
          console.log("R filtrado por categoria: ", rr.data[0].products)
          // HAY QUE ACCEDER A .PRODUCTS
          //setCards(r)
          onProductsLoad(rr.data[0].products)
        }).catch(err => console.log("Axios err: ", err))
        
      }
      
      //setCards(r.data)
      onProductsLoad(r.data)
    }).catch(e => console.log("NO RESOLVIÓ: ", e))
    axios.get("/category/")
    .then(respuesta => {
        setState(respuesta.data)
        console.log("CATEGORIAS", respuesta.data)
    })
  }, [filtrarCategoria, search, onProductsLoad])

  return  (
    <div /*className='div-general-app'*/>
      <div className='divcards'>
      {/* <form>
            <div >
                <div  >
                    {state && state.map(pos => {
                             <div>
                                <option value={pos.nombre}>{pos.nombre}</option>
                            </div>

                    }
                    )}
                </div>
            </div>
        </form> */}
      {/* {
        (categoria || search) && <div>Filtrando por: <br/>
        - Busqueda: {search} <br/>
        - Categoria: {categoria} </div>
      } */}
      {
        products && products.map(p => 
          <div key={p.id} /*className='div-productos'*/>
            <ProductCard id={p.id} nombre={p.nombre} descripcion={p.descripcion} stock={p.stock} precio={p.precio} img={p.img} />
          </div>
        )
      }
      </div>

      <div className='nuevo-div'>
        <div className='div-img-dada'>
        <img src="https://image.flaticon.com/icons/png/512/88/88271.png" alt="img" />
          <div className='div-texto-dada'>
            <h1>Contactanos</h1>
              <div className='divReserva'>
            <p>Reserve su plaza para visitas guiadas por nuestros campos de cultivos y cata de nuestra mejor reserva</p>
            </div>
            <div className='divContactos'>
            <p>wearewine<span>@</span>drinks.com</p>
            <p>/</p>
            <p>(<span>351</span>) 173-4965</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCards)