const { Router, response } = require ('express')
const{recipesAll, crearRecipes, post, detailRecipe} = require ("../controladores/recipeC")
const router = Router();

router.get('/recipes', recipesAll)
router.post('/created', crearRecipes)
router.get('/recipes/:id', detailRecipe)
router.get('/',post)
module.exports= router