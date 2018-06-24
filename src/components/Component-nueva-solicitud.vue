<template>
  <div class="card">
    <div class="card-header">
      <h4><i class="fas fa-plus-circle"/> Nueva solicitud</h4>
    </div>
    <form action="#" class="card-body">
      <div class="form-group">
        <label for="c2">Monto</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">$</span>
          </div>
          <input type="number" value="0" min="0" step="0.01" data-number-to-fixed="2" data-number-stepfactor="100" class="form-control currency" v-model="nuevaSolicitud.monto" />
        </div>
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput">Edad</label>
        <input type="text" class="form-control" v-model="nuevaSolicitud.edad" >
      </div>
      <div class="form-group">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="nuevaSolicitud.tarjeta">
          <label class="form-check-label" for="gridCheck">
            Tarjeta de credito
          </label>
        </div>
      </div>
      <div class="form-group">
        <label for="plazos">Plazo:</label>
        <select class="form-control" v-model="nuevaSolicitud.plazo">
          <option
            v-bind:key="index"
            v-for="(item, index) in plazos"
            :value="item.id" >{{item.intervalo}} {{item.nombre}}</option>
        </select>
      </div>
      <div class="btn-group w-100">
        <button class="btn btn-primary w-50" v-on:click="enviarNuevaSolicitud" :disabled="!isComplete" ><strong>Enviar</strong></button>
        <button class="btn btn-danger w-50" v-on:click="desactivarFormulario" ><strong>Cancelar</strong></button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Component-solicitudes',
  props: ['dataUser'],
  data: function () {
    return {
      formularioActivado: false,
      plazos: [],
      nuevaSolicitud: {
        monto: 0,
        edad: null,
        tarjeta: 0,
        plazo: 1
      }
    }
  },
  created: function () {
    let self = this
    // load plazos
    /* global axios */
    axios.get('http://localhost:3000/api/plazos') // Solicitar plazos
      .then(res => {
        self.plazos = res.data // cargamoslos datos en la variable data user para mostrar
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    solicitar: function () {
      this.formularioActivado = true
    },
    enviarNuevaSolicitud: function () {
      let self = this
      /* global axios */
      axios.post('http://localhost:3000/api/nuevaSolicitud', {solicitud: this.nuevaSolicitud, user: this.dataUser.informacion}) // volvemos a pedir los datos con el nombre de usuario
        .then(res => {
          self.nuevaSolicitud = {
            monto: 0,
            edad: null,
            tarjeta: null,
            plazo: 1
          }
          self.$emit('loadData', res.data)
          self.desactivarFormulario()
        })
        .catch(err => {
          console.log(err)
          this.formularioActivado = false
        })
    },
    desactivarFormulario: function () {
      this.$emit('desactivarFormulario')
    }
  },
  computed: {
    isComplete: function () {
      if (this.nuevaSolicitud.monto > 0 &&
          this.nuevaSolicitud.edad > 0 &&
          this.nuevaSolicitud.plazo > 0) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
