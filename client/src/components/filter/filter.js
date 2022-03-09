import { useSelector, useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import {cargar, detailRece} from "../../actions/action"
import "./filter.css"
function FilterTypes(){
    const tDiets= useSelector((x)=> x.filter)
    const dispatch= useDispatch()
    return(
        <div className="cajaA">
            <div className="div_caja">
                <h1 className="letras_filter">Resultado de Busqueda</h1>
            </div>
        <div className="columnas_filter">
            {
                tDiets.map((c, index)=>(
                    <div key={index} className="card_filter">
                        <Link to="/detail"><img src={c.image} alt="" className= "img_filter" onClick={()=>dispatch(detailRece(c.id))} /></Link>
                       <h4 className="title_filter">{c.title}</h4>
                       <p className="text_filter">{c.diets && c.diets.map((x)=> `${x}, `)}</p> 
                    </div>
                ))
            }
        </div>
            <div className="botones_order">
                <Link to="/home"><button className="boton_filter" onClick={()=>dispatch(cargar())}>HOME</button></Link>
            </div>
        </div>
    )
}
export default FilterTypes;