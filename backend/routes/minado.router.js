import express from 'express'
import { minado } from '../controllers/minado.js'

const router = express.Router()

router.get('/',minado)



export default router
