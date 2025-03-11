import router from './routes/school.route.js'
import errorHandler from "./middlewares/errorHandler.js";
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
const app = express()

app.use(cors({      //middleware
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json())
app.use(bodyParser.json());  //middleware for enable json parsing
app.use(morgan("dev"));      //morgan middleware log http request

app.use('/api/v1/schools',router)
app.use(errorHandler);
export {app}