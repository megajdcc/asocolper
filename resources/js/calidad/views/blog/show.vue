<template>
   <b-container fluid>
      <b-row>
         <!-- blogs -->
         <b-col cols="12">
            <b-card :img-src="`/storage/blog-banner/${contenido.banner}`" img-top :img-alt="contenido.titulo" :title="contenido.titulo">
               <b-media no-body v-if="contenido.usuario">
                  <b-media-aside vertical-align="center" class="mr-50">
                     <b-avatar href="javascript:void(0)" size="24" v-if="contenido.usuario" :src="contenido.usuario.avatar" />
                  </b-media-aside>
                  <b-media-body>
                     <small class="text-muted mr-50">Por</small>
                     <small>
                        <b-link class="text-body">{{ `${contenido.usuario.nombre} ${contenido.usuario.apellido}`}}</b-link>
                     </small>
                     <span class="text-muted ml-75 mr-50">|</span>
                     <small class="text-muted">{{ contenido.created_at | fecha('LLL') }}</small>
                  </b-media-body>
               </b-media>
               <div class="my-1 py-25">
                  <b-link v-for="(categoria,index) in contenido.categorias" :key="index">
                     <b-badge pill class="mr-75" :style="{
                        'background-color':colorRand()
                     }">
                        <feather-icon :icon="categoria.icono" />
                        {{ categoria.nombre }}
                     </b-badge>
                  </b-link>
               </div>
               <!-- eslint-disable vue/no-v-html -->
               <div class="blog-content" v-html="contenido.contenido" />
      
               <!-- user commnets -->
               <!-- <b-media v-for="user in blogDetail.blog.UserComment" :key="user.avatar" no-body>
                  <b-media-aside>
                     <b-avatar size="60" :src="user.avatar" />
                  </b-media-aside>
                  <b-media-body>
                     <h6 class="font-weight-bolder">
                        {{ user.fullName }}
                     </h6>
                     <b-card-text>
                        {{ user.comment }}
                     </b-card-text>
                  </b-media-body>
               </b-media> -->
               <!-- eslint-enable -->
               <hr class="my-2">
      
               <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                     <div class="d-flex align-items-center mr-1">
                        <b-link class="mr-50" href="#blogComment">
                           <feather-icon icon="MessageSquareIcon" size="21" class="text-body" />
                        </b-link>
                        <b-link href="#blogComment">
                           <div class="text-body">
                              {{ kFormatter(contenido.comentarios.length) }}
                           </div>
                        </b-link>
                     </div>
                     <div class="d-flex align-items-center">
                        <b-link class="mr-50" @click="alternarFavorito({contenido_id:contenido.id,usuario_id:usuario.id},isFavorito(usuario.id))">
                           <feather-icon size="21" icon="HeartIcon" :class="{'text-danger' : isFavorito(usuario.id)}" />
                        </b-link>
                        <b-link>
                           <div class="text-body">
                              {{ kFormatter(contenido.likes.length) }}
                           </div>
                        </b-link>
                     </div>
                  </div>
      
                  <div class="blog-detail-share">
                     <b-dropdown variant="link" toggle-class="p-0" no-caret right>
                        <template #button-content>
                           <feather-icon size="21" icon="Share2Icon" class="text-body" />
                        </template>
                        <b-dropdown-item v-for="social in socialShareIcons" :key="social.icon" @click="compartir(social)">
                           <feather-icon :icon="social.icon" size="18" />
                          {{ social.label }}
                        </b-dropdown-item>
                     </b-dropdown>
                  </div>
                  
               </div>
            </b-card>
         </b-col>
         <!--/ blogs -->
      
         <!-- blog comment -->
         <b-col id="blogComment" cols="12" class="mt-1">
            <h4 class="display-6">
               Comentarios
            </h4>
            
            <b-card >
               <b-container fluid>
                  <b-row>
                     <b-col cols="12" md="4">
                        <per-page :perPageOptions="perPageOptions" v-model="perPage" />
                     </b-col>

                     <b-col cols="12" md="8">
                        <b-form-input v-model="searchQuery" type="search" placeholder="Buscar comentario..."  size="sm" />
                     </b-col>


                  </b-row>
               </b-container>
            </b-card>

            <b-card body-class="d-flex justify-content-center" v-show="loading">
               <b-spinner variant="primary"  label="Cargando" />
            </b-card>

            <template v-if="!loading">
               <VuePerfectScrollbar class="scroll-area" :settings="{maxScrollbarLength: 60}">
                  <b-card v-for="(comentario,index) in comentarios.filter(val => val.comentario_id == null)" :key="index">
                     <b-media no-body>
                        <b-media-aside class="mr-75" >
                           <b-avatar :src="comentario.usuario ? comentario.usuario.avatar : '/storage/img-perfil/default.jpg'" size="38" />
                        </b-media-aside>
                        <b-media-body>
                           <h6 class="font-weight-bolder mb-25">
                              {{ comentario.nombre }}
                           </h6>
                           <b-link :href="`mailto:${comentario.email}`" target="_blank">
                              <feather-icon icon="AtSignIcon" />
                              {{ comentario.email }}
                           </b-link>

                           <b-link :href="`tel:${comentario.telefono}`" target="_blank" v-if="comentario.telefono" variant="info" class="text-info" >
                              <feather-icon icon="PhoneIcon" />
                              {{ comentario.telefono }}
                           </b-link>

                           <b-card-text>{{ comentario.created_at | fecha('LLL') }}</b-card-text>
                           <b-card-text>
                              {{ comentario.comentario }}
                           </b-card-text>
                           <b-link href="#formComentario" @click="replicarMensaje(comentario.id)">
                              <div class="d-inline-flex align-items-center">
                                 <feather-icon icon="CornerUpLeftIcon" size="18" class="mr-50" />
                                 <span>Responder</span>
                              </div>
                           </b-link>
                  
                           <b-media class="ml-2" no-body v-for="(comment,idx) in comentario.comentarios" :key="idx">
                              <b-media-aside class="mr-75">
                                 <b-avatar :src="comment.usuario ? comment.usuario.avatar : '/storage/img-perfil/default.jpg'" size="38" />
                              </b-media-aside>
                              <b-media-body>
                                 <h6 class="font-weight-bolder mb-25">
                                    {{ comment.nombre }}
                                 </h6>
                                 <b-link :href="`mailto:${comment.email}`" target="_blank">
                                    <feather-icon icon="AtSignIcon" />
                                    {{ comment.email }}
                                 </b-link>
                                 <b-link :href="`tel:${comment.telefono}`" target="_blank" v-if="comment.telefono" variant="info"
                                    class="text-info">
                                    <feather-icon icon="PhoneIcon" />
                                    {{ comment.telefono }}
                                 </b-link>
                                 <b-card-text>{{ comment.created_at | fecha('LLL') }}</b-card-text>
                                 <b-card-text>
                                    {{ comment.comentario }}
                                 </b-card-text>
                              </b-media-body>
                           </b-media>
                  
                        </b-media-body>
                     </b-media>
                  
                  
                  </b-card>
               </VuePerfectScrollbar>

               
            </template>
           

            <paginate-table :dataMeta="dataMeta" :currentPage.sync="currentPage" :perPage.sync="perPage" :total="total"  />
         </b-col>
       
         <b-col cols="12" class="mt-2" id="formComentario">
            <h6 class="section-label">
               Dejar un comentario
            </h6>
            <b-card>
               <validation-observer ref="formValidate" #default="{handleSubmit}">

                  <b-form @submit.prevent="handleSubmit(enviarComentario)">
                     <b-row>
                        <b-col sm="6">
                           <b-form-group class="mb-2">
                              
                              <template #label>
                                 Nombre: <span class="text-danger">*</span>
                              </template>
                              <validation-provider name="nombre" rules="required" #default="{valid,errors}">
                                 <b-form-input v-model="comentario.nombre" placeholder="Nombre" :state="valid" />

                                 <b-form-invalid-feedback >
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                              </validation-provider>
                            
                           </b-form-group>
                        </b-col>
                        <b-col sm="6">
                        <b-form-group class="mb-2">
                        
                           <template #label>
                              Email: <span class="text-danger">*</span>
                           </template>
                           <validation-provider name="email" rules="required" #default="{valid,errors}">
                              <b-form-input v-model="comentario.email" placeholder="Email" :state="valid" />
                        
                              <b-form-invalid-feedback>
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                           </validation-provider>
                        
                        </b-form-group>
                        </b-col>
                        <b-col sm="6">
                           <b-form-group class="mb-2">
                           
                              <template #label>
                                 Celular:
                              </template>
                              <validation-provider name="telefono" #default="{valid,errors}">
                                 <the-mask v-model="comentario.telefono" :mask="'+############'"  class="form-control" type="tel" masked placeholder="+57 314 1245689" />
                                 <!-- <b-form-input v-model="comentario.telefono" placeholder="Teléfono" :state="valid" /> -->
                           
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                              </validation-provider>
                           
                           </b-form-group>
                        </b-col>
                        <b-col cols="12">
                           <b-form-group class="mb-2">
                           
                              <template #label>
                                 Comentario: <span class="text-danger">*</span>
                              </template>
                              <validation-provider name="comentario" rules="required" #default="{valid,errors}">
                                 <b-form-textarea v-model="comentario.comentario" placeholder="Comentario..." :state="valid" ></b-form-textarea>
                           
                                 <b-form-invalid-feedback>
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                              </validation-provider>
                           
                           </b-form-group>
                        </b-col>
                        <b-col cols="12">
                           <b-form-checkbox id="checkbox-1" v-model="commentCheckmark" name="checkbox-1" class="mb-2">
                              Guarde mi nombre, correo electrónico y telefono en este navegador para la próxima vez que comente.
                           </b-form-checkbox>
                        </b-col>
                        <b-col cols="12">
                           <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" type="submit" v-loading="loading">
                              <feather-icon icon="SendIcon"/>
                              Enviar Comentario
                           </b-button>
                        </b-col>
                     </b-row>
                  </b-form>
               </validation-observer>
             
            </b-card>
         </b-col>
      </b-row>
   </b-container>
     

</template>

<script>
import {
   BFormInput,
   BMedia,
   BAvatar,
   BMediaAside,
   BMediaBody,
   BImg,
   BLink,
   BFormGroup,
   BInputGroup,
   BInputGroupAppend,
   BCard,
   BRow,
   BCol,
   BBadge,
   BCardText,
   BDropdown,
   BDropdownItem,
   BForm,
   BFormTextarea,
   BFormCheckbox,
   BButton,
   BFormInvalidFeedback,
   BContainer,
   BSpinner
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { kFormatter } from '@core/utils/filter'
import ContentWithSidebar from '@core/layouts/components/content-with-sidebar/ContentWithSidebar.vue'

import {ValidationObserver,ValidationProvider} from 'vee-validate'
import {required} from '@validations'

import store from '@/store'
import router from '@/router'

import {computed,onMounted,watch,toRefs,ref} from 'vue'
import { colorRand } from '@core/utils/utils'
import useComentarioList from './useComentarioList.js'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import useContenidoList from './useContenidoList.js';
export default {
   components: {
      BFormInput,
      BMedia,
      BAvatar,
      BMediaAside,
      BMediaBody,
      BLink,
      BCard,
      BRow,
      BCol,
      BFormGroup,
      BInputGroup,
      BInputGroupAppend,
      BImg,
      BBadge,
      BCardText,
      BDropdown,
      BForm,
      BDropdownItem,
      BFormTextarea,
      BFormCheckbox,
      BButton,
      ContentWithSidebar,
      ValidationObserver,
      ValidationProvider,
      BFormInvalidFeedback,
      BContainer,
      BSpinner,
      PaginateTable:() => import('components/PaginateTable.vue'),
      PerPage:() => import('components/PerPage.vue'),
      VuePerfectScrollbar


   },
   directives: {
      Ripple,
   },

   props:['id'],


   setup(props,{emit}){

      const {id} = toRefs(props)
      const formValidate = ref(null)
      const {contenido,contenidos} = toRefs(store.state.contenido)
      const comentario = computed(() => store.getters['comentario/draft'])

      const {usuario} = toRefs(store.state.usuario)

      const commentCheckmark = ref(false)

      const {
         comentarios,
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
      } = useComentarioList(id.value)


      const {
         alternarFavorito
      } = useContenidoList();

      const cargarForm = () => {
         
         if(!contenidos.value.length){
            store.dispatch('contenido/fetch',id.value)
         }else{
            store.commit('contenido/capturar',id.value)
         }

         if(usuario.value.id){
            comentario.value.nombre = usuario.value.nombre +' '+usuario.value.apellido
            comentario.value.email = usuario.value.email
            comentario.value.telefono = usuario.value.telefono
         }

         comentario.value.contenido_id = id.value

      }

      onMounted(() => cargarForm())

      watch([id], () => cargarForm())


      const compartir = ({label}) => {

         switch (label) {
            case "Twitter":

               break;
         
            default:
               break;
         }
      }

      const enviarComentario = () => {

         if(commentCheckmark.value){
            localStorage.setItem('comentario', JSON.stringify({
               nombre: comentario.value.nombre,
               email: comentario.value.email,
               telefono: comentario.value.telefono
            }))
         }
         comentario.value.usuario_id = usuario.value.id || null;

         store.dispatch('comentario/guardar',comentario.value).then(({result,comentario:comment}) => {

            if(result){
               toast.success('Comentario agregado con éxito')
               store.commit('comentario/clear')
               refetchData()
            
            }else{
            
               toast.info('Comentario no se pudo agregar con éxito, inténtelo de nuevo...')
            
            }

         })


      }

      const replicarMensaje = (comentario_id) => {
         comentario.value.comentario_id = comentario_id
      }  


    

      return {
         kFormatter,
         contenido,
         loading:computed(() => store.state.loading),
         required,
         formValidate,
         colorRand,
         compartir,
         commentCheckmark,
         enviarComentario,
         comentario,
         replicarMensaje,
         socialShareIcons: [{
            label:'Facebook',
            icon:'FacebookIcon',
         },{
            label: 'Twitter',
            icon: 'TwitterIcon',
         },{
            label: 'Linkedin',
            icon: 'LinkedinIcon',
         }],

         comentarios,
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
         alternarFavorito,
         usuario,
         isFavorito:computed({
            get:() => store.getters['contenido/isFavorito'],
            set:(usuario_id) => store.getters['contenido/isFavorito',usuario_id]
         })
      }
   }

}
</script>

<style lang="scss">
@import '~@core/scss/vue/pages/page-blog.scss';

.card-img-top{
   flex-shrink: 0;
   width: 100%;
   max-height: 350px;
   object-fit: cover;
}
</style>

<style lang="scss">
   .scroll-area {
      position: relative;
      margin: auto;
      width: 100% !important;
      height:auto !important;
      max-height: 720px !important;
   }
</style> 
