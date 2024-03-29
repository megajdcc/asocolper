<template>
  <div id="app" class="h-100" :class="[skinClasses]">
    <component :is="layout">
      <router-view />
    </component>
    <scroll-to-top v-if="enableScrollToTop" />
  </div>
</template>

<script>

import ScrollToTop from '@core/components/scroll-to-top/ScrollToTop.vue'

import { $themeColors, $themeBreakpoints, $themeConfig } from '@themeConfig'
import { watch, onMounted, toRefs, onActivated, computed } from 'vue'
import useAppConfig from '@core/app-config/useAppConfig'
import { useWindowSize, useCssVar, useNetwork } from '@vueuse/core'
import store from '@/store'
// import { Notification } from 'element-ui'

// import { useRoute } from 'vue2-helpers/vue-router';

export default {

  components: {
    LayoutHorizontal: () => import('@/layouts/horizontal/LayoutHorizontal.vue'),
    LayoutVertical: () => import('@/layouts/vertical/LayoutVertical.vue'),
    LayoutFull: () => import('@/layouts/full/LayoutFull.vue'),
    LayoutPublic: () => import('@/layouts/public/LayoutPublic.vue'),
    ScrollToTop,
  },

  beforeCreate() {
    
    // Set colors in theme
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']

    // eslint-disable-next-line no-plusplus

    for (let i = 0, len = colors.length; i < len; i++) {
      $themeColors[colors[i]] = useCssVar(`--${colors[i]}`, document.documentElement).value.trim()
    }

    // Set Theme Breakpoints
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl']

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = breakpoints.length; i < len; i++) {
      $themeBreakpoints[breakpoints[i]] = Number(useCssVar(`--breakpoint-${breakpoints[i]}`, document.documentElement).value.slice(0, -2))
    }

    // Set RTL
    const { isRTL } = $themeConfig.layout
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')



  },

    computed:{

      contentLayoutType(){
        return this.$store.state.appConfig.layout.type
      },

      layout(){
        if (this.$route.meta.layout === 'full') {
          return 'layout-full'
        } else if (this.$route.meta.layout === 'public'){
          return `layout-public`
        }else {
          return `layout-${this.contentLayoutType}`
        }
      }

    },



  setup(props) {
    const { skin, skinClasses } = useAppConfig()
    const { enableScrollToTop } = $themeConfig.layout

    // If skin is dark when initialized => Add class to body
    if (skin.value === 'dark') document.body.classList.add('dark-layout')

    // Set Window Width in store
    store.commit('app/UPDATE_WINDOW_WIDTH', window.innerWidth)
    const { width: windowWidth } = useWindowSize()

    watch(windowWidth, (val) => {
      store.commit('app/UPDATE_WINDOW_WIDTH', val)
    })

    onMounted(() => {

      store.dispatch('sistema/getSistema')

      if (localStorage.getItem('token')) {
        store.commit('usuario/cargarUser', JSON.parse(localStorage.getItem('userData')));
      }

    })

    return {
      skinClasses,
      skin,
      enableScrollToTop
    }
  },


}
</script>
