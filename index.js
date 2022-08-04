const express = require('express')
const dotenv = require("dotenv")
const colors = require('colors');
const morgan = require( 'morgan');
const passport = require('passport');
const connectDB = require('./config/db')
var cors = require('cors');
var helmet = require('helmet')
const {errorHandler } = require('./middleware/errorMiddleware')



dotenv.config({path: './config/config.env'});

const routes = require('./routes/routes')

connectDB();
const app = express();
app.use(passport.initialize());
app.use(cors());
app.use(helmet());
app.use(passport.session());
app.use(express.json());

app.use(errorHandler)
app.use('/api', routes);



app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Serverr Runninng in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold)
})