<template>
   <b-card>

      <b-container fluid>
         <b-row>
            <b-col cols="12">
               <h3>Dibuje su firma</h3>
            </b-col>
         </b-row>
         <b-row>
            <b-col cols="12">
               <b-form-group label="Firma Actual" v-if="usuario.firma_digital">
                  <b-img :src="usuario.firma_digital" style="height: 100px;" />
               </b-form-group>
            </b-col>
         </b-row>
         <b-row>
            <b-col cols="12">
               <VueSignaturePad id="signature" width="100%" height="200px" ref="signaturePad" :options="options" />
            </b-col>
         </b-row>

         <b-row class="mt-1">
            <b-col cols="12">
               <b-button-group size="sm">

                  <b-button @click="limpiarUltimaLinea" title="Eliminar ultimo trazo">
                     <feather-icon icon="ArrowLeftIcon" />
                     Deshacer Ultimo trazo
                  </b-button>

                  <b-button @click="limpiar" title="limpiar">
                     <feather-icon icon="TrashIcon" />
                     Limpiar
                  </b-button>

                  <b-button @click="guardar" variant="primary" title="Guardar" v-loading="loading" :disabled="loading">
                     <feather-icon icon="SaveIcon" />
                     Guardar
                  </b-button>
               </b-button-group>
            </b-col>
         </b-row>
      </b-container>

   </b-card>
</template>


<script>

   import {ref,toRefs,computed,onMounted} from 'vue';
   import store from '@/store'
   import { ValidationObserver, ValidationProvider } from 'vee-validate'

   import {required} from '@validations';

   import {
      BCard,
      BRow,
      BCol,
      BForm,
      BFormGroup,
      BFormInput,
      BButtonGroup,
      BButton,
      BFormInvalidFeedback,
      BContainer,
      BImg
   } from 'bootstrap-vue'


   export default {

      components:{
         BCard,
         BForm,
         BFormGroup,
         BFormInput,
         BButtonGroup,
         BButton,
         BFormInvalidFeedback,
         ValidationObserver,
         ValidationProvider,
         BContainer,
         BRow,
         BCol,
         BImg,

      },

      setup(props){  

         const signaturePad = ref(null)
         const formValidate = ref(null)  
         const options = ref({
               penColor: "#000",
         })
         const {usuario} = toRefs(store.state.usuario)


         onMounted(() => {
            
           

         })
         const guardar = () => {
            
            const { isEmpty, data } = signaturePad.value.saveSignature()

            if(!isEmpty){
               // console.log(data);
               
               store.dispatch('usuario/guardarFirma',data).then(({result}) => {

                  if(result){
                     toast.success('Se ha guardado con éxito la firma')
                  }else{
                     toast.info('No se pudo guardar la firma, inténtelo de nuevo')
                  }
                  
               });

            }
           

         }

         const onBegin = () => {
            console.log('on Be')
         }

         const onEnd = () => {
            console.log('on end')
         }

         const limpiarUltimaLinea = () => {
            signaturePad.value.undoSignature();
         }

         const limpiar = () => {
            signaturePad.value.clearSignature();
            console.log(signaturePad.value)
         }

         return {
            guardar,
            usuario,
            loading:computed(() => store.state.loading),
            required,
            signaturePad,
            formValidate,
            onBegin,
            onEnd,
            options,
            limpiar,
            limpiarUltimaLinea
         }
      }
   }

</script>

<style lang="scss">
      #signature {
         border: double 3px transparent;
         border-radius: 5px;
         background-image: linear-gradient(white, white),
            radial-gradient(circle at top left, #1e292c, #9c49a3);
         background-origin: border-box;
         background-clip: content-box, border-box;
      }
   
      .container {
         width: "100%";
         padding: 8px 16px;
      }
   
      .buttons {
         display: flex;
         gap: 8px;
         justify-content: center;
         margin-top: 8px;
      }

</style>