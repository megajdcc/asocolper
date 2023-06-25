<template>
   <b-row class="mx-0" v-if="publicacionesRecientes.length">
      <b-col cols="12" class="py-2 px-0">
         <b-container :fluid="windowWidth <= 762 ? true : false">
            <h2 class="text-center font-weight-bolder">Publicaciones del Blog Recientes</h2>
            <small class="text-justify">Ultimos 3 meses</small>
            <b-row>
               <b-col cols="12">
                 
               </b-col>
   
            </b-row>
         </b-container>
      </b-col>
   </b-row>
</template>

<script>

   import{
      BRow,
      BCol,
      BContainer,
      BMedia,
      BMediaAside,
      BMediaBody,
      BLink,
      BImg,


   } from 'bootstrap-vue'
import useContenidoList from 'views/paginas/useContenidoList.js'

import {computed,ref} from 'vue'
import store from '@/store'

export default {

   components:{
      BRow,
      BCol,
      BContainer,
      BMedia,
      BMediaAside,
      BMediaBody,
      BLink,
      BImg,
   },

   setup() {

      const {
         publicacionesRecientes,
      } = useContenidoList();
      

      const swiperOptions = ref({
         speed: 600,
         // parallax: true,
         slidesPerView: '2',
         // centeredSlides: true,
         spaceBetween: 30,
         // effect: 'coverflow',
         // grabCursor: true,
         // coverflowEffect: {
         //    rotate: 50,
         //    stretch: 0,
         //    depth: 100,
         //    modifier: 1,
         //    slideShadows: true,
         // },

         autoplay: {
            delay: 6000,
            disableOnInteraction: false
         },

         pagination: {
            el: '.swiper-pagination',
            clickable: true,
         },

         breakpoints: {
            1024: {
               slidesPerView: 3,
               spaceBetween: 40,
            },
            768: {
               slidesPerView: 3,
               spaceBetween: 30,
            },
            640: {
               slidesPerView: 2,
               spaceBetween: 20,
            },
            320: {
               slidesPerView: 1,
               spaceBetween: 10,
            },
         }
         // navigation: {
         //    nextEl: '.swiper-button-next',
         //    prevEl: '.swiper-button-prev',
         // }
      })


      return {
         publicacionesRecientes,
         swiperOptions,
         windowWidth: computed(() => store.state.app.windowWidth)
      }

   },
}
</script>

