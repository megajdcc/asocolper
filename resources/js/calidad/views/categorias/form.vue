<template>
   <b-card>
      <validation-observer ref="formValidate" #default="{handleSubmit}">
         <b-form @submit.prevent="handleSubmit(guardar)">
            <b-container fluid>
               <b-row>
                  <b-col cols="12" md="6">
                     <b-form-group >
                        <template #label>
                           Nombre: <span class="text-danger"> *</span>
                        </template>

                        <validation-provider name="nombre" rules="required" #default="{errors,valid}">
                           <b-form-input v-model="formulario.nombre" :state="valid" placeholder="Nombre de la categoría" />

                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group> 
                  </b-col>

                  <b-col cols="12" md="6">
                     <b-form-group>
                        <template #label>
                           Icono:
                        </template>
                     
                        <validation-provider name="icono"  #default="{errors,valid}">
                           
                           <v-select v-model="formulario.icono" :reduce="val => val.label" :options="iconFeathers" :filterBy="functionFilter " >
                                 <template #option="{label,value}">
                                    <feather-icon :icon="value"/>
                                    {{ label }}
                                 </template>

                                 <template #selected-option="{label,value}">
                                    <feather-icon :icon="value" />
                                    {{ label }}
                                 </template>


                           </v-select>
                     
                           <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>

                        </validation-provider>
                     </b-form-group>
                  </b-col>
               </b-row>

               <b-row>
                  <b-col cols="12">
                     <b-button-group size="sm">
                        <b-button @click="regresar" title="Regresar" variant="outline-secondary">
                           <feather-icon icon="ArrowLeftIcon"/>
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

   import {ValidationProvider,ValidationObserver} from 'vee-validate'
   import {required} from '@validations'
   import store from '@/store'
   import {computed,ref } from 'vue'

   import {feathers,regresar} from '@core/utils/utils';

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

      components:{
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

      setup(_,{emit}){


         const formValidate = ref(null)

         const formulario = computed(() => store.getters['categoria/draft'])


         const guardar = () => {
            emit('save',formulario.value,formValidate.value)
         }

         return {
            formValidate,
            guardar,
            formulario,
            loading:computed(() => store.state.loading),
            required,
            regresar,
            functionFilter: (option, label, search) => (label || '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1,
            iconFeathers:feathers.map(val => {
               return {
                  label:val,
                  value:val
               }
            })

         }
      }

   } 

</script>