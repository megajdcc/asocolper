<template>
  <!-- Error page-->
  <div class="misc-wrapper">
       <!-- Brand logo-->
      <b-link class="brand-logo">
        
         <img :src="logo" alt="Logo" />
        <!-- <h2 class="brand-text text-primary ml-1">
          Boda y Playa
        </h2> -->
      </b-link>

    <div class="misc-inner p-2 p-sm-3">
      <div class="w-100 text-center">
        <h2 class="mb-1">
         Página no encontrada 🕵🏻‍♀️
        </h2>
        <p class="mb-2">
          ¡UPS! 😖 La URL solicitada no se encontró en este servidor.
        </p>

        <b-button
          variant="primary"
          class="mb-2 btn-sm-block"
          :to="{path:'/'}"
        >
          Regresar a home
        </b-button>

        <!-- image -->
        <b-img
          fluid
          :src="imgUrl"
          alt="Error page"
        />
      </div>
    </div>
  </div>
<!-- / Error page-->
</template>

<script>
/* eslint-disable global-require */
import { BLink, BButton, BImg } from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import store from '@/store/index'
import useLogotipos from '@core/utils/useLogotipos'
import {computed,toRefs} from 'vue'

export default {
  components: {
    VuexyLogo,
    BLink,
    BButton,
    BImg,
  },
  data() {
    return {
      downImg: require('@/assets/images/pages/error.svg'),
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require('@/assets/images/pages/error-dark.svg')
        return this.downImg
      }
      return this.downImg
    },
  },


  setup(){

    const {
      logotipo,logotipobg
    } = useLogotipos();
    const { skin } = toRefs(store.state.appConfig.layout)
    return {
      logo: computed(() => {
        return skin.value == 'semi-dark' ? logotipo.value : logotipobg.value;
      })
    }

  }

}
</script>

<style lang="scss">
@import '~@core/scss/vue/pages/page-misc.scss';
</style>
