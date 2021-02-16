import React, { useState, useEffect } from "react";
import "./SearchBar.css";
// import axios from 'axios';
import { connect } from 'react-redux'
import { searchChange, searchClick, categoriesFilter } from "../../redux/actions";
import {useHistory} from 'react-router-dom'
import axios from "axios";


const mapStateToProps = (state) => {
    return {
        search: state.search,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (text) => {
            dispatch(searchChange(text))
        },
        onSearchClick: (text) => {
            dispatch(searchClick(text))
        },
        onCategoria: (text)=> {
            dispatch(categoriesFilter(text))
        }
    }
}

//  *** S7 : Crear Componente Search Bar ***
function SearchBar({search, onSearchChange, onSearchClick, onCategoria}) { // search = state.search && dispatch = setState
    const [list, setList] = useState (false)
    const [state, setState] = useState()
    let history = useHistory()

    useEffect(() => {
        axios.get("http://localhost:3001/category/")
        .then(respuesta => {
            setState(respuesta.data)
            console.log("CATEGORIAS", respuesta.data)
        })
    },[])

    // function showCheckboxes() {
    //     var checkboxes = document.getElementById("checkboxes");
    //     if (!list) {
    //       checkboxes.style.display = "block";
    //       setList(true);
    //     } else {
    //       checkboxes.style.display = "none";
    //       setList(false);
    //     }
    // }

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
        /* axios.get("http://localhost:3001/product/busqueda/" + search)
        .then(response => {
            console.log("RESPUESTA: ", response.data)
        })
        .catch(err => {
            console.log("esto es un error" , err)
        }) */
        onSearchClick(search)
        history.push("/user/products")
    }
    function categorias(e){
        console.log("hola", e.target.value)
        onCategoria(e.target.value)
        
    }
    
    return (
        <div className='buscador'>
                <input className='input' onKeyPress={ submitEnter } placeholder="Buscar..." onChange={ buscador }/>
            <form className='formCategorias'>
                <select onChange={(e)=> categorias(e)} name="categorias">
                <option >Todas las categorias </option>
                    {state && state.map(pos =>
                        <option key={pos.id} value={pos.nombre}>
                        {pos.nombre}
                        </option>
                    )}
                </select>
            </form>
        </div>
)
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
{/* <div className="overSelect"></div>
</div>
<div id="checkboxes">
<label htlmfor="one">
    <input type="checkbox" id="one" />First checkbox
</label>
<label htlmfor="two">
    <input type="checkbox" id="two" />Second checkbox</label>
<label htlmfor="three">
    <input type="checkbox" id="three" />Third checkbox</label> */}