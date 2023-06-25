<template>
   <b-container fluid class="mt-2">
      <b-row>
         <b-col cols="12">
            <!-- search input -->
            <section id="knowledge-base-search">
               <b-card no-body class="servicios knowledge-base-bg text-center"
                  :style="{backgroundImage: `url('/storage/fond_abogado.jpg')`}">
                  <b-card-body class="card-body">
                     <h2 class="text-white font-weight-bolder" style="z-index:20">
                        Nuestros Servicios
                     </h2>
                     <b-card-text class="mb-2 text-white" style="z-index:20">
                        <span>¡Estamos enfocado en Brindarte Bienestar para Tí y tú Seres Queridos!</span>
                     </b-card-text>

                     <!-- form -->
                     <b-form class="kb-search-input">
                        <b-input-group class="input-group-merge">
                           <b-input-group-prepend is-text>
                              <feather-icon icon="SearchIcon" />
                           </b-input-group-prepend>
                           <b-form-input id="searchbar" v-model="searchQuery" placeholder="Buscar Servicios..." />
                        </b-input-group>
                     </b-form>
                     <!-- form -->
                  </b-card-body>
               </b-card>
            </section>
            <!--/ search input -->
         </b-col>
      </b-row>

      <b-row>
         <b-col cols="12" md="9">
            <b-container fluid class="px-0">
               <b-row class="blog-list-wrapper w-100 mx-0">
                  <section class="w-100 d-flex justify-content-center" v-if="loading">
                     <b-spinner variant="primary" label="Cargando..." class="d-flex justify-content-center text-center"
                        type="grow">
                     </b-spinner>
                  </section>

                  <b-col v-for="servicio in servicios" :key="servicio.id" md="6" class="px-0 px-md-1">
                     <b-card tag="article" no-body>
                        <b-link :to="{ name: 'show.servicio', params: { url: servicio.url } }">
                           <b-img :src="`/storage/servicios/banner/${servicio.banner}`" :alt="servicio.titulo.slice(5)"
                              class="card-img-top" />
                        </b-link>
                        <b-card-body style="padding:0.5rem">
                           <b-card-title>
                              <b-link  :to="{ name: 'show.servicio', params: { url: servicio.url } }"
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
                              <b-link :to="{ name: 'show.servicio', params: { url: servicio.url } }"
                                 class="font-weight-bold">
                                 Leer Mas
                              </b-link>
                           </div>

                        </b-card-body>
                     </b-card>
                  </b-col>
               </b-row>

               <b-row>
                  <b-col cols="12">
                     <paginate-table :dataMeta="dataMeta" :currentPage="currentPage" :perPage.sync="perPage"
                        :total="total" />
                  </b-col>
               </b-row>
            </b-container>
         </b-col>
         <b-col cols="12" md="3">
            <div slot="sidebar" class="blog-sidebar py-2 py-lg-0">
               <!-- categories -->
               <div class="blog-categories ">
                  <h6 class="section-label mb-1">
                     Categorías
                  </h6>

                  <div v-for="({nombre,id},index) in categorias" :key="index"
                     class="d-flex justify-content-start align-items-center mb-75"
                     :class="{'categoria-active' : categoria == id}">
                     <b-link :to="{name:'servicios',params:{categoria:id}}">
                        <b-avatar rounded size="32" :style="{
                           'background-color':colorRand()
                        }" class="mr-75">
                           
                           <feather-icon icon="CheckCircleIcon" size="16" />

                        </b-avatar>
                     </b-link>
                     <b-link :to="{name:'servicios',params:{categoria:id}}">
                        <div class="blog-category-title text-body">
                           {{ nombre }}
                        </div>
                     </b-link>
                  </div>


               </div>
               <!--/ categories -->
            </div>
         </b-col>
      </b-row>


   </b-container>


</template>

<script>
import {
   BRow,
   BCol,
   BCard,
   BFormInput,
   BCardText,
   BCardTitle,
   BMedia,
   BAvatar,
   BMediaAside,
   BMediaBody,
   BImg,
   BCardBody,
   BLink,
   BBadge,
   BFormGroup,
   BInputGroup,
   BInputGroupAppend,
   BInputGroupPrepend,
   BPagination,
   BContainer,
   BButton,
   BSpinner,
   BButtonGroup,
   BFormRadioGroup,
   BForm
} from 'bootstrap-vue'
import { kFormatter } from '@core/utils/filter'

import store from '@/store'

import { computed, toRefs, ref, onMounted, watch } from 'vue'

import useServiciosList from './useServiciosList.js'
import { colorRand } from '@core/utils/utils'

export default {
   components: {
      BContainer,
      BRow,
      BCol,
      BCard,
      BFormInput,
      BCardText,
      BCardBody,
      BCardTitle,
      BMedia,
      BAvatar,
      BMediaAside,
      BMediaBody,
      BLink,
      BBadge,
      BFormGroup,
      BInputGroup,
      BInputGroupAppend,
      BInputGroupPrepend,
      BImg,
      BPagination,
      BButton,
      BSpinner,
      BButtonGroup,
      BFormRadioGroup,
      BForm,
      PaginateTable: () => import('components/PaginateTable.vue'),
      PerPage: () => import('components/PerPage.vue')
   },
   props: ['categoria'],

    metaInfo() {
      return {
         title: 'Servicios | Villamizar & Jarava Abogados Asociados S.A.S',
         meta:[{
            vmid:'description',
            name:'description',
            content:this.categorias.map(val => `${val.nombre}`).toString().substring(0, 157) + '.. '
         }]
      }
   },

   
   setup(props) {

      const { usuario } = toRefs(store.state.usuario)
      const { categoria } = toRefs(props)

      const {
         servicios,
         perPageOptions,
         isSortDirDesc,
         sortBy,
         searchQuery,
         perPage,
         currentPage,
         total,
         fetchData,
         refetchData,
         dataMeta,
         categoria_id,
         categorias
      } = useServiciosList();

      onMounted(() => {
         if (categoria.value) {
            categoria_id.value = Number(categoria.value)
         }

         refetchData();
      })

      watch(categoria, (val) => {
         categoria_id.value = val
      })

      return {
         servicios,
         perPageOptions,
         isSortDirDesc,
         sortBy,
         searchQuery,
         perPage,
         currentPage,
         total,
         fetchData,
         refetchData,
         dataMeta,
         loading: computed(() => store.state.loading),
         kFormatter,
         colorRand,
         usuario,
         categorias,
         categoria_id,
         optionsCategorias: computed(() => {
            return categorias.value.map((val) => {
               return {
                  text: val.nombre,
                  value: val.id
               }
            })
         }),

      }
   }
}
</script>

<style lang="scss" scope>
@import '~@core/scss/vue/pages/page-blog.scss';
@import '~@core/scss/vue/pages/page-knowledge-base.scss';

.header-navbar-shadow {
   display: none;
}

@media (min-width: 992px) {
   .knowledge-base-bg .card-body {
      padding: 4rem;
   }
}

.categoria-active {
   border: 1px dotted #be9c4f;
   padding: 0.2rem;
   border-radius: 7px;
   cursor: pointer;
   background: linear-gradient(45deg, #c3a35b, #302f2fcf);

   .text-body {
      color: white !important;
      font-weight: 800;
   }

}

.text-body-heading {
   color: #7b673b;
}

.card.servicios.knowledge-base-bg{
   background-position: center center;
   background-size: cover;
   background-attachment: fixed !important;
   border-radius: 10px;
   transition: all 0.5s ease-out;
   .card-body{
      z-index: 20;
   }

   &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #06060694;
      border-radius: 10px;
   }
}
</style>
