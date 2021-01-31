
import {connect} from 'react-redux'
import { useHistory } from 'react-router-dom';
import { changeUserStatus } from "../../redux/actions";
import "./NavSelect.css"

const mapDispatchToProps = (dispatch) => {
    return {
        onStatusChange: (logged) => {
            dispatch(changeUserStatus(logged))
        }
    }
}


function NavSelect({onStatusChange}) {
    let history = useHistory()
    function click(e, s) {
        e.preventDefault()
        onStatusChange(s)
        history.push("/")
    }

    return (
        <div className='divNavbar'>
            <button className="Btn" onClick={(e) => click(e, false)}>Invitado</button>
            <button className="Btn" onClick={(e) => click(e, true)}>Usuario</button>
            <button className="Btn" onClick={(e) => click(e, "admin")}>Administrador</button>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(NavSelect)