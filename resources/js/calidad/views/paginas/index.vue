<template>
   <b-container fluid class="px-0 mx-0">
      <!-- Sección -->
      <b-row class="bienvenidos mx-0 px-0">
         <b-col cols="12" class="banner-content-principal px-0 mx-0">
            <div class="texto-encabezado text-xs-center">
               
               <b-container fluid>
                  <b-row>
                     <b-col cols="12 d-flex flex-column align-items-center w-100">
                        <!-- <b-skeleton-wrapper :loading="loading" style="width:320px">

                           <template #loading>
                              <b-skeleton width="80%" height="30px" class="mx-auto"></b-skeleton>
                              <b-skeleton width="99%" height="30px" class="mx-auto"></b-skeleton>
                              <b-skeleton width="85%" height="10px" class="mx-auto"></b-skeleton>
                              <b-skeleton type="button" width="200px" class="mx-auto"></b-skeleton>
                           </template> -->

                           <h1 class="titulo-principal wow bounceIn">Villamizar & Jarava <br> Abogados Asociados S.A.S</h1>
                           <cite class="wow bounceIn text-center" data-wow-delay=".3s">Defendemos con disciplina y convicción las causas de
                              nuestros Clientes</cite>
                           <b-button :to="{name:'contacto'}" variant="primary" class="mt-1 wow bounceInUp">
                              <strong>Cuéntanos tu caso</strong>
                           </b-button>
                        <!-- </b-skeleton-wrapper>    -->
                      
                     </b-col>
                  </b-row>
               </b-container>
            
            </div>
            <div class="flecha-bajar text-xs-center">
               <a data-scroll href="#q-somos"> <i class="fa fa-angle-down" aria-hidden="true"></i></a>
            </div>
         </b-col>
        
      </b-row>

 
      <!-- Quienes somos -->
      <b-row class="mx-0">
         <b-col cols="12" class="px-0">
            <section class="q-somos py-2" id="q-somos">
            
               <b-container :fluid="windowWidth < 762 ? true : false">
                  <b-row>
                     <b-col cols="12" md="8"  class="wow bounceIn" data-wow-delay=".3s">
                        <section v-html="sistema.quienes_somos" class="text-quienes-somos"></section>
                        <b-button :to="{name:'quienes.somos'}" title="Quienes somos?" variant="primary"  class="mx-auto mt-1">
                           Conocenos mas!
                        </b-button>
                     </b-col>

                     <b-col cols="12" md="4" class="wow bounceIn d-flex" data-wow-delay=".6s">
                        <img src="storage/balanza_j1.svg" alt="Villamizar & Jarava" width="294" height="294">
                     </b-col>

                  </b-row>
            
                
               </b-container>
            
            </section>
         </b-col>
      </b-row>
     
      <!-- Porque somos tu mejor eleccion -->
      <b-row class="mx-0">
         <b-col cols="12" class="px-0">
         <section class="tu-mejor-eleccion py-2">
            <b-container :fluid="windowWidth <= 762 ? true : false">
                  <h2 class="h3 text-center font-weight-bolder">¿Porque somos <span>tu mejor elección?</span></h2>
                  <p class="text-center font-weight-bold">
                     Brindamos Asistencia Legal en Diferentes Áreas del Derecho
                  </p>

                  <b-row>
                     <ul class="col-6 col-lg-4 text-center text-lg-left">
                        <li class="wow zoomIn" data-wow-duration=".3s" data-wow-delay=".3s">
                           <i class="fa fa-user-shield" aria-hidden="true"></i>

                           <div class="contenedor-eleccion">
                              <h4>Representación Legal</h4>
                              <p class="hidden-md-down">En diferentes áreas: Derecho Penal, Civil, Procesal, Familia, Comercial, Laboral y muchas más...</p>
                           </div>
                        </li>
                        <li class="wow zoomIn" data-wow-duration=".3s" data-wow-delay=".7s">
                           <i class="fa fa-newspaper" aria-hidden="true"></i>
                           <div class="contenedor-eleccion">
                              <h4>Información veraz</h4>
                              <p class="hidden-md-down">Semanalmente Subimos Nuevas noticias con Novedades del Derecho Colombiano e Internacional.</p>
                           </div>
                        </li>
                        <li class="wow zoomIn" data-wow-duration=".3s" data-wow-delay="1.1s">

                           <i class="fa fa-comment" aria-hidden="true"></i>

                           <div class="contenedor-eleccion">
                              <h4>Consultoría,</h4>
                              <p class="hidden-md-down">Para empresas, Profesional y Particulares en todas las áreas</p>
                           </div>
                        </li>
                     </ul>
                     
                     <b-col class="d-none d-lg-flex justify-content-center align-items-center" lg="4">
                        <img src="/storage/glogo_juridico.webp" alt="Mundo movil" style="height: 70%;" width="316" height="314">
                     </b-col>

                     <ul class="col-6 col-lg-4 text-center text-lg-right">
                        <li class="wow zoomIn" data-wow-duration=".3s" data-wow-delay=".5s">
                           <i class="fa  fa-balance-scale" aria-hidden="true"></i>
                           <div class="contenedor-eleccion">
                              <h4>Litigio,</h4>
                              <p class="hidden-md-down">Defendemos sus Intereses Bajo los principios de Lealtad, Compromiso, Ética y Profesionalismo

                              </p>
                           </div>
                        </li>
                        <li class="wow zoomIn" data-wow-duration=".3s" data-wow-delay=".9s">
                           <i class="fa fa-handshake" aria-hidden="true"></i>
                           <div class="contenedor-eleccion">
                              <h4>Asesoría</h4>
                              <p class="hidden-md-down">Ofrecemos información y asesoramiento en la aplicación de normativas, leyes y reglamentos en materia del Derecho</p>
                           </div>
                        </li>
                        <li class="wow zoomIn" data-wow-duration=".3s" data-wow-delay="1.3s">
                           <i class="fa  fa-map-marked-alt" aria-hidden="true"></i>
                           <div class="contenedor-eleccion">
                              <h4>Estamos cerca</h4>
                              <p class="hidden-md-down">{{ sistema.sucursales.length > 1 ? 'Varías Sucursales en diferentes regiones' : 'Estamos Expandiendo nuestras sucursales y oficinas a más departamentos y Paises '  }}.</p>
                           </div>
                        </li>
                     </ul>
                  </b-row>
            </b-container> 
          
         </section>
         </b-col>
      </b-row>

     

      <!-- Nuestros Servicios -->
      <b-row class="servicios mx-0" v-if="servicios.length"> 
         <b-col cols="12" class="py-2 px-0">
            <h2 class="text-center font-weight-bolder text-white">Nuestros Servicios</h2>
            <b-container :fluid="windowWidth <= 762 ? true : false">
               <b-row class="blog-list-wrapper">
                  <b-col cols="12" md="4" v-for="(servicio,i) in servicios" :key="i">
                     <b-card tag="article" no-body>
                        <b-link :to="{ name: 'show.servicio', params: { url: servicio.url } }">
                           <b-img :src="`/storage/servicios/banner/${servicio.banner}`" :alt="servicio.titulo.slice(5)"
                              class="card-img-top" />
                        </b-link>
                        <b-card-body style="padding:0.5rem">
                           <b-card-title>
                              <b-link :to="{ name: 'show.servicio', params: { url: servicio.url } }"
                                 class="blog-title-truncate text-body-heading">
                                 {{ servicio.titulo }}
                              </b-link>
                           </b-card-title>
               
                           <b-media no-body>
               
                              <b-media-aside vertical-align="center" class="mr-50">
                                 <b-avatar href="javascript:void(0)" size="24" :src="servicio.usuario.avatar" />
                              </b-media-aside>
               
                              <b-media-body>
                                 <small class="text-muted mr-50">Por</small>
                                 <small>
                                    <b-link class="text-body">{{ `${servicio.usuario.nombre} ${servicio.usuario.apellido}` }}
                                    </b-link>
                                 </small>
                                 <br>
                                 <small class="text-muted">{{ servicio.created_at | fecha('LLL') }}</small>
                              </b-media-body>
                           </b-media>
                           <div class="py-10">
                              <b-link>
                                 <b-badge pill class="mr-75" :style="{
                                                                     'background-color':colorRand()
                                                                  }">
                                    {{ servicio.categoria.nombre }}
                                 </b-badge>
                              </b-link>
                           </div>
               
                           <b-card-text class="blog-content-truncate" v-html="`${servicio.contenido.substring(0,450)}`">
                           </b-card-text>
               
                           <hr>
               
                           <div class="d-flex justify-content-between align-items-center">
                              <b-link :to="{ name: 'show.servicio', params: { url: servicio.url } }" class="font-weight-bold">
                                 Leer Mas
                              </b-link>
                           </div>
               
                        </b-card-body>
                     </b-card>
                  </b-col>
               </b-row>

               <b-row>
                  <b-col cols="12" class="d-flex justify-content-center">
                     <b-button variant="primary" :to="{name:'servicios'}">
                        Ver todos los servicios
                     </b-button>
                  </b-col>
               </b-row>
            </b-container>
          
         </b-col>
      </b-row>

      <!-- Nuestros Clientes -->
      <nuestros-clientes />
      
      <!-- Aplicacionnes Recientes... -->
      <publicaciones-recientes />

   </b-container>
</template>

<script>
import {
   BContainer,
   BCard,
   BCardBody,
   BCardTitle,
   BRow,
   BCol,
   BLink,
   BButton,
   BSkeleton,
   BSkeletonWrapper,
   BMedia,
   BMediaAside,
   BMediaBody,
   BAvatar,
   BImg,
   BBadge,
   BCardText
    
} from 'bootstrap-vue'
import store from '@/store'

import {computed,onMounted,ref} from 'vue'

import { colorRand } from '@core/utils/utils'
export default {

   components: {
      BContainer,
      BRow,
      BCol,
      BLink,
      BButton,
      BSkeleton,
      BSkeletonWrapper,
      BMedia,
      BMediaAside,
      BMediaBody,
      BImg,
      BCard,
      BCardBody,
      BCardTitle,
      BAvatar,
      BBadge,
      BCardText,
      PublicacionesRecientes:() => import('components/PublicacionesRecientes.vue'),
      NuestrosClientes:() => import('components/NuestrosClientes.vue')



   },

 

   metaInfo(){
      return {
         title:this.sistema.nombre,
         meta:this.sistema.metas.map(val => {
            return {
               vmid:val.nombre,
               name: val.nombre,
               content: val.contenido.substring(0, 157) +'..'
            }
         })
      }
   },

   setup() {

      const servicios = ref([])

      onMounted(() => {

         store.commit('toggleLoading',true)

         setTimeout(() => {
            store.commit('toggleLoading', false)
         },5000)

         store.dispatch('servicio/RandonServicios').then((services) => {
            servicios.value = services
         })
      })
      
      const sistema = computed(() => store.state.sistema.sistema);
      return{
         loading: computed(() => store.state.loading),
         sistema,
         servicios,
         colorRand,
         windowWidth: computed(() => store.state.app.windowWidth),
        
      }
     
   },
}

</script>

<style lang="scss" scope>
   @import '~@core/scss/vue/pages/page-blog.scss';
   @import '~@core/scss/vue/pages/page-knowledge-base.scss';
</style>

<style lang="scss">
.bienvenidos {
   background: url("/storage/fondo-principal.webp") no-repeat center top;
   color: #fff;
   background-size: cover;
   background-attachment: fixed !important;
   height: 92vh;
   display: flex;
   justify-content: center;
   flex-direction: column;
}

.texto-encabezado {
   flex: 1 1 auto;
   display: flex;
   align-items: center;

}

.banner-content-principal{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      
      .texto-encabezado{
         flex: 1 1 auto;
         display: flex;
         align-items: center;

         .titulo-principal{
            font-size: 24pt;
            text-align: center;
         }

         @media (min-width:762px){
         .titulo-principal {
               font-size: 34pt;
            }
         }

         @media (min-width:992px) {
            .titulo-principal {
               font-size: 40pt;
            }
         }

      }
   }

/*-----------------------------
SECCION AGENCIA
------------------------------*/
.q-somos {
   background: #053844;
   color: #fff;
}

.q-somos img {
   width: 80%;
   margin: 0 auto;
   display: block;
}

/*----------------------------
SECCION TU MEJOR ELECCI├ôN
----------------------------*/
.tu-mejor-eleccion h2 span {
   color: #12AFAF;
}

.tu-mejor-eleccion ul,
.tu-mejor-eleccion ul li {
   list-style: none;
}

.tu-mejor-eleccion ul li .fa {
   font-size: 2.3rem;
   background: #6D4E05;
   border-radius: 50%;
   width: 4.7rem;
   height: 4.7rem;
   line-height: 4.7rem;
   color: #fff;
}

.tu-mejor-eleccion ul li .contenedor-eleccion h4 {
   font-size: 1.2rem;
   font-weight: bold;
   margin-top: .8rem;
}

.tu-mejor-eleccion ul li {
   min-height: 9rem;
}

/*-------------------------------
SECCION SERVICIOS
--------------------------------*/
.servicios {
   background: url("/storage/banner1.webp") no-repeat center center;
   background-size: cover;
   background-attachment: fixed !important;
   position: relative;
}

.servicios::before {
   content: '';
   width: 100%;
   height: 100%;
   background-color: #000000ba;
   position: absolute;
}


.servicios article {
   display: -webkit-box;
   display: -webkit-flex;
   display: -ms-flexbox;
   display: flex;
   -webkit-box-align: center;
   -webkit-align-items: center;
   -ms-flex-align: center;
   align-items: center;
   margin: 1rem 0;
}

.servicios img {
   -webkit-box-flex: 0;
   -webkit-flex: 0 0 60px;
   -ms-flex: 0 0 60px;
   flex: 0 0 60px;
   overflow: hidden;
   margin-right: 1rem;
}

.servicios h3 {
   margin: 0;
   font-size: 1.1rem;
   -webkit-box-flex: 1;
   -webkit-flex: 1 1 auto;
   -ms-flex: 1 1 auto;
   flex: 1 1 auto;
}

.servicios h3 a {
   color: #fff;
   display: -webkit-box;
   display: -webkit-flex;
   display: -ms-flexbox;
   display: flex;
   -webkit-box-pack: justify;
   -webkit-justify-content: space-between;
   -ms-flex-pack: justify;
   justify-content: space-between;
   -webkit-box-align: center;
   -webkit-align-items: center;
   -ms-flex-align: center;
   align-items: center;
   text-decoration: none;
}

.servicios h3 a::after {
   content: "\f054";
   font-family: FontAwesome;
   font-size: 2rem;
   margin-left: 1rem;
   opacity: .5;
   position: relative;
   left: 0;
   -webkit-transition: all .5s ease;
   transition: all .5s ease;
}

.servicios h3 a:hover::after {
   left: -.5rem;
   opacity: 1;
   color: #12AFAF;
}

.text-quienes-somos{
   display: -webkit-box;
   -webkit-line-clamp: 7;
   -webkit-box-orient: vertical;
   overflow: hidden;
   
   iframe {
      display:none;
      width: 100%;
      height: 320px;
   }

   img {
      display: none !important;
      width: 100%;
      height: 320px;
   }
}
</style>