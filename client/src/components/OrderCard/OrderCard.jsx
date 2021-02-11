import axios from "axios"
import React from "react"
import swal from "sweetalert"
import {createBrowserHistory} from 'history';

export default function OrderCard({data}) {

    console.log("esto es data ", data)

    const browserHistory = createBrowserHistory();

    function cambioEstado(e, datas){
        e.preventDefault()
       console.log(e.target.cat.value)
       console.log(datas)
       var obj = {estado: e.target.cat.value}
       console.log(obj)
       axios.put("http://localhost:3001/user/orders/"+ datas, obj)
       .then(res => {
           swal({
               title: "Oden Actualizada correctamente",
               text: "Ahora su estado es: "+ obj.estado + "!!",
               icon: "success",
            });
            window.location.reload()
       })
       .catch(err => {
           console.log(err)
       })
    }

    return (
        <div>
            <p>  Numero de orden: {data.id} Nombre del Usuario: {data.user && data.user.nombre} {data.user && data.user.apellido}  |  Estado: {data.estado}  |  Numero de usuario: {data.userId}  |  Correo: {data.user && data.user.email}</p>
            <form onSubmit={(e, datas = data.id) =>cambioEstado(e, datas)}>
                <div className="multiselect">
                    <div className="selectBox" /*onClick={showCheckboxes}*/ >
                        <select name="cat">
                        <option value="carrito" >Carrito</option>
                        <option value="creada">Creada</option>
                        <option value="procesando">Procesando</option>
                        <option value="cancelada">Cancelada</option>
                        <option value="completa">Completa</option>
                        </select>
                        <input type="submit" value="Cambiar Estado de la orden." />
                    </div>
                </div>
            </form>
        </div>
    )
}