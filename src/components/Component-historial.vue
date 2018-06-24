<template>
  <div class="col-lg-4 col-sm-6 portfolio-item">
    <div class="card">
      <div class="card-header ">
        <h4><i class="fas fa-calendar-alt"/> Historial</h4>
      </div>
      <div class="card-body">
        <ul class="list-group">
          <li class="list-group-item" v-bind:class="[ item.autorizado ? 'saceptado' : 'srechazado']" v-bind:key="index" v-for="(item, index) in dataUser.historial">
            <!-- {{item}} -->
            <span><strong>Monto:</strong> ${{ item.monto }}</span><br>
            <span><strong>Plazo:</strong> {{ item.intervalo }} {{ item.nombre }}</span><br>
            <span><strong>Interes:</strong> {{ item.interes }}%</span><br>
            <span><strong>Tarjeta:</strong> {{ item.tarjeta_credito == 1 ? 'Si': 'No' }}</span><br>
            <span><strong>Edad:</strong> {{ item.edad }}</span><br>
            <span><strong>Total a pagar:</strong> ${{ item.monto + (item.interes/100*item.monto*item.intervalo)  /* monto + ( interes/100 * monto * meses) */ }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Component-historial',
  props: ['dataUser']
  // data: function () {
  //   return {
  //     dataUser: {}
  //   }
  // }
}
</script>
