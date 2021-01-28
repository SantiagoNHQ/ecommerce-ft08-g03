import React/* , { useState } */ from "react";
import "./SearchBar.css";
import axios from 'axios';
// import {Link} from "react-router-dom";
import { connect } from 'react-redux'
import { searchChange } from "../../redux/actions";


const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (text) => {
        dispatch(searchChange(text))
        }
    }
}

//  *** S7 : Crear Componente Search Bar ***
function SearchBar({search, onSearchChange}) { // search = state.search && dispatch = setState
    //const [input, setInput] = useState ("")

    function buscador (e) {
        e.preventDefault()
        // setInput (e.target.value)
        onSearchChange(e.target.value)
    }
    function submitEnter (e) {
        if (e.key === 'Enter'){
            submit(e)
    }        
    }
    function submit (e) {
        //llamado a la api que retorne los poductos por nombre
        //pasar e.target.value por params
        axios.get("http://localhost:3001/product/busqueda/" + search)
        .then(response => {
            console.log("RESPUESTA: ", response.data)
        })
        .catch(err => {
            console.log("esto es un error" , err)
        })
    }
    return (
            <div className='buscador'>
            <input className='input' onKeyPress={ submitEnter } onChange={ buscador }/>
            <button className='boton' onClick={ submit }></button>
            </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)