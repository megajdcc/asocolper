<template>
   <div class="horizontal-layout horizontal-layout-public" :class="[layoutClasses]" data-col="1-column" style="height:inherit">

      <!-- NAVBAR -->
      <b-navbar :style="{
         backgroundColor: navbarType === 'static' && scrolledTo && skin === 'light' ? 'white' : null,
         boxShadow: navbarType === 'static' && scrolledTo ? 'rgba(0, 0, 0, 0.05) 0px 4px 20px 0px' : null,
      }" :toggleable="false" class="header-navbar navbar-shadow align-items-center navbar-brand-center navbar-fixed "
         :class="{ 'fixed-top': $store.getters['app/currentBreakPoint'] !== 'xl' }">
         
         <slot name="navbar" :toggleVerticalMenuActive="toggleVerticalMenuActive">
               <!-- Logo -->
               <app-navbar-horizontal-layout-public-brand />
               <app-navbar-horizontal-layout-public :toggle-vertical-menu-active="toggleVerticalMenuActive" />
         </slot>

      </b-navbar>

      <div class="horizontal-menu-wrapper">
         <!-- <div v-if="!isNavMenuHidden"
         class="header-navbar navbar-expand-sm navbar navbar-horizontal navbar-light navbar-shadow menu-border d-none d-xl-block"
         :class="[navbarMenuTypeClass]">
            <horizontal-nav-menu />
         </div> -->

         <!-- Vertical Nav Menu -->
         <vertical-nav-menu :is-vertical-menu-active="isVerticalMenuActive"
            :toggle-vertical-menu-active="toggleVerticalMenuActive" class="d-block d-xl-none"
            :navMenuItems="verticalNavMenuItems">
            <template #header="slotProps">
               <slot name="vertical-menu-header" v-bind="slotProps" />
            </template>
         </vertical-nav-menu>
         <!-- /Vertical Nav Menu -->
      </div>

      <!-- Vertical Nav Menu Overlay -->
      <div class="sidenav-overlay" :class="overlayClasses" @click="isVerticalMenuActive = false" />
      <!-- /Vertical Nav Menu Overlay -->


      <transition name="fade" mode="out-in">
         <component :is="layoutContentRenderer"
            :key="layoutContentRenderer === 'layout-content-renderer-left' ? $route.meta.navActiveLink || $route.name : null">
            <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
               <slot :name="name" v-bind="data" />
            </template>
         </component>
      </transition>

      <!--/ Content -->
      <!--/ CONTENT -->

      <!-- Footer -->

      <footer class="footer footer-light" :class="[footerTypeClass]"
         style="box-shadow: 0 -1rem 3rem rgb(34 41 47 / 8%) !important;">
         <slot name="footer">
            <app-public-footer />
         </slot>
      </footer>




   </div>
</template>

<script>

import AppNavbarHorizontalLayoutPublic from '@core/layouts/components/app-navbar/AppNavbarHorizontalLayoutPublic.vue'

import AppNavbarHorizontalLayoutPublicBrand from '@core/layouts/components/app-navbar/AppNavbarHorizontalLayoutPublicBrand.vue'


import useAppConfig from '@core/app-config/useAppConfig'
import { BNavbar } from 'bootstrap-vue'
import { useScrollListener } from '@core/comp-functions/misc/event-listeners'

import { onUnmounted,computed } from 'vue'

// Content Renderer
// Vertical Menu
/* eslint-disable import/order */
import VerticalNavMenu from '@core/layouts/layout-vertical/components/vertical-nav-menu/VerticalNavMenu.vue'

import mixinLayoutHorizontal from '../layout-horizontal/mixinLayoutHorizontal'
/* eslint-enable import/order */

import LayoutContentRendererPublic from '@core/layouts/components/layout-content-renderer/LayoutContentRendererPublic.vue'
import useVerticalLayout from '@core/layouts/layout-vertical/useVerticalLayout'

import useLayoutPublic from './useLayoutPublic'

import HorizontalNavMenu from './components/horizontal-nav-menu/HorizontalNavMenu.vue'

import verticalNavMenuItems from '@/navigation/vertical/public'

import store from '@/store'
import {
   BContainer
} from 'bootstrap-vue'


export default {
   components: {
      // BS
      BContainer,

      AppNavbarHorizontalLayoutPublic,
      AppNavbarHorizontalLayoutPublicBrand,
      BNavbar,
      // Content Renderer
      LayoutContentRendererPublic,
      AppPublicFooter: () => import('components/AppPublicFooter'),
      HorizontalNavMenu,

      // Vertical Menu
      VerticalNavMenu,
   },
   mixins: [mixinLayoutHorizontal],

   computed: {

      layoutContentRenderer() {
         // const rendererType = this.$route.meta.contentRenderer
         // if (rendererType === 'sidebar-left') return 'layout-content-renderer-left'
         // if (rendererType === 'sidebar-left-detached') return 'layout-content-renderer-left-detached'
         return 'layout-content-renderer-public'
      },

   },
   setup() {


      const {
         skin,
         navbarType,
         footerType,
         routerTransition,
         isNavMenuHidden,
      } = useAppConfig()

      // Vertical Menu
      const {
         isVerticalMenuActive, toggleVerticalMenuActive, overlayClasses, resizeHandler,
      } = useVerticalLayout(navbarType, footerType)

      // Resize handler
      resizeHandler()
      window.addEventListener('resize', resizeHandler)

      onUnmounted(() => {
         window.removeEventListener('resize', resizeHandler)
      })

      const {
         navbarMenuTypeClass,
         layoutClasses,
         footerTypeClass,
      } = useLayoutPublic(navbarType, footerType, isVerticalMenuActive)

      // Scroll Listener
      const { scrolledTo } = useScrollListener()

      return {
         // skin
         skin,

         // Layout
         layoutClasses,

         // Navbar
         navbarType,
         navbarMenuTypeClass,


         // Router Transition
         routerTransition,

         // Footer
         footerTypeClass,

         // Scroll Listeners
         scrolledTo,
         isVerticalMenuActive,
         toggleVerticalMenuActive,

         isNavMenuHidden,
         overlayClasses,
         verticalNavMenuItems,
         windowWidth: computed(() => store.state.app.windowWidth)

      }
   },
}
</script>

<style lang="scss">
@import "~@core/scss/base/themes/bordered-layout.scss";
</style>
