const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const RecipesRoutes = require('./recipes')
const TypesRoutes = require('./types')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', RecipesRoutes)
router.use('/', TypesRoutes )

module.exports = router;
