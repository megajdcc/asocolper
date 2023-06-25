<template>
   <b-card>
      <validation-observer ref="formValidate" #default="{handleSubmit}">
         <b-form @submit.prevent="handleSubmit(guardar)">
            <b-container fluid>
               <b-row>
                  <b-col cols="12" md="6">
                     <b-form-group description="Nombre del sistema, puede llamarlo como guste, esta información se utilizará como meta información para los buscadores...">
                        <template #label>
                           Nombre: <span class="text-danger">*</span>
                        </template>

                        <validation-provider rules="required" name="nombre" #default="{errors,valid}">
                           <b-form-input v-model="sistema.nombre" :state="valid" />
                           
                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>

                        </validation-provider>

                     </b-form-group>

                     <b-form-group
                        description="Descripción del sistema, esta información no es obligatoria, pero ayuda a los buscadores a saber mas del sítio...">
                        <template #label>
                           Descripción:
                        </template>
                     
                        <validation-provider  name="descripcion" #default="{errors,valid}">
                           <b-form-textarea v-model="sistema.descripcion" :state="valid" :rows="3" ></b-form-textarea>
                     
                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                     
                        </validation-provider>
                     
                     </b-form-group>
                     
                  </b-col>

                  <b-col cols="12" md="6">
                     <b-form-group description="El lema tampoco es importante, si lo estableces lo mostraremos en varios componentes del sistema web">
                        <template #label>
                           Lema:
                        </template>
                        <validation-provider name="lema" #default="{errors,valid}">
                           <b-form-input v-model="sistema.lema" :state="valid" />
                        
                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        
                        </validation-provider>

                     </b-form-group>

                     <b-form-group label="Dueño:">

                        <validation-provider name="usuario_id" #default="{valid,errors}">

                           <v-select v-model="sistema.usuario_id" :reduce="val => val.id" :options="usuarios" :filterBy="filterUsers">
                              <template #option="{nombre,apellido,email,avatar}">
                                 <b-avatar :src="avatar" :alt="`${nombre} ${apellido} - ${email}`" class="mr-1"/>
                                 {{ `${nombre} ${apellido} - ${email}` }}
                              </template>

                              <template #selected-option="{nombre,apellido,email,avatar}">
                                 <b-avatar :src="avatar" :alt="`${nombre} ${apellido} - ${email}`" class="mr-1" />
                                 {{ `${nombre} ${apellido} - ${email}` }}
                              </template>

                           </v-select>

                           <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>

                        </validation-provider>

                     </b-form-group>

                  </b-col>

               </b-row>

               <el-divider content-position="left">Logotipos</el-divider>
               <!-- Logo -->
               <b-row class="mb-1">
                  <b-col cols="12">
                     <div class="border rounded p-2">
                        <h4 class="mb-1">
                           Logo principal:
                        </h4>
                        <b-media no-body vertical-align="center" class="flex-column flex-md-row">
                           <b-media-aside>
                              <b-img ref="refPreviewEl" :src="logoImg" height="110" width="170" class="rounded mr-2 mb-1 mb-md-0" />
                           </b-media-aside>
                           <b-media-body>
                              <small class="text-muted">Resolución requerida mínima 250x40, imagen no puede exceder los 2mb.</small>
                              <b-card-text class="my-50">
                               
                              </b-card-text>
                              <div class="d-inline-block">
                                 <validation-provider name="logo" #default="{valid,errors}">
                                    <b-form-file ref="refInputLogo" v-model="sistema.logo" accept=".jpg, .png"
                                       placeholder="Buscar Logotipo" @input="inputImageRenderer"  />
                  
                                    <b-form-invalid-feedback :state="valid">
                                       {{ errors[0] }}
                                    </b-form-invalid-feedback>
                  
                  
                                 </validation-provider>
                  
                  
                              </div>
                           </b-media-body>
                        </b-media>
                     </div>
                  </b-col>
               </b-row>
               <!-- Logo para fondos oscuros -->
               <b-row class="mb-1">
                  <b-col cols="12">
                     <div class="border rounded p-2">
                        <h4 class="mb-1">
                           Logo para fondo oscuros: 
                        </h4>
                        <b-media no-body vertical-align="center" class="flex-column flex-md-row">
                           <b-media-aside>
                              <b-img ref="refPreviewEllogo" :src="logoBlackImg" height="110" width="170" class="rounded mr-2 mb-1 mb-md-0" />
                           </b-media-aside>
                           <b-media-body>
                              <small class="text-muted">Resolución requerida mínima 250x40, imagen no puede exceder los 2mb.</small>
                              <b-card-text class="my-50">
                                 El logo para fondos oscuros, se alterna con el Logo Principal de acuerdo si tienes el dark o no activado
                              </b-card-text>
                              <div class="d-inline-block">
                                 <validation-provider name="logoblack" #default="{valid,errors}">
                                    <b-form-file ref="refInputLogoBlack" v-model="sistema.logoblack" accept=".jpg, .png"
                                       placeholder="Buscar Logotipo para fondos oscuros" @input="inputImageRendererLogo" />
               
                                    <b-form-invalid-feedback :state="valid">
                                       {{ errors[0] }}
                                    </b-form-invalid-feedback>
               
               
                                 </validation-provider>
               
               
                              </div>
                           </b-media-body>
                        </b-media>
                     </div>
                  </b-col>
               </b-row>

               <!-- Favicons -->
               <b-row class="mb-1">
                  <b-col cols="12">
                     <div class="border rounded p-2">
                        <h4 class="mb-1">
                           Favicon:
                        </h4>
                        <b-media no-body vertical-align="center" class="flex-column flex-md-row">
                           <b-media-aside>
                              <b-img ref="refPreviewElFavicon" :src="favicon" height="110" width="170"
                                 class="rounded mr-2 mb-1 mb-md-0" />
                           </b-media-aside>
                           <b-media-body>
                              <small class="text-muted">Resolución requerida 8x8, imagen no puede exceder los 1mb y debe ser PNG.</small>
                              <b-card-text class="my-50">
                                También conocido como icono de página y está asociada con el sitio web en particular.
                              </b-card-text>
                              <div class="d-inline-block">
                                 <validation-provider name="favicon"  #default="{valid,errors}">
                                    <b-form-file ref="refInputFavicon" v-model="sistema.favicon" accept=".png"
                                       placeholder="Buscar Favicon para el sistema " @input="inputImageRendererFavicon" />
               
                                    <b-form-invalid-feedback :state="valid">
                                       {{ errors[0] }}
                                    </b-form-invalid-feedback>
               
               
                                 </validation-provider>
               
               
                              </div>
                           </b-media-body>
                        </b-media>
                     </div>
                  </b-col>
               </b-row>

               <b-row>

                   <b-col cols="12" md="6">
                     <el-divider content-position="left">Correos Electrónicos</el-divider>

                     <section class="w-100 d-flex justify-content-end">
                        <b-button-group size="sm">
                           <b-button @click="addCorreo" variant="primary" title="Agregar Email" size="sm">
                              <feather-icon icon="PlusIcon" />
                              Agregar
                           </b-button>
                        </b-button-group>
                     </section>
                   

                     <hr>
                     <section class="d-flex w-100 flex-wrap " >

                        <p>El correo principal es usado para que los usuarios (publico en general) se comuniquen contigo, en contacto mostramos esta información</p>

                        <table class="table table-sm table-hover">
                           <thead>
                              <th>Correo</th>
                              <th>Es el correo principal?</th>
                              <th></th>
                           </thead>

                           <tbody>
                              <tr v-for="(correo,i) in sistema.correos" :key="i">
                                 <td>
                                    <b-form-group>
                                       <validation-provider name="correo" rules="required" #default="{valid,errors}">
                                          <b-form-input :state="valid" v-model="correo.email" placeholder="jhon@example.com" size="sm" type="email" />
                                          <b-form-invalid-feedback>
                                             {{ errors[0] }}
                                          </b-form-invalid-feedback>
                                       </validation-provider>
                                    </b-form-group>
                                 </td>

                                 <td>
                                    <b-form-group>
                                       <validation-provider name="principal" #default="{valid,errors}">
                                          <b-form-radio-group  v-model="correo.principal" :options="[{text:'Sí',value:true},{text:'Nó',value:false}]" buttons
                                             button-variant="primary" :state="valid" size="sm"  @change="soloUnPrincipal(correo.email)" />
                                    
                                          <b-form-invalid-feedback>
                                             {{ errors[0] }}
                                          </b-form-invalid-feedback>
                                       </validation-provider>
                                    </b-form-group>
                                 </td>

                                 <td>  
                                       <b-form-group>
                                          <b-button variant="danger" @click="$store.commit('sistema/putCorreo',i)" title="Quitar correo" size="sm">
                                             <feather-icon icon="TrashIcon" />
                                          </b-button>
                                       </b-form-group>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                           
                          

                        <hr>
                     </section>

                  </b-col>

                  <b-col cols="12" md="6">
                     <el-divider content-position="left">Redes Sociales</el-divider>

                     <section class="w-100 d-flex justify-content-end">
                        <b-button-group size="sm">
                           <b-button @click="addRedSocial" variant="primary" title="Agregar red social" size="sm">
                              <feather-icon icon="PlusIcon" />
                              Agregar
                           </b-button>
                        </b-button-group>
                     </section>
                   

                     <hr>
                     <section class="d-flex w-100 flex-wrap " v-for="(red,i) in sistema.redes" :key="i">

                           <b-form-group label="Red Social" class="mr-md-1" :style="{width:'45%'}">
                              <validation-provider name="Red Social" rules="required" #default="{valid,errors}">
                                 <b-form-input :state="valid" v-model="red.nombre" placeholder="Example: Facebook, Twitter" size="sm" />
                                 <b-form-invalid-feedback>
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                              </validation-provider>
                           </b-form-group>

                            <b-form-group label="Icono" description="Seleccione el icono correspondiente a la red Social"  class="mr-md-1" :style="{width:'45%'}">
                              <validation-provider name="icono" rules="required" #default="{valid,errors}">
                                 <v-select v-model="red.icono" :reduce="val => val.label" :options="feathersIcons">
                                    <template #option="{label}">
                                       <feather-icon :icon="label" />
                                       {{ label }}
                                    </template>

                                    <template #selected-option="{label}">
                                       <feather-icon :icon="label" />
                                       {{ label }}
                                    </template>
                                 </v-select>
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                              </validation-provider>
                           </b-form-group>

                           <b-form-group label="Url" :style="{width:'90%'}">
                              <validation-provider name="Url" rules="required" #default="{valid,errors}">

                                 <b-input-group size="sm">
                                    <b-form-input :state="valid" v-model="red.url" :placeholder="`https://${red.nombre}.com/villamizar&jarava`" size="sm" />
                                    <template #append>
                                       <b-button variant="outline-danger" size="sm" @click="$store.commit('sistema/putRed',i)" >
                                          <feather-icon icon="TrashIcon" />
                                       </b-button>
                                    </template>
                                  
                                 </b-input-group>
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                               
                               
                              </validation-provider>

                           </b-form-group>

                        <hr>
                     </section>

                  </b-col>

                  <b-col cols="12" md="6">
                     <el-divider content-position="left">Meta etiquets</el-divider>

                     <section class="w-100 d-flex justify-content-end">
                        <b-button-group size="sm">
                           <b-button @click="addMetaEtiqueta" variant="primary" title="Agregar meta etiqueta" size="sm">
                              <feather-icon icon="PlusIcon" />
                              Agregar
                           </b-button>
                        </b-button-group>
                     </section>
                     
                     
                     <hr>
                     <section class="d-flex w-100 flex-wrap " v-for="(meta,i) in sistema.metas" :key="i">
                     
                        <b-form-group label="Nombre" description="Nombre de la meta etiqueta" class="mr-md-1" :style="{width:'40%'}">
                           <validation-provider name="nombre" rules="required" #default="{valid,errors}">
                              <b-form-input :state="valid" v-model="meta.nombre" placeholder="example: Description, viewport" size="sm" />
                              <b-form-invalid-feedback>
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                           </validation-provider>
                        </b-form-group>
                     
                        <b-form-group label="Contenido" description="El valor de la meta etiqueta" class="mr-md-1" :style="{width:'40%'}">
                           <validation-provider name="contenido" rules="required" #default="{valid,errors}">
                              <b-input-group size="sm">
                                 <b-form-input :state="valid" v-model="meta.contenido" placeholder="Aquí el contenido" />
                                 <template #append>
                                    <b-button variant="outline-danger" size="sm" @click="$store.commit('sistema/putMeta',i)">
                                       <feather-icon icon="TrashIcon" />
                                    </b-button>
                                 </template>
                              
                              </b-input-group>
                              <b-form-invalid-feedback :state="valid">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>

                           </validation-provider>
                        </b-form-group>
                     
                        <hr>
                     </section>

                  </b-col>

               </b-row>

               <b-row>
                     <b-col cols="12">
                        <b-form-group class="mb-2" description="Esto aparecerá en la pagina Principal y en la de Quienes Somos, Es por ello que es importante que escribas algo sobre tí o tú empresa.">
                     
                           <template #label>
                              Quiero Saber mas de tí: <span class="text-danger">*</span>
                           </template>
                     
                           <validation-provider name="quienes_somos" rules="required" #default="{valid,errors}">
                                 <editor output-format="html" :value="sistema.quienes_somos" @input="sistema.quienes_somos = $event" api-key="t1i940nuarrf1zefgxbf6ow5cxmgjmcad7q7l3fm5prgebyc" :init="optionsEditor" />


                              <!-- <quill-editor id="blog-content" v-model="sistema.quienes_somos" :options="snowOption" /> -->
                     
                              <b-form-invalid-feedback :state="valid">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                     
                           </validation-provider>
                     
                     
                     
                        </b-form-group>
                  </b-col>
               </b-row>

               <b-row>
                  <b-col cols="12">
                     <el-divider content-position="left">Código en cabecera</el-divider>

                     <b-form-group label="Código en la cabecera" description="Agregar Script en la cabecera (Head) del sistema, te puede servir para agregar analiticas de googles entre otros, esto lo adjuntaremos dentro las etiquetas <head> </head>...">

                        <validation-provider name="head" #default="{valid,errors}">
                           <b-form-textarea v-model="sistema.head" :state="valid" :rows="3"></b-form-textarea>

                           <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>

                     </b-form-group>
                  </b-col>

                  <b-col cols="12">
                     <el-divider content-position="left">Código en el cuerpo (Body)</el-divider>

                     <b-form-group label="Código en el cuerpo" description="Agregar Script en el cuerpo del documento (Body) del sistema, te puede servir para agregar script de chat, seguridad, entre otros ... , esto lo adjuntaremos despues de la etiqueta de apertura  <body> justo aquí </body>...">

                        <validation-provider name="body" #default="{valid,errors}">
                           <b-form-textarea v-model="sistema.body" :state="valid" :rows="3"></b-form-textarea>

                           <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>

                     </b-form-group>
                  </b-col>

               </b-row>
              


               <b-row>
                  <b-col cols="12" md="6">
                     <b-button-group size="sm">
                        <b-button type="submit" variant="primary" title="Guardar" v-loading="loading">
                           <feather-icon icon="SaveIcon"/>
                           Guardar
                        </b-button>
                     </b-button-group>
                  </b-col>
               </b-row>

            </b-container>
         </b-form>
      </validation-observer>
   </b-card>
</template>

<script>

   import { ValidationObserver,ValidationProvider } from 'vee-validate';

   import {required} from '@validations'
   import { feathers } from '@core/utils/utils';
import { quillEditor } from 'vue-quill-editor'

   import {
      BForm,
      BContainer,
      BRow,
      BCol,
      BCard,
      BFormGroup,
      BFormInvalidFeedback,
      BButton,
      BButtonGroup,
      BSpinner,
      VBTooltip,
      BFormInput,
      BFormTextarea,
      BAvatar,
      BFormFile,
      BCardText,
      BMedia,
      BMediaBody,
      BMediaAside,
      BImg,
      BInputGroup,
       BFormRadioGroup
   } from 'bootstrap-vue'

   import vSelect  from 'vue-select'

import Editor from '@tinymce/tinymce-vue'
import store from '@/store'
import {toRefs,computed,ref,watch,onMounted,onActivated} from 'vue'

import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'

export default {

   components:{
      BAvatar,
      BForm,
      BContainer,
      BRow,
      BCol,
      BCard,
      BFormGroup,
      BFormInvalidFeedback,
      BButton,
      BButtonGroup,
      BSpinner,
      ValidationObserver,
      ValidationProvider,
      BFormInput,
      BFormTextarea,
      BFormFile,
      vSelect,
      BCardText,
      BMedia,
      BMediaBody,
      BMediaAside,
      BImg,
      BInputGroup,
      BFormRadioGroup,
      quillEditor,
      Editor




   },

   directives:{
      'b-tooltip' : VBTooltip
   },


   setup() {
      
      const sistema = computed(() => store.getters['sistema/draft'])
      // const {sistema} = toRefs(store.state.sistema)

      const usuarios = computed(() => store.state.usuario.usuarios)
      const formValidate = ref(null)
      const refInputLogo = ref(null)
      const refInputLogoBlack = ref(null)
      const refInputFavicon = ref(null)


      const refPreviewEl = ref(null)
      const refPreviewEllogo = ref(null)
      const refPreviewElFavicon = ref(null)
      const logoImg = ref(null)
      const logoBlackImg = ref(null)
      const favicon = ref(null)

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

      const { inputImageRenderer } = useInputImageRenderer(refInputLogo, (base64) => {s
         refPreviewEl.value.src = base64
         logoImg.value = base64

         store.dispatch('sistema/guardarLogo',{logo:sistema.value.logo}).then(({result}) => {

            if(result){
               toast.success('Logo guardado con éxito')
            }

         })

      })

      const { inputImageRenderer:inputImageRendererLogo } = useInputImageRenderer(refInputLogoBlack, (base64) => {
         refPreviewEllogo.value.src = base64
         logoBlackImg.value = base64

          store.dispatch('sistema/guardarLogoBlack',{logo:sistema.value.logoblack}).then(({result}) => {

            if(result){
               toast.success('Logo guardado con éxito')
            }

         })

      })

      const { inputImageRenderer: inputImageRendererFavicon } = useInputImageRenderer(refInputFavicon, (base64) => {
         refPreviewElFavicon.value.src = base64
         favicon.value = base64

         store.dispatch('sistema/guardarFavicon', { logo: sistema.value.favicon }).then(({ result }) => {

            if (result) {
               toast.success('Favicon guardado con éxito')
            }

         })

      })
      


      const cargarForm = () => {

         if(sistema.value.id){

            logoImg.value = `/storage/logotipos/${sistema.value.logo}`;
            logoBlackImg.value = `/storage/logotipos/${sistema.value.logoblack}`;
            favicon.value = `/storage/logotipos/${sistema.value.favicon}`;

            sistema.value.logo = null
            sistema.value.logoblack = null
            sistema.value.favicon = null
         }

         if(!usuarios.value.length){
            store.dispatch('usuario/cargarUsuarios')
         }

      }

      onMounted(() => {
         store.dispatch('sistema/getSistema')
         cargarForm()
      })
      
      onActivated(() => cargarForm())

      watch(sistema,()  => cargarForm())

      const guardar = () => {

         store.dispatch('sistema/guardar',sistema.value).then(({result}) => {
            
            if(result){
               toast.success('Se ha guardado con éxito los cambios')

            }else{
               toast.info('No se pudo guardar, inténtelo mas tarde')
            }

         }).catch( e => {

            if(e.response.status === 422){
               formValidate.value.setErrors(e.response.data.errors)
            }
            
            console.log(e)

         })
      }

      const addRedSocial = () => {

         store.commit('sistema/pushRedes', {
            nombre: '',
            icono: '',
            url: ''
         })

      }

      const addMetaEtiqueta = () => {
         store.commit('sistema/pushMetas', {
            nombre: '',
            contenido: '',
         })

      }

      const addCorreo = () => {
         store.commit('sistema/pushEmail', {
            email: '',
            principal: false,
         })
      }


      const soloUnPrincipal = (correo) => {

         sistema.value.correos.forEach(val  => {

            if(val.email != correo){
               val.principal = false
            }

         })
      } 


      return {
         required,
         sistema,
         formValidate,
         guardar,
         loading:computed(() => store.state.loading),
         usuarios,
         filterUsers:(option,label,search) => (option.nombre || option.apellido || option.email || '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ,
         refPreviewEl,
         logoImg,
         inputImageRenderer,
         refInputLogo,
         refInputLogoBlack,
         logoBlackImg,
         inputImageRendererLogo,
         refPreviewEllogo,
         inputImageRendererFavicon,
         refPreviewElFavicon,
         favicon,
         optionsEditor,
         snowOption: {
            theme: 'snow',
         },
         refInputFavicon,
         feathersIcons:computed((val ) => {
            return feathers.map(v => {
               return {
                  label:v,
                  value:v
               }
            })
         }),
         addRedSocial,
         addMetaEtiqueta,
         addCorreo,

         soloUnPrincipal
      }
   },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
@import '~@core/scss/vue/libs/quill.scss';
@import '~@core/scss/vue/pages/page-blog.scss';
</style>
