const { Router} = require ('express')
const { typesRecipes } = require('../controladores/typeC')
const router = Router()

router.get('/types', typesRecipes)
module.exports= router