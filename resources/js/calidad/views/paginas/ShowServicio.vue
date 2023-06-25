<template>
   <b-container fluid class="my-1">
      <b-row>
         <b-col cols="12">
            <show-servicio :servicio="servicio" :imgBanner="imgBanner" v-if="servicio" />
         </b-col>
      </b-row>
   </b-container>
  
</template>

<script>

import store from '@/store'
import {computed,toRefs,onMounted,watch,ref} from 'vue'

import {
   BContainer,
   BRow,
   BCol
} from 'bootstrap-vue'

export default {
   props:['url'],
   components:{
      BContainer,
      BRow,
      BCol,
      ShowServicio:() => import('components/ShowServicio.vue')
   },

   setup(props) {

      const {url} = toRefs(props)
      const servicio = ref(null);

      const cargarForm = () => {

         store.dispatch('servicio/cargarPorUrl',url.value).then((service) => {
            servicio.value = service
         })

      }

      onMounted(() => cargarForm())

      watch(url,() => cargarForm())


      return {
         servicio,
         imgBanner:computed(() => servicio.value ? `/storage/servicios/banner/${servicio.value.banner}` : ''),
         loading:computed(() => store.state.loading)
      }
   },
}
</script>