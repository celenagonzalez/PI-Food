import { useDispatch, useSelector } from "react-redux";
import { formCrea, renderRece } from "../../actions/action";
import { Select } from 'react-multi-select-component';
import { useState } from "react";
import {Link} from "react-router-dom"
import "./formulario.css"

function Form(){
    const dispatch= useDispatch()
    const types= useSelector((x)=> x.types)

    const InitialValues ={
        title:{value:"", valid:false, touched:false},
        diets:{value: [], valid:false, touched:false},
        nivel:{value:"", valid:false, touched:false},
        puntos:{value:"", valid:false, touched:false},
        paso:{value:"", valid:false, touched:false},
        resumen:{value:"", valid:false, touched:false},

    }
    const[data, setData]= useState(InitialValues);
    const [formValid , validamos] = useState(false);
    function handleChange(e){
    let valid;
    let field;
    if(!e.target){
        console.log(e)
        field= {
            valid: true,
            value:e,
            touched:true
        }
        e.target= {};
        e.target.name= "diets"
    }
    else{
    valid= validateCampo(e);
    // console.log(e)
    field={
        valid,
        value:e.target.value,
        touched: true
    }
    }
    let newData={
        ...data,
        [e.target.name] : field
    }
    setData(newData)
    validamos(validateForm(newData))
    }
    
    function handleSubmit(e){
    const mydata= {
        title: data.title.value,
        diets: data.diets.value.map(x=> x.value),
        nivel: data.nivel.value,
        puntos: data.puntos.value,
        paso: data.paso.value,
        resumen: data.resumen.value
    }
    e.preventDefault()
    dispatch(formCrea(mydata))
    setData(InitialValues)
    return alert("Su Receta ha sido creada con Exito!!")
    }
const options= types.map((c)=>({label: c.name, value: c.id}))
return (
    <div className="contenedor_formulario"> 
        <form className="box_form" onSubmit={handleSubmit}>
            <h1 className="titulo_formulario">Crea tu Propia Receta!</h1>
            <input 
            className="input"
            name="title"
            type="text"
            autoComplete="off"
            placeholder="Ingrese Titulo de Receta"
            value={data.title.value}
            onChange={handleChange}
             />
              {(data.title.touched && !data.title.valid) ?<span>El campo debe tener al menos 10 caracteres</span> : ''}
            <label for="type">Elige Tipos de Dieta</label>
              <Select
              className="input"
                 options={options}
                 value={data.diets.value}
                 onChange={handleChange}

                 />
            <input
            className="input"
            name="nivel"
            type="number"
            autoComplete="off"
            placeholder="Ingrese nivel"
            value={data.nivel.value}
            onChange={handleChange} 
            />
             {(data.nivel.touched && !data.nivel.valid) ?<span>El campo debe contener un numero  de 0 a 100</span> : ''}
            <input 
            className="input"
            name="puntos"
            type="text"
            autoComplete="off"
            placeholder="puntaje" 
            value={data.puntos.value}
            onChange={handleChange}
            />
             {(data.puntos.touched && !data.puntos.valid) ?<span>El campo debe contener un numero  de 0 a 100</span> : ''}
            <input 
            className="input"
            name="paso" 
            type="text"
            autoComplete="off"
            placeholder="Ingrese El paso a paso de Su Receta"
            value={data.paso.value}
            onChange={handleChange}
            />
             {(data.paso.touched && !data.paso.valid) ?<span>El campo debe contener al menos 80 caracteres</span> : ''}
            <input 
            className="input"
            name="resumen"
            type="text"
            autoComplete="off"
            placeholder="Ingrese Resumen De Receta"
            value={data.resumen.value}
            onChange={handleChange}
            />
            {(data.resumen.touched && !data.resumen.valid) ?<span>El campo debe contener al menos 80 caracteres</span> : ''}
            <button className="boton_formulario" disabled={!formValid} type="submit" onClick={()=>dispatch(renderRece())}>Agregar</button>
        </form>
           <div>
           <Link to="/home"><button className="volver_formulario">Volver</button></Link>
           </div> 
    </div>
)
}
const validateCampo= (e) =>{
    if (e.target.name === "title"){
        return e.target.value.length > 9
    }
    if(e.target.name === 'nivel'){
        return  e.target.value >= 0 && e.target.value <= 100 && !isNaN(e.target.value);
    }
    if(e.target.name === 'puntos'){
        return  e.target.value >= 0 && e.target.value <= 100 && !isNaN(e.target.value);
    }
    if(e.target.name === 'paso'){
        return  e.target.value.length >= 5
    }
    if(e.target.name === 'resumen'){
        return  e.target.value.length >= 5
    }
    return false
}
const validateForm = (data) => {
    const fields = Object.keys(data);
    for (let i = 0; i < fields.length; i++) {
        if (!data[fields[i]].valid) return false;
    }
    return true;
}
export default Form;