<template>
  <div class="navbar-header d-xl-block d-none">
    <ul class="nav navbar-nav">
      <li class="nav-item">
        <b-link class="navbar-brand" to="/" >
          <span class="brand-logo">
            <b-img :src="logo" alt="logo" style="max-width: 230px !important;"/>
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

import useLogotipos from '@core/utils/useLogotipos'
import useAppConfig from '@core/app-config/useAppConfig'


import {computed} from 'vue'

export default {
  components: {
    BLink,
    BImg,
  },
  setup() {
    // App Name

    const { skin } = useAppConfig()


    const {
      logotipo,
      logotipobg
    } = useLogotipos()

    const { appName } = $themeConfig.app
    return {
      appName,
      logo: computed(() => {
        return skin.value == 'semi-dark' ? logotipo.value : logotipobg.value;
      })
    }
  },
}
</script>

<style lang="scss" >

.brand-logo img{
  max-width:230px !important;
}

</style>
