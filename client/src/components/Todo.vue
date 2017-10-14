<template lang="html">
  <div class="container">
     <div class="row">
        <div class="col-md-8 col-md-offset-2">
           <form class="form-horizontal">
              <fieldset>
                 <button href="#" class="fb-login-button  center-block btn btn-warning" @click="logoutfb()" name="button">Log Out</button>
                 <legend style="color:silver; font-family: Comic Sans MS" class="text-center">
                    <h2>Welcome</h2>
                 </legend>
                 <div class="form-group">
                    <label for="inputDescription" class="col-lg-2 control-label" style="color:silver; font-size:24px; padding-bottom:0px;">DESCRIPTION</label><br>
                    <div class="col-lg-12">
                       <input type="text" class="form-control" id="inputDescription" placeholder="What do you want to do?" v-model="description" >
                    </div>
                 </div>
                 <div class="form-group">
                    <label for="kategori" class="col-lg-2 control-label" style="color:silver; font-size:24px">
                    CATEGORY
                    </label>
                    <div class="col-lg-12">
                       <select v-model="category" id="milih" >
                          <option value="" selected="">Choose Category</option>
                          <option v-for="(categ, index) in categories">{{ categ.name }}</option>
                       </select>
                    </div>
                 </div>
                 <!-- DUE DATE -->
                 <div class="form-group">
                    <label for="calendar" class="col-lg-2 control-label"style="color:silver; font-size:24px" >
                    DUEDATE
                    </label>
                    <div class="col-lg-12">
                       <input type="date" id="calendar" v-model="date" >
                    </div>
                 </div>
                 <!-- BUTTON -->
                 <div class="form-group">
                    <div class="text-center">
                       <button type="reset" class="btn btn-success" v-on:click="addNew()">
                       <i class="fa fa-plus icon"></i>
                       Add
                       </button>
                    </div>
                 </div>
                 <!-- LIST TODO -->
                 <div class="form-group">
                    <div class="text-center">
                       <legend><label class="control-label" style="color:teal; font-size:24px">Your List</label></legend>
                    </div>
                    <div class="col-lg-12">
                       <div class="radio" v-for="(item,index) in todo">
                          <div class="" style="color:gold;">
                             <strong>
                                {{item.description}}, CATEGORY : {{item.categories}}
                                <i class="fa fa-calendar"></i>
                                {{item.date}}
                             </strong>
                             <button type="submit" class="btn btn-danger" @click="deleteTodo(item._id,index)">
                             <i class="fa fa-trash-o icon"></i>
                             delete
                             </button>
                          </div>
                          STATUS:
                          <input type="checkbox"  name="optionsRadios" id="optionsRadios1" v-model="item.complete" @change="updateTodo(item._id,item.complete,index)" style="text-center"> {{status}}
                       </div>
                    </div>
                 </div>
              </fieldset>
           </form>
        </div>
     </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['login', 'userid', 'username'],
  data () {
    return {
      description: null,
      category: null,
      date: null,
      complete: false,
      todo: [],
      username: null,
      status: 'NOT DONE',
      categories: [
        {name: 'Personal'},
        {name: 'Work'},
        {name: 'Education'},
        {name: 'Other'}
      ]
    }
  },
  watch: {
    // whenever question changes, this function will run
    login: function (newQuestion) {
      this.answer = true
    }
  },
  mounted: function () {
    if (!localStorage.getItem('userId')) {
      this.$router.push('/')
    } else {
      this.getData()
      this.username = localStorage.username
    }
  },
  methods: {
    getData () {
      var self = this
      // axios.get(`http://localhost:3000/todo`).then(result => {
      axios.get(`http://35.198.226.10/todo`).then(result => {
        self.todo = result.data
        console.log(result.data)
        console.log(self.todo)
        console.log(localStorage.taskItems)
      })
      .catch(err => {
        console.log(err)
      })
    },
    addNew () {
      var self = this
      if (self.description === null || self.category === null || self.date === null) {
        this.showAlert('Please fill of all your todo data')
      } else {
        // axios.post('http://localhost:3000/todo', {
        axios.post('http://35.198.226.10/todo', {
          description: self.description,
          categories: self.category,
          date: self.date,
          complete: false,
          userId: localStorage.userId
        })
        .then(result => {
          self.todo.push(result.data)
          this.showAlert('You add a todo list')
        })
        .catch(err => {
          console.log(err)
          this.showAlert('Error adding todo')
        })
      }
    },
    updateTodo (idTodo, status, index) {
      // axios.put(`http://localhost:3000/todo/${idTodo}`, {
      axios.put(`http://35.198.226.10/todo/${idTodo}`, {
        complete: status
      })
      .then(result => {
        console.log('ini result ', result.data.complete)
        if (result.data.complete === false) {
          this.status = 'DONE'
          this.showAlert('Your todo is done')
        } else {
          this.status = 'NOT DONE'
          this.showAlert('Your todo is undone')
        }
      })
    },
    deleteTodo (idTodo, index) {
      var self = this
      // axios.delete(`http://localhost:3000/todo/${idTodo}`)
      axios.delete(`http://35.198.226.10/todo/${idTodo}`)
      .then(result => {
        self.todo.splice(index, 1)
        this.showAlert('Success delete your todo')
      })
      .catch(err => {
        this.showAlert('Error delete your todo')
        console.log(err)
      })
    },
    logoutfb () {
      var self = this
      localStorage.clear()
      self.isLogin = false
      this.$router.push('/')
    },
    showAlert (msg) {
      // Use sweetalret2
      this.$swal(`${msg}`)
    },
    editdata (data, index) {
      var status = ''
      if (data.complete === true) {
        status = 'done'
      } else {
        status = 'undone'
      }
      var self = this
      this.$http.put(`/todos/${data._id}`, {
        check: status
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        console.log(self.todoslist[index])
        self.todoslist[index].check = status
        this.showAlert(`You just ${this.todoslist[index].check} this todo item`)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="css">
.btn {
  align:center;
}

.container {

}

.complete-true {
  text-decoration: line-through;
  color: #bebebe;
}

.category-Personal { background: #2980b9; }

.category-Work { background: #8e44ad; }

.category-Education { background: #f39c12; }

.category-Other { background: #d35400; }

.taskList .taskDate {
  color: #95a5a6;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  display: block;
  margin-left: 41px;
}

.fa-calendar {
  margin-right: 10px;
  font-size: 24px;
}

.form-gorup {
  opacity:0.5;
}
</style>
