const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const { engine }= require('express-handlebars')

const app = express()
const connectDB = require('./config/db')

dotenv.config({ path: './config/config.env'})

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
 //Handlebars
app.engine('.hbs', engine({ defaultLayout: 'main' ,extname: '.hbs'}))
app.set('view engine', '.hbs')

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./router/index'))

connectDB()

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on ${process.env.NODE_ENV} at port ${PORT}!`))