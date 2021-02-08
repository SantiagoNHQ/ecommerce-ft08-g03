import "./NavBar.css"
import SearchBar from '../SearchBar/SearchBar'
import {Link} from "react-router-dom";

export default function NavBar(props) {
    return (
        <div className='divNavbarUser'>
            <div className="divLinksUser">
                <nav /* className='links' */>
                    <Link to="/">Inicio</Link>
                    <Link to="/user/products">Catalogo</Link>
                    <Link to="/user/carrito">Carrito</Link>
                    <Link to="/user/perfil">Mi Perfil</Link>
                    <Link to="/user/ordenes">Ordenes</Link>
                </nav>
            </div>
            
            <div>
                <SearchBar history={props.history} />
            </div> {/* La propiedad history solo la reciben los hijos directos de Route, por eso la paso por param! ;)*/}
        </div>
    )
}