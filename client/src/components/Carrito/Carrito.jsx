import React, {useState, useEffect}  from 'react';
import './Carrito.css'
import {connect} from 'react-redux' 
import {addCarrito} from "../../redux/actions";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';

export function Carrito ({carrito, user, onAddCarrito, products}) {
    const [total, setTotal] = useState(0)

    console.log("mi carrito", carrito )
    console.log("productso", products )

    function precioTotal(c) {
        var suma = 0
        c.forEach(carro => suma += carro.precio * carro.cantidad)
        setTotal(suma)
        // loadProducts()
    }

    function loadProducts() {
        
        if (!user.id) {
            let aC = localStorage.getItem('carrito')
            if (aC) {
                aC = JSON.parse(aC)
                if (!carrito[0]) onAddCarrito(aC)
                precioTotal(aC)
            }
        } else {
            axios.get(`http://localhost:3001/user/cart/${user.id}`)
                .then(response => {
                    onAddCarrito(response.data)
                    precioTotal(response.data)
                })
                .catch(err => {
                    console.log("ESTO ES UN ERROR", err)
                })
        }
        // precioTotal()
    }
        
    useEffect(() => {
        loadProducts()
    }, [user])
    
    function editar (e, producto) { // producto.id = ID
        // precioTotal()
        var stock;
        products.forEach(pos => {
            if (pos.id === producto.productId) {
                stock = pos.stock
            }
        })
        var obj= {
            cantidad: e.target.value,
            productId: producto.productId
        }
        if (e.target.value > 0 && e.target.value <= stock ) {
            if (user.id) {
                axios.put(`http://localhost:3001/user/cart/${user.id}`, obj )
                .then(response => {
                    return axios.get(`http://localhost:3001/user/cart/${user.id}`)
                })
                .then(response => {
                    onAddCarrito(response.data)
                    precioTotal(response.data)
                })
                .catch(err => {
                    console.log("ESTO ES UN ERROR", err)
                })
            } else {
                let arrayProductos = JSON.parse(localStorage.getItem('carrito'))
                for (let i = 0; i < arrayProductos.length; i++) {
                    if (arrayProductos[i].productId === producto.productId) {
                        arrayProductos[i].cantidad = e.target.value
                    }
                }
                localStorage.setItem('carrito', JSON.stringify(arrayProductos))
                onAddCarrito(arrayProductos)
                precioTotal(arrayProductos)
            }
        } else if (e.target.value <= 0) { // Minimo uno, si quiere puede sacar el producto (funcion eliminar)
            e.target.value = 1

            if (user.id) {
                obj.cantidad = 1
                axios.put(`http://localhost:3001/user/cart/${user.id}`, obj )
                .then(response => {
                    return axios.get(`http://localhost:3001/user/cart/${user.id}`)
                })
                .then(response => {
                    onAddCarrito(response.data)
                    precioTotal(response.data)
                })
                .catch(err => {
                    console.log("ESTO ES UN ERROR", err)
                })
            } else {
                let arrayProductos = JSON.parse(localStorage.getItem('carrito'))
                for (let i = 0; i < arrayProductos.length; i++) {
                    if (arrayProductos[i].productId === producto.productId) {
                        arrayProductos[i].cantidad = 1
                    }
                }
                localStorage.setItem('carrito', JSON.stringify(arrayProductos))
                onAddCarrito(arrayProductos)
                precioTotal(arrayProductos)
            }
        } else {
            swal({
                title: "No hay suficiente stock",
                icon: "warning",
              });
            e.target.value = stock

            if (user.id) {
                obj.cantidad = stock
                axios.put(`http://localhost:3001/user/cart/${user.id}`, obj )
                .then(response => {
                    return axios.get(`http://localhost:3001/user/cart/${user.id}`)
                })
                .then(response => {
                    onAddCarrito(response.data)
                    precioTotal(response.data)
                })
                .catch(err => {
                    console.log("ESTO ES UN ERROR", err)
                })
            } else {
                let arrayProductos = JSON.parse(localStorage.getItem('carrito'))
                for (let i = 0; i < arrayProductos.length; i++) {
                    if (arrayProductos[i].productId === producto.productId) {
                        arrayProductos[i].cantidad = stock
                    }
                }
                localStorage.setItem('carrito', JSON.stringify(arrayProductos))
                onAddCarrito(arrayProductos)
                precioTotal(arrayProductos)
            }
        }
    }

    function eliminar(e, producto) {
        if (user.id) {
            axios.delete(`http://localhost:3001/user/delete/${producto.productId}/${user.id}`)
            .then(response => {
                return axios.get(`http://localhost:3001/user/cart/${user.id}`)
            })
            .then(response => {
                onAddCarrito(response.data)
                precioTotal(response.data)
            })
            .catch(err => {
                console.log("ESTO ES UN ERROR", err)
            })
        } else {
            let arrayProductos = JSON.parse(localStorage.getItem('carrito'))
            console.log("ANTES DE BORRAR: ", arrayProductos)
            for (let i = 0; i < arrayProductos.length; i++) {
                if (arrayProductos[i].productId === producto.productId) {
                    console.log("ENCONTRADO")
                    arrayProductos.splice(i, 1)
                    break;
                }
            }
            console.log("DESPUES DE BORRAR: ", arrayProductos)
            localStorage.setItem('carrito', JSON.stringify(arrayProductos))
            onAddCarrito(arrayProductos)
            precioTotal(arrayProductos)
        }

    }

    function vaciarCarrito() {
        if (user.id) {
            axios.delete(`http://localhost:3001/user/cart/${user.id}`)
            .then(response => {
                return axios.get(`http://localhost:3001/user/cart/${user.id}`)
            })
            .then(response => {
                onAddCarrito(response.data)
                precioTotal(response.data)
            })
            .catch(err => {
                console.log("ESTO ES UN ERROR", err)
            })
        } else {
            localStorage.setItem('carrito', [])
            onAddCarrito([])
            // setTotal("0")
            precioTotal([])
        }
        swal({
            title: "Tu carrito se ha vaciado!!",
            icon: "success",
          });
    }
    let history = useHistory()
    function comprar() {
        if(user.id) {
            // console.log()
            history.push("/user/pagar");
        } else {
            swal({
                title: "Debe registarse para continuar",
                text: "...sera redirigido automaticamente",
                icon: "info",
              });
            history.push("/user/nuevo");
        }
    }
    

    return(
        <div className='divGeneralCarrito'>
        <div className='divCarrito'>
                <h1>Carrito de compras</h1>

                {carrito && carrito.map(producto => <div className='divProducto'>
                    <div className='divNombre'>
                    <h3>{producto.nombre}</h3>
                    </div>
                    <div className='spanPrecios'>
                    <span>Precio Unidad: <span className='precio'>${producto.precio}</span></span>
                    </div>
                    <div className='cantidad'>
                    <span>Cantidad: </span>
                    <input key={producto.id*-1} type="number" onChange={(e, product = producto) => editar(e, product)} placeholder={producto.cantidad} name="cantidad"/> 
                    </div>
                    <div className='spanPrecios'>
                    <span>Precio Total: <span className='precioTotal'>${producto.precio * producto.cantidad}</span></span>
                    </div>
                    <div className='divBoton'>
                    <img alt="imagen de producto" src='https://www.vhv.rs/dpng/d/446-4464515_trashcan-trash-can-clipart-png-garbage-can-clipart.png' className='eliminar' onClick={(e, product= producto) => eliminar(e, product)} ></img>
                    </div>
                </div>)}
                {carrito[0] && <div onClick={vaciarCarrito} className='vaciar'><button> vaciar carrito </button></div>}
        
                {carrito[0] && <div className='montoTotal'>
                                    <h1><span>Total:</span>${total}</h1>
                                </div>}
                {carrito[0] && <div onClick={comprar} className='vaciar'><button> Finalizar Compra </button></div>}
        </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
       carrito: state.carrito,
       user: state.user,
       products: state.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddCarrito: (text) => {
        dispatch(addCarrito(text))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carrito)