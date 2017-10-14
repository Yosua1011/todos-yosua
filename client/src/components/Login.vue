<template>
  <div class="hello">
     <div class="text-center">
        <h1><strong>{{msg}}</strong></h1>
        <!-- FB DATA AREA -->
        <legend v-if="isLogin" style="color:silver font-family: Comic Sans MS">
           <h2>Welcome</h2>
        </legend>
        <!-- FACEBOOK LOGIN AREA -->
        <button v-if="!isLogin" v-on:click="loginfb()" class="btn btn-info">Login with Facebook</button>
     </div>
     <h2 v-if="!isLogin" class="text-center">To Continue please login </h2>
     <Todo v-if="isLogin" :login="isLogin"  :username="username" :userid="userid"></Todo>
     <!-- <Todo v-if="!isLogin":login="isLogin" :userid="userid"></Todo> -->
     <!-- TO DO AREA -->
  </div>
</template>


<script>
import axios from 'axios'
import Todo from '@/components/Todo'
// import FB from 'fb'
export default {
  name: 'login',
  data () {
    return {
      msg: `Welcome to Yosua's Todo App`,
      userid: null,
      username: null,
      isLogin: false
    }
  },
  components: {
    Todo
  },
  mounted: function () {
    // FB SDK
    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s); js.id = id
      // js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=119308148780939";
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
    // FB init
    // var self = this
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '292419654577687', // id fbApp
        cookie: true,  // enable cookies to allow the server to access
                            // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
      })
      // window.FB.getLoginStatus(function (response) {
      //   self.statusChangeCallback(response)
      // })
    }
    // alert(this.username)
  },
  methods: {
    loginfb () {
      window.FB.login(response => {
        console.log('statusChangeCallback')
        console.log(response)
        if (response.status === 'connected') {
          localStorage.setItem('fb_access_token', response.authResponse.accessToken)
          this.testAPI()
          this.$router.push('/todo')
        } else {
          this.showAlert('Please login')
        }
      })
    },
    testAPI () {
      console.log('Welcome!  Fetching your information.... ')
      this.showAlert('You just login')
      // axios.get('http://localhost:3000/signin', {
      axios.get('http://35.198.226.10/signin', {
        headers: {fb_access_token: localStorage.getItem('fb_access_token')}
      })
      .then(response => {
        this.userid = response.data.id
        console.log('data dari server', response.data)
        this.username = response.data.name
        localStorage.setItem('userId', this.userid)
        localStorage.setItem('username', this.username)
        this.usergue = localStorage.setItem('username', this.username)
        this.isLogin = true
        this.$router.push('/todo')
      })
      .catch(err => {
        console.log(err)
      })
    },
    showAlert (msg) {
      // Use sweetalret2
      this.$swal(`${msg}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

body {
  /*background-image: url("/static/1.jpg")*/
}

h1, h2 {
  /*font-size:20px*/
  font-weight: normal;
}

.text-center {
  font-weight: normal;
  /*font-family: sans-serif
  text-align: center*/
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
