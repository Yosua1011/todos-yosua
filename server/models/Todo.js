const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  description: {type: String, required: true},
  date: {type: String, required: true},
  complete: Boolean,
  category: [String]
}, {
  timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
