const express = require("express");
const bodyParser = require("body-parser");
const {customErrorHandler} = require("./Middlewares/error/customerrorhandler");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const connectDataBase = require("./Helpers/database/connectdb");
const routers = require("./Routers/index");

//ENVIRONMENT PATH
dotenv.config({path : "./config/env/config.env"});





const PORT = process.env.PORT;

//Body Parser For Get Postman Body İnfos



app.use(bodyParser.json());
//Router


app.use(customErrorHandler);
app.use("/api",routers);

//CONNECT DB
connectDataBase();


//Image Upload
app.use(express.static(path.join(__dirname,"public")));

app.listen(PORT , () => {
    console.log(`Server started on port : ${PORT}`);
});

