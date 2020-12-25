require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const nunjucks = require('nunjucks')
const database = require('./config/database')
const scoreRoute = require('./routes/scoreRoute')
const ScoreModel = require('./model/score')

const port = process.env.PORT
const app = express()
app.use(cors())


nunjucks.configure('src/game',{
  express: app,
  noCache: true,

})
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("src/game"))


scoreRoute(app)

app.get('/', async (req, res) => {
  try {
    const teste = 'opaaa'
    const scores = await ScoreModel.findOne()
    console.log('teste ', scores.score)
    return res.render("snake.html", { data: scores.score})
    //return res.render("teste.njk", { data: teste })
    res.send("teste")
    
} catch (error) {
    res.status(400).send({ error: 'Failed to find score' })
}  
})

app.post('/teste', (req, res) => {
  const username = req.body.username
  res.send(`user name ${username}`)
})

database().then(() => {
  app.listen(port, () => console.log(`API rodando na porta: ${port}`))
})