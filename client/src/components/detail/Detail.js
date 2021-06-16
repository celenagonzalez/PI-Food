import { useSelector,useDispatch} from "react-redux"
import { Link } from "react-router-dom"
import { cargar } from "../../actions/action"
import "./detail.css"
function DetailRece(){
const deta = useSelector((x)=> x.detail)
const dispatch= useDispatch()
return (
    <div className="todo"> 
        <div className="div__uno">
            <h1>Detalles de Receta</h1>
        </div>
        <div className="card_d">
            <img className="gimgg" src={deta.img} alt="" />
            <h4 className="title_d">{deta.title}</h4>
            <p className="p">id: {deta.id}</p>
            <p className="p"> <h5>Tipo de Dieta:</h5> {deta.diets && deta.diets.map((x)=>(<li>{x}</li>)) }</p>
            <p className="p"><h5>Tipo de Plato:</h5>{deta.plato ? deta.plato : "" }</p>
            <p className="p"><h5>Nivel Saludable:</h5> {deta.nivel}</p>
            <p className="p"><h5>Puntuación:</h5>{deta.puntos}</p>
            <p className="p"><h5>Pasos a Seguir:</h5> {deta.paso? deta.paso : "No se ha encontrado Pasos a Seguir"}</p>
            <p className="p"><h5>Resumen:</h5> {deta.resumen}</p>
        </div>
        <div>
            <Link to="/home"><button className="boton_detail" onClick={()=>dispatch(cargar())}>Home</button></Link>
        </div>
    </div>
)
}
export default DetailRece