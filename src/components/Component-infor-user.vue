<template>
  <div class="col-lg-4 col-sm-6 portfolio-item">
    <div class="card">
      <div class="card-header">
        <h4><i class="fas fa-id-card"/> Informacion</h4>
      </div>
      <div class="card-body">
        <ul class="list-group">
          <li class="list-group-item">
          <i class="fas fa-angle-right"/> <strong>Id:</strong> <span v-if="dataUser.informacion">{{dataUser.informacion.id}}</span>
          </li>
          <li class="list-group-item">
          <i class="fas fa-user"/> <strong>Nombre:</strong> <span v-if="dataUser.informacion">{{ dataUser.informacion.user}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Component-infor-user',
  props: ['dataUser']
  // data: function () {
  //   return {
  //     dataUser: {}
  //   }
  // }
}
</script>
