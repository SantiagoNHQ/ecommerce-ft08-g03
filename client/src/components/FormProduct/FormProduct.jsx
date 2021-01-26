import React, { /* useState, */ useEffect } from "react";
import "./FormProduct.css";
import axios from 'axios';
import { connect } from 'react-redux'
import { formChange, categoriesLoad } from "../../redux/actions";

const mapStateToProps = (state) => {
    return {
        formulario: state.formulario,
        categoria: state.categoria
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFormChange: (form) => {
            dispatch(formChange(form))
        },
        onCategoriesLoad: (cats) => {
            dispatch(categoriesLoad(cats))
        }
    }
}

function FormProduct({formulario, categoria, onFormChange, onCategoriesLoad}) {
    useEffect(() => {
        axios.get("http://localhost:3001/category/")
        .then(res => {
            console.log("Categorias: ", res.data)
            onCategoriesLoad(res.data)
        }).catch(e => console.log("Error: ", e))
    }, [])
    
    // CHECKBOX
    function checkBox(e) {
        console.log("Checkbox name: ", e.target.checked)
        console.log("Texto: ", e.target.name)
        if (e.target.checked) {
            onFormChange({...formulario, categories: [...formulario.categories, e.target.name]})
        } else {
            onFormChange({...formulario, categories: formulario.categories.filter(v => !(v === e.target.name))})
        }
    }

    // AGREGAR
   function submit(e) {
        axios.post("http://localhost:3001/product/", formulario)
        .then(res => {
            console.log ("bien", res)
        })
        .catch (err => {
            console.log("mal", err)
        })
    }

   function cambios (e){
        e.preventDefault()
        onFormChange({...formulario, [e.target.name]: e.target.value})
    }


    return (

        <div className = 'formularios'>
            <form className = 'agregarProducto' onSubmit={ submit }>
                <h3>Agregar Producto</h3>
                <input key="nombre" type="text" onChange={cambios} placeholder="nombre" name="nombre"/>
                <input key="tipo" type="text" onChange={cambios} placeholder="tipo" name="tipo"/>
                <input key="edad" type="number" onChange={cambios} placeholder="edad" style={{width: 60}} name="edad"/> 
                <input key="elaboracion" type="number" onChange={cambios} placeholder="elaboracion" name="elaboracion"/>
                <input key="stock" type="number" onChange={cambios} placeholder="stock" name="stock"/>
                <input key="precio" type="number" onChange={cambios} placeholder="precio" style={{width: 60}} name="precio"/> 
                <input key="origen" type="text" onChange={cambios} placeholder="origen" style={{width: 60}} name="origen"/> 
                <input key="descripcion" type="text" onChange={cambios} placeholder="descripcion" style={{width: 60}} name="descripcion"/> 

                {categoria && categoria.map((pos) => <label title={pos.descripcion}><input 
                onChange={e => checkBox(e)}
                title={pos.descripcion} name={pos.nombre} type="checkbox"></input>{pos.nombre}</label>)}

                <input type="submit" key="boton" />
            </form>


        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(FormProduct)