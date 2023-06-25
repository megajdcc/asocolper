<template>
   <b-container fluid>
      <b-row>
         <b-col cols="12" class="mb-1">
            <h2 class="text-center font-weight-bolder">Matrimonio en el Hotel <br>
               <p class="text-primary">{{ boda.hotel.nombre
                  }}</p>
            </h2>
         </b-col>
      </b-row>

      <b-row>
         <b-col>
            <b-card>
               <b-container fluid>
                  <b-row>
                     <b-col cols="12" class="px-0 py-2">
                        <article class="content-logo h-100 d-flex justify-content-center">
                           <img :src="`/storage/hotel/logotipos/${boda.hotel.logo}`" alt="Logo del Hotel..."
                              class="logo_hotel rounded-lg" style="width:100px;height:auto; object-fit:contain">
                        </article>
                     </b-col>

                     <b-col cols="12">
                        <table class="table table-hover table-sm w-100 table-borderless">
                           <tr v-if="boda.hotel.website">
                              <td><span class="fas fa-globe"></span></td>
                              <td><a :href="boda.hotel.website" target="_blank">{{ boda.hotel.website }}</a>
                              </td>
                           </tr>

                           <tr v-if="boda.hotel.direccion">
                              <td><span class="fas fa-map"></span></td>
                              <td v-html="boda.hotel.direccion"></td>
                           </tr>

                           <tr v-if="boda.id && boda.hotel && boda.hotel.telefonos.length">
                              <td><span class="fas fa-phone"></span></td>
                              <td>
                                 <a :href="`tel:${boda.hotel.telefonos[0].telefono}`">{{
                                    boda.hotel.telefonos[0].telefono
                                    }}</a>
                              </td>
                           </tr>

                           <tr v-if="boda.hotel && boda.hotel.cant_habitaciones > 0">
                              <td><span class="fas fa-door-open"></span></td>
                              <td>
                                 {{ boda.hotel.cant_habitaciones > 1 ?
                                 `${boda.hotel.cant_habitaciones} Habitaciones`
                                 : `${boda.hotel.cant_habitaciones} Habitación`
                                 }}
                              </td>
                           </tr>


                           <tr v-if="boda.hotel.direccion">
                              <td><span class="fas fa-map-marker"></span></td>
                              <td class="text-center">
                                 {{ boda.hotel.direccion }}
                              </td>
                           </tr>

                           <tr>
                              <td class="text-center" colspan="2">
                                 <el-button circle size="mini" v-b-tooltip.hover title="Twitter" type="primary"
                                    v-if="boda.hotel.redes && boda.hotel.redes.twitter" @click="irUrl('twitter')">
                                    <feather-icon icon="TwitterIcon" />
                                 </el-button>

                                 <el-button circle size="mini" v-b-tooltip.hover title="Facebook" type="primary"
                                    v-if="boda.hotel.redes && boda.hotel.redes.facebook" @click="irUrl('facebook')">
                                    <feather-icon icon="FacebookIcon" />
                                 </el-button>

                                 <el-button circle size="mini" type="primary" v-b-tooltip.hover title="Instagram"
                                    v-if="boda.hotel.redes && boda.hotel.redes.instagram" @click="irUrl('instagram')">
                                    <feather-icon icon="InstagramIcon" />
                                 </el-button>
                              </td>
                           </tr>
                        </table>

                        <p class="text-center " v-if="boda.id && boda.hotel.breve">{{ boda.hotel.breve }}</p>
                        <template v-if="boda.id && boda.hotel && boda.hotel.amenidades.length">
                           <el-divider content-position="left">Amenidades</el-divider>
                           <b-form-checkbox-group :checked="boda.hotel.amenidades.map(val => val.id)" :options="boda.hotel.amenidades.map(val => {
                              return {
                                 text: val.nombre,
                                 value: val.id,
                                 disabled: true
                              }
                           })">
                           </b-form-checkbox-group>
                        </template>

                        <template v-if="boda.id && boda.hotel && boda.hotel.planes.length">

                           <el-divider content-position="left">Planes del Hotel</el-divider>

                           <b-jumbotron bg-variant="dark" header-tag="h3" lead-tag="h3" text-variant="primary"
                              header-level="5" class="p-2" v-for="(plan, i) in boda.hotel.planes" :key="i">

                              <template #header>
                                 <h6 class="text-white">{{ plan.plan }}</h6>
                              </template>

                              <!-- <template #lead> -->
                              <small class="text-white text-justify">{{ plan.descripcion }}</small>
                              <!-- </template> -->

                           </b-jumbotron>


                        </template>

                        <el-divider content-position="left">¡Estamos aquí!</el-divider>
                        <GmapMap :center="mapPosition" :zoom="14" :options="optionsMap"
                           style="width:100%; height:350px; display: flex; justify-content:center;">
                           <GmapMarker :key="0" :position="mapPosition" :draggable='false' :clickable="true"
                              :title="boda.hotel.nombre" :visible="true" :icon="''">
                              <GmapInfoWindow :options="optionsPlace">
                              </GmapInfoWindow>
                           </GmapMarker>
                        </GmapMap>

                        <template v-if="boda.id && boda.hotel && boda.hotel.imagenes.length">
                           <el-divider content-position="left">¡Imagenes del Hotel!</el-divider>
                           <swiper class="swiper swiper-autoplay" :options="swipperOptions"
                              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" @click="ingresarIndex">
                              <swiper-slide v-for="(imagen, index) in imagenes()" :key="index">

                                 <b-img :src="imagen.url" fluid thumbnail />

                              </swiper-slide>
                              <div slot="pagination" class="swiper-pagination swiper-pagination-white" />
                           </swiper>

                           <small>Al hacer click sobre la imagen, se expande la galeria.</small>
                        </template>

                     </b-col>
                  </b-row>
               </b-container>

            </b-card>
         </b-col>

      </b-row>
      <vue-gallery-slideshow :images="imagenes()" :index="index" @close="index = null"></vue-gallery-slideshow>
   </b-container>
</template>
<script>


import { ref, onMounted, toRefs,watch } from 'vue'
import { primerNombre } from '@core/utils/filter.js';
import Ripple from 'vue-ripple-directive'
import 'animate.css';

import useBoda from '@core/utils/useBoda'
import VueGallerySlideshow from 'vue-gallery-slideshow';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

import {
   BRow,
   BCol,
   BAvatarGroup,
   BAvatar,
   BLink,
   VBPopover,
   BContainer,
   BCard,
   BImg,
   BJumbotron,
   BFormCheckboxGroup,
   VBTooltip
} from 'bootstrap-vue'
export default {

   props: {
      boda: {
         type: Object,
         required: true,
         default: {
            id: null,
            fecha: null,
            novios: {
               novio: '',
               novia: '',
               correo_novio: '',
               correo_novia: '',
               telefono_novio: null,
               telefono_novia: null
            },
            check_in: null,
            check_out: null,
            url: null,
            hab_habilitadas: 0,
            usuario_id: null,
            hotel_id: null,
            cargo_administrativo: 750,
            fecha_limite_cancelacion: null,
            fecha_limite_liquidacion: null,
            fecha_limite_cambios: null,
            noches_minimas: 2,
            // comision:8, ELiminado en la segunda Fase 
            registrador: null,
            hotel: { nombre: '', lat: 10, lng: 10, redes: null,telefonos:[],amenidades:[],imagenes:[]},
            cobranza_agencia: true,
            habitaciones: [],
            coordinadores: [],
            bodas: [],
            cancelaciones: [],
            cargos_adicionales: [],
            cargos: false,
         }

      }
   },

   directives: {
      Ripple,
      'b-popover': VBPopover,
      'b-tooltip': VBTooltip
   },


   components: {
      BRow,
      BCol,
      BAvatarGroup,
      BAvatar,
      BLink,
      BContainer,
      BCard,
      VueGallerySlideshow,
      Swiper,
      SwiperSlide,
      BImg,
      BJumbotron,
      BFormCheckboxGroup



   },


   setup(props) {

      const { boda } = toRefs(props)
      const index = ref(null);
      const mapPosition = ref({
         lat: 10,
         lng: 10,
      });
      const optionsMap = ref({
         mapTypeControl: true,
         zoomControl: true,
      })

      const optionsPlace = ref({
         content: ''
      })


      const getDiasRestante = () => {
         return moment(boda.value.fecha).diff(moment(), 'days');
      }

      const {
         imagenes,
         irUrl
      } = useBoda(boda)

      const ingresarIndex = (swip) => {

         index.value = 0
      }

      const swipperOptions = ref({
         effect: 'cube',
         grabCursor: true,
         autoplay: {
            delay: 2500,
            disableOnInteraction: false,
         },
         cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
         },
         pagination: {
            el: '.swiper-pagination',
         },

      });

      const cargarForm = () => {
         
         if (boda.value.id) {
            mapPosition.value.lat = (boda.value.hotel.lat) ? Number(boda.value.hotel.lat) : 10;
            mapPosition.value.lng = (boda.value.hotel.lng) ? Number(boda.value.hotel.lng) : 10;
            optionsPlace.value.content = `<div><strong>${boda.value.hotel.nombre}</strong><br>${boda.value.hotel.direccion}`;
         }
      }



      onMounted(() => {
         cargarForm();
      })
      
      watch(boda,() => cargarForm())

      return {
         getDiasRestante,
         primerNombre,
         imagenes,
         index,
         ingresarIndex,
         swipperOptions,
         mapPosition,
         optionsMap,
         optionsPlace,
         irUrl
      }

   },
}

</script>
