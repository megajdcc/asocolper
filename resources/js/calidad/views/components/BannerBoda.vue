<template>

   <b-row>
      <!-- Brand logo-->
      <b-link class="brand-logo" style="position: absolute;
      left: 10px;
      top: 10px;
      z-index: 3000;">
         <img src="/storage/logotipo.png" alt="Logo" />
      </b-link>

      <div class="ft1 d-flex flex-column text-center text-white justify-content-center" style="line-height:10px">
         <p class="my-0">FALTAN</p>
         <br>
         <h2 class="text-white my-0">{{ getDiasRestante() }}</h2>
         <br>
         <p class="my-0">{{ getDiasRestante() > 1 ? 'DÍAS' : 'DÍA' }}</p>

      </div>

      <b-col cols="12" class="header px-0 d-flex ">

         <div class="table-header text-white d-flex flex-column mt-2">
            <div class="header-table d-flex ">
               <div class="li-1 d-flex justify-content-center align-items-center">
                  <span class="fas fa-heart"></span>
               </div>
               <div class=" w-auto lc-1 d-flex justify-content-center align-items-center"><strong>!NOS
                     CASAMOS¡</strong></div>
               <div class="lr-1 d-flex justify-content-center align-items-center"> <span class="fas fa-heart"></span>
               </div>
            </div>

            <div class="center-t">
               <h1 class="font-weight-bold text-white text-center">{{ `${primerNombre(boda.novios.novia)} &
               ${primerNombre(boda.novios.novio)}`
               }}</h1>
            </div>

            <div class="footer-table d-flex mb-0">
               <div class="li-1 d-flex justify-content-center align-items-center">
                  <span class="fas fa-angle-right" style="font-size:21px"></span>
                  <span class="fas fa-angle-right" style="font-size:21px"></span>
                  <span class="fas fa-angle-right" style="font-size:21px"></span>

               </div>
               <div class=" w-auto lc-1 d-flex justify-content-center align-items-center"><strong>{{ boda.fecha | fecha
               }}</strong></div>
               <div class="lr-1 d-flex justify-content-center align-items-center">
                  <span class="fas fa-angle-left" style="font-size:21px"></span>
                  <span class="fas fa-angle-left" style="font-size:21px"></span>
                  <span class="fas fa-angle-left" style="font-size:21px"></span>
               </div>
            </div>


         </div>

         <b-col cols="12" class="d-flex justify-content-center flex-column"
            style="z-index: 901;position: absolute;bottom: 10px;" v-if="boda.id && boda.coordinadores.length">

            <span class="text-white font-weight-bold mb-1 ">Coordinadores de la Boda</span>

            <b-avatar-group size="32px">
               <b-avatar v-for="(coordinador, i) in boda.coordinadores" :key="i"
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  v-b-popover.hover="(coordinador.telefono) ? `Teléfono:${coordinador.telefono}. ` : `Email:${coordinador.email}`"
                  class="pull-up" :title="`${coordinador.nombre} ${coordinador.apellido}`" :src="coordinador.avatar" />
            </b-avatar-group>


         </b-col>

      </b-col>

   </b-row>

</template>
<script>


import { ref, onMounted, toRefs } from 'vue'
import { primerNombre } from '@core/utils/filter.js';
import Ripple from 'vue-ripple-directive'
import 'animate.css';

import useBoda from '@core/utils/useBoda'

import {
   BRow,
   BCol,
   BAvatarGroup,
   BAvatar,
   BLink,
   VBPopover
} from 'bootstrap-vue'
export default {

   props: {
      boda: {
         type: Object,
         required: true,
         default:{
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
            hotel: { nombre: '', lat: 10, lng: 10, redes: null },
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

   directives:{
      Ripple,
      'b-popover':VBPopover
   },


   components:{
      BRow,
      BCol,
      BAvatarGroup,
      BAvatar,
      BLink

   },


   setup(props) {

      const { boda } = toRefs(props)

      const {
         getDiasRestante 
      } = useBoda(boda)

      return {
         getDiasRestante,
         primerNombre
      }

   },
}

</script>

<style lang="scss">

.header{
   background-image: url('/storage/lazo_matrimonial.jpg');
   background-position: center center;
   background-size: cover;
   background-repeat: no-repeat;
   background-attachment: fixed;
   height: 400px;
   display: flex;
   justify-content: center;
   align-items: center;
   border-bottom: 10px solid #b4975a;


   &::after{
      content: '';
      background-color: rgba(0,0,0,0.4);
      position: absolute;
      width: 100% !important;
      height: 400px !important;
      padding: 0px;
      margin: 0px;
   }

   .table-header{
      width: 320px;
      height: 200px;
      border: 2px solid white;
      z-index: 900 !important;
   }

}

.el-rate__icon {
    margin-right: 6px;
    font-size: 20pt !important;
}

.header-table{
   width:100%;
   flex: 0 1 21px;
   border-bottom: 1px solid white;
   .li-1{
      border-right: 1px solid white;
      flex:0 1 30px;
   }
   .lc-1{
      flex:1 1 auto;
   }
   .lr-1{
      border-left: 1px solid white;
      flex:0 1 30px;
   }

}

.footer-table{
   width:100%;
   flex: 0 1 21px;
   border-top: 1px solid white;
   .li-1{
     
      flex:0 1 30px;
   }
   .lc-1{
      flex:1 1 auto;
   }
   .lr-1{
      // border-left: 1px solid white;
      flex:0 1 30px;
   }

}


.center-t{
   flex: 1 1 auto;
   display: flex;
   justify-content: center;
   align-items: center;
}

.ft1{
   // background-image:url('/storage/f1.svg');
    background-color: #b4975a;
   position: absolute;
   top: 0px;
   right:10px;
   height: 100px;
   width:80px;
   z-index: 301;
}

.el-step__icon {
   background-color:#f8f8f8 !important;
}
.card-habitacion img{
   width: auto;
   max-width:334px;
   height: 250px;
   object-fit: cover;
   object-position: center;
}
@media (min-width:540px){
    .table-header{
      width: 400px !important;
   }
}

@media (min-width:720px){
    .table-header{
      width: 500px !important;
   }

   .header{

      height: 320px;


      &::after{
         height: 320px !important;
    
      }
   }


}


.endRange,.startRange{
   background: #b4975a !important;
    box-shadow: none !important;
    border-color: #c0a774 !important;
}
.event {
   position: absolute;
    color: #db2609;
    font-size: 10pt;
    left: 0px;
    right: 0px;
   //  &::before{
      //  content:"\f004",
      //  background: #bb1717;

   //  }
}

.event.busy {
    background: #f64747;
}




</style>
