const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
require("dotenv").config();
const connectDb = require('./config/dbConnect')
const userRoutes = require('./routes/Users')
const productRoutes = require('./routes/Products')
const cartRoutes = require('./routes/Carts')
const orderRoutes = require('./routes/Orders')
const categoryRoutes = require('./routes/Category');
const { authenticateUser, checkCurrentUser } = require("./middlewares/AuthMiddleware");
// const  = require("./middlewares/AuthMiddleware");

app.use(cors({credentials: true}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/carts', authenticateUser, cartRoutes)
app.use('/api/orders', authenticateUser, orderRoutes)
// app.use('/api/carts', cartRoutes)
// app.use('/api/orders', orderRoutes)
app.use('/api/category', categoryRoutes)
app.post('/api', checkCurrentUser)

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
