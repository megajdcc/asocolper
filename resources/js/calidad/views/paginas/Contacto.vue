<template>
   <b-container fluid class="px-0">

      <!-- <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet" class="bg_color">
         <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z" style="stroke: none; fill:#2e2e2e;"></path>
      </svg> -->
      <!-- <div class="wave w1"></div>
      <div class="wave w2"></div> -->

      <b-row class="header-contacto mx-0">
         <b-col cols="12" class="d-flex justify-content-center">
            <h2 class="d-inline">CONTÁCTANOS</h2>
         </b-col>
      </b-row>

      <b-container :fluid="windowWidth < 762 ? true : false">
         <b-row class="my-1">
            <b-col cols="12 text-center">
               <strong class="text-center" style="font-size:14pt; font-style:italic">Ponte con contácto con nosotros !</strong>
            </b-col>
         </b-row>
         <b-row class="mb-1">
            <b-col cols="12" md="4"  class="border-right-md-4">
               <section class="d-flex flex-column align-items-center ">
                   <strong class="text-primary text-center mb-1">TELÉFONO</strong>
                 
                  <feather-icon icon="SmartphoneIcon" size="36" class="text-center mb-1" />
                  <ul class="px-0" v-if="sistema.id">
                     <li v-for="({numero},i) in sistema.sucursales.find(val => val.principal) ? sistema.sucursales.find(val => val.principal).telefonos : [] || []" :key="i">
                        <b-link :href="`tel:${numero}`" target="_blank">
                              {{ numero }}
                        </b-link>
                       
                     </li>
                  </ul>

               </section>
            </b-col>
            <b-col cols="12" md="4"  class="border-right-md-4">
               <section class="d-flex flex-column align-items-center ">
                  <strong class="text-primary text-center mb-1">DIRECCIÓN</strong>
               
                  <feather-icon icon="MapPinIcon" size="36" class="text-center mb-1" />
                  <p class="text-primary text-center" v-if="sistema.sucursales.length">
                     {{ sistema.sucursales.find(val => val.principal)? sistema.sucursales.find(val => val.principal).direccion : '' }}
                  </p>
               </section>
            </b-col>

            <b-col cols="12" md="4">
               <section class="d-flex flex-column align-items-center ">
                  <strong class="text-primary text-center mb-1">EMAIL</strong>
               
                  <feather-icon icon="MailIcon" size="36" class="text-center mb-1" />

                  <ul class="px-0" v-if="sistema.id">
                     <li v-for="({email},i) in sistema.correos || []" :key="i">
                        <b-link :href="`mailto:${email}`" target="_blank">
                           {{ email }}
                        </b-link>
                  
                     </li>
                  </ul>

               </section>
            </b-col>
         </b-row>

         <b-row class="my-1">
            <b-col cols="12 text-center">
               <strong class="text-center" style="font-size:12pt;"> Cuentanos tu caso <br> No dudes en enviarnos un Mensaje. </strong>
            </b-col>
         </b-row>
         <validation-observer ref="formValidate" #default="{handleSubmit}">
            <b-form @submit.prevent="handleSubmit(enviar)">
               <b-row>
                  <b-col cols="12" md="6" offset-md="3">
                     <b-form-group >
                        <validation-provider name="nombre" rules="required" #default="{errors}">
                           <b-form-input v-model="formulario.nombre" :state="errors.length ? false : null" placeholder="Su Nombre" />

                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>
                  </b-col>

                  <b-col cols="12" md="6" offset-md="3">
                     <b-form-group>
                        <validation-provider name="email" rules="required|email" #default="{errors}">
                           <b-form-input v-model="formulario.email" :state="errors.length ? false : null" placeholder="Su Email" />
                  
                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>
                  </b-col>

                  <b-col cols="12" md="6" offset-md="3">
                     <b-form-group>
                        <validation-provider name="telefono" rules="required" #default="{errors}">
                           <the-mask v-model="formulario.telefono" :mask="'+############'" class="form-control" type="tel" masked
                              placeholder="Su número de teléfono" />
                  
                           <b-form-invalid-feedback :state="errors.length ? false : null">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>
                  </b-col>


                  <b-col cols="12" md="6" offset-md="3">
                     <b-form-group>
                        <validation-provider name="asunto" rules="required" #default="{errors}">
                           <b-form-input v-model="formulario.asunto" :state="errors.length ? false : null" placeholder="Asunto" />
                  
                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>
                  </b-col>

                  <b-col cols="12" md="6" offset-md="3">
                     <b-form-group>
                        <validation-provider name="mensaje" rules="required" #default="{valid,errors}">
                           <b-form-textarea v-model="formulario.mensaje" :state="valid" placeholder="Su caso" :rows="3" />
                  
                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>
                  </b-col>
                  <b-col cols="12" md="6" offset-md="3" class="mb-1">
                     <b-form-checkbox id="checkbox-1" v-model="politicas" >
                        Usted acepta nuestras <b-link :to="{name:'politicas.public'}"> Políticas de Privacidad ?</b-link> 
                     </b-form-checkbox>
                  </b-col>
               </b-row>

               <b-row class="mb-2">
                  <b-col cols="12" md="6" offset-md="3">
                     <b-button variant="primary" title="Enviar" type="submit" v-loading="loading" :disabled="!politicas">
                        <feather-icon icon="SendIcon"/>
                        Enviar Mensaje
                     </b-button>
                  </b-col>
               </b-row>
            </b-form>
         </validation-observer>


         <b-row v-if="sistema.redes.length">

            <b-col cols="12" class="text-center mb-1">
               <strong class="text-center" style="font-size:14pt; font-style:italic"> ¡Conectese con Nosotros!
               </strong>
            </b-col>

            <b-col cols="12" class="d-flex justify-content-center mb-2">
               <section style="width:300px">
                     <ul class="list-unstyled d-flex m-0 justify-content-around w-100">
                        <li v-for="({url,nombre,icono},i) in sistema.redes" :key="i" class="bg-icon-redes">
                           <b-link :href="url" :alt="nombre" :title="nombre" v-b-tooltip.hover.top.v-secondary target="_blank"
                              class="wow bounceInDown" :data-wow-delay="`1.${i}`">
                              <feather-icon :icon="icono" size="36" />
                           </b-link>
                        </li>
                     </ul>
               </section>
            </b-col>
         </b-row>

         <b-row class="my-2" v-if="sistema.sucursales.length">
            <b-col class="px-0">
                  <GmapMap ref="input" :center="{lat:getLatitud(9.9973735),lng:getLongitud(-76.1461738)}" :zoom="zoom_map" :options="options_map"
                     style="width:100%; height:350px; display: flex; justify-content:center;">


                     <GmapMarker v-for="(sucursal,i) in sistema.sucursales"  :key="i" :position="{ lat:getLatitud(sucursal.lat),lng:getLongitud(sucursal.lng)}" :visible="visibleMarker" :draggable="false" :clickable="true"
                        :icon="iconMarker">
                        <GmapInfoWindow :options="optionsPlace(sucursal)">
                        </GmapInfoWindow>
                     </GmapMarker>
                  
                  </GmapMap>
            </b-col>
         </b-row>
        
      </b-container>
     

      
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
   BFormRadioGroup,
   BFormCheckbox,
} from 'bootstrap-vue'

import store from '@/store'

import {toRefs,ref,computed} from 'vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {required,email} from '@validations'

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
      BFormRadioGroup,
      BFormCheckbox,




      // NabvarPagina: () => import('components/NabvarPagina.vue')
   },


   directives:{
      'b-tooltip':VBTooltip
   },

   metaInfo: {
      title: 'Contáctanos | Villamizar & Jarava Abogados Asociados S.A.S'
   }, 

   setup() {

      const windowWidth = computed(() => store.state.app.windowWidth)
      const {sistema} = toRefs(store.state.sistema)
      const formValidate = ref(null)
      const zoom_map = ref(5);
      const visibleMarker = ref(true);
      const iconMarker = ref('');

      const options_map = ref({})
      const politicas = ref(false)

      const formulario = ref({
         email: '',
         nombre: '',
         telefono: null,
         asunto: '',
         mensaje: ''
      })

      const enviar = () => {

         store.commit('toggleLoading')

         axios.post('/api/enviar/mensaje/contacto',formulario.value).then(({data}) => {

            if(data.result){
               toast.success('Se ha enviado con éxito su mensaje.')
               formulario.value = {
                  email: '',
                  nombre: '',
                  telefono:null,
                  asunto: '',
                  mensaje: ''
               }

            }else{
               toast.info('No se pudo enviar Su mensaje, inténtelo de nuevo...')
            }

         }).catch(e => {
            if(e.response.status === 422){
               formValidate.value.setErrors(e.response.data.errors)
            }

            console.log(e)

         }).then(() => {
            store.commit('toggleLoading')
         })


      }

      const getLatitud = (lat ) => {
         return Number(lat)
      }

      const getLongitud = (lng ) => {
         return Number(lng);
      }

      const  optionsPlace = (sucursal) => {
         return {
            content: `<strong>${sistema.value.nombre}</strong> <br> ${sucursal.direccion}`,
         }

      }

      return {
         windowWidth,
         sistema,
         imagenEmail,
         required,
         formulario,
         enviar,
         formValidate,
         email,
         getLatitud,
         getLongitud,
         zoom_map,
         options_map,
         loading:computed(() => store.state.loading),
         visibleMarker,
         iconMarker,
         optionsPlace,
         politicas
      }
   },
}

</script>

<style lang="scss">

@import '@/assets/scss/variables/variables';

ul li{
      list-style: none;
   }


.header-contacto{
   height: 300px;
   padding: 3rem;
   display: flex;
   justify-content: center;
   align-items: center;
   background-image: url('/storage/fond_abogado.jpg');
   background-repeat: no-repeat;
   background-size: cover;
   background-position: right top;
 

   &::before{
      content: "";
      width: 100%;
      height: 300px;
      position: absolute;
      background-color: #0000007d;
   }

   h2{
      padding: 1rem;
      border: 2px solid white;
      font-weight: bolder;
      color:white;

   }
}

@media (min-width:762px){
   .border-right-md-4 {
      border-right: 4px solid;
   }
}


@media (min-width:1092px){
   .header-contacto{
      background-attachment: fixed;
      background-size: contain;
   }
}


// wave

.bg_color {
   position: absolute;
}

.bg-icon-redes{
   background-color:$primary;
   padding: 0.5rem;
   /* color: white !important; */
   border-radius: 10px;
   
   a{
      color:black;

      &:hover{
         color:white;
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


   .img-contact{
   img{
      vertical-align: middle;
      border-style: none;
      width: 100%;
      box-sizing: content-box;
      box-shadow: rgb(157 161 173) 1px 0px 20px -22px;
      border-radius: 50px 0px 0px 50px;
   }
}
.layout-bg{
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

@media only screen and (min-width: 1350px){
   .layout-bg{
      padding: 50px 0 98px 0px;
   }
  
}
</style>