import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'

import coursesRoutes from '../routes/courses.js'

const app = express()
const PORT = 5000

app.use(bodyParser.json())

app.use('', coursesRoutes)

app.get('/', (req, res) => res.send('Hello from Homepage'))

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`))
