import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import './EditarProduct.css'

export default function EditarProducto(props) {
    let history = useHistory()
    const [cards, setCards] = useState({ id: props.id })
    const [imagen, setImagen] = useState(null)

    function product() {
        // console.log("Get: " + "/product/"+props.id)
        axios.get("/product/" + props.id)
            .then(res => {
                console.log("Data de respuesta: ", res.data)
                if (!res.data.img || !(res.data.img.includes("http") || res.data.img.includes("www"))) {
                    setImagen("/upload/" + res.data.img)
                } else setImagen(res.data.img)
                res.data.categories = res.data.categories.map(v => v.nombre)

                setCards((state) => ({ id: res.data.id, productos: res.data/* d */ }))
                axios.get("/category/")
                    .then(res2 => {
                        console.log("Categorias: ", res2.data)
                        setCards((state) => ({ ...state, cats: res2.data }))
                    }).catch(e => console.log("Error: ", e))
            })
    }

    useEffect(() => {
        product()

    }, [])


    function submitEliminar(id) {
        console.log(" ELIMINAR: ", id)
        // var obj = {nombre: p}
        axios.delete("/product/", { data: { id } }
        )
            .then(res => {
                console.log("bien", res)
                history.push("/user/products")
            })
            .catch(err => {
                console.log("mal", err)
            })
    }
    function CambiosEditar(e) {
        //e.preventDefault()
        setCards({
            ...cards, productos: {
                ...cards.productos,
                [e.target.name]: e.target.value
            }
        })
    }

    function submitEditar() {
        axios.put("/product", cards.productos)
            .then(res => {
                console.log("bien", res)
                console.log("STATE EDITAR: ", cards.productos)
                history.push("/user/products")
            })
            .catch(err => {
                console.log("mal", err)
            })
    }

    function checkBox(e) {
        console.log("Checkbox name: ", e.target.checked)
        console.log("Texto: ", e.target.name)
        if (e.target.checked) {
            // onFormChange({ ...formulario, categories: [...formulario.categories, e.target.name] })
            setCards({
                ...cards, productos: {
                    ...cards.productos, categories: [
                        ...cards.productos.categories, e.target.name
                    ]
                }
            })
        } else {
            // onFormChange({ ...formulario, categories: formulario.categories.filter(v => !(v === e.target.name)) })
            setCards({ ...cards, productos: { ...cards.productos, categories: cards.productos.categories.filter(v => !(v === e.target.name)) } })
        }
    }

    return (
        <div className="divEditarProductos">
            {
                cards.productos &&
                <div className='edicion'>
                    <h5>NOMBRE</h5>
                    {/* <h3 className="textoEditar">Actual: <span>{cards.productos.nombre}</span></h3> */}
                    <input className="inputEditar" key={cards.id} type="text" onChange={(e) => CambiosEditar(e)} value={cards.productos.nombre} placeholder="Nombre" name="nombre" />

                    <h5>TIPO</h5>
                    {/* <h3 className="textoEditar">Actual: <span>{cards.productos.tipo}</span></h3> */}
                    <input className="inputEditar" key={cards.id + 1} type="text" onChange={(e) => CambiosEditar(e)} value={cards.productos.tipo} placeholder="Tipo" name="tipo" />

                    <h5>EDAD</h5>
                    {/* <h3 className="textoEditar">Actual:<span>{cards.productos.edad}</span></h3> */}
                    <input className="inputEditar" key={cards.id + 2} type="number" onChange={(e) => CambiosEditar(e)} value={cards.productos.edad} placeholder="Edad" name="edad" />

                    <h5>ELABORACION</h5>
                    {/* <h3 className="textoEditar">Actual: <span>{cards.productos.elaboracion}</span></h3> */}
                    <input className="inputEditar" key={cards.id + 3} type="number" onChange={(e) => CambiosEditar(e)} value={cards.productos.elaboracion} placeholder="Elaboracion" name="elaboracion" />

                    <h5>STOCK</h5>
                    {/* <h3 className="textoEditar">Actual: <span>{cards.productos.stock}</span></h3> */}
                    <input className="inputEditar" key={cards.id + 4} type="number" onChange={(e) => CambiosEditar(e)} value={cards.productos.stock} placeholder="Stock" name="stock" />

                    <h5>PRECIO</h5>
                    {/* <h3 className="textoEditar">Actual: <span>{cards.productos.precio}</span></h3> */}
                    <input className="inputEditar" key={cards.id + 5} type="number" onChange={(e) => CambiosEditar(e)} value={cards.productos.precio} placeholder="Precio" name="precio" />

                    <h5>ORIGEN</h5>
                    {/* <h3 className="textoEditar">Actual: <span>{cards.productos.origen}</span></h3> */}
                    <input className="inputEditar" key={cards.id + 6} type="text" onChange={(e) => CambiosEditar(e)} value={cards.productos.origen} placeholder="Origen" name="origen" />



                    <h5>DESCRIPCION</h5>
                    {/* <h3 className="textoEditar">Actual: <span>{cards.productos.descripcion}</span></h3> */}
                    <input className="inputEditar" key={cards.id + 7} type="text" onChange={(e) => CambiosEditar(e)} value={cards.productos.descripcion} placeholder="Descripcion" name="descripcion" />

                    <h5>CATEGORIAS</h5>
                    {/* <h3 className="textoEditar">Actual: <span>{cards.productos.descripcion}</span></h3> */}
                    {cards.cats && cards.cats.map((pos) => <label title={pos.descripcion}><input
                        onChange={e => checkBox(e)}
                        checked={cards.productos.categories.includes(pos.nombre)}
                        title={pos.descripcion} name={pos.nombre} type="checkbox"></input>{pos.nombre}</label>)}

                    <p></p>
                    <div className='divImagenEditar'>
                        <img alt={cards.productos.nombre} src={imagen} className="imagenEdit"></img>

                    </div>
                    <div className='divBotonesEditar'>
                        <button className="botonEliminar" onClick={() => submitEliminar(cards.productos.id)}>Eliminar</button>
                        <button className="botonListo" onClick={() => submitEditar()}>Listo</button>
                    </div>
                </div>
            }
        </div>


    )
}