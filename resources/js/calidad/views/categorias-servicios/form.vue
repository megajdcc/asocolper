<template>
   <b-card>
      <validation-observer ref="formValidate" #default="{handleSubmit}">
         <b-form @submit.prevent="handleSubmit(guardar)">
            <b-container fluid>
               <b-row>
                  <b-col cols="12" md="6">
                     <b-form-group>
                        <template #label>
                           Nombre: <span class="text-danger"> *</span>
                        </template>

                        <validation-provider name="nombre" rules="required" #default="{errors,valid}">
                           <b-form-input v-model="formulario.nombre" :state="valid"
                              placeholder="Nombre de la categoría" />

                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>
                  </b-col>

                  <b-col cols="12" md="6">
                     <b-form-group>
                        <template #label>
                           Breve:
                        </template>

                        <validation-provider name="breve"  #default="{errors,valid}">
                           <b-form-input v-model="formulario.breve" :state="valid" placeholder="Un breve de la categoría" />
                        
                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>
                  </b-col>
               </b-row>

               <b-row>
                  <b-col cols="12">
                     <b-button-group >
                        <b-button @click="regresar" title="Regresar" variant="outline-secondary">
                           <feather-icon icon="ArrowLeftIcon" />
                           Regresar
                        </b-button>

                        <b-button type="submit" title="Guardar" variant="outline-primary">
                           <feather-icon icon="SaveIcon" />
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

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import store from '@/store'
import { computed, ref } from 'vue'

import { regresar } from '@core/utils/utils';

import {
   BCard,
   BContainer,
   BForm,
   BRow,
   BCol,
   BButtonGroup,
   BButton,
   BFormGroup,
   BFormInput,
   BFormInvalidFeedback,
} from 'bootstrap-vue'

import vSelect from 'vue-select'

export default {

   components: {
      vSelect,
      BCard,
      BContainer,
      BForm,
      BRow,
      BCol,
      BButtonGroup,
      BButton,
      BFormGroup,
      BFormInput,
      BFormInvalidFeedback,
      ValidationProvider,
      ValidationObserver
   },

   setup(_, { emit }) {


      const formValidate = ref(null)

      const formulario = computed(() => store.getters['categoria-servicio/draft'])


      const guardar = () => {
         emit('save', formulario.value, formValidate.value)
      }

      return {
         formValidate,
         guardar,
         formulario,
         loading: computed(() => store.state.loading),
         required,
         regresar
        
       

      }
   }

}

</script>