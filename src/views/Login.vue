<template>
  <div class="container pt-5">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-lg-4 col-sm-6 portfolio-item">
        <div class="card">
          <div class="card-header">
            <h4><i class="fas fa-user-lock"/> Login</h4>
          </div>
          <div class="card-body">
            <div class="input-group mb-3">
              <input type="text" v-model="name" class="form-control" placeholder="Usuario" aria-label="Usuario" aria-describedby="basic-addon2" required autofocus>
              <div class="input-group-append">
                <button class="btn btn-primary" type="button" v-on:click="dosomething()" :disabled='!isComplete' >Acceder</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      name: '',
      user: []
    }
  },
  methods: {
    dosomething: function (event) {
      let self = this
      /* global axios */
      axios.post('http://localhost:3000/api/user', {user: this.name})
        .then(res => {
          self.$socket.emit('login', this.name)
          self.$router.push({name: 'Panel', params: {data: res.data, name: self.name}})
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    isComplete: function () {
      return this.name.length > 3
    }
  }
}
</script>
