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
            <p>{deta.id}</p>
            <p>{deta.diets}</p>
            <p>{deta.plato}</p>
            <p>{deta.nivel}</p>
            <p>{deta.puntos}</p>
            <p>{deta.paso}</p>
            <p>{deta.resumen}</p>
        </div>
        <div>
            <Link to="/home"><button onClick={()=>dispatch(cargar())}>Home</button></Link>
        </div>
    </div>
)
}
export default DetailRece