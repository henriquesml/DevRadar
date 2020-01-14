const express = require('express')

const app = express()

app.get('/', (request, response) => {
    return response.json( { message: 'Eaed' } )
} )

app.listen(3333)