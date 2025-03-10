import { app } from './app.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

dotenv.config({
    path: './.env'
})

connectDB()
app.listen(process.env.PORT || 8000, () => {
    console.log(`⚙️ server is running at port http://localhost:${process.env.PORT}`)
    app.on('error', (error) => {
        console.log('error:', error)
        throw error
    })
})


