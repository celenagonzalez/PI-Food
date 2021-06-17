import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { cargar, detailRece } from "../../actions/action";
import "./name.css"

function Name(){
const name= useSelector((x)=> x.names)
const dispatch= useDispatch()
return(
    <div className="contenedor_name">
        <div className="contenedor_titulo_name">
            <h1 className="letras_titulo">Resultado de Busqueda</h1>
        </div>
        <div className="columnas_name">
            { 
                 name.map((c)=>( 
                    <div className="card_name">
                 <Link to="/detail"><img src={c.img} alt="" className="imagen_name" onClick={()=>dispatch(detailRece(c.id))} /></Link>  
                <h3 className="title_name">{c.title}</h3>
                <p className="text_name">{c.diets && c.diets.map((x)=>(x + " "))}</p>
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