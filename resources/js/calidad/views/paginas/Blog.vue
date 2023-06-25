<template>
   <b-container fluid class="mt-2" >
      <b-row>
         <b-col cols="12">
            <!-- search input -->
            <section id="knowledge-base-search">
               <b-card no-body class="knowledge-base-bg text-center"
                  :style="{backgroundImage: `url(${require('@/assets/images/banner/banner.png')})`}">
                  <b-card-body class="card-body">
                     <h2 class="text-primary">
                        Estamos Dedicado a brindarte lo mejor
                     </h2>
                     <b-card-text class="mb-2">
                        <span>¿No lo encuentras? Utiliza Palabras Claves.</span>
                     </b-card-text>
            
                     <!-- form -->
                     <b-form class="kb-search-input">
                        <b-input-group class="input-group-merge">
                           <b-input-group-prepend is-text>
                              <feather-icon icon="SearchIcon" />
                           </b-input-group-prepend>
                           <b-form-input id="searchbar" v-model="searchQuery" placeholder="Buscar contenido..." />
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
                     <b-spinner variant="primary" label="Cargando..." class="d-flex justify-content-center text-center" type="grow">
                     </b-spinner>
                  </section>
               
                  <b-col v-for="blog in contenidos" :key="blog.id" md="6" class="px-0 px-md-1">
                     <b-card tag="article" no-body>
                        <b-link :to="{ name: 'blog.public.show', params: { slug: blog.slug } }">
                           <b-img :src="`/storage/blog-banner/${blog.banner}`" :alt="blog.titulo.slice(5)" class="card-img-top" />
                        </b-link>
                        <b-card-body style="padding:0.5rem">
                           <b-card-title>
                              <b-link :to="{ name: 'blog.public.show', params: { slug: blog.slug } }"
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
               
                           <b-card-text class="blog-content-truncate" v-html="`${blog.contenido.substring(0,420)}`">
                           </b-card-text>
               
                           <hr>
               
                           <div class="d-flex justify-content-between align-items-center">
               
                              <div class="d-flex align-items-center">
                                 <b-link :to="{ name: 'blog.public.show', params: { slug: blog.slug } }" class="mr-1">
                                    <div class="d-flex align-items-center text-body">
                                       <feather-icon icon="MessageSquareIcon" class="mr-50" />
                                       <span class="font-weight-bold">{{ kFormatter(blog.comentarios.length) }}
                                          Comentarios</span>
                                    </div>
                                 </b-link>
               
                                 <b-link class="mr-50" v-if="usuario.id"
                                    @click="alternarFavorito({contenido_id:blog.id,usuario_id:usuario.id},isFavorito(usuario.id,blog.id))">
                                    <feather-icon size="21" icon="HeartIcon"
                                       :class="{'text-danger' : isFavorito(usuario.id,blog.id)}" />
                                 </b-link>
                                 <b-link  v-if="usuario.id">
                                    <div class="text-body">
                                       {{ kFormatter(blog.likes.length) }}
                                    </div>
                                 </b-link>
                              </div>
               
                              <b-link :to="{ name: 'blog.public.show', params: { slug: blog.slug } }" class="font-weight-bold">
                                 Leer Mas
                              </b-link>
                           </div>
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
         </b-col>
         <b-col cols="12" md="3">
            <div slot="sidebar" class="blog-sidebar py-2 py-lg-0">
               <!-- recent posts -->
               <div class="blog-recent-posts">
                  <h6 class="section-label">
                    Publicaciones Reciente
                  </h6>
                  <small class="mb-75 text-muted">Ultimos 3 meses</small>
                  <b-media v-for="(publicacion,index) in publicacionesRecientes" :key="publicacion.id" no-body
                     :class="index? 'mt-2':''">
                     <b-media-aside class="mr-2">
                        <b-link :to="{ name: 'blog.public.show', params: { slug: publicacion.slug } }">
                           <b-img :src="`/storage/blog-banner/${publicacion.banner}`" :alt="publicacion.titulo" width="100" rounded height="70" />
                        </b-link>
                     </b-media-aside>
                     <b-media-body>
                        <h6 class="blog-recent-post-title">
                           <b-link :to="{ name: 'blog.public.show', params: { slug: publicacion.slug } }" class="text-body-heading">
                              {{ publicacion.titulo }}
                           </b-link>
                        </h6>
                        <small class="text-muted mb-0">
                           {{ publicacion.created_at  | fecha('LL') }}
                        </small>
                     </b-media-body>
                  </b-media>
               </div>
               <!--/ recent posts -->
            
               <!-- categories -->
               <div class="blog-categories mt-3">
                  <h6 class="section-label mb-1">
                     Categorías
                  </h6>

                  <div v-for="({nombre,icono,id},index) in categorias" :key="index" class="d-flex justify-content-start align-items-center mb-75" :class="{'categoria-active' : categoria == id}">
                     <b-link :to="{name:'blog.public',params:{categoria:id}}">
                        <b-avatar rounded size="32" :style="{
                           'background-color':colorRand()
                        }" class="mr-75">
                           <feather-icon :icon="icono" size="16" />
                        </b-avatar>
                     </b-link>
                     <b-link :to="{name:'blog.public',params:{categoria:id}}">
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

import { computed, toRefs, ref, onMounted,watch } from 'vue'

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
   props:['categoria'],


   metaInfo() {
      return {
         title: 'Blog | Villamizar & Jarava Abogados Asociados S.A.S',
         meta: [{
            vmid: 'description',
            name: 'description',
            content: this.categorias.map(val => `${val.nombre}`).toString().substring(0, 157) + '.. '
         }]
      }
   },


   setup(props) {

      const { usuario } = toRefs(store.state.usuario)
      const { categoria } = toRefs(props)

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
         alternarFavorito,
         publicacionesRecientes,
         categoria_id,
         categorias
      } = useContenidoList();

      onMounted(() => {
         if(categoria.value){
            categoria_id.value = Number(categoria.value)
         }

         refetchData();
      })

      watch(categoria,(val) => {
         categoria_id.value = val
      } )

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
         loading: computed(() => store.state.loading),
         kFormatter,
         colorRand,
         usuario,
         alternarFavorito,
         categorias,
         publicacionesRecientes,
         categoria_id,
         optionsCategorias:computed(() => {
            return categorias.value.map((val) => {
               return {
                  text:val.nombre,
                  icono:val.icono,
                  value:val.id
               }
            })
         }),
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
@import '~@core/scss/vue/pages/page-knowledge-base.scss';
.header-navbar-shadow{
   display: none;
}

@media (min-width: 992px) {
   .knowledge-base-bg .card-body {
      padding: 4rem;
   }
}

.categoria-active{
   border: 1px dotted #be9c4f;
   padding: 0.2rem;
   border-radius: 7px;
   cursor: pointer;
   background: linear-gradient(45deg, #c3a35b, #302f2fcf);

   .text-body{
      color: white !important;
      font-weight: 800;
   }
  
}

.text-body-heading {
    color: #7b673b;
}

</style>
