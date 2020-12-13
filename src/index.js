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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("src/game"))

scoreRoute(app)

app.get('/snakegame', (req, res) => {
  res.render('index.html')
})

app.post('/teste', (req, res) => {
  const username = req.body.username
  res.send(`user name ${username}`)
})

database().then(() => {
  app.listen(port, () => console.log(`API rodando na porta: ${port}`))
})