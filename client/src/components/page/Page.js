import React from 'react'
import {Link} from 'react-router-dom'
import "./page.css"

const Page = () =>{
    return (
        <div className="ingresa">
        <div className="page_page">
             <Link to='/home' ><button className="boton_page" >Ingresa</button></Link>
        </div>
        </div>


            
    )
}
export default Page