import "./NavBarGuest.css"
import SearchBar from '../SearchBar/SearchBar'
import {Link} from "react-router-dom";

export default function NavBarGuest(props) {
    return (
        <div className='divNavbar'>
            <div className="divLinks">
                <nav /* className='links' */>
                    <Link style={{marginRight: "10px"}} to="/">Inicio</Link>
                    <Link style={{marginRight: "10px"}} to="/user/products">Catalogo</Link>
                    <Link style={{marginRight: "10px"}} to="/user/carrito">Carrito</Link>
                    <Link style={{marginRight: "10px"}} to="/user/nuevo">Registrarse</Link>
                    <Link style={{marginRight: "10px"}} to="/user/ingresar">Logearse</Link>

                </nav>
            </div>
            
            <div style={{marginRight: "10px"}}>
                <SearchBar history={props.history} />
            </div> {/* La propiedad history solo la reciben los hijos directos de Route, por eso la paso por param! ;)*/}
        </div>
    )
}