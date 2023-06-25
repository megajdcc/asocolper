<template>
   <b-container fluid class="px-0">



      <b-row class="header-contacto mx-0">
         <b-col cols="12" class="d-flex justify-content-center flex-column align-items-center">
            <h2 class="d-inline">NUESTROS SOCIOS</h2>
            <cite class="text-white text-center">Somos una firma de abogados especializados, que Brindamos Asistencia Legal en Diferentes Áreas del Derecho. <br> Orientado bajo los Principios de Lealtad, Compromiso, Ética,Disciplina y Legalidad. </cite>
         </b-col>
      </b-row>

      <b-container :fluid="windowWidth < 762 ? true : false">
         <b-row class="my-1">
            <b-col cols="12 text-center">
               <!-- <h2 class="text-center">Equipo de abogados Especialistas</h2> -->
            </b-col>
         </b-row>

         <b-row>
            <b-col cols="12" class="d-flex justify-content-between flex-wrap" >
               <b-card v-for="(socio,i) in socios" :key="i"  class="ml-1" style="min-width:320px; width:320px; " plain >

                  <template #header>

                     <section class="w-100 d-flex justify-content-center">
                        <b-avatar :src="socio.avatar"  class="avatar-contacto" size="15rem" :title="`${socio.nombre} ${socio.apellido}`" />
                     </section>
                    
                  </template>

                  <h4 class="mt-0 font-weight-bolder text-center"> {{ `${socio.nombre} ${socio.apellido}` }}</h4>
                  <p class="text-center">
                     {{ socio.perfil }}
                  </p>

                  <template #footer>
                     <section class="d-flex flex-column">
                        <b-link :href="`mailto:${socio.correo}`" target="_blank" v-if="socio.correo">
                           <feather-icon icon="MailIcon" />
                           {{ socio.correo }}
                        </b-link>
                        <b-link :href="`tel:${socio.telefono}`" target="_blank" v-if="socio.telefono">
                           <feather-icon icon="PhoneIcon" />
                           {{ socio.telefono }}
                        </b-link>
                     </section>
                    
                  </template>
                
               </b-card>
            </b-col>
         </b-row>

      </b-container>
      <!-- <hr> -->
      <!-- <publicaciones-recientes /> -->

   </b-container>
</template>

<script>
import {
   BContainer,
   BRow,
   BCol,
   BButton,
   BImg,
   BLink,
   BFormGroup,
   BFormInput,
   BFormInvalidFeedback,
   BFormTextarea,
   BForm,
   VBTooltip,
   BAvatar,
   BCard,
   BMedia,



} from 'bootstrap-vue'

import store from '@/store'

import { toRefs, ref, computed,onMounted } from 'vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required, email } from '@validations'

const imagenEmail = require('@/assets/images/illustration/email.svg')
export default {

   components: {
      BContainer,
      BRow,
      BCol,
      BButton,
      BImg,
      BLink,
      ValidationObserver,
      ValidationProvider,
      BFormGroup,
      BFormInput,
      BFormInvalidFeedback,
      BFormTextarea,
      BForm,
      VBTooltip,
      BAvatar,
      BCard,
      BMedia,
      PublicacionesRecientes:() => import('components/PublicacionesRecientes.vue')
   },


   directives: {
      'b-tooltip': VBTooltip
   },


   metaInfo() {
      return {
         title: 'Nuestros Socios | Villamizar & Jarava Abogados Asociados S.A.S',
         meta:[{
            vmid:'description',
            name:'description',
            content:this.socios.map(val => `${val.nombre} ${val.apellido}`).toString().substring(0, 157) + ' | '
         }]
      }
   },
   setup() {

      const { sistema } = toRefs(store.state.sistema)
      const socios = ref([])


      onMounted(() => {

         store.dispatch('socio/getSocios').then((data) => socios.value = data)
      })


 

      return {
         windowWidth:computed(() => store.state.app.windowWidth),
         sistema,
         loading: computed(() => store.state.loading),
         socios
      }
   },
}

</script>

<style lang="scss">
  .avatar-contacto img {
      width: 100%;
      height: 100%;
      max-height: auto;
      border-radius: inherit;
      -o-object-fit: cover;
      object-fit: cover;
      border: 4px solid transparent;
      border-image: linear-gradient(0deg, #da2929 23%, #2964a5 60%, #faa400 0%) 100 / 10;
      position: relative;
   }
</style>
<style lang="scss" scoped >
@import '@/assets/scss/variables/variables';

ul li {
   list-style: none;
}


.header-contacto {
   height: 300px;
   padding: 3rem;
   display: flex;
   justify-content: center;
   align-items: center;
   background-image: url('/storage/fond_abogado.jpg');
   background-repeat: no-repeat;
   background-size: cover;
   background-position: right top;


   &::before {
      content: "";
      width: 100%;
      height: 300px;
      position: absolute;
      background-color: #000000c2;
   }

   h2 {
      padding: 1rem;
      border: 2px solid white;
      font-weight: bolder;
      color: white;

   }
}

@media (min-width:762px) {
   .border-right-md-4 {
      border-right: 4px solid;
   }
}


@media (min-width:1092px) {
   .header-contacto {
      background-attachment: fixed;
      background-size: contain;
   }
}


// wave

.bg_color {
   position: absolute;
}

.bg-icon-redes {
   background-color: $primary;
   padding: 0.5rem;
   /* color: white !important; */
   border-radius: 10px;

   a {
      color: black;

      &:hover {
         color: white;
      }

   }
}


.wave {
   width: 6000px;
   height: 100%;
   position: absolute;
   top: 150px;
   left: 0;
   background-image: url('/storage/wd1.svg');
   background-position: bottom;
}

.w1 {
   animation: w1 7s linear infinite;
}

.w2 {
   animation: w2 7s linear -.125s infinite, desplazamiento 7s ease -.125s infinite;
   opacity: 0.5;
}

@keyframes w1 {
   0% {
      margin-left: 0;
   }

   100% {
      margin-left: -1600px;
   }
}

@keyframes w2 {
   0% {
      margin-left: 0;
   }

   100% {
      margin-left: -1600px;
   }
}

@keyframes desplazamiento {

   0%,
   100% {
      transform: translateY(-25px);
   }

   50% {
      transform: translateY(10px);
   }
}


.img-contact {
   img {
      vertical-align: middle;
      border-style: none;
      width: 100%;
      box-sizing: content-box;
      box-shadow: rgb(157 161 173) 1px 0px 20px -22px;
      border-radius: 50px 0px 0px 50px;
   }
}

.layout-bg {
   background-size: contain;
   background-position: center bottom 0px;
   background-image: url('/storage/wd1.svg'), linear-gradient(237deg, #8e7e4d 0%, #656255 100%) !important;
   padding-top: 100px;
   padding-bottom: 10vw;

   background-repeat: no-repeat;

}


@media only screen and (min-width: 962px) {
   .layout-bg {
      padding: 50px 0 98px 0px;
   }

}

@media only screen and (min-width: 1350px) {
   .layout-bg {
      padding: 50px 0 98px 0px;
   }

}

</style>