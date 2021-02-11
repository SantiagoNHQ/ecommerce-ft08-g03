import "./NavBarGuest.css"
import SearchBar from '../SearchBar/SearchBar'
import {Link} from "react-router-dom";

export default function NavBarGuest(props) {
    return (
        <div className='divNavbarGuest'>
            <div className="divLinksGuest">
                <nav className='links'>
                    <Link to="/">Inicio</Link>
                    <Link to="/user/products">Catalogo</Link>
                    <Link to="/user/carrito">Carrito</Link>
                    <Link to="/user/nuevo">Registrarse</Link>
                    <Link to="/user/ingresar">Logearse</Link>
                </nav>
            </div>
            
            <div style={{marginRight: "10px"}}>
                <SearchBar history={props.history} />
            </div> {/* La propiedad history solo la reciben los hijos directos de Route, por eso la paso por param! ;)*/}
        </div>
    )
}