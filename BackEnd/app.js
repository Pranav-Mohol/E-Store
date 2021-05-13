//enviromental variable file
require('dotenv').config()

const mongoose = require("mongoose");
const express = require("express");
const app = express();
//parsers
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");



//Getting Routers
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const categoryRoutes = require("./routes/category.js");
const productRoutes = require("./routes/product.js");
const stripeRoutes = require("./routes/stripepayment.js")
const paymentBRoutes = require("./routes/paymentB.js")

//DB Connection
mongoose
.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    console.log("DATABASE CONNECTED");
})

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", stripeRoutes)
app.use("/api", paymentBRoutes)


//PORT
const port = process.env.PORT;

//Starting Server
app.listen( port , () => {
    console.log(`Server is up and running`);
})


app.get('/', (req, res) => res.send('Hello World!'))

