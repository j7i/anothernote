import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import {noteRoutes} from './routes/noteRoutes'

const   server = express(),
        port = 3000,
        router = express.Router()

//body parser middleware
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true }))
server.use(express.static(path.resolve('dist')))

router.get('/', (req, res) => res.sendfile('/index.html'))

server.use('/', noteRoutes)

server.listen(port, () => console.log(`listening on ${port}`))
