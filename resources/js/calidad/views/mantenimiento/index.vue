<template>
  <!-- Under maintenance-->
  <div class="misc-wrapper">
   <!-- Brand logo-->
      <b-link class="brand-logo" :to="{name:'home'}">
        
         <!-- <img src="/storage/logotipo.png" alt="Logo" /> -->
        <!-- <h2 class="brand-text text-primary ml-1">
          Boda y Playa
        </h2> -->
      </b-link>
      <!-- /Brand logo-->

    <div class="misc-inner p-2 p-sm-3">
      <div class="w-100 text-center">
        <h2 class="mb-1">
          En mantenimiento 🛠
        </h2>

        <p class="mb-3">
          Disculpe las molestias, pero estamos realizando algunas tareas de mantenimiento en este momento. <br>
          <b-link href="/" title="Ir al Home " target="_self">
            Ir a Home
          </b-link>
        </p>
        <!-- img -->
        <b-img
          fluid
          :src="imgUrl"
          alt="Under maintenance page"
          :style="{
            height:'450px'
          }"
        />
      </div>
    </div>
  </div>
<!-- / Under maintenance-->
</template>

<script>
/* eslint-disable global-require */
import { BLink, BFormInput, BButton, BForm, BImg } from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import store from '@/store/index'
import {computed,toRefs} from 'vue'

import useLogotipos from '@core/utils/useLogotipos'
export default {
  components: {
    BLink,
    BFormInput,
    BButton,
    BForm,
    BImg,
    VuexyLogo,
  },
  data() {
    return {
      downImg: require('@/assets/images/pages/under-maintenance.svg'),
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require('@/assets/images/pages/under-maintenance-dark.svg')
        return this.downImg
      }
      return this.downImg
    },
  },

  setup(){
    const { skin } = toRefs(store.state.appConfig.layout)

    const {
      logotipo,
      logotipobg
    } = useLogotipos();

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
