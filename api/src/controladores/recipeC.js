require('dotenv').config();
const axios = require("axios");
// const { API_KEY } = process.env;
const { Recipe, Type } = require("../db");
const { v4: uuidv4 } = require("uuid");

const API_KEY = 'e57be4972a92421c90efc6b7b02a06d4'
async function crearRecipes(req, res, next) {
  try {
    const id = uuidv4();
    const { title, diets, resumen, puntos, nivel, paso } = req.body;
    console.log(diets)
    const receta = await Recipe.create({
      id: id,
      title,
      resumen,
      puntos,
      nivel,
      paso,
    });

    const rta = await receta.addTypes(diets);
    res.status(200).send(rta);
  } catch (error) {
    next(error);
  }
}
function post(req, res, next) {
  Recipe.findAll({ include: Type})
    .then((response) => {
      res.send(response);
    })
    .catch((err) => next(err));
}

async function recipesAll(req, res, next) {
  //    axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`)659135 ULTIMA 264b13bbe1f14bfba40712c776738835
// 00dd5adf2bbc4e7bb3360773ad54bdfc
// e57be4972a92421c90efc6b7b02a06d4
// 846a154ca61d4b76a1ebe7687559f821
// e019feb433b5480a846ce5deca4ad551
// 264b13bbe1f14bfba40712c776738835
  const createdRecetas = await Recipe.findAll({include: {model: Type}})
  // const apiRecipes= await axios.get("https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=264b13bbe1f14bfba40712c776738835&addRecipeInformation=true")
  // const apiRecipes= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=00dd5adf2bbc4e7bb3360773ad54bdfc&addRecipeInformation=true`)
  // const apiRecipes = await axios.get("https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=e57be4972a92421c90efc6b7b02a06d4&addRecipeInformation=true");
  // const apiRecipes= await axios.get("https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=846a154ca61d4b76a1ebe7687559f821&addRecipeInformation=true")
  const apiRecipes= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${API_KEY}&addRecipeInformation=true`)
 try {
   const { name } = req.query;
   const rece = apiRecipes.data.results.map((x)=>{
           return {
               id: x.id,
               title: x.title,
               img: x.image,
               diets: x.diets.map((x) => x),
               puntos: x.spoonacularScore,
               plato: x.dishTypes && x.dishTypes.map((m)=> m),
               nivel:  x.healthScore,
               puntos: x.spoonacularScore,
               resumen: x.summary,
             }
         })  
    
         const xrecetas=createdRecetas.map((m)=>{
          return{
            id: m.id,
            title: m.title,
            resumne: m.resumen,
            puntos: m.puntos,
            nivel: m.nivel,
            paso: m.paso,
            diets: m.types.map((mt)=> mt.name)
          }
         })           

          const joinR = xrecetas.concat(rece);
          // console.log(joinR)
     
         if(name === undefined)  return res.status(200).send(joinR)
           
         else if (!!name && name.length>0 ){
                
             const xname= joinR.filter(x=> x.title.toLowerCase().includes(name.toLowerCase()))
   
             return res.status(200).send(xname)
             }
   
 } catch (error) {
   next(error)
 }
}
  async function detailRecipe(req, res, next){
    try {
      let  id =req.params.id
      // axios. get(" https://api.spoonacular.com/recipes/information?apiKey=e57be4972a92421c90efc6b7b02a06d4") e019feb433b5480a846ce5deca4ad551
      const detailBase= await axios.get(`http://localhost:3001/`)
      
      if(id.length < 7){
        // const detailId = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=846a154ca61d4b76a1ebe7687559f821&addRecipeInformation=false`)
        // const detailId = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=264b13bbe1f14bfba40712c776738835&addRecipeInformation=false`)
        // const detailId = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=e57be4972a92421c90efc6b7b02a06d4&addRecipeInformation=false`)
        const detailId = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=false`)
        // const detailId = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=00dd5adf2bbc4e7bb3360773ad54bdfc&addRecipeInformation=false`)
  
        let detailApi = detailId.data
        var detalles= []
        var  varC= []
        let parse = parseInt(id)
              detalles.push({
                id: detailApi.id,
                img:detailApi.image,
                title:detailApi.title,
                diets: detailApi.diets,
                plato: detailApi.dishTypes.map((um)=> um),
                nivel: detailApi.healthScore,
                puntos: detailApi.spoonacularScore,
                resumen: detailApi.summary,
                paso:detailApi.instructions && detailApi.instructions
              })

        if(detalles.length) {
          for(let i=0; i<detalles.length; i++){
                if(detalles[i].id === parse){
                  varC.push(detalles[i])
                }
                }
            }
      }
      
          let database= detailBase.data
          var mx=[]
          let varE= []
                for(let m =0; m< database.length; m++ ){
                  mx.push({
                  id:database[m].id,
                  title: database[m].title,
                  resumen:database[m].resumen,
                  puntos: database[m].puntos,
                  nivel: database[m].nivel,
                  paso: database[m].paso,
                  diets: database[m].types.map((x)=>x.name),
                  })
                }
            if(!!mx){
              for(let i=0; i< mx.length; i++){
                if(mx[i].id === id){
                  varE.push(mx[i])
                }
              }   
            }

          // return  res.send(varE) || res.send(varC)
            let matchId= varE.concat(varC)
             res.send(matchId)
    
    }
     catch (error) {
      next(error)
    }
  }
module.exports = {
  recipesAll,
  crearRecipes,
  post,
  detailRecipe
}
