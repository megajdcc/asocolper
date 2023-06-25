<template>
<section>   

   <!-- <show-servicio v-model="formulario" :imgBanner="imgBanner" v-if="formulario.id"/> -->
   
   <validation-observer ref="formValidate" #default="{handleSubmit}">
      <b-form @submit.prevent="handleSubmit(guardar)">
         <b-container fluid class="px-0">
         
            <b-card>
               <b-row>
                  <b-col cols="12" md="6">
               
                     <b-form-group description="Categoría a la que pertenece el servicio">
                        <template #label>
                           Categoría: <span class="text-danger">*</span>
                        </template>
                        <validation-provider name="categoria_id" rules="required" #default="{errors,valid}">
                           <v-select v-model="formulario.categoria_id" :reduce="val => val.id " :options="categorias" label="nombre">
                           </v-select>
               
                           <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
               
                        </validation-provider>
                     </b-form-group>


                     <b-form-group description="Si este servicio es un sub servicio de otro servicio, por favor seleccione ese otro servicio" v-if="serviciosOptions.length">
                        <template #label>
                           Servicio padre:
                        </template>
                        <validation-provider name="servicio_id" #default="{errors,valid}">
                           <v-select v-model="formulario.servicio_id" :reduce="val => val.id " :options="serviciosOptions" label="titulo">
                           </v-select>
                     
                           <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                     
                        </validation-provider>
                     </b-form-group>
               
                     <b-form-group description="Título del Servicio">
                        <template #label>
                           Título: <span class="text-danger">*</span>
                        </template>
               
                        <validation-provider name="titulo" rules="required" #default="{errors,valid}">
                           <b-form-input v-model="formulario.titulo" :state="valid"
                              placeholder="Ejemplo:Asosoría y Representación en Derecho Laboral.." />
               
                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>

                     <b-form-group description="Subtítulo del Servicio">
                        <template #label>
                           Subtítulo:
                        </template>
                     
                        <validation-provider name="subtitulo" #default="{errors,valid}">
                           <b-form-input v-model="formulario.subtitulo" :state="valid" placeholder="Ejemplo:Representación." />
                     
                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>

                  </b-col>

                  <b-col cols="12" md="6">
               
                     <b-form-group description="Breve del servicio">
                        <template #label>
                           Breve:
                        </template>
               
                        <validation-provider name="breve" #default="{errors,valid}">
                           <b-form-input v-model="formulario.breve" :state="valid"
                              placeholder="Ejemplo:Protegemos sus intereses económicos ante cualquier riesgo laboral con un trabajador o tercero." />
               
                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>
               
                     <b-form-group description="Establezca una imagen principal">
                        <template #label>
                           Banner:
                        </template>
               
                        <validation-provider name="banner" #default="{errors,valid}">
                           <b-form-file v-model="formulario.banner" :state="valid" browse-text="Buscar imagen"
                              accept=".jpg, .png, .gif, .jpeg" @input="cambiarLogo" />
               
                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>
                     <validation-provider name="url" rules="required" #default="{errors,valid}">
                     <b-form-group description="La url a la que se visitará este servicio" :state="valid">
                        <template #label>
                           Url:
                        </template>
               
                       
               
                           <b-input-group :prepend="url">
                              <b-form-input v-model="formulario.url" :state="valid" placeholder="asesoria-y-representacion-legal" />
                           </b-input-group>
               
                           <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        
                     </b-form-group>
                     </validation-provider>
               
               
                  </b-col>
               </b-row>
            </b-card>
            
            <b-row>
               

               <b-col cols="12">
                  <b-card>
                     <b-form-group label-for="blog-content" class="mb-2">
                     
                        <template #label>
                           Contenido: <span class="text-danger">*</span>
                        </template>
                     
                        <validation-provider name="contenido" rules="required" #default="{valid,errors}">
                           <!-- <quill-editor id="blog-content" v-model="formulario.contenido" :options="snowOption" :rows="3"></quill-editor> -->

                           <editor output-format="html" :value="formulario.contenido" @input="formulario.contenido = $event"
                              api-key="t1i940nuarrf1zefgxbf6ow5cxmgjmcad7q7l3fm5prgebyc" :init="optionsEditor" />
                     
                           <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                     
                        </validation-provider>

                     </b-form-group>
                  </b-card>
               </b-col>

            </b-row>

            <b-row>
               <b-col cols="12">
                  <b-card>
                     <b-button-group>
                        <b-button variant="primary" v-loading="loading" type="submit" title="Guardar">
                           <feather-icon icon="SaveIcon"/>
                           Guardar
                        </b-button>

                        <b-button variant="dark" v-loading="loading"  title="Regresar" :to="{name:'listar.servicios'}">
                           <feather-icon icon="ArrowLeftIcon" />
                           Regresar
                        </b-button>
                     </b-button-group>
                  </b-card>
               </b-col>
            </b-row>
         </b-container>
      </b-form>
   </validation-observer>
</section>
</template>

<script>

   import { ValidationObserver,ValidationProvider } from 'vee-validate';

   import {required} from '@validations'

   import {
      BForm,
      BFormGroup,
      BContainer,
      BRow,
      BCol,
      BButtonGroup,
      BButton,
      BFormInvalidFeedback,
      BInputGroup,
      VBTooltip,
      BCard,
      BFormInput,
      BFormFile,

      BMedia,
      BAvatar,
      BMediaAside,
      BMediaBody,
      BImg,
      BLink,
      BInputGroupAppend,
      BBadge,
      BCardText,
      BDropdown,
      BDropdownItem,
      BFormTextarea,
      BFormCheckbox,
      BSpinner
      
   } from 'bootstrap-vue'

   import vSelect from 'vue-select';

   import store from '@/store'
   import {computed,onMounted,toRefs,ref,watch}  from 'vue'
import Editor from '@tinymce/tinymce-vue'

export default {
   
   components:{
      // Boostrap
      BForm,
      BFormGroup,
      BContainer,
      BRow,
      BCol,
      BButtonGroup,
      BButton,
      BFormInvalidFeedback,
      BInputGroup,
      BCard,
      BFormInput,
      BFormFile,
      BMedia,
      BAvatar,
      BMediaAside,
      BMediaBody,
      BImg,
      BLink,
      BInputGroupAppend,
      BBadge,
      BCardText,
      BDropdown,
      BDropdownItem,
      BFormTextarea,
      BFormCheckbox,
      BSpinner,



      // Vee validate

      ValidationObserver,
      ValidationProvider,

      // Vue Select
      vSelect,
      Editor,

      ShowServicio:() => import('components/ShowServicio.vue')

   },

   directives:{
      'b-tooltip': VBTooltip
   },


   setup(props,{emit})   {

      const formValidate = ref(null)
      // const formulario = computed(() => store.getters['servicio/draft'])

      const {servicio:formulario} = toRefs(store.state.servicio)
      const {categorias} = toRefs(store.state['categoria-servicio'])
      const { servicios } = toRefs(store.state['servicio'])
      const imgBanner = ref('')



      const cargarForm = () => {
         if(!categorias.value.length){
            store.dispatch('categoria-servicio/getCategorias')
         }

         if (!servicios.value.length) {
            store.dispatch('servicio/getServicios')
         }


         if(formulario.value.id){
            imgBanner.value = `/storage/servicios/banner/${formulario.value.banner}`
            formulario.value.banner = null
         }


      }

      onMounted(() => cargarForm())

      watch(formulario,() => cargarForm())

      const guardar = () => {
         emit('save',formulario.value,formValidate.value)
      }

      const cambiarLogo = (file) => {

         if(formulario.value.id){
            
            store.dispatch('servicio/addBanner',{banner:file,servicio_id:formulario.value.id}).then(({result,servicio}) => {
               
               if(result){
                  imgBanner.value = `/storage/servicios/banner/${servicio.banner}`

                  toast.success('Su banner ha cambiado con éxito')
                  
               }else{
                  toast.info('El banner no pudo ser actualizado');
               }
            })

         }


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
         guardar,
         required,
         formulario,
         formValidate,
         categorias,
         url:window.location.origin+'/servicios/',
         loading:computed(() => store.state.loading),
         cambiarLogo,
         imgBanner,
         snowOption: {
            theme: 'snow',
         },
         optionsEditor,
         serviciosOptions:computed(() => {
            return formulario.value.id ? servicios.value.filter(val => val.id != formulario.value.id) : servicios.value
         })

      }
   },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>