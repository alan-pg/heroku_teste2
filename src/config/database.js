/* import 'dotenv/config';
import mongoose from 'mongoose' */
require('dotenv').config()
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const config = {
  uri: process.env.MONGO_URI,
  options: {
    useNewUrlParser: true,
    useFindAndModify: false,
  },
}

mongoose.connection.on('open', () => {
  console.log('Successfully connected to database.')
})

mongoose.connection.on('error', () => {
  throw new Error('Could not connect to MongoDB.')
})

const connect = () => mongoose.connect(config.uri, config.options)

/* export default {
  connect: () => mongoose.connect(config.uri, config.options)
} */

module.exports = connect
