<template>
   <b-container fluid class="px-0">
      <b-row class="header-contacto mx-0">
         <b-col cols="12" class="d-flex justify-content-center">
            <h2 class="d-inline">Nuestras Políticas de Privacidad</h2>
         </b-col>
      </b-row>

      <b-row class="my-1">
         <b-col cols="12" class="contenido-quienes-somos">
            <b-container :fluid="windowWidth <= 762 ? true : false">
               <b-row>
                  <b-col cols="12">
                     <section v-html="politica.politicas"></section>
                  </b-col>
               </b-row>
            </b-container>

         </b-col>
      </b-row>
      <hr>
      <publicaciones-recientes />

   </b-container>
</template>

<script>
import {
   BContainer,
   BRow,
   BCol,
} from 'bootstrap-vue'

import store from '@/store'
import { computed, toRefs,onMounted } from 'vue'

export default {

   components: {
      BContainer,
      BRow,
      BCol,
      PublicacionesRecientes: () => import('components/PublicacionesRecientes.vue')
      // NabvarPagina: () => import('components/NabvarPagina.vue')
   },

   metaInfo: {
      title: 'Políticas de Privacidad | Villamizar & Jarava Abogados Asociados S.A.S'
   },

   setup() {
      const { politica } = toRefs(store.state.politica)

      onMounted(() => {
         if(!politica.value.id){
            store.dispatch('politica/getPolitica')
         }
      })
      return {
         politica,
         windowWidth: computed(() => store.state.app.windowWidth)
      }
   },
}

</script>

<style lang="scss">
@import '@/assets/scss/variables/variables';

ul li {
   list-style: none;
}

.header-contacto {
   height: 300px;
   padding: 3rem;
   display: flex;
   justify-content: center;
   align-items: center;
   background-image: url('/storage/fond_abogado.jpg');
   background-repeat: no-repeat;
   background-size: cover;
   background-position: right top;


   &::before {
      content: "";
      width: 100%;
      height: 300px;
      position: absolute;
      background-color: #0000007d;
   }

   h2 {
      padding: 1rem;
      border: 2px solid white;
      font-weight: bolder;
      color: white;

   }
}

@media (min-width:762px) {
   .border-right-md-4 {
      border-right: 4px solid;
   }
}


@media (min-width:1092px) {
   .header-contacto {
      background-attachment: fixed;
      background-size: contain;
   }
}


.contenido-quienes-somos {
   iframe {
      width: 100%;
      height: 450px;
   }
}
</style>