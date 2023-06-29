//declare varibles
const express = require("express");
const app = express();
const PORT = 8200;
const mongoose = require("mongoose");
const TodoTask = require("./models/TodoTask");
require('dotenv').config()


//set middleware
app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.DB_CONNECTION, {
 useNewUrlParser: true, useUnifiedTopology:true
},)

.then(() => console.log('Connected to db'))
.catch((err) => {console.error(err); });


app.get('/', async (request, response) => {
    try {
        response.render('index.ejs')
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})