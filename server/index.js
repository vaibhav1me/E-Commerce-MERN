const express = require("express");
const app = express();
const cors = require('cors');
require("dotenv").config();
const connectDb = require('./config/dbConnect')
const userRoutes = require('./routes/Users')
const productRoutes = require('./routes/Products')
const cartRoutes = require('./routes/Carts')
const orderRoutes = require('./routes/Orders')
const categoryRoutes = require('./routes/Category');
const { authenticateUser, checkCurrentUser } = require("./middlewares/AuthMiddleware");
const PORT = process.env.PORT || 3000
/* -----ToDo-----
const cookieParser = require('cookie-parser')
 */

// const  = require("./middlewares/AuthMiddleware");

app.use(cors({credentials: true}))
app.use(express.json())

/* Todo ---------
app.use(cookieParser())  */

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/carts', authenticateUser, cartRoutes)
app.use('/api/orders', authenticateUser, orderRoutes)
app.use('/api/category', categoryRoutes)
app.post('/api', checkCurrentUser)


app.get('/', (req, res) => {
    res.json({message: "Congratulations, the server is running successfully"})
})
const startApp = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        console.log("connected to database");
        app.listen(PORT, () => {
            console.log(`app listening to port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startApp()
