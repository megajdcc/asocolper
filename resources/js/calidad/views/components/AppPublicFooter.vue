<template>
   <b-container fluid>
      <b-row>
         <b-col cols="12" class="d-flex justify-content-center">
            <ul class="nav justify-content-center" :class="{ 'w-75': windowWidth >= 762}">
               <li class="nav-item" v-if="!is_loggin">
                  <b-link :to="{name:'login'}" class="nav-link px-2 font-weight-bolder">
                     Zona de Miembros
                  </b-link>
               </li>

               <li class="nav-item">
                  <b-link :to="{name:'quienes.somos'}" class="nav-link px-2 font-weight-bolder">
                     Quienes Somos
                  </b-link>
               </li>

               <li class="nav-item">
                  <b-link :to="{name:'nuestros.socios'}" class="nav-link px-2 font-weight-bolder">
                     Nuestros Socios
                  </b-link>
               </li>

               <li class="nav-item">
                  <b-link :to="{name:'servicios'}" class="nav-link px-2 font-weight-bolder">
                    Servicios
                  </b-link>
               </li>

               <li class="nav-item">
                  <b-link :to="{name:'blog.public'}" class="nav-link px-2 font-weight-bolder">
                     Blog
                  </b-link>
               </li>

               <li class="nav-item">
                  <b-link :to="{name:'politicas.public'}" class="nav-link px-2 font-weight-bolder">
                     Políticas de Privacidadd
                  </b-link>
               </li>


            </ul>

         </b-col>
      </b-row>

      <b-row class="clearfix border-top">
         <b-col cols="12" :md="sistema.redes.length ? 8 : 12" class="d-flex mt-1 mb-0 flex-column  align-items-center">
            <strong>{{ sistema.sucursales.length > 1 ? 'SUCURSALES' : 'SUCURSAL' }}</strong>
           
         </b-col>

         <b-col cols="12" :md="sistema.redes.length ? 4 : 12" class="mb-0 d-flex align-items-center flex-column mt-1" v-if="sistema.redes.length">
            <strong class="mb-1"> REDES SOCIALES</strong>
            <div class="d-flex flex-sm-row justify-content-start align-items-center w-100">
               
               <ul class="list-unstyled d-flex m-0 justify-content-around w-100">
                  <li  v-for="({url,nombre,icono},i) in sistema.redes" :key="i">
                     <b-link :href="url" :alt="nombre" :title="nombre" v-b-tooltip.hover.top.v-primary target="_blank" class="wow bounceInDown" :data-wow-delay="`1.${i}`">
                        <feather-icon :icon="icono" size="36" />
                     </b-link>
                  </li>
         
               </ul>
            </div>
         </b-col>


        
      </b-row>
      <hr>
      <b-row>

        
         <b-col cols="12" class="text-center d-flex justify-content-center">
               <span class="float-md-left d-block d-md-inline-block ">
                  COPYRIGHT © {{ new Date().getFullYear() }}
                  <b-link class="ml-25" href="#" target="_blank">{{ sistema.nombre }}</b-link>
                  <span class="d-none d-sm-inline-block">, Todos los derechos reservados</span>
               </span>
         </b-col>
      </b-row>
   </b-container>
</template>

<script>
import {
   BLink,
   BContainer,
   BRow,
   BCol,
   VBTooltip,
   BImg,
   BCardText
} from 'bootstrap-vue'
import useAuth from '@core/utils/useAuth'
import { $themeConfig } from '@themeConfig'
import { toRefs, computed,ref } from 'vue'
import store from '@/store'
export default {
   components: {
      BContainer,
      BRow,
      BCol,
      BLink,
      BImg,
      BCardText
   },

   directives:{
      'b-tooltip':VBTooltip
   },

   setup() {

      const {sistema} = toRefs(store.state.sistema)
      
      const swiperOptions = ref({
         speed: 600,
         parallax: true,
         autoplay:{
            delay:6000,
            disableOnInteraction: false
         },

         pagination: {
            el: '.swiper-pagination',
            clickable: true,
         },
         navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
         }
      })

      const {
         appName: app_name
      } = $themeConfig.app;

      const { windowWidth } = toRefs(store.state.app)

      const {
         is_loggin
      } = useAuth()

     


      return {
         windowWidth,
         is_loggin,
         app_name,
         sistema,
         swiperOptions,
         windowWidth: computed(() => store.state.app.windowWidth)
      }
   }
}
</script>

<style lang="scss">

</style>
