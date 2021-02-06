export default function NoAccess(props) {
    return (
        <div>
            <h1 style={{color: "red", marginTop: "25px"}}>No tienes acceso</h1>
            <h1 style={{color: "green", marginTop: "25px"}}>Solo los {props.access} tienen acceso aquí!!</h1>
        </div>
    )
}