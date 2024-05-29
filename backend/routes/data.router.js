import express from 'express'
import { NuevoCertificado } from '../controllers/data.controller.js'
const router = express.Router()

router.post('/',NuevoCertificado)



export default router
