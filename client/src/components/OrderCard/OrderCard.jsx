export default function OrderCard({data}) {

    return (
        <div>
            <p>  Nombre del Usuario: {data.user.nombre} {data.user.apellido}  |  Estado: {data.estado}  |  Numero de usuario: {data.id}  |  Correo: {data.user.email}</p>
        </div>
    )
}