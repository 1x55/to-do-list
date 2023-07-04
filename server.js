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

//GET Method
app.get('/', async (request, response) => {
    try {
        TodoTask.find({}, (err, tasks) => {
         response.render('index.ejs', {
            todoTasks: tasks
         })
        })
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})

//POST
app.post('/', async (request, response) => {
    const todoTask = new TodoTask(
        {
            title: request.body.title,
            content: request.body.content
        }
    )
    try {
        await todoTask.save()
        console.log(todoTask)
        response.redirect('/')
    } catch(err) {
        if (err) return response.status(500).send(err)
        response.redirect('/ ')
    }
})


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})