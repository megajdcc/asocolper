<template>
  <div class="navbar-header  d-xl-block d-none">
    <ul class="nav navbar-nav">
      <li class="nav-item">
        <b-link class="navbar-brand wow slideInLeft"  to="/" data-wow-duration="1s">
          <span class="logo">
            <b-img :src="logo" alt="logo" style="max-width:auto !important" width="293" height="40" />
          </span>
          <!-- <h2 class="brand-text mb-0">
            {{ appName }}
          </h2> -->
        </b-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { BLink, BImg } from 'bootstrap-vue'
import { $themeConfig } from '@themeConfig'
import {computed,toRefs,onMounted} from 'vue'
import store from '@/store'
import useLogotipos from '@core/utils/useLogotipos.js'


export default {
  components: {
    BLink,
    BImg,
  },
  setup() {
    // App Name
    const { appName } = $themeConfig.app
    const { skin } = toRefs(store.state.appConfig.layout)

    const {
      logotipo,
      logotipobg
    } = useLogotipos();


    onMounted(() => {
      console.log(skin.value)
    })


    return {
      appName,
      logo:computed(() => {
        return skin.value == 'semi-dark' ? logotipobg.value : logotipo.value;
      })

    }
  },
}
</script>

<style>

</style>
