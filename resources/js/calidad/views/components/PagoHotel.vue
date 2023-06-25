<template>
   <b-overlay :show="loading">
      <validation-observer ref="formValidate" #default="{handleSubmit}">
         <b-form @submit.prevent="handleSubmit(guardar)">
            <b-sidebar id="sidebar-right" bg-variant="white" title="Datos del pago" right backdrop shadow
               :visible="showDialog" @hidden="cerrar">

               <b-container fluid>
                  <b-row>
                     <b-col cols="12">

                        <b-form-group description="Seleccione la boda de la que pertenece el pago" v-if="!boda">

                           <template #label>
                              Boda: <span class="text-danger">*</span>
                           </template>

                           <validation-provider #default="{ errors }" name="boda_id" rules="required">

                              <el-select v-model="formulario.boda_id" size="small" class="w-100" filterable>
                                 <el-option v-for="(boda, i) in bodas" :key="i" :value="boda.id"
                                    :label="`${boda.novios.novia} & ${boda.novios.novio}`"></el-option>
                              </el-select>

                              <b-form-invalid-feedback :state="errors.length ? false : null">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>

                           </validation-provider>

                        </b-form-group>

                        <b-form-group description="Seleccione el hotel al que vas a asociar este pago" v-if="!hotel">

                           <template #label>
                              Hotel: <span class="text-danger">*</span>
                           </template>

                           <validation-provider #default="{ errors }" name="hotel_id" rules="required">

                              <el-select v-model="formulario.hotel_id" size="small" class="w-100" filterable>
                                 <el-option v-for="(hotel, i) in hoteles" :key="i" :value="hotel.id"
                                    :label="hotel.nombre"></el-option>
                              </el-select>

                              <b-form-invalid-feedback :state="errors.length ? false : null">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>

                           </validation-provider>

                        </b-form-group>

                        <b-form-group description="Cargue una imagen, captura del pago realizado">

                           <template #label>
                              Comprobante del pago: <span class="text-danger">*</span>
                           </template>

                           <validation-provider rules="required" name="comprobante" #default="{ errors }">

                              <b-form-file v-model="formulario.comprobante" accept=".jpg,.png,.jpeg,.pdf" size="sm"
                                 :state="errors.length ? false : null" browse-text="Buscar archivo" />

                              <b-form-invalid-feedback :state="errors.length ? false : null">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>

                           </validation-provider>

                        </b-form-group>


                        <b-form-group label="Banco"
                           description="Escriba el nombre del banco en donde realizó el pago si aplica...">
                           <b-form-input v-model="formulario.banco" placeholder="Nombre del banco" />
                        </b-form-group>

                        <b-form-group
                           description="El Número de referencia, es el número de control que el banco asocia a la transacción, el mismo sirve para comprobar la operación">

                           <template #label>
                              Nro de Referencia: <span class="text-danger">*</span>
                           </template>

                           <validation-provider rules="required" name="nro_referencia" #default="{ errors }">
                              <b-form-input v-model="formulario.nro_referencia" :state="errors.length ? false : null"
                                 placeholder="Nro de comprobante" size="sm" />

                              <b-form-invalid-feedback :state="errors.length ? false : null">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                           </validation-provider>

                        </b-form-group>

                        <b-form-group label-for="monto" description="El monto que desea acreditar ">
                           <template #label>
                              Monto: {{ formulario.monto | currency }} MXN <span class="text-danger">*</span>
                           </template>

                           <currency-input @change="formulario.monto = $event" :value="formulario.monto"
                              input-class="form-control form-control-sm" :options="optionsCurrency" validar
                              label="monto" />

                        </b-form-group>

                        <b-form-group label="Fecha del pago" description="Fecha en la que hiciste el pago">

                           <validation-provider rules="required" name="Nro de referencia" #default="{errors}">

                              <flat-pickr v-model="formulario.fecha_pago" :config="configDate" class="form-control"
                                 required placeholder="Seleccione la fecha de pago" />

                              <b-form-invalid-feedback :state="errors.length ? false : null">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>

                           </validation-provider>

                        </b-form-group>


                        <b-form-group description="Escriba una descripción del pago, para tener la referencia a futura">

                           <template #label>
                              Concepto: <span class="text-danger">*</span>
                           </template>

                           <validation-provider rules="required" name="nro_referencia" #default="{ errors }">

                              <b-form-textarea v-model="formulario.concepto" :rows="3" :max-rows="5" />

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

      hotel:{
         type:Number,
         required:false,
         default:null
      },

      boda:{
         type:Number,
         required: false,
         default: null
      }


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

      const {bodas} = toRefs(store.state.boda)
      const {hoteles} = toRefs(store.state.hotel)
      const { boda,hotel,movimientos } = toRefs(props)

      const formulario = ref({
         boda_id       : null,
         comprobante   : null,
         banco         : '',
         nro_referencia: '',
         hotel_id      : null,
         concepto      : '',
         monto         : 0,
         fecha_pago    : null,
         pagos:[]
      })

      const cargarForm = () => {

         if(!bodas.value.length){
            store.dispatch('boda/cargarBodas')
         }

         if(!hoteles.value.length){
            store.dispatch('hotel/cargarHoteles')
         }
         formulario.value.boda_id = boda.value;
         formulario.value.hotel_id = hotel.value
         formulario.value.pagos = movimientos.value.map(val => val.model.id)
      }

      watch([boda,hotel,movimientos], () => {
         formulario.value.boda_id = boda.value;
         formulario.value.hotel_id = hotel.value
         formulario.value.pagos = movimientos.value.map(val => val.model.id)
        
      })

      onMounted(() => cargarForm())

      const cerrar = () => {

         formulario.value = {
            boda_id: props.boda,
            comprobante: null,
            banco: '',
            nro_referencia:'',
            hotel_id: props.hotel,
            concepto: '',
            monto: 0,
            fecha_pago: null,
            pagos: props.movimientos.map(val => val.model.id)
         }

         emit('update:show-dialog',false)
      }

      const guardar = () => {
         
         store.dispatch('pagoHotel/cargarPago',formulario.value).then(({result,pago}) => {

            if(result){

               toast({
                  component:ToastificationContent,
                  props:{
                     title:"Se ha registrado con éxito el pago al Hotel",
                     icon:'InfoIcon',
                     variant:'success',
                  }
               },{
                  timeout:4000,
                  position:'top-left'
               })

               emit('registroSuccess',pago)

               cerrar();

            }else{

               toast({
                  component: ToastificationContent,
                  props: {
                     title: "No se pudo registrar el pago al Hotel, inténtelo de nuevo",
                     icon: 'InfoIcon',
                     variant: 'danger',
                  }
               }, {
                  timeout: 4000,
                  position: 'top-left'
               })
            }

         }).catch(e => console.log(e))

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
         bodas,
         loading:computed(() => store.state.loading),
         formulario,
         guardar,
         hoteles,
         configDate
      }
   },
}
</script>