
const express = require('express')
const app = express()
const port = 1989

app.use(express.static('game'))

app.get('/', (req, res) => {
  res.sendFile("index.html")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})