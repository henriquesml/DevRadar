const express = require('express')
const mongoose = require('mongoose')
const pass = require('../password/pass')
const routes = require('./routes')

const app = express()

mongoose.connect(`mongodb+srv://hesch:${pass}@cluster0-1c7ya.mongodb.net/devradar?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json())
app.use(routes)

app.listen(3333)