<template>
   <b-card>
      <validation-observer ref="formValidate" #default="{handleSubmit}">
         <b-form @submit.prevent="handleSubmit(guardar)">
            <b-container fluid>
               <b-row>
                  <b-col cols="12" md="6">
                     <b-form-group>
                        <template #label>
                           Nombre: <span class="text-danger">*</span>
                        </template>
      
                        <validation-provider name="nombre" rules="required" #default="{valid,errors}">
                           <b-form-input v-model="formulario.nombre" :state="valid" />
      
                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
      
      
                        </validation-provider>
                     </b-form-group>
      
                     <b-form-group>
                        <template #label>
                           Apellido:
                        </template>
      
                        <validation-provider name="apellido" #default="{valid,errors}">
                           <b-form-input v-model="formulario.apellido" :state="valid" />
      
                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
      
      
                        </validation-provider>
                     </b-form-group>
                  </b-col>
      
                  <b-col cols="12" md="6">
      
                     <b-form-group>
                        <template #label>
                           Correo Electrónico: <span class="text-danger">*</span>
                        </template>
      
                        <validation-provider name="correo" rules="required|email" #default="{valid,errors}">
                           <b-form-input v-model="formulario.correo" :state="valid"  />
      
                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
      
      
                        </validation-provider>
                     </b-form-group>
      
                     <b-form-group>
                        <template #label>
                           Teléfono: <span class="text-danger">*</span>
                        </template>
      
                        <validation-provider name="telefono" rules="required" #default="{valid,errors}">
                           <the-mask v-model="formulario.telefono" :mask="'+############'" class="form-control" type="tel"
                              masked placeholder="+57 314 1245689" />
      
                           <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
      
      
                        </validation-provider>
                     </b-form-group>
                  </b-col>
               </b-row>

               <b-row>
                  <b-col cols="12" md="8">
                     <b-form-group >
                        <template #label>
                           Perfil: <span class="text-danger">*</span>
                        </template>

                        <validation-provider name="perfil" rules="required" #default="{valid,errors}">
                           <b-form-textarea v-model="formulario.perfil" :rows="3" :state="valid" />

                           <b-form-invalid-feedback >
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>
                  </b-col>
                  <b-col cols="12" md="4" class="d-flex justify-content-center flex-column align-items-center">
                    <b-avatar :src="avatar" size="6rem" style="cursor:pointer"  />

                     <b-button @click="$refs.formFile.$el.click()" title="Buscar Imagen" size="sm" class="my-1" >
                        <feather-icon icon="CameraIcon"/>
                        Seleccionar Imagen
                     </b-button>

                    <b-form-group description="Seleccione el avatar para buscar una imagen o tomarse una selfie">
                     <validation-provider name="imagen" #default="{errors,valid}">

                        <b-form-file v-model="formulario.imagen" :state="valid" accept=".jpg, .png" plain ref="formFile" :hidden="true" capture    @input="cargarImagen" />

                        <b-form-invalid-feedback :state="valid">
                           {{ errors[0] }}
                        </b-form-invalid-feedback>

                     </validation-provider>
                    </b-form-group>
                  </b-col>

               </b-row>

               <b-row>
                  <b-col cols="12">
                     <b-button-group >
                        <b-button variant="primary" title="Guardar" type="submit" v-loading="loading">
                           <feather-icon icon="SaveIcon"/>
                           Guardar
                        </b-button>

                        <b-button variant="secondary" title="Regresar" :to="{name:'listar.socios'}" v-loading="loading">
                           <feather-icon icon="ArrowLeftIcon" />
                           Regresar
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

   import {required,email}  from '@validations'

   import {
      BForm,
      BContainer,
      BRow,
      BCol,
      BFormGroup,
      BFormInput,
      BFormInvalidFeedback,
      BButtonGroup,
      BButton,
      BCard,
      BImg,
      BFormFile,
      BFormTextarea,
      BAvatar
   } from 'bootstrap-vue'

   import {computed,toRefs,ref,onMounted,watch} from 'vue'
   import store from '@/store'

import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'; 

   export default {

      components:{
         BCard,
         BForm,
         BContainer,
         BFormInput,
         BRow,
         BCol,
         BFormGroup,
         BFormInvalidFeedback,
         BButtonGroup,
         BButton,
         ValidationObserver,
         ValidationProvider,
         BFormTextarea,
         BImg,
         BAvatar,
         BFormFile,
      },

      setup(props,{emit}) {
         
         const formValidate = ref(null)
         const formulario = computed(() => store.getters['socio/draft'])

         const formFile = ref(null)
         const avatar = ref('')


         const { inputImageRenderer } = useInputImageRenderer(formFile,(file) => {
            avatar.value = file
            console.log(file)
         })

         const guardar = () => {
               emit('save',formulario.value,formValidate.value)
         }

         const cargarForm = () => {

            if(formulario.value.id ){
               avatar.value = formulario.value.avatar;
               formulario.value.imagen = null
            }


         }

         onMounted(() => cargarForm())

         const cargarImagen = (file) => {
            inputImageRenderer()
         }


         watch(formulario,() => cargarForm())

         
         return {
            formulario,
            guardar,
            formValidate,
            required,
            email,
            avatar,
            cargarImagen,
            formFile,
            loading:computed(() => store.state.loading),
            inputImageRenderer
         }
      },
}
</script>