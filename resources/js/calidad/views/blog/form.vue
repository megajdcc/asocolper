<template>
   <validation-observer ref="formValidate" #default="{handleSubmit}">
      <b-form @submit.prevent="handleSubmit(guardar)">
         <b-card v-if="Object.keys(formulario).length" class="blog-edit-wrapper">
            <!-- media -->
            <b-media no-body vertical-align="center">
               <b-media-aside class="mr-75">
                  <b-avatar size="38" :src="usuario.avatar" />
               </b-media-aside>
               <b-media-body>
                  <h6 class="mb-25">
                     {{ `${usuario.nombre} ${usuario.apellido}` }}
                  </h6>
                  <b-card-text>{{ fecha_actual }}</b-card-text>
               </b-media-body>
            </b-media>
            <!--/ media -->
            <hr>
         
            <b-row>
               <b-col md="6">
                  <b-form-group >
                     
                     <template #label>
                        Titulo: <span class="text-danger">*</span>
                     </template>

                     <validation-provider name="titulo" rules="required" #default="{errors}">
                        
                        <b-form-input  v-model="formulario.titulo" :state="errors.length ? false : null" />

                        <b-form-invalid-feedback>
                           {{ errors[0] }}
                        </b-form-invalid-feedback>

                     </validation-provider>
                     
                  </b-form-group>
               </b-col>
               <b-col md="6">
                  <b-form-group >

                     <template #label>
                        Categoría: <span class="text-danger">*</span>
                     </template>

                     <validation-provider name="categorias" rules="required" #default="{valid,errors}">
                        <v-select v-model="formulario.categorias" :reduce="(val) => val.id " multiple :options="categoriasOptions" />
                     
                        <b-form-invalid-feedback :state="valid">
                           {{ errors[0] }}
                        </b-form-invalid-feedback>
                     </validation-provider>


                    
                  </b-form-group>
               </b-col>

               <b-col md="6">
                  <b-form-group  :prepend="`${url}/`">
                     <template #label>
                        Slug: <span class="text-danger">*</span>
                     </template>
                     <validation-provider name="slug" rules="required" #default="{errors}">
                  
                        <b-form-input id="blog-edit-title" v-model="formulario.slug" :state="errors.length ? false : null" />
                  
                        <b-form-invalid-feedback>
                           {{ errors[0] }}
                        </b-form-invalid-feedback>
                  
                     </validation-provider>
                  
                  </b-form-group>
               </b-col>
               
               <b-col md="6">
                  <b-form-group>
                  
                     <template #label>
                        Estatus de la publicación: <span class="text-danger">*</span>
                     </template>
                  
                     <validation-provider name="status" rules="required" #default="{valid,errors}">
                        <v-select v-model="formulario.status" :reduce="(val) => val.value "
                           :options="statusOptions" />
                  
                        <b-form-invalid-feedback :state="valid">
                           {{ errors[0] }}
                        </b-form-invalid-feedback>
                     </validation-provider>
                  
                  
                  
                  </b-form-group>
               </b-col>
             
               <b-col cols="12">
                  <b-form-group label-for="blog-content" class="mb-2">

                     <template #label>
                        Contenido: <span class="text-danger">*</span>
                     </template>

                        <validation-provider name="contenido" rules="required" #default="{valid,errors}">
                           <!-- <quill-editor id="blog-content" v-model="formulario.contenido" :options="snowOption" /> -->

                           <editor output-format="html" :value="formulario.contenido" @input="formulario.contenido = $event"
                              api-key="t1i940nuarrf1zefgxbf6ow5cxmgjmcad7q7l3fm5prgebyc" :init="optionsEditor" />

                              <b-form-invalid-feedback :state="valid">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>

                        </validation-provider>


                    
                  </b-form-group>
               </b-col>
               <b-col cols="12" class="mb-2">
                  <div class="border rounded p-2">
                     <h4 class="mb-1">
                        Imagen Principal
                     </h4>
                     <b-media no-body vertical-align="center" class="flex-column flex-md-row">
                        <b-media-aside>
                           <b-img ref="refPreviewEl" :src="bannerImg" height="110" width="170"
                              class="rounded mr-2 mb-1 mb-md-0" />
                        </b-media-aside>
                        <b-media-body>
                           <small class="text-muted">Resolución requerida de 800x400, imagen no puede exceder los 10mb.</small>
                           <b-card-text class="my-50">
                              <!-- <b-link id="blog-image-text">
                                 C:\fakepath\{{ blogFile ? blogFile.name : 'banner.jpg' }}
                              </b-link> -->
                           </b-card-text>
                           <div class="d-inline-block">
                              <validation-provider name="banner" #default="{valid,errors}">
                                 <b-form-file ref="refInputEl" v-model="formulario.banner" accept=".jpg, .png, .gif" placeholder="Buscar Imagen"
                                    @input="inputImageRenderer" />

                                    <b-form-invalid-feedback :state="valid">
                                       {{ errors[0] }}
                                    </b-form-invalid-feedback>


                              </validation-provider>

                            
                           </div>
                        </b-media-body>
                     </b-media>
                  </div>
               </b-col>
               <b-col cols="12" class="mt-50">
                  <b-button-group size="sm">
                     
                     <b-button type="submit"  v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" v-loading="loading">
                        <feather-icon icon="SaveIcon" />
                        Guardar
                     </b-button>
                     
                     <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="outline-secondary" @click="regresar">
                        Regresar
                     </b-button>
                  
                  </b-button-group>
                 
               </b-col>
            </b-row>
         </b-card>
      </b-form>
    
   </validation-observer>
   
</template>

<script>
import {
   BCard,
   BMedia,
   BAvatar,
   BCardText,
   BMediaAside,
   BMediaBody,
   BForm,
   BRow,
   BCol,
   BFormGroup,
   BFormInput,
   BInputGroup,
   BImg,
   BFormFile,
   BLink,
   BButton,
   BFormInvalidFeedback,
   BButtonGroup
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { quillEditor } from 'vue-quill-editor'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref, toRefs, computed, onMounted, watch } from 'vue'
import {ValidationObserver, ValidationProvider} from 'vee-validate'

import {required} from '@validations'
import store from '@/store'
import { regresar } from '@core/utils/utils'
import Editor from '@tinymce/tinymce-vue'


export default {
   components: {
      BCard,
      BMedia,
      BAvatar,
      BCardText,
      BMediaAside,
      BMediaBody,
      BForm,
      BLink,
      BImg,
      BRow,
      BCol,
      BButton,
      BFormGroup,
      BFormInput,
      BFormFile,
      vSelect,
      quillEditor,
      ValidationObserver,
      ValidationProvider,
      BFormInvalidFeedback,
      BInputGroup,
      BButtonGroup,
      Editor
   },
   directives: {
      Ripple,
   },

   setup(props,{emit}) {
      const refInputEl = ref(null)
      const refPreviewEl = ref(null)
      const fecha_actual = ref(moment().format('LLL'))
      const { usuario } = toRefs(store.state.usuario)
      const formValidate = ref(null)
      const { categorias } = toRefs(store.state.categoria)
      const bannerImg = ref(null)

      const { inputImageRenderer } = useInputImageRenderer(refInputEl, (base64) => {
         refPreviewEl.value.src = base64
         bannerImg.value = base64
      })

      const formulario = computed(() => store.getters['contenido/draft'])

      const cargarForm = () => {

         if(formulario.value.id){


            bannerImg.value = `/storage/blog-banner/${formulario.value.banner}`;

            formulario.value.banner = null

            formulario.value.categorias = formulario.value.categorias.map(val => val.id)

         }

         
       

      }

      onMounted(() => {
         if (!categorias.value.length) {
            store.dispatch('categoria/getCategorias')
         }
         cargarForm();
      })

      watch(categorias,() => {
         if (!categorias.value.length) {
            store.dispatch('categoria/getCategorias')
         }
      })

      watch([formulario],() => {
         cargarForm();
      })

      const guardar = () => {

         emit('save',formulario.value,formValidate.value)
      }

      const optionsEditor = {
         selector: 'textarea#premiumskinsandicons-snow',
         skin: 'snow',
         icons: 'thin',

         plugins: 'quickbars image lists code table codesample advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code wordcount ',

         toolbar: 'formatselect | forecolor backcolor | bold italic underline strikethrough | link image blockquote codesample | align bullist numlist | code | table',
         height: 400,
         content_style: 'body { margin: 2rem 10%; }',
         branding: false,
         language: 'es'
      }


      return {
         bannerImg,
         refInputEl,
         refPreviewEl,
         inputImageRenderer,
         required,
         loading:computed(() => store.state.loading),
         usuario,
         formValidate,
         guardar,
         fecha_actual,
         formulario,
         regresar,
         optionsEditor,
         url:window.location.origin,
         categoriasOptions:computed(() => {
            return categorias.value.map(val => {
               return {
                  label:val.nombre,
                  id:val.id
               }
            })
         }),
         statusOptions:[
            
         {
               label:'Publicado',
               value:1,
            },

            {
               label: 'Pendiente',
               value: 2,
            },

            {
               label: 'Borrador',
               value: 3,
            }
         ],
         snowOption: {
            theme: 'snow',
         },
      }
   },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
@import '~@core/scss/vue/libs/quill.scss';
@import '~@core/scss/vue/pages/page-blog.scss';
</style>
