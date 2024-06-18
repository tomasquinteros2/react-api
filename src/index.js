const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose  = require('mongoose')
const cors = require('cors');
const gamesRoutes = require('./routes/games')
const userRouter = require('./routes/auth.routes')
const cookieParser = require('cookie-parser')
const uri = "mongodb+srv://tomasquinteros2002:tomas0208@tomasquinteros.1qlpkdj.mongodb.net/?retryWrites=true&w=majority&appName=TomasQuinteros";
const model = require('./models/game')
const userModel = require ('./models/User')
const authController = require('./controller/auth.controller')

mongoose.Promise = global.Promise
mongoose.connect(uri, {
}).then(console.log('db is connected'))
    .catch(err => console.log(err))

//settings
app.set('port', process.env.PORT || 3000)
app.set('json spaces',2)
// CORS Config
const corsOptions = {
    origin: ['http://localhost:5173', 'https://proyect-game-react.vercel.app'], // Reemplaza con el origen correcto de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Habilita el intercambio de credenciales
  };
app.use(cors(corsOptions));
//middlewares
app.use(cookieParser())
app.use(morgan('combined'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(bodyParser.json())
//routes
app.use('/users',userRouter)
app.use('/games',gamesRoutes)

//starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})
