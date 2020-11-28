require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const nunjucks = require('nunjucks')
const database = require('./config/database')
const scoreRoute = require('./routes/scoreRoute')

const port = process.env.PORT
const app = express()
app.use(cors())

nunjucks.configure('src/game',{
  express: app,
  noCache: true,

})
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("src/game"))

scoreRoute(app)

app.get('/snakegame', (req, res) => {
  res.render('index.html')
})

app.get('/ml', (req, res) => {
  res.send('requisição recebida get')
})

app.post('/ml', (req, res) => {
  res.send('requisição recebida post')
})

database().then(() => {
  app.listen(port, () => console.log(`API rodando na porta: ${port}`))
})