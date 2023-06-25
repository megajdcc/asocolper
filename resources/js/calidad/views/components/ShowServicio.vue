<template>
   <b-card v-if="servicio.id">
      <section class="header-banner mb-1" :style="{
         'background-image':`url(${imgBanner})`
      }">
         <section class="content-banner">
            <h2>{{ servicio.titulo }}</h2>
            <strong>{{ servicio.subtitulo }}</strong>
            <cite>{{ servicio.breve }}</cite>
         </section>
   
      </section>
   
      <b-media no-body v-if="servicio.usuario">
         <b-media-aside vertical-align="center" class="mr-50">
            <b-avatar href="javascript:void(0)" size="24" v-if="servicio.usuario" :src="servicio.usuario.avatar" />
         </b-media-aside>
         <b-media-body>
            <small class="text-muted mr-50">Por</small>
            <small>
               <b-link class="text-body">{{ `${servicio.usuario.nombre} ${servicio.usuario.apellido}`}}</b-link>
            </small>
            <span class="text-muted ml-75 mr-50">|</span>
            <small class="text-muted">{{ servicio.created_at | fecha('LLL') }}</small>
         </b-media-body>
      </b-media>
      <div class="my-1 py-25">
         <b-link>
            <b-badge pill class="mr-75" :style="{
               'background-color':colorRand()
            }">
               {{ servicio.categoria.nombre }}
            </b-badge>
         </b-link>
      </div>
      <div class="blog-content" v-html="servicio.contenido" />
   
   </b-card>
</template>

<script>
import {
   BForm,
   BFormGroup,
   BContainer,
   BRow,
   BCol,
   BButtonGroup,
   BButton,
   BFormInvalidFeedback,
   BInputGroup,
   VBTooltip,
   BCard,
   BFormInput,
   BFormFile,

   BMedia,
   BAvatar,
   BMediaAside,
   BMediaBody,
   BImg,
   BLink,
   BInputGroupAppend,
   BBadge,
   BCardText,
   BDropdown,
   BDropdownItem,
   BFormTextarea,
   BFormCheckbox,
   BSpinner

} from 'bootstrap-vue'

import {computed,toRefs}  from 'vue'
import store from '@/store'
import { colorRand } from '@core/utils/utils'

export default{


   props:['servicio','imgBanner'],

   model: {
      prop: 'servicio',
      event: 'update:servicio'
   },

   components:{
      BForm,
      BFormGroup,
      BContainer,
      BRow,
      BCol,
      BButtonGroup,
      BButton,
      BFormInvalidFeedback,
      BInputGroup,
      VBTooltip,
      BCard,
      BFormInput,
      BFormFile,

      BMedia,
      BAvatar,
      BMediaAside,
      BMediaBody,
      BImg,
      BLink,
      BInputGroupAppend,
      BBadge,
      BCardText,
      BDropdown,
      BDropdownItem,
      BFormTextarea,
      BFormCheckbox,
      BSpinner
   },

   setup(props){

      return {
         loading:computed(() => store.state.loading),
         colorRand
      }
   }
}

</script>

<style lang="scss">
@import '~@core/scss/vue/pages/page-blog.scss';

.card-img-top {
   flex-shrink: 0;
   width: 100%;
   max-height: 350px;
   object-fit: cover;
}

.header-banner {
   height: 300px;
   width: 100%;
   background-position: center center;
   background-size: cover;
   background-repeat: no-repeat;
   position: relative;
   background-attachment: fixed;
   border-radius: 10px;

   &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #00000078;
      z-index: 1;
   }

   .content-banner {
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;

      h2,
      strong {
         z-index: 10;
         text-transform: uppercase;
         font-weight: bolder;
         color: white;
      }

      cite {
         z-index: 10;
         color: white;
      }
   }

}
</style>