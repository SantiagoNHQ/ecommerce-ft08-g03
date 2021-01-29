import "./NavBar.css"
import SearchBar from '../SearchBar/SearchBar'
import {Link} from "react-router-dom";

export default function NavBar(props) {
    return (
        <div className='div-navbar'>
            <nav className='links'>
            <Link to="/">Inicio</Link>
            <Link to="/user/products">Catalogo</Link>
            <Link to="/user/nuevo">Nuevo Usuario</Link>
            <Link to="/user/carrito">CARRITO</Link>
            <Link to="/admin">SER ADMIN</Link>

            </nav>
            {/* <div className='buscador'>
                <input className='input' onKeyPress={ submitEnter } onChange={ buscador }/>
                <button className='boton' onClick={ submit }></button>
            </div> */}
            <SearchBar history={props.history} /> {/* La propiedad history solo la reciben los hijos
            directos de Route, por eso la paso por param! ;)*/}
        </div>
    )
}