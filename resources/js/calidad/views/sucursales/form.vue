<template>
   <b-card>
      <validation-observer ref="formValidate" #default="{handleSubmit}">
         <b-form @submit.prevent="handleSubmit(guardar)">
            <b-container fluid>
                  <b-row>
                     <b-col cols="12">
                        <b-form-group >
                           <template #label>
                              Dirección: <span class="text-danger">*</span>
                           </template>

                           <validation-provider name="direccion" rules="required" #default="{valid,errors}">
                              <b-form-textarea v-model="formulario.direccion" :state="valid" :rows="2" placeholder="Dirección de la sucursal"  ></b-form-textarea>
                              <b-form-invalid-feedback>
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                           </validation-provider>
                        </b-form-group>
                     </b-col>

                    

                  </b-row>

                  <b-row>

                     <b-col cols="12" md="6">
                        <b-form-group label="Código Postal">
                           <validation-provider name="codigo_postal" #default="{valid,errors}">
                              <b-form-input v-model="formulario.codigo_postal" :state="valid" size="sm" />
                     
                              <b-form-invalid-feedback>
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                     
                           </validation-provider>
                        </b-form-group>
                     
                        <b-form-group>
                     
                           <template #label>
                              Esta sucursal es la principal: <span class="text-danger">*</span>
                           </template>
                     
                           <validation-provider name="principal" rules="required" #default="{valid,errors}">
                              <b-form-radio-group v-model="formulario.principal" :state="valid || null"
                                 :options="[{text:'Sí',value:true},{text:'Nó',value:false}]" buttons button-variant="primary" size="sm" />
                     
                              <b-form-invalid-feedback>
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                     
                           </validation-provider>
                     
                     
                        </b-form-group>
                     </b-col>

                     <b-col cols="12" md="6">
                        <el-divider content-position="left">Teléfonos</el-divider>
                     
                        <section class="w-100 d-flex justify-content-end">
                           <b-button-group size="sm">
                              <b-button @click="addTelefono" variant="primary" title="Agregar teléfono" size="sm">
                                 <feather-icon icon="PlusIcon" />
                                 Agregar
                              </b-button>
                           </b-button-group>
                        </section>
                     
                     
                        <hr>
                        <section class="d-flex w-100 flex-wrap " v-for="(telefono,i) in formulario.telefonos" :key="i">
                     
                           <b-form-group class="mr-md-1" :style="{width:'45%'}">
                              <template #label>
                                 Teléfono: <span class="text-danger">*</span>
                              </template>

                              <validation-provider name="numero" rules="required" #default="{valid,errors}">

                                 <the-mask v-model="telefono.numero" :mask="'+############'" class="form-control form-control-sm" type="tel" masked
                                    placeholder="+57 314 1245689" />

                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>

                              </validation-provider>
                           </b-form-group>

                           <b-form-group class="mr-md-1" :style="{width:'45%'}">
                              <template #label>
                                 ¿Es el principal? <span class="text-danger">*</span>
                              </template>
                           
                              <validation-provider name="principal" rules="required" #default="{valid,errors}">
                           
                                 <b-form-radio-group v-model="telefono.principal" :state="valid || null"
                                    :options="[{text:'Sí',value:true},{text:'Nó',value:false}]" buttons button-variant="primary" size="sm" @change="soloUnPrincipal(telefono.numero)" />
                           
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                           
                              </validation-provider>

                              <b-button variant="danger" size="sm" @click="formulario.telefonos.splice(i,1)">
                                 <feather-icon icon="TrashIcon" />
                              </b-button>
                           </b-form-group>
                     
                           <hr>
                        </section>
                     
                     </b-col>

                  </b-row>
                  <hr>
                  
                  <b-row>
                     <b-col cols="12" md="4">
                        <b-form-group>
                           <template #label>
                              Pais: <span class="text-danger">*</span>
                           </template>
                     
                           <validation-provider name="pais_id" rules="required" #default="{ errors }">
                              <v-select v-model="pais_id" @change="cargarEstados(pais_id)" :reduce="(option) => option.value"
                                 placeholder="Seleccione" :options="paises.map(val => { return {label:val.pais,value:val.id} })" />
                     
                              <b-form-invalid-feedback :state="errors.length ? false : null">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                     
                           </validation-provider>
                        </b-form-group>
                     </b-col>
                  
                     <b-col cols="12" md="4">
                        <b-form-group>
                           <template #label>
                              Estado: <span class="text-danger">*</span>
                           </template>
                     
                           <validation-provider name="estado_id" rules="required" #default="{ errors }">
                              <v-select v-model="formulario.estado_id" placeholder="Seleccione" @input="cargarCiudades(formulario.estado_id)"
                                 :reduce="(option) => option.value"
                                 :options="estados.map(val => { return {label:val.estado,value:val.id} })" />
                     
                              <b-form-invalid-feedback>
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                     
                           </validation-provider>
                        </b-form-group>
                     </b-col>
                  
                  
                     <b-col cols="12" md="4">
                        <b-form-group>
                           <template #label>
                              Ciudad:
                           </template>
                     
                           <validation-provider name="ciudad_id" #default="{ errors }">
                              <v-select v-model="formulario.ciudad_id" placeholder="Seleccione"
                                 :options="ciudades.map(val => { return {label:val.ciudad,value:val.id} })"
                                 :reduce="(option) => option.value " />
                     
                              <b-form-invalid-feedback>
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                     
                           </validation-provider>
                        </b-form-group>
                     </b-col>
                  </b-row>

                  <b-row>
                     <b-col>
                        <div class="form-group">
                           <label for="map-canvas">Posici&oacute;n en el mapa <span class="required">*</span></label>
                           <p class="text-grey">
                           <ul>
                              <li class="text-grey">Arrastra el marcador hacia la ubicaci&oacute;n de la Oficina Jurídica.</li>
                              <li class="text-grey">Puedes apoyarte escribiendo una ubicaci&oacute;n como una ciudad,
                                 municipio, colonia, etc. y seleccionar una de las opciones sugeridas.</li>
                           </ul>
                           Las coordenadas de la ubicaci&oacute;n se crean automaticamente.
                           </p>
                        </div>
                  
                  
                     </b-col>
                  </b-row>
                  <!-- google map -->
                  <b-row>
                     <b-col>
                  
                        <div class="d-none">
                           <div class="input-group col-md-6 mt-2" id="myAutocomplete">
                              <div class="input-group-prepend">
                                 <div class="input-group-text bg-secondary">
                                    <span class="fas fa-search text-white" aria-hidden="true"></span>
                                 </div>
                              </div>
                  
                              <gmap-autocomplete class="form-control py-1 " style="z-index:8000 !important" @place_changed="setPlace">
                  
                              </gmap-autocomplete>
                  
                           </div>
                        </div>
                  
                        <GmapMap ref="input" :center="{
                                       	lat:getLatitud(),
                                       	lng:getLongitud()
                                       }" :zoom="zoom_map" :options="options_map"
                           style="width:100%; height:250px; display: flex; justify-content:center;">
                           <GmapMarker :key="0" :position="{
                                          	lat:getLatitud(),
                                          	lng:getLongitud()
                                          }" :visible="visibleMarker" :draggable="true" :clickable="true" :icon="iconMarker"
                              @mouseup="moviendomapa" @position_changed="posicionCambiada()">
                              <GmapInfoWindow :options="optionsPlace">
                              </GmapInfoWindow>
                           </GmapMarker>
                  
                        </GmapMap>
                  
                     </b-col>
                  </b-row>
                  
                  <!-- Lat y lng  -->
                  <b-row>
                     <b-col md="6">
                  
                        <b-form-group label="Latitud">
                           <validation-provider name="lat" rules="required" #default="{errors}">
                              <b-input-group>
                                 <b-input-group-prepend is-text>
                                    <span class="fas fa-map-marked-alt"></span>
                                 </b-input-group-prepend>
                  
                                 <b-form-input v-model="formulario.lat" :state="errors.length ? false : null" />
                  
                              </b-input-group>
                              <b-form-invalid-feedback>
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                  
                           </validation-provider>
                  
                        </b-form-group>
                  
                     </b-col>
                  
                     <b-col md="6">
                  
                        <b-form-group label="Longitud">
                           <validation-provider name="lng" rules="required" #default="{errors}">
                              <b-input-group>
                                 <b-input-group-prepend is-text>
                                    <span class="fas fa-map-marked-alt"></span>
                                 </b-input-group-prepend>
                                 <b-form-input v-model="formulario.lng" :state="errors.length ? false : null" />
                              </b-input-group>
                              <b-form-invalid-feedback>
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                           </validation-provider>
                  
                        </b-form-group>
                  
                     </b-col>
                  </b-row>

                  <b-row>
                     <b-col cols="12">
                        <b-button-group size="sm">
                           <b-button type="submit" variant="primary" v-loading="loading" title="guardar">
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

import { ValidationObserver,ValidationProvider } from 'vee-validate'
import {required} from '@validations'
import vSelect from 'vue-select'

import {
   BForm,
   BCard,
   BContainer,
   BRow,
   BCol,
   BFormGroup,
   BFormInput,
   BFormInvalidFeedback,
   BButtonGroup,
   BButton,
   BFormRadioGroup,
   VBTooltip,
   BFormTextarea,
   BInputGroupPrepend,
   BInputGroup
} from 'bootstrap-vue'


import store from '@/store'
import {computed,ref,toRefs,onMounted,watch} from 'vue'
import useDireccion from '@core/utils/useDireccion'

export default {

   components:{
      BForm,
      BCard,
      BContainer,
      BRow,
      BCol,
      BFormGroup,
      BFormInput,
      BFormInvalidFeedback,
      BButtonGroup,
      BButton,
      BFormRadioGroup,
      ValidationObserver,
      ValidationProvider,
      BFormTextarea,
      vSelect,
      BInputGroupPrepend,
      BInputGroup
   },

   directives:{
      'b-tooltip':VBTooltip
   }, 

   setup(props,{emit}) {
      const formValidate = ref(null)
      const {sucursal:formulario} = toRefs(store.state.sucursal)
      const {sistema} = toRefs(store.state.sistema)

      const buscadormap = ref('');
      const visibleMarker = ref(true);
      const zoom_map = ref(10);
      const markers = ref([]);
      const iconMarker = ref('');
      const input = ref(null)

      const {
         paises,
         ciudades,
         estados,
         cargarEstados,
         cargarCiudades,
         pais_id,
      } = useDireccion();

      const guardar = () => {

         formulario.value.sistema_id = sistema.value.id
         
         emit('save',formulario.value,formValidate.value)

      }

      const optionsPlace = ref({
         content: `<strong>${sistema.value.nombre}</strong>`,
      })

      const options_map = ref({
         mapTypeControl: false,
         zoomControl: true,
      })


      const addTelefono = () => {

         if(!formulario.value.telefonos){
            formulario.value.telefonos = [];
         }


         formulario.value.telefonos.push({
            numero:'',
            principal:false,
         })

      }

      const soloUnPrincipal  = (numero) => {
         formulario.value.telefonos.forEach(val => {
            if(val.numero != numero ){
               val.principal = false
            }
         })
      }

      const cargarForm  = () => {
         if (formulario.value.id) {
            pais_id.value = formulario.value.estado.pais_id
            cargarCiudades(formulario.value.estado_id)
            optionsPlace.value.content = '<div><strong>' + 'Villamizar & Jarava' + '</strong><br>' + formulario.value.direccion
            zoom_map.value = 17
         }
      }


      onMounted(() => {

         cargarForm();

         input.value.$mapPromise.then((map) => {
            var myControl = document.getElementById('myAutocomplete');
            myControl.index = 1;
            map.controls[google.maps.ControlPosition.TOP_CENTER].push(myControl);
         });
      })


       const getLatitud = () => {
         return Number(formulario.value.lat)
      }

      const getLongitud = () => {
         return Number(formulario.value.lng);
      }

      const setPlace = (place) => {
         visibleMarker.value = false;
         var address = '';
         if (place.address_components) {
            address = [
               (place.address_components[0] && place.address_components[0].short_name || ''),
               (place.address_components[1] && place.address_components[1].short_name || ''),
               (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
         }

         zoom_map.value = 17

         formulario.value.lat = Number(place.geometry.location.lat());
         formulario.value.lng = Number(place.geometry.location.lng());

         iconMarker.value = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
         };

         visibleMarker.value = true;

         optionsPlace.value.content = '<div><strong>' + place.name + '</strong><br>' + address
      }


      const moviendomapa = (dato) => {
         formulario.value.lat = Number(dato.latLng.lat())
         formulario.value.lng = Number(dato.latLng.lng())
      }

      const posicionCambiada = () => {

      }

      watch(formulario, () => cargarForm())

      return {
         guardar,
         formValidate,
         formulario,
         required,
         loading:computed(() => store.state.loading),
         addTelefono,
         soloUnPrincipal,

         paises,
         ciudades,
         estados,
         cargarEstados,
         cargarCiudades,
         pais_id,
         getLatitud,
         getLongitud,
         setPlace,
         moviendomapa,
         posicionCambiada,
         options_map,

         buscadormap,
         visibleMarker,
         zoom_map,
         markers,
         iconMarker,
         input,
         optionsPlace


      }

   },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>