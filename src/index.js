//import 'dotenv/config';
//import express from 'express'
//import bodyParser from 'body-parser'
//import cors from 'cors'
//import nunjucks from 'nunjucks'
//import database from './config/database'
//import scoreRoute from './routes/scoreRoute'
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


app.get('/', (req, res) => {
  res.json({status: 'Server is running!'})
})
app.get('/snakegame', (req, res) => {
  res.render('index.html')
})


database().then(() => {
  app.listen(port, () => console.log(`API rodando na porta: ${port}`))
})