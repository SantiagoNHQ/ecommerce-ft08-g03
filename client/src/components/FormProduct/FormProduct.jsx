import React, { useState, useEffect } from "react";
import "./FormProduct.css";
import axios from 'axios';

export default function FormProduct(props) {
 
    const [state, setState] = useState({arrayCheckBox: [], formulario: {categories: []}})
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
    
// Ahora armense de paciencia hasta que me abra el server de nuevo :V
    // CHECKBOX
    function checkBox(e) {
        console.log("Checkbox name: ", e.target.checked)
        console.log("Texto: ", e.target.name) // AHORA SI!
        //console.log("Texto: ", e.target.innerText)
        if (e.target.checked) {
            setState({...state, arrayCheckBox: [...state.arrayCheckBox, e.target.name] , formulario: {...state.formulario, categories: [...state.arrayCheckBox, e.target.name]}})
        } else {
            //arrayCheckBox = arrayCheckBox.filter(v => v == e.target.name)
            setState({...state, arrayCheckBox: state.arrayCheckBox.filter(v => !(v === e.target.name)), formulario: {...state.formulario, categories: state.arrayCheckBox.filter(v => !(v === e.target.name))}})
        }
    }

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

                {state.categoria && state.categoria.map((pos) => <label title={pos.descripcion}><input 
                onChange={e => checkBox(e)}
                title={pos.descripcion} name={pos.nombre} type="checkbox"></input>{pos.nombre}</label>)}

                <input type="submit" key="boton" />
            </form>

        </div>
    )
}

