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

//middlewares
app.use(cookieParser())
app.use(morgan('combined'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(bodyParser.json())
app.use(cors({
    origin: 'https://proyect-game-react-git-main-tomasquinteros2s-projects.vercel.app',
    methods: 'GET,POST',
    allowedHeaders: ['Content-Type', 'Authorization', 'My-Custom-Header'],
    credentials: true // Permitir credenciales
};
//routes
app.use('/users',userRouter)
app.use('/games',gamesRoutes)

//starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})
