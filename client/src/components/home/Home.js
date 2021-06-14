import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useHistory, Link } from "react-router-dom";
import{ ascendente, createdRecipe, descendente,
     getCreated, getName, matcheaDiets, mayorP,
      menorP, nextRece, previousRece, renderRece,
       typesDiets} from "../../actions/action"
import { detailRece } from "../../actions/action";


function RecetasHome(){
const dispatch = useDispatch()        
const render= useSelector((x)=> x.render) 
const [nombres, setNombres]= useState("")
const history = useHistory()
const tipos= useSelector((x)=> x.types)

let state= {
    value:""
}

function HandleChange(e){
setNombres(e.target.value);
}
function handleSubmit(e){
    dispatch(getName(nombres));
    history.push("/Busqueda")
}

useEffect(()=>{
dispatch(renderRece())
dispatch(typesDiets())
dispatch(getCreated())
},[dispatch])

function changeType(e){
state.value= e.target.value
dispatch(matcheaDiets(state.value))
history.push("/typesMatch")
}

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
        <button onClick={()=>dispatch(createdRecipe())}>Creados</button>
    </div>
    <div>
        <Link to="/formulario">
        <button>Crear Receta</button>
        </Link>
        
    </div>
    <select name="" id="" onChange={changeType}>
        <option value="">Tipo de Dieta</option>
        {
            tipos.map((x, index)=>(
              <option key={index}>{x.name}</option>
            ))
        }
    </select>
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
            <img src={x.img? x.img : "hola"} 
            alt="recetas"
            onClick={()=>dispatch(detailRece(x.id))}
             />
            </NavLink>
            <h3>{x.title}</h3>
            <p>{x.diets && x.diets.map((c)=>(c + " ")) || x.types.map(m=> m.name + " ") }</p>
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