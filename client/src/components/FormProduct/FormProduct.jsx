import React, { useState, useEffect } from "react";
import "./FormProduct.css";
import axios from 'axios';

export default function FormProduct(props) {
 
    const [state, setState] = useState({})
    useEffect(() => {
        function category () {
        axios.get("http://localhost:3001/category/")
        .then(res => 
            {
                console.log(res.data)
            setState((estado) => ({...estado, categoria: res.data}))
            }
            )}
            
        category()
    }, [])
//     useEffect(() => {
//     const fetchBusinesses = () => {
//        return fetch("theURL", {method: "GET"}
//     )
//       .then(res => normalizeResponseErrors(res))
//       .then(res => {
//         return res.json();
//       })
//       .then(rcvdBusinesses => {
//         // some stuff
//       })
//       .catch(err => {
//         // some error handling
//       });
//   };
//   fetchBusinesses();
// }, []);
    // AGREGAR
   function submit(e) {
        console.log()
        axios.post("http://localhost:3001/product/", state.formulario)
        .then(res => {
            console.log ("bien", res)
        })
        .catch (err => {
            console.log("mal", err)
        })
    }

   function cambios (e){
        e.preventDefault()
        console.log("ACA ESTOY" ,e)
        setState({...state, formulario: {...state.formulario, [e.target.name]: e.target.value}})
        
    }
    //========================

    // ELIMINAR
    function CambiosEliminar(e){
        e.preventDefault()
        console.log("Aca estoy!!!" ,e)
        setState({...state, eliminar: {nombre: e.target.value}})
    }

    function submitEliminar(e) {
        console.log("STATE ELIMINAR: ", state.eliminar)
        axios.delete("http://localhost:3001/product", {
            data: state.eliminar
        })
        .then(res => {
            console.log ("bien", res)
        })
        .catch (err => {
            console.log("mal", err)
        })
    }
    //=======================

    // BUSCAR
    function CambiosBuscar(e){
        e.preventDefault()
        setState({...state, searchProduct: {nombre: e.target.value}})
    }

    function submitBuscar(e) {
        e.preventDefault()
        console.log("STATE BUSCAR: ", state.searchProduct)
        axios.get("http://localhost:3001/product/" + state.searchProduct.nombre)
        .then(res => {
            let {id, nombre, descripcion, stock, precio, tipo, edad, elaboracion, origen} = res.data[0]
            setState({...state, foundProduct: true, 
                editProduct: {
                    id, nombre, descripcion, stock, precio, tipo, edad, elaboracion, origen
            }})
        })
        .catch (err => {
            console.log("mal", err)
        })
    }
    //=====================

    // EDITAR
    function CambiosEditar(e){
        e.preventDefault()
        setState({...state, editProduct: {...state.editProduct, [e.target.name]: e.target.value}})
    }

    function submitEditar(e) {
        console.log("STATE EDITAR: ", state.editProduct)
        axios.put("http://localhost:3001/product", state.editProduct)
        .then(res => {
            console.log ("bien", res)
        })
        .catch (err => {
            console.log("mal", err)
        })
    }
    //=====================

    return (
        <div>
            <form onSubmit={ submit }>
                <input key="nombre" type="text" onChange={cambios} placeholder="nombre" name="nombre"/>
                <input key="tipo" type="text" onChange={cambios} placeholder="tipo" name="tipo"/>
                <input key="edad" type="number" onChange={cambios} placeholder="edad" style={{width: 30}} name="edad"/> 
                <input key="elaboracion" type="number" onChange={cambios} placeholder="elaboracion" name="elaboracion"/>
                <input key="stock" type="number" onChange={cambios} placeholder="stock" name="stock"/>
                <input key="precio" type="number" onChange={cambios} placeholder="precio" style={{width: 30}} name="precio"/> 
                <input key="origen" type="text" onChange={cambios} placeholder="origen" style={{width: 30}} name="origen"/> 
                <input key="descripcion" type="text" onChange={cambios} placeholder="descripcion" style={{width: 30}} name="descripcion"/> 
                <datalist id="categorias">
                {state.categoria && state.categoria.map((v)=> <option key={v.nombre} value={v.nombre}/>)}
                </datalist>
                <input key="categoria" list="categorias" placeholder='categoria'/>
                <input type="submit" key="boton" />
            </form>
            <h3>Eliminar</h3>

            <form onSubmit={ submitEliminar }>
                <input key="nombre" type="text" onChange={CambiosEliminar} placeholder="nombre" name="nombre"/>
                <input type="submit" key="boton" />
            </form>
            <h3>Buscar para editar</h3>
            <form onSubmit={ submitBuscar }>
                <input key="nombre" type="text" onChange={CambiosBuscar} placeholder="Busca por el nombre del producto" name="nombre"/>
                <input type="submit" key="boton" />
            </form>
            <h3>Editar</h3>
            {state.foundProduct && 
            <form onSubmit={ submitEditar }>
                <input key="nombre" type="text" onChange={CambiosEditar} value={state.editProduct.nombre} placeholder="nombre" name="nombre"/>
                <input key="tipo" type="text" onChange={CambiosEditar} value={state.editProduct.tipo} placeholder="tipo" name="tipo"/>
                <input key="edad" type="number" onChange={CambiosEditar} value={state.editProduct.edad} placeholder="edad" style={{width: 30}} name="edad"/> 
                <input key="elaboracion" type="number" onChange={CambiosEditar} value={state.editProduct.elaboracion} placeholder="elaboracion" name="elaboracion"/>
                <input key="stock" type="number" onChange={CambiosEditar} value={state.editProduct.stock} placeholder="stock" name="stock"/>
                <input key="precio" type="number" onChange={CambiosEditar} value={state.editProduct.precio} placeholder="precio" style={{width: 30}} name="precio"/> 
                <input key="origen" type="text" onChange={CambiosEditar} value={state.editProduct.origen} placeholder="origen" style={{width: 30}} name="origen"/> 
                <input key="descripcion" type="text" onChange={CambiosEditar} value={state.editProduct.descripcion} placeholder="descripcion" style={{width: 30}} name="descripcion"/> 
                <input type="submit" key="boton" />
            </form>}
        </div>
    )
}

