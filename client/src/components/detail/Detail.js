import { useSelector,useDispatch} from "react-redux"
import { Link } from "react-router-dom"
import { cargar } from "../../actions/action"
function DetailRece(){
const deta = useSelector((x)=> x.detail)
const dispatch= useDispatch()
return (
    <div>
        <div>
            <img src={deta.img} alt="" />
            <h4>{deta.title}</h4>
            <p>id: {deta.id}</p>
            <p>Tipo de Dieta:{deta.diets && deta.diets.map((x)=>(<li>{x}</li>)) }</p>
            <p>Tipo de Plato: {deta.plato? deta.plato : ""}</p>
            <p>Nivel Saludable: {deta.nivel}</p>
            <p>Puntuacion: {deta.puntos}</p>
            <p>Pasos a Seguir: {deta.paso? deta.paso : "No se ha encontrado Pasos a Seguir"}</p>
            <p>Resumen: {deta.resumen}</p>
        </div>
        <div>
            <Link to="/home"><button onClick={()=>dispatch(cargar())}>Home</button></Link>
        </div>
    </div>
)
}
export default DetailRece