import { useSelector, useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import {cargar, detailRece} from "../../actions/action"
function FilterTypes(){
    const tDiets= useSelector((x)=> x.filter)
    const dispatch= useDispatch()
    return(
        <div className="columnas">
            {
                tDiets.map((c, index)=>(
                    <div key={index} className="card">
                        <Link to="/detail"><img src={c.img} alt="" className= "img" onClick={()=>dispatch(detailRece(c.id))} /></Link>
                       <h4 className="title">{c.title}</h4>
                       <p className="text">{c.diets && c.diets.map((x)=> <p>{x + " "}</p>)}</p> 
                    </div>
                ))
            }
            <div>
                <Link to="/home"><button onClick={()=>dispatch(cargar())}>HOME</button></Link>
            </div>
        </div>
    )
}
export default FilterTypes;