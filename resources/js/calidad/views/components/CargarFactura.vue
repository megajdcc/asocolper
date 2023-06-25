<template>
   <b-overlay :show="loading">
      <validation-observer ref="formValidate" #default="{handleSubmit}">
         <b-form @submit.prevent="handleSubmit(guardar)">
            <b-sidebar id="sidebar-right" bg-variant="white" title="Datos del pago" right backdrop shadow
               :visible="showDialog" @hidden="cerrar">

               <b-container fluid>
                  <b-row>
                     <b-col cols="12">

                        <b-form-group description="Factura de proveedor o cliente ? ">

                           <template #label>
                              Proveedor o cliente: <span class="text-danger">*</span>
                           </template>

                           <validation-provider #default="{ errors }" name="tipo_factura" rules="required">

                              <el-select v-model="formulario.tipo_factura" size="small" class="w-100" filterable>
                                 <el-option v-for="(tipo, i) in tipos_facturas" :key="i" :value="tipo.id"
                                    :label="tipo.nombre"></el-option>
                              </el-select>

                              <b-form-invalid-feedback :state="errors.length ? false : null">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>

                           </validation-provider>

                        </b-form-group>

                        <b-form-group
                           description="El número de factura">

                           <template #label>
                              Nro de Factura: <span class="text-danger">*</span>
                           </template>

                           <validation-provider rules="required" name="numero" #default="{ errors }">
                              <b-form-input v-model="formulario.numero" :state="errors.length ? false : null"
                                 placeholder="Nro de factura" size="sm" />

                              <b-form-invalid-feedback :state="errors.length ? false : null">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                           </validation-provider>

                        </b-form-group>



                        <b-form-group description="Cargue una imagen, o documento pdf cde la factura">

                           <template #label>
                              Archivo Factura: <span class="text-danger">*</span>
                           </template>

                           <validation-provider rules="required" name="comprobante" #default="{ errors }">

                              <b-form-file v-model="formulario.comprobante" accept=".jpg,.png,.jpeg,.pdf" size="sm"
                                 :state="errors.length ? false : null" browse-text="Buscar archivo" />

                              <b-form-invalid-feedback :state="errors.length ? false : null">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>

                           </validation-provider>

                        </b-form-group>

                     </b-col>
                  </b-row>

                  <b-row class="my-1">
                     <b-col cols="12">
                        <b-button-group size="sm">
                           <b-button variant="primary" type="submit" size="sm" :disabled="loading">
                              <feather-icon icon="SaveIcon" size="16" />
                              Guardar
                           </b-button>
                           <b-button @click="cerrar" variant="danger">
                              <feather-icon icon="TrashIcon" />
                           </b-button>
                        </b-button-group>

                     </b-col>
                  </b-row>
               </b-container>


            </b-sidebar>
         </b-form>
      </validation-observer>
   </b-overlay>

</template>

<script>

import {
   BForm,
   BRow,BCol,
   BContainer,
   BButtonGroup,
   BButton,
   BFormGroup,
   BFormInput,
   BFormTextarea,
   BFormInvalidFeedback,
   BFormFile,
   BOverlay,
   BSidebar

} from 'bootstrap-vue'

import {optionsCurrency}  from '@core/utils/utils.js';

import { ValidationObserver,ValidationProvider } from 'vee-validate';

import {required} from '@validations'


import store from '@/store'

import {ref,toRefs,onMounted,watch,computed} from 'vue'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
import { Spanish } from "flatpickr/dist/l10n/es.js"
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css';

export default {


   props:{

      showDialog:{
         type:Boolean,
         required:true,
         default:false
      },

      movimientos:{
         type:Array,
         required:true,
      },

   },

   model:{
      prop:'show-dialog',
      event:'update:show-dialog'
   },

   components:{
      CurrencyInput: () => import('components/CurrencyInput'),
      BForm,
      BRow, BCol,
      BContainer,
      BButtonGroup,
      BButton,
      BFormGroup,
      BFormInput,
      BFormTextarea,
      ValidationObserver,
      ValidationProvider,
      BFormInvalidFeedback,
      BFormFile,
      BOverlay,
      BSidebar,
      flatPickr


   },

   setup(props,{emit}) {

      const { movimientos } = toRefs(props)
      const formValidate = ref(null)
      const formulario = ref({
         tipo_factura       : null,
         comprobante   : null,
         numero: '',
         pagos:[]
      })

      const cargarForm = () => {
         formulario.value.pagos = movimientos.value.map(val => val.model.id)
      }

      watch(movimientos, () => cargarForm())

      onMounted(() => cargarForm())

      const cerrar = () => {

         formulario.value = {
            tipo_factura: null,
            comprobante: null,
            numero: '',
            pagos: []
         }

         emit('update:show-dialog',false)
      }

      const guardar = () => {

         store.commit('toggleLoading')


         let data = new FormData();

         data.append('tipo_factura',formulario.value.tipo_factura)
         data.append('comprobante', formulario.value.comprobante),
         data.append('numero', formulario.value.numero)

         formulario.value.pagos.forEach(val => {
            data.append('pagos[]',val)
         })


         axios.post('/api/movimientos/facturas',data,{
            headers: {
               'Content-Type': "multipart/form-data;"
            }
         }).then(({data:datos}) => {

            if (datos.result) {

               toast({
                  component: ToastificationContent,
                  props: {
                     title: "Se ha registrado con éxito la factura",
                     icon: 'InfoIcon',
                     variant: 'success',
                  }
               }, {
                  timeout: 4000,
                  position: 'top-left'
               })

               emit('registroSuccess', datos.factura)

               cerrar();

            } else {

               toast({
                  component: ToastificationContent,
                  props: {
                     title: "No se pudo registrar la factura, inténtelo de nuevo",
                     icon: 'InfoIcon',
                     variant: 'danger',
                  }
               }, {
                  timeout: 4000,
                  position: 'top-left'
               })
            }

         }).catch(e => {
            
            console.log(e)

            if(e.response.status === 422){
               formValidate.value.setErrors(e.response.data.errors)
            }

         }).then(() => {
            store.commit('toggleLoading')

         })

      }  

      const configDate = ref({
         allowInput: false,
         locale: Spanish,
         enable: [(date) => {
            return (date.getTime() < new Date().getTime())
         }],


      })
      
      return {
         optionsCurrency,
         required,
         cerrar,
         loading:computed(() => store.state.loading),
         formulario,
         guardar,
         configDate,
         formValidate,
         tipos_facturas:computed(() => {
            return [
               {
                  nombre:'Proveedor',
                  id:1,
               },
               {
                  nombre:'Cliente',
                  id:2
               }
            ]
         })
      }
   },
}
</script>