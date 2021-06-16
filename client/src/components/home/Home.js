import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useHistory, Link } from "react-router-dom";
import{ ascendente, createdRecipe, descendente,
     getCreated, getName, matcheaDiets, mayorP,
      menorP, nextRece, previousRece, renderRece,
       typesDiets} from "../../actions/action"
import { detailRece } from "../../actions/action";
import "./home.css";


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
<div className="home_contenedor">
    <div className="contenedor_botones">
    <div className="b_asc">
        <button className="but" onClick={()=>dispatch(ascendente())}>Ascendente</button>
        <button className="but" onClick={()=>dispatch(descendente())}>Descendente</button>
        <button className="but" onClick={()=> dispatch(mayorP())}>Mayor Puntuación</button>
        <button className="but" onClick={()=> dispatch(menorP())}>Menor Puntuación</button>
        <button className="but" onClick={()=>dispatch(createdRecipe())}>Creados</button>
        {/* <div> */}
        <Link to="/formulario">
        <button className="but1">Crear Receta</button>
        </Link>
        {/* </div> */}
        <select className="but1" onChange={changeType}>
        <option value="">Tipo de Dieta</option>
        {
            tipos.map((x, index)=>(
              <option key={index}>{x.name}</option>
            ))
        }
    </select>
    </div>
    <div className="contenedor_buscador">
        <form action="" onSubmit={handleSubmit} className="buscador">
            <input 
            className="input_home"
            type="text"
            autoComplete="off"
            placeholder="Ingrese Titulo de Receta"
            value={nombres}
            onChange={HandleChange}
             />
             <button type="submit" className="boton_home_name">
                Buscar
             </button>
        </form>
    </div>
    </div>
<ul className="columnas">
    {
     render.map((x,index)=>(
        <div key={index} className="card">
            <NavLink to="/detail">
            <img src={x.img} 
            alt="recetas"
            onClick={()=>dispatch(detailRece(x.id))}
            className="img"
             />
            </NavLink>
            <h3 className="title">{x.title}</h3>
            <p className="text">{x.diets && x.diets.map((c)=>(c + " "))}</p>
        </div>
     ))
     }
</ul>
<div className="botones_order">
    <button className="ant" onClick={()=>dispatch(previousRece())}>Anterior</button>
    <button className="sig" onClick={()=>dispatch(nextRece())}>Siguiente</button>
</div>
</div>
)
}
export default RecetasHome;