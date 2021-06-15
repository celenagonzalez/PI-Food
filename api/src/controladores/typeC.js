const axios= require ("axios")
const{Type} = require("../db")
async function typesRecipes( req, res, next){
//    await axios.get("https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=81c7a6d6a35740fda5e7430d1dceb85e&addRecipeInformation=true")
// await axios.get("https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=00dd5adf2bbc4e7bb3360773ad54bdfc&addRecipeInformation=true")
// await axios.get("https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=e57be4972a92421c90efc6b7b02a06d4&addRecipeInformation=true")
await axios.get("https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=846a154ca61d4b76a1ebe7687559f821&addRecipeInformation=true")
// await axios.get("https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=264b13bbe1f14bfba40712c776738835&addRecipeInformation=true")
// await axios.get("https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=e019feb433b5480a846ce5deca4ad551&addRecipeInformation=true")
.then(async (response)=>{
    const data=  response.data.results
    let diftypes= []
   
    for(let i=0; i<data.length; i++){
        if(data[i].diets.length > 0){
         diftypes.push(data[i].diets.map(x=> x))
        }
    }

    const first = diftypes[3]
    const last=  diftypes[78]
    let allTypes= first.concat(last)
    allTypes.shift()

    for(let i =0; i<allTypes.length; i++){
        
        await Type.findOrCreate({
            where:{
                name:allTypes[i]
            }
        })
    }
    await Type.findAll().then(response=>{
        let arreglo =[]
        for(let i=0; i<response.length; i++){
            arreglo.push({
                id:response[i].id,
                name:response[i].name
            })
        }
        return res.status(200).json(arreglo)
    })
}).catch(err => next(err))
}
module.exports={
    typesRecipes
}