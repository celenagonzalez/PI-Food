const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, Type } = require("../db");
const { v4: uuidv4 } = require("uuid");

async function crearRecipes(req, res, next) {
  try {
    const id = uuidv4();
    const { title, type, resumen, puntos, nivel, paso } = req.body;
    const receta = await Recipe.create({
      id: id,
      title,
      resumen,
      puntos,
      nivel,
      paso,
    });

    const rta = await receta.addTypes(type);
    res.status(200).send(rta);
  } catch (error) {
    next(error);
  }
}
function post(req, res, next) {
  Recipe.findAll({ include: Type })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => next(err));
}

async function recipesAll(req, res, next) {
  //    axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`)659135
  const createdRecetas = Recipe.findAll({ inclide: { model: Type } });
  // const apiRecipes= axios.get("https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=81c7a6d6a35740fda5e7430d1dceb85e&addRecipeInformation=true")
  // const apiRecipes= await axios.get("https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=00dd5adf2bbc4e7bb3360773ad54bdfc&addRecipeInformation=true")
  // const apiRecipes =await axios.get("https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=e57be4972a92421c90efc6b7b02a06d4&addRecipeInformation=true");
  const apiRecipes= await axios.get("https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=846a154ca61d4b76a1ebe7687559f821&addRecipeInformation=true")
  // .then(response =>{
  //     // res.send(response.data.results[0])
  //     const date = response.data.results
  //     let recetas = []

  //   for(let i=0; i< date.length; i++){
  //     recetas.push(date[i])
  //   }
  const { name } = req.query;
  Promise.all([createdRecetas, apiRecipes])
    .then( (response) => {
      const [createdRecetasR, apiRecetasR] = response;
      const rece = apiRecetasR.data.results.map((x)=>{
          return {
              vegetarian: x.vegetarian,
              vegan: x.vegan,
              glutenf: x.glutenFree,
              id: x.id,
              title: x.title,
              img: x.image,
              diets: x.diets.map((x) => x),
            }
        })  
        const xrecetas= createdRecetasR.map(p=>{
          p.diets = p.types.map(t=>t.name)
        })             
         const joinR =xrecetas.concat(rece);
                        
Promise.all(joinR).then((response) => {
        
        if(name === undefined) return res.status(200).send(joinR)
          
        else if (!!name && name.length>0 ){
               
            const xname= response.filter(x=> x.title.toLowerCase().includes(name.toLowerCase()))
  
            return res.status(200).send(xname)
            }
        }).catch(err => next(err))
    
    }).catch((err) => next(err));
}
async function detailRecipe(req, res, next){
    // axios. get(" https://api.spoonacular.com/recipes/information?apiKey=e57be4972a92421c90efc6b7b02a06d4")
    const detailBase= axios.get("http://localhost:3001")
    //  const detailId =await axios.get("https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=e57be4972a92421c90efc6b7b02a06d4&addRecipeInformation=true");
    const detailId= await axios.get("https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=846a154ca61d4b76a1ebe7687559f821&addRecipeInformation=true")
  //  const detailId= await axios.get("https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=00dd5adf2bbc4e7bb3360773ad54bdfc&addRecipeInformation=true")

   Promise.all([detailBase, detailId])
   .then((response)=>{
       const [detailBaseR, detailIdR] = response
    const detalles = detailIdR.data.results.map((x)=>{
          if(x.analyzedInstructions.length> 0 ){
               return {
                   id:x.id,
                   img: x.image,
                   title: x.title,
                   diets: x.diets,
                   plato: x.dishTypes,
                   nivel: x.healthScore,
                   puntos: x.spoonacularScore,
                   resumen: x.summary,
                   paso:x.analyzedInstructions[0].steps
                   //  paso:x.analyzedInstructions[0].steps.map((c)=>{c.step})
                  }
            
           
      }else{
                   return {
                   id:x.id,
                   img: x.image,
                   title: x.title,
                   diets: x.diets,
                   plato: x.dishTypes,
                   nivel: x.healthScore,
                   puntos: x.spoonacularScore,
                   resumen: x.summary,
                  }      
            
      } })
       const detallebase = detailBaseR.data.map(async(c)=>{
           return{
               id:c.id,
               title: c.title,
               diets: c.types.map((x)=>x.name),
               plato: c.plato,
               nivel: c.nivel,
               puntos: c.puntos,
               resumen: c.resumen,

           }
       })
       const total = detallebase.concat(detalles)
       Promise.all(total).then(response=>{
        const id =req.params.id

           for(let i=0; i<response.length; i++){
           if(response[i].id == id) return res.status(200).send(response[i])
        }
        return res.status(404).send("Error Id Inexistente!")
       }).catch(err => next(err))
   }).catch(err => next(err))


}
module.exports = {
  recipesAll,
  crearRecipes,
  post,
  detailRecipe
};
