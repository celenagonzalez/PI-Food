import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useHistory, Link } from "react-router-dom";
import{ ascendente, descendente, getName, mayorP, menorP, nextRece, previousRece, renderRece} from "../../actions/action"
import { detailRece } from "../../actions/action";


function RecetasHome(){
const dispatch = useDispatch()        
const render= useSelector((x)=> x.render) 
const [nombres, setNombres]= useState("")
const history = useHistory()
// const detail= useSelector((x)=> x.detail)
function HandleChange(e){
setNombres(e.target.value);
}
function handleSubmit(e){
dispatch(getName(nombres));
history.push("/Busqueda")
}
useEffect(()=>{
dispatch(renderRece())
},[dispatch])

return (
<div>
    <div>
        <button onClick={()=>dispatch(ascendente())}>ASC</button>
        <button onClick={()=>dispatch(descendente())}>DES</button>
    </div>
    <div>
        <button onClick={()=> dispatch(mayorP())}>MAYOR</button>
        <button onClick={()=> dispatch(menorP())}>MENOR</button>
    </div>
    <div>
        <form action="" onSubmit={handleSubmit}>
            <input 
            type="text"
            autoComplete="off"
            placeholder="Ingrese Titulo de Receta"
            value={nombres}
            onChange={HandleChange}
             />
             <button type="submit">
                Buscar
             </button>
        </form>
    </div>
<ul>
    {
     render.map((x,index)=>(
        <div key={index}>
            <NavLink to="/detail">
            <img src={x.img} 
            alt="recetas"
            onClick={()=>dispatch(detailRece(x.id))}
             />
            </NavLink>
            <h4>{x.title}</h4>
            <h4>{x.diets}</h4>
        </div>
     ))
     }
</ul>
<div>
    <button onClick={()=>dispatch(previousRece())}>Anterior</button>
    <button onClick={()=>dispatch(nextRece())}>Siguiente</button>
</div>
</div>
)
}
export default RecetasHome;