import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { cargar, detailRece } from "../../actions/action";

function Name(){
const name= useSelector((x)=> x.names)
const dispatch= useDispatch()
return(
    <div className="home_contenedor">
        <div>
            <h1>Resultado de Busqueda</h1>
        </div>
        <div>
            {
                name.map((c)=>( 
                    <div className="card">
                <Link to="/detail"><img src={c.img} alt="" className="img" onClick={()=>dispatch(detailRece(c.id))} /></Link>  
                <h3 className="title">{c.title}</h3>
                <p className="text">{c.diets && c.diets.map((x)=>(x + " "))}</p>
                    </div>
                   
                ))
            }
            <div>
                <Link to="/home"><button className="sig" onClick={()=>dispatch(cargar())}>Home</button></Link>
            </div>
        </div>
    </div>
)
}
export default Name;