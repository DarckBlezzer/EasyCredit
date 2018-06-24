<template>
  <div class="container pt-5" >
    <div class="row">
      <Component-infor-user :dataUser="dataUser"/>
      <Component-historial :dataUser="dataUser"/>
      <Component-solicitudes
        v-on:loadData="loadData"
        :dataUser="dataUser"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: ['data', 'name'],
  created: function () { // guardamos el usuario para volver a cargar si refresca el usuario
    const self = this
    let nameUser = localStorage.getItem('nameUser') // obtenemos el nombre de local storage
    if (this.name != null) { // si viene la informacion de props de la anterior ventana
      localStorage.setItem('nameUser', this.name) // guardamos en nombre en local storage
      this.dataUser = this.data // asignamos a variable para mostrar
    } else if (nameUser != null) { // si el nombre esta en localstorage
      /* global axios */
      axios.post('http://localhost:3000/api/user', {user: nameUser}) // volvemos a pedir los datos con el nombre de usuario
        .then(res => {
          self.dataUser = res.data // cargamoslos datos en la variable data user para mostrar
          self.$socket.emit('login', self.dataUser.informacion.user)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      this.$router.push({name: 'Login'}) // redireccionamos a login si no hay nada
    }
  },
  data: function () {
    return {
      dataUser: [],
      plazos: []
    }
  },
  methods: {
    solicitar: function () {
      this.formularioActivado = true
    },
    loadData: function (data) {
      this.dataUser = data
    }
  },
  sockets: {
    connect: function () {
      if (this.dataUser != null && this.dataUser.informacion != null) {
        this.$socket.emit('login', this.dataUser.informacion.user)
      }
    },
    loadData: function (data) {
      console.log('Load data from sockets...', data)
      this.dataUser = data
    }
  }
}
</script>
