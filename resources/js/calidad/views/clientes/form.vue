<template>
   <b-card>
      <validation-observer ref="formValidate" #default="{handleSubmit}">
         <b-form @submit.prevent="handleSubmit(guardar)">
            <b-container fluid>
               <b-row>
                  <b-col cols="12" md="8">
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


                     <b-form-group description="El usuario que visite tú pagina, podrá también ir a la pagina del cliente.">
                        <template #label >
                           Url: <span class="text-danger">*</span>
                        </template>
                     
                        <validation-provider name="url" rules="required" #default="{valid,errors}">
                           <b-form-input v-model="formulario.url" :state="valid" placeholder="Example:https://villamizarjarava.com" />
                     
                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>

                  </b-col>

                  <b-col cols="12" md="4" class="d-flex justify-content-center flex-column align-items-center">
                     <b-img :src="logotipo" style="width:320px; height:auto" class="logotipo" ></b-img>

                     <b-button @click="$refs.formFile.$el.click()" title="Buscar Logo" size="sm" class="my-1">
                        <feather-icon icon="CameraIcon" />
                        Seleccionar Logo
                     </b-button>
                  
                     <b-form-group description="Seleccione el logotipo">
                        <validation-provider name="logo" #default="{errors,valid}">
                  
                           <b-form-file v-model="formulario.logo" :state="valid" accept=".jpg, .png" plain ref="formFile" :hidden="true"
                              capture @input="cargarImagen" />
                  
                           <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                  
                        </validation-provider>
                     </b-form-group>
                  </b-col>
               </b-row>

             

               <b-row>
                  <b-col cols="12">
                     <b-button-group>
                        <b-button variant="primary" title="Guardar" type="submit" v-loading="loading">
                           <feather-icon icon="SaveIcon" />
                           Guardar
                        </b-button>

                        <b-button variant="secondary" title="Regresar" :to="{name:'listar.clientes'}" v-loading="loading">
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

import { ValidationObserver, ValidationProvider } from 'vee-validate';

import { required, email } from '@validations'

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

import { computed, toRefs, ref, onMounted, watch } from 'vue'
import store from '@/store'

import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils';

export default {

   components: {
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

   setup(props, { emit }) {

      const formValidate = ref(null)
      const formulario = computed(() => store.getters['cliente/draft'])

      const formFile = ref(null)
      const logotipo = ref('')


      const { inputImageRenderer } = useInputImageRenderer(formFile, (file) => {
         console.log(file)
         logotipo.value = file
      })

      const guardar = () => {
         emit('save', formulario.value, formValidate.value)
      }

      const cargarForm = () => {

         if (formulario.value.id) {
            logotipo.value = formulario.value.logotipo;
            formulario.value.logo = null
         }


      }

      onMounted(() => cargarForm())

      const cargarImagen = (file) => {
         inputImageRenderer()
      }


      watch(formulario, () => cargarForm())


      return {
         formulario,
         guardar,
         formValidate,
         required,
         email,
         logotipo,
         cargarImagen,
         formFile,
         loading: computed(() => store.state.loading),
         inputImageRenderer
      }
   },
}
</script>

<style lang="scss">
.logotipo{
   width: 320px;
   height: auto;
   border: 1px dotted;
   border-radius: 7px;
   min-height: 76px;
   cursor:pointer;
}
</style>