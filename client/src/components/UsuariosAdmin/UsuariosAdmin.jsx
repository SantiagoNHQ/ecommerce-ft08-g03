
import { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import swal from "sweetalert";
import './UsuariosAdmin.css';



export default function UsuariosAdmin(props) {
    const [users, setUsers] = useState()

    function cargarUser(){
        axios.get("/user")
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
        axios.post("/auth/promote/"+id)
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
        axios.post("/auth/promoteF/"+id)
        .then(res => {
            cargarUser()
        })
        .catch(err=> {
            console.log(err)
        })
    }
    return (
        <div className='divGeneralUsuarios'>
            {users && users.map(pos => 
                <div className='divUsuarios'>
                    <h3><span>ID de usuario:</span>{pos.id}</h3>
                    <h3><span>Usuario:</span>{pos.nombre} {pos.apellido}</h3>
                    <h3><span>Email:</span>{pos.email}</h3>
                    <h3><span>Admin:</span> {(pos.admin)? "SI" : "No"}</h3>
                    {(pos.admin) ?<button onClick={(e)=> deleteAdmin(e, pos.id)}>Eliminar Admin</button>: <button onClick={(e)=> addAdmin(e, pos.id)}>Hacer Admin</button>}                  
                </div>
    
            )}
            
        </div>
    )
}
