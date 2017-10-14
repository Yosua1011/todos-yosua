const Todo = require('../models/Todo')

module.exports = {
  allTodo: (req, res) => {
    Todo.find().sort({date: 'ascending'})
    .then(todo => {
      res.send(todo)
    })
    .catch(err => res.send(err))
  },

  postTodo: (req, res) => {
    Todo.create({
      description: req.body.description,
      date: req.body.date,
      complete: req.body.complete,
      category: req.body.category,
    })
    .then(todo => {
      res.send(todo)
    })
    .catch(err => res.send(err))
  },

  categoryTodo: (req, res) => {
    Todo.find({category: req.params.category})
    .then(specificTodo => res.send(specificTodo))
    .catch(err => res.send(err))
  },

  updateTodo: (req, res) => {
    Todo.findOneAndUpdate({
      _id: req.params.id
    }, {
      complete: req.body.complete
    })
    .then(todo => res.send(todo))
    .catch(err => res.send(err))
  },

  deleteTodo: (req, res) => {
    Todo.remove({
      _id: req.params.id
    })
    .then(todo => {
      res.send({
        msg: 'Todo removed',
        data: result
      })
    })
    .catch(err => res.send(err))
  }
}
