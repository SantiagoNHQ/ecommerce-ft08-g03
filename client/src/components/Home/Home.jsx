// import React, { useState, useEffect } from "react";
// import { categoriesFilter } from "../../redux/actions";
// import { connect } from 'react-redux'


import ProductCards from '../ProductCards/ProductCards'
import './Home.css'
import axios from 'axios'


export default function Home() {
    return (
        <div>
            <header className='header'>
                <section className="textos-header">
                    <h1>We<span>Are</span>Wine</h1>
                    <h2>Vinos <span>Nacionales</span> e <span>Internacionales</span></h2>
                </section>
                {/* <div style={({ height: "150px" }, { overflow: "hidden" })}>
                <svg
                viewBox="0 0 500 150"
                preserveAspectRatio="none"
                style={({ height: "100%" }, { width: "100%" })}
                >
                <path
                    d="M-20.04,-25.34 C100.16,251.92 303.88,-23.36 552.76,74.31 L500.00,149.98 L0.00,149.98 Z"
                    style={({ stroke: "none" }, { fill: "#08f" })}
                ></path>
                </svg>
            </div> */}
            </header>

            <ProductCards data={axios.get(`http://localhost:3001/product`)} />
        </div>
    )
}

// const mapStateToProps = (state) => {
//     return {
//         search: state.search,
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onCategoria: (text) => {
//             dispatch(categoriesFilter(text))
//         }
//     }
// }

// function Home(onCategoria) {
//     const [state, setState] = useState()

//     useEffect(() => {
//         axios.get("http://localhost:3001/category/")
//             .then(respuesta => {
//                 setState(respuesta.data)
//                 console.log("CATEGORIAS", respuesta.data)
//             })
//     }, [])


//     function categorias(e) {
//         console.log("hola", e.target.value)
//         onCategoria(e.target.value)

//     }

//     return (
//         <div>
//             <header className='header'>
//                 <section className="textos-header">
//                     <h1>We<span>Are</span>Wine</h1>
//                     <h2>Vinos <span>Nacionales</span> e <span>Internacionales</span></h2>
//                 </section>
//             </header>
//             <form >
//                 <select onChange={(e) => categorias(e)} name="categorias">
//                     <option >Todas las categorias </option>
//                     {state && state.map(pos =>
//                         <option key={pos.id} value={pos.nombre}>
//                             {pos.nombre}
//                         </option>
//                     )}
//                 </select>
//             </form>
//             <ProductCards data={axios.get(`http://localhost:3001/product`)} />
//         </div>
//     )
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home)
