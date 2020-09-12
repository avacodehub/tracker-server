require('dotenv').config()

const express =  require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', (error) => console.log('Connected to Database'))

app.use(express.json())

const projectsRouter = require('./routers/projects')
app.use('/projects', projectsRouter)

app.listen(process.env.PORT || 3000, () => console.log('server started on localhost:3000'))