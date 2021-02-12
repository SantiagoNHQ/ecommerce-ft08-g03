import React, { useState } from "react";
import "./SearchBar.css";
// import axios from 'axios';
import { connect } from 'react-redux'
import { searchChange, searchClick } from "../../redux/actions";
import {useHistory} from 'react-router-dom'


const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (text) => {
            dispatch(searchChange(text))
        },
        onSearchClick: (text) => {
            dispatch(searchClick(text))
        }
    }
}

//  *** S7 : Crear Componente Search Bar ***
function SearchBar({search, onSearchChange, onSearchClick}) { // search = state.search && dispatch = setState
    const [list, setList] = useState (false)
    let history = useHistory()

    function showCheckboxes() {
        var checkboxes = document.getElementById("checkboxes");
        if (!list) {
          checkboxes.style.display = "block";
          setList(true);
        } else {
          checkboxes.style.display = "none";
          setList(false);
        }
    }

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
    return (
        <div className='buscador'>
        <input className='input' onKeyPress={ submitEnter } placeholder="     Buscar..." onChange={ buscador }/>
        <button className='boton' onClick={ submit }></button>
        {/* <form>
            <div className="multiselect">
                <div className="selectBox" onClick={showCheckboxes}>
                <select>
                    <option>Categorias</option>
                </select>
                <div className="overSelect"></div>
                </div>
                <div id="checkboxes">
                <label htlmfor="one">
                    <input type="checkbox" id="one" />First checkbox</label>
                <label htlmfor="two">
                    <input type="checkbox" id="two" />Second checkbox</label>
                <label htlmfor="three">
                    <input type="checkbox" id="three" />Third checkbox</label>
                </div>
            </div>
        </form> */}
        </div>
)
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)