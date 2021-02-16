
import { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import swal from "sweetalert";



export default function UsuariosAdmin(props) {
    const [users, setUsers] = useState()

    function cargarUser(){
        axios.get("http://localhost:3001/user")
        .then(res => {
            setUsers(res.data)
            console.log("SOY USERS", res.data)
        })
        .catch(err => {
            console.log("error", err)
        })
    }
    useEffect(()=> {
        cargarUser()
    },[])
    function addAdmin(e, id) {
        e.preventDefault()
        console.log(id)
        axios.post("http://localhost:3001/auth/promote/"+id)
        .then(res => {
            cargarUser()
        })
        .catch(err=> {
            console.log(err)
        })
    }
    function deleteAdmin(e, id) {
        e.preventDefault()
        console.log(id)
        axios.post("http://localhost:3001/auth/promoteF/"+id)
        .then(res => {
            cargarUser()
        })
        .catch(err=> {
            console.log(err)
        })
    }
    return (
        <div>
            {users && users.map(pos => 
                <div>
                    <h3>ID de usuario: {pos.id}</h3>
                    <h3>Usuario: {pos.nombre} {pos.apellido}</h3>
                    <h3>Email: {pos.email}</h3>
                    <h3>Admin: {(pos.admin)? "SI" : "No"}</h3>
                    {(pos.admin) ?<button onClick={(e)=> deleteAdmin(e, pos.id)}>Eliminar Admin</button>: <button onClick={(e)=> addAdmin(e, pos.id)}>Hacer Admin</button>}
                </div>
    
            )}
            
        </div>
    )
}
