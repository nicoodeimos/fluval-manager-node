import express = require('express')

let app = express()
app.get('/', (request, result) =>
  result.send('Hello mofo')
)
app.listen(8080)