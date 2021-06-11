import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { cargar, detailRece } from "../../actions/action";

function Name(){
const name= useSelector((x)=> x.names)
const dispatch= useDispatch()
return(
    <div>
        <div>
            <h1>Resultado de Busqueda</h1>
        </div>
        <div>
            {
                name.map((c)=>( 
                    <div>
                <Link to="/detail"><img src={c.img} alt="" onClick={()=>dispatch(detailRece(c.id))} /></Link>  
                <h3>{c.title}</h3>
                <h3>{c.diets}</h3>
                    </div>
                   
                ))
            }
            <div>
                <Link to="/home"><button onClick={()=>dispatch(cargar())}>Home</button></Link>
            </div>
        </div>
    </div>
)
}
export default Name;