const express = require("express");
const app = express();
require("dotenv").config();
const connectDb = require('./config/dbConnect')
const userRoutes = require('./routes/Users')
const productRoutes = require('./routes/Products')

app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)

const startApp = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        console.log("connected to database");
        app.listen(process.env.PORT, () => {
            console.log(`app listening to port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startApp()
