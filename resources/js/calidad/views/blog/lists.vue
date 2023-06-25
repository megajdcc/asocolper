<template>
   <b-card>
      <b-container fluid>
      
         <b-row class="mb-1">
            <b-col cols="12" md="4">
               <per-page v-model="perPage" :perPageOptions="perPageOptions" />
            </b-col>
            <b-col cols="12" md="8" class="mt-1 mt-md-0">
               <b-input-group size="sm">
                  <b-form-input type="search" v-model="searchQuery" placeholder="Buscar contenido..." />
      
      
                  <b-input-group-append>
                     <b-button :to="{name:'create.blog'}" v-if="$can('write','contenidos')" variant="outline-primary"
                        class="d-flex align-items-center">
                        Nuevo Contenido
                     </b-button>
                  </b-input-group-append>
               </b-input-group>
            </b-col>
         </b-row>
      
         <b-row class="blog-list-wrapper w-100">
            <section class="w-100 d-flex justify-content-center" v-if="loading">
               <b-spinner variant="primary" label="Cargando..." class="d-flex justify-content-center text-center" type="grow">
               </b-spinner>
            </section>
      
            <b-col v-for="blog in contenidos" :key="blog.id" md="4">
               <b-card tag="article" no-body>
                  <b-link :to="{ name: 'show.contenido', params: { id: blog.id } }">
                     <b-img :src="`/storage/blog-banner/${blog.banner}`" :alt="blog.titulo.slice(5)" class="card-img-top" />
                  </b-link>
                  <b-card-body style="padding:0.5rem">
                     <b-card-title>
                        <b-link :to="{ name: 'show.contenido', params: { id: blog.id } }"
                           class="blog-title-truncate text-body-heading">
                           {{ blog.titulo }}
                        </b-link>
                     </b-card-title>
      
                     <b-media no-body>
      
                        <b-media-aside vertical-align="center" class="mr-50">
                           <b-avatar href="javascript:void(0)" size="24" :src="blog.usuario.avatar" />
                        </b-media-aside>
      
                        <b-media-body>
                           <small class="text-muted mr-50">Por</small>
                           <small>
                              <b-link class="text-body">{{ `${blog.usuario.nombre} ${blog.usuario.apellido}` }}</b-link>
                           </small>
                           <br>
                           <small class="text-muted">{{ blog.created_at | fecha('LLL') }}</small>
                        </b-media-body>
                     </b-media>
                     <div class="py-10">
                        <b-link v-for="(categoria,index) in blog.categorias" :key="index">
                           <b-badge pill class="mr-75" :style="{
                                 'background-color':colorRand()
                              }">
                              <feather-icon :icon="categoria.icono" />
                              {{ categoria.nombre }}
                           </b-badge>
                        </b-link>
                     </div>
      
                     <!-- <b-card-text class="blog-content-truncate">
                           {{ blog.contenido }}
                        </b-card-text> -->
      
                     <hr>
      
                     <div class="d-flex justify-content-between align-items-center">
      
                        <div class="d-flex align-items-center">
                           <b-link :to="{ name:'show.contenido',params:{id:blog.id}}" class="mr-1">
                              <div class="d-flex align-items-center text-body">
                                 <feather-icon icon="MessageSquareIcon" class="mr-50" />
                                 <span class="font-weight-bold">{{ kFormatter(blog.comentarios.length) }} Comentarios</span>
                              </div>
                           </b-link>
      
                           <b-link class="mr-50"
                              @click="alternarFavorito({contenido_id:blog.id,usuario_id:usuario.id},isFavorito(usuario.id,blog.id))">
                              <feather-icon size="21" icon="HeartIcon"
                                 :class="{'text-danger' : isFavorito(usuario.id,blog.id)}" />
                           </b-link>
                           <b-link>
                              <div class="text-body">
                                 {{ kFormatter(blog.likes.length) }}
                              </div>
                           </b-link>
                        </div>
      
                        <b-link :to="{ name: 'show.contenido', params: { id: blog.id } }" class="font-weight-bold">
                           Leer Mas
                        </b-link>
                     </div>
                     <b-button-group size="sm" class="mt-1">
                        <b-button @click="eliminar(blog.id)" variant="danger" title="Eliminar"
                           v-if="$can('delete','contenidos')">
                           <feather-icon icon="Trash2Icon" />
                           Eliminar
                        </b-button>
      
                        <b-button :to="{name:'edit.blog',params:{id:blog.id}}" variant="primary" title="Editar"
                           v-if="$can('update','contenidos')">
                           <feather-icon icon="EditIcon" />
                           Editar
                        </b-button>
      
                     </b-button-group>
                  </b-card-body>
               </b-card>
            </b-col>
         </b-row>
      
         <b-row>
            <b-col cols="12">
               <paginate-table :dataMeta="dataMeta" :currentPage="currentPage" :perPage.sync="perPage" :total="total" />
            </b-col>
         </b-row>
      
      </b-container>
   </b-card>



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
   BPagination,
   BContainer,
   BButton,
   BSpinner,
   BButtonGroup
} from 'bootstrap-vue'
import { kFormatter } from '@core/utils/filter'

import store from '@/store'

import {computed,toRefs,ref,onMounted} from 'vue'

import useContenidoList from './useContenidoList.js'
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
      BImg,
      BPagination,
      BButton,
      BSpinner,
      BButtonGroup,
      PaginateTable:() => import('components/PaginateTable.vue'),
      PerPage:() => import('components/PerPage.vue')
   },

   setup(props){

      const {usuario} = toRefs(store.state.usuario)

      const {
         contenidos,
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
         eliminar,
         alternarFavorito
      } = useContenidoList();

      onMounted(() => {
         refetchData();
      })


      return {
         contenidos,
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
         loading:computed(() => store.state.loading),
         kFormatter,
         eliminar,
         colorRand,
         usuario,
         alternarFavorito,
         isFavorito: computed({
            get: () => store.getters['contenido/isFavorito'],
            set: (usuario_id, contenido_id) => store.getters['contenido/isFavorito', usuario_id, contenido_id]
         })

      }
   }
}
</script>

<style lang="scss">
@import '~@core/scss/vue/pages/page-blog.scss';
</style>
