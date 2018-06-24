<template>
  <div class="col-lg-4 col-sm-6 portfolio-item">
    <div v-if="!formularioActivado">
      <div class="card">
        <div class="card-header">
          <h4><i class="fas fa-clock"/> Solicitudes</h4>
        </div>
        <div class="card-body">
          <ul class="list-group" id="test2">
            <li class="list-group-item" v-bind:key="index" v-for="(item, index) in dataUser.solicitudes">
              <span><strong>Monto:</strong> ${{ item.monto }}</span><br>
              <span><strong>Plazo:</strong> {{ item.intervalo }} {{ item.nombre }}</span><br>
              <span><strong>Tarjeta:</strong> {{ item.tarjeta_credito == 1 ? 'Si': 'No' }}</span><br>
              <span><strong>Edad:</strong> {{ item.edad }}</span><br>
              <span><strong>Interes:</strong> {{ item.interes }}%</span><br>
            </li>
          </ul>
          <button type="submit" class="btn btn-primary w-100 mt-3" v-on:click="solicitar()" ><strong>Solicitar</strong></button>
        </div>
      </div>
    </div>
    <div v-else>
      <Component-nueva-solicitud
        v-on:desactivarFormulario="desactivarFormulario"
        v-on:loadData="loadData"
        :dataUser="dataUser"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Component-solicitudes',
  props: ['dataUser'],
  data: function () {
    return {
      formularioActivado: false
    }
  },
  methods: {
    solicitar: function () {
      this.formularioActivado = true
    },
    desactivarFormulario: function () {
      this.formularioActivado = false
    },
    loadData: function (data) {
      this.$emit('loadData', data)
    }
  }
}
</script>
