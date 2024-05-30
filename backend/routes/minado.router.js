import express from 'express'
import { minado,validacion,verCadena} from '../controllers/minado.js'

const router = express.Router()
import checkAuth from "../middleware/checkAuth.js";
router.post('/validar',checkAuth,validacion)
router.get('/',minado)
router.get('/ver',verCadena)



export default router
