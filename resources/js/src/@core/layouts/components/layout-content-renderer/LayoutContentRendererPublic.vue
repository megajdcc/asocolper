<template>
  <div class="app-content content" :class="[{'show-overlay': $store.state.app.shallShowOverlay}, $route.meta.contentClass]">
    
    <div class="content-overlay" />
    
    <div class="header-navbar-shadow" />

    <div class="content-wrapper" :class="contentWidth === 'boxed' ? 'container p-0' : null">
      <slot name="breadcrumb">
         <app-breadcrumb class="mt-1 px-1" />
      
      </slot>

      <div class="content-body">
        <transition name="fade" mode="out-in">
          <slot />
        </transition>
      </div>

    </div>
  </div>
</template>

<script>
import AppBreadcrumb from '@core/layouts/components/AppBreadcrumb.vue'
import useAppConfig from '@core/app-config/useAppConfig'

import {
   BContainer,
   BRow,
   BCol,
} from 'bootstrap-vue'

export default {
  components: {
    AppBreadcrumb,
      BContainer,
      BRow,
      BCol,
  },
  setup() {
    const { routerTransition, contentWidth } = useAppConfig()

    return {
      routerTransition, contentWidth,
    }
  },
}
</script>

<style>

</style>
