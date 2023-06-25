<template>
   <b-row class="mx-0" style="background: linear-gradient(0deg,#1b191a,#053844 100%) " v-if="nuestrosClientes.length">
      <b-col cols="12" class="py-2 px-0">
         <b-container :fluid="windowWidth <= 762 ? true : false">
            <h2 class="text-center font-weight-bolder text-italic">Nuestros Clientes</h2>

         </b-container>
      </b-col>
   </b-row>
</template>

<script>

import {
   BRow,
   BCol,
   BContainer,
   BMedia,
   BMediaAside,
   BMediaBody,
   BLink,
   BImg,
   VBTooltip

} from 'bootstrap-vue'
import useContenidoList from 'views/paginas/useContenidoList.js'

import { computed, ref } from 'vue'
import store from '@/store'

export default {

   components: {
      BRow,
      BCol,
      BContainer,
      BMedia,
      BMediaAside,
      BMediaBody,
      BLink,
      BImg,
   },

   directives: {
      'b-tooltip': VBTooltip
   },

   setup() {

      const {
         nuestrosClientes,
      } = useContenidoList();

      const swiperData = [
         { img: require('@/assets/images/banner/banner-35.jpg') },
         { img: require('@/assets/images/banner/banner-39.jpg') },
         { img: require('@/assets/images/banner/banner-38.jpg') },
         { img: require('@/assets/images/banner/banner-37.jpg') },
         { img: require('@/assets/images/banner/banner-36.jpg') },
         { img: require('@/assets/images/banner/banner-34.jpg') },
         { img: require('@/assets/images/banner/banner-33.jpg') },
         { img: require('@/assets/images/banner/banner-32.jpg') },
         { img: require('@/assets/images/banner/banner-31.jpg') },
      ]

      const swiperOptions = ref({
         effect: 'coverflow',
         grabCursor: true,
         centeredSlides: true,
         slidesPerView: 'auto',
         coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
         },

         autoplay: {
            delay: 2500,
            disableOnInteraction: false,
         },

         pagination: {
            el: '.swiper-pagination',
         },

         breakpoints: {
            1024: {
               slidesPerView: 4,
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
         },

      })


      return {
         nuestrosClientes,
         swiperOptions,
         swiperData,
         windowWidth: computed(() => store.state.app.windowWidth)
      }

   },
}
</script>

