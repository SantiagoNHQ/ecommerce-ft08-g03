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
    }, [onCategoriesLoad])
    
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
        e.preventDefault()
        console.log("Click!")
        // Agregar el producto
        let boton = document.getElementById("boton")
        boton.disabled = true
        console.log("Boton: ", boton)
        axios.post("http://localhost:3001/product/", formulario)
        .then(res => {
            console.log ("Producto agregado")
            // Subir la imagen
            if (formulario.file) {
                var extension = formulario.file.name.split(".")
                console.log("Extension: ", extension[extension.length-1])
                //var help = formulario.file.name = formulario.nombre + "." + extension
                var formData = new FormData();
                formData.append('file', formulario.file, formulario.nombre + "." + extension[extension.length-1])//new File([formulario.file], formulario.nombre + ".jpg"))
                //formData.append('name', "file")
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                //return  post(url, formData,config)

                axios.post("http://localhost:3001/upload", formData, config).then(r => console.log("Se subió: ", r)).catch(e => console.log("No se subió: ", e))
            }
            boton.disabled = false
            onFormChange({formulario: null})
            document.getElementById("nombre").value = ""
            document.getElementById("descripcion").value = ""
            document.getElementById("origen").value = ""
            document.getElementById("tipo").value = ""
            document.getElementById("elaboracion").value = ""
            document.getElementById("edad").value = ""
            document.getElementById("stock").value = ""
            document.getElementById("precio").value = ""
            document.getElementById("imagen").value = ""
            console.log("FILE: ", document.getElementById("file"))
            document.getElementById("file").value = []
            alert("Producto agregado correctamente!")
        })
        .catch (err => {
            console.log("mal", err)
            boton.disabled = false
        })
    }

   function cambios (e){
        e.preventDefault()
        console.log("Form: ", formulario)
        if (e.target.name === "file") {
            if (e.target.files[0]) {
                let extension = e.target.files[0].name.split(".")
                extension = extension[extension.length-1]
                onFormChange({...formulario, [e.target.name]: e.target.files[0], fileShow: URL.createObjectURL(e.target.files[0]),
                img: formulario.nombre + "." + extension})
                document.getElementById("imagen").style.display = "none"
            }
            else {
                onFormChange({...formulario, [e.target.name]: null, fileShow: null})
                document.getElementById("imagen").style.display = "initial"
            }
        }
        else onFormChange({...formulario, [e.target.name]: e.target.value})
    }


    return (

        <div className = 'formularios'>
            <form className = 'agregarProducto' onSubmit={ submit } encType="multipart/form-data">
                <h3>Agregar Producto</h3>
                <input key="nombre" type="text" onChange={cambios} placeholder="Nombre del producto" id="nombre" name="nombre"/>
                <input key="descripcion" type="text" onChange={cambios} placeholder="Descripción" id="descripcion" name="descripcion"/>
                <input key="origen" type="text" onChange={cambios} placeholder="Lugar de origen" id="origen" name="origen"/>
                <input key="tipo" type="text" onChange={cambios} placeholder="Tipo" id="tipo" name="tipo"/>
                <input key="elaboracion" type="number" onChange={cambios} placeholder="Fecha de elaboración" id="elaboracion" name="elaboracion"/>
                <input key="edad" type="number" onChange={cambios} placeholder="Edad de maduración" id="edad" name="edad"/>
                <input key="stock" type="number" onChange={cambios} placeholder="Stock" id="stock" name="stock"/>
                <input key="precio" type="number" onChange={cambios} placeholder="Precio" id="precio" name="precio"/>
                <input key="img" type="text" onChange={cambios} placeholder="Link a una imagen o..." id="imagen" name="img"/>
                <input key="file" type="file" onChange={cambios} id="file" name="file"/>

                {categoria && categoria.map((pos) => <label title={pos.descripcion}><input 
                onChange={e => checkBox(e)}
                title={pos.descripcion} name={pos.nombre} type="checkbox"></input>{pos.nombre}</label>)}
                
                {(() => {
                    if (formulario.img && !formulario.file) return <img src={formulario.img} alt="img" style={{width: "200px", height:"200px", marginBottom:"10px"}}/>
                    else if (formulario.file) return <img src={formulario.fileShow} alt="img" style={{width: "200px", height:"200px", marginBottom:"10px"}}/>
                })()}
                {/* (formulario.img && !formulario.file) && <img src={formulario.img} alt="img" style={{width: "200px", height:"200px", marginBottom:"10px"}}/>
                ||
                (formulario.file) && <img src={formulario.fileShow} alt="img" style={{width: "200px", height:"200px", marginBottom:"10px"}}/> */}
                {/* <img src={formulario.file} style={{width: "200px", height:"200px", marginBottom:"10px"}}/> */}

                <input type="submit" key="boton" id="boton" />
            </form>


        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(FormProduct)