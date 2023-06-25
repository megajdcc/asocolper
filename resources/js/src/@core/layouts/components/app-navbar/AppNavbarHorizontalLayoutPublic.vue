<template>
      <div class="navbar-container d-flex content align-items-center">
      
         <!-- Nav Menu Toggler -->
         <ul class="nav navbar-nav d-xl-none">
            <li class="nav-item">
               <b-link class="nav-link" @click="toggleVerticalMenuActive">
                  <feather-icon icon="MenuIcon" size="21" />
               </b-link>
            </li>
         </ul>
      
         <!-- Right Col -->
         <b-navbar-nav class="nav align-items-center ml-auto">
      
      
            <b-nav-item :to="{name:'quienes.somos'}" v-b-tooltip.hover.bottom.v-primary title="¿Quiénses somos?"
               class="d-none d-md-flex wow bounceInDown" data-wow-duration="1s" data-wow-delay=".1s">
               <!-- <feather-icon size="21" icon="HelpCircleIcon" /> -->
               Quiénes Somos
            </b-nav-item>
      
            <b-nav-item :to="{name:'nuestros.socios'}" v-b-tooltip.hover.bottom.v-primary title="Nuestros socios"
               class="d-none d-md-flex wow bounceInDown" data-wow-duration="1s" data-wow-delay=".2s">
               <!-- <feather-icon size="21" icon="UsersIcon" /> -->
               Nuestros Socios
            </b-nav-item>
      
            <b-nav-item :to="{name:'servicios'}" v-b-tooltip.hover.bottom.v-primary title="Servicios"
               class="d-none d-md-flex wow bounceInDown" data-wow-duration="1s" data-wow-delay=".3s">
               <!-- <feather-icon size="21" icon="primaryIcon" /> -->
               Servicios
            </b-nav-item>
      
            <b-nav-item :to="{name:'blog.public'}" v-b-tooltip.hover.bottom.v-primary title="Blog"
               class="d-none d-md-flex wow bounceInDown" data-wow-duration="1s" data-wow-delay=".4s">
               <!-- <feather-icon size="21" icon="primaryIcon" /> -->
               Blog
            </b-nav-item>
      
            <!-- <b-nav-item :to="{name:'store'}" v-b-tooltip.hover.bottom title="Tienda de Regalos" class="d-none d-md-flex">
                  <feather-icon size="21" icon="ShoppingBagIcon" />
               </b-nav-item> -->
      
            <b-nav-item :to="{name:'contacto'}" v-b-tooltip.hover.bottom.v-primary title="Contáctanos"
               class="d-none d-md-flex wow bounceInDown" data-wow-duration="1s" data-wow-delay=".5s">
               <!-- <feather-icon size="21" icon="SendIcon" /> -->
               Contáctanos
            </b-nav-item>
      
      
            <dark-Toggler class="ml-md-2 wow bounceInDown" data-wow-duration="1s" data-wow-delay=".6s" />
            <locale class="wow bounceInDown" data-wow-duration="1s" data-wow-delay=".7s" />
            <notification-dropdown v-if="is_loggin" class="wow bounceInDown" data-wow-duration="1s" data-wow-delay=".8s" />
            <user-dropdown class="wow bounceInDown" data-wow-duration="1s" data-wow-delay=".9s" />
         </b-navbar-nav>
      </div>
   
</template>

<script>
import {
   BLink, BNavbarNav, BNavItem,
   VBTooltip,BContainer
} from 'bootstrap-vue'
import Locale from './components/Locale.vue'
import DarkToggler from './components/DarkToggler.vue'
import NotificationDropdown from '@/components/notifications.vue'
import UserDropdown from './components/UserDropdown.vue'
import useAuth from '@core/utils/useAuth'


export default {
   components: {
      BLink,
      // Navbar Components
      BNavbarNav,
      Locale,
      DarkToggler,
      NotificationDropdown,
      UserDropdown,
      BNavItem,
      BContainer
   },
   directives:{
      'b-tooltip':VBTooltip
   },

   props: {
      toggleVerticalMenuActive: {
         type: Function,
         default: () => { },
      },
   },


   setup(){

      const {
         is_loggin 
      } = useAuth()

      return {
         is_loggin
      }
   }


}
</script>
