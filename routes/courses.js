import express from 'express'

import { getCourses, createCourse, getCourseById, deleteCourse, updateCourse, login, logout, clientes, verifyJWT } from '../controllers/courses.js'

const router = express.Router()

let courses = []

router.get('/clientes', verifyJWT, clientes)

router.get('/courses/', getCourses)

router.post('/courses/', createCourse)

router.get('/courses/:id', getCourseById)

router.delete('/courses/:id', deleteCourse)

router.put('/courses/:id', updateCourse)

router.post('/login', login)

router.post('/logout', logout)

export default router