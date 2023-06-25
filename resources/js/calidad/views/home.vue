<template>
  <section id="dashboard">
    <b-container fluid class="px-0">
  
      <b-row>
        <b-col cols="12" md="4">
  
          <statistic-card-horizontal icon="fas fa-user-tie" fontAwesome clipboard-list color="primary"
            :statistic="socios" statistic-title="Total Socios" />
  
          <statistic-card-horizontal icon="fas fa-user-friends" fontAwesome color="secondary" :statistic="clientes"
            statistic-title="Clientes" />
  
          <statistic-card-horizontal icon="fas fa-newspaper" fontAwesome color="warning" :statistic="contenidos_publicados"
            statistic-title="Contenido publicado | Blog" />
  
        </b-col>
        <b-col cols="12" md="8">
          <b-card>
            <b-card-title>
              Contenido publicado del ultimo año
            </b-card-title>
            <line-chart style="height:280px" :chartData="contenido_mens" id="Grafica1" />
          </b-card>
  
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" class="d-flex w-100">

          <statistic-card-horizontal icon="fas fa-users-cog" fontAwesome clipboard-list color="info" :statistic="usuarios"
            statistic-title="Usuarios" class="flex-grow-1" />
  
          <statistic-card-horizontal icon="fas fa-balance-scale" fontAwesome color="success" :statistic="servicios"
            statistic-title="Servicios" class="flex-grow-1 mx-md-1" />
  
          <statistic-card-horizontal icon="fas fa-map-marked-alt" fontAwesome color="warning" :statistic="sucursales"
            statistic-title="Sucursales" class="flex-grow-1" />

        </b-col>
      </b-row>
      <b-row v-if="$can('read','entregas')">
        <b-col cols="12">
          <b-card>

            <b-card-title>
              <h2 class="font-weight-bolder">Blog</h2>
            </b-card-title>
            
            <blog />
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>

import {
  BRow, BCol,
  BContainer,
  BCard,
  BCardTitle,
}
  from 'bootstrap-vue'
import { ref, onMounted, toRefs, computed } from 'vue';

import StatisticCardWithLineChart from 'components/dashboard/StaticCardWithLineChart.vue'
import TarjetasAgrupadasStaticas from 'components/dashboard/TarjetasAgrupadasStaticas.vue';

import store from '@/store';

import StatisticCardHorizontal from 'components/dashboard/StatisticCardHorizontal.vue'

export default {

  components: {
    BRow,
    BCol,
    BContainer,
    BCard,
    BCardTitle,
    StatisticCardWithLineChart,
    StatisticCardHorizontal,
    TarjetasAgrupadasStaticas,
    Blog: () => import('views/blog/lists.vue'),
    LineChart: () => import('components/charts/LineChart.ts')
  },

  setup(props) {

    const siteTraffic = ref({});
    const { socios, clientes,
            contenidos_publicados,
            usuarios,
            servicios,
            sucursales,
            contenido_mensuales } = toRefs(store.state.home)

    onMounted(() => {
      store.dispatch('home/getData')
    })

    return {
      siteTraffic,
      socios,
      contenidos_publicados,
      usuarios,
      clientes,
      servicios,
      sucursales,
      contenido_mens: computed(() => contenido_mensuales.value)

    };

  }


}
</script>

<style lang="scss">
@import '~@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '~@core/scss/vue/libs/chart-apex.scss';
</style>
