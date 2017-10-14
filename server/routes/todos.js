var express = require('express');
var router = express.Router();
const todoController = require('../controllers/todoController');
var authHelper = require('../helpers/authHelper');

/* GET users listing. */
router.get('/', todoController.allTodo);
router.post('/', todoController.postTodo);
router.get('/:category', todoController.categoryTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
