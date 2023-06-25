<template>
   <b-card>
      <validation-observer ref="formValidate" #default="{handleSubmit}">
         <b-form @submit.prevent="handleSubmit(guardar)">
            <b-container fluid>
               <b-row>
                  <b-col cols="12">

                     <b-form-group>
                        <template #label>
                           Políticas:<span class="text-danger">*</span>

                           <validation-provider name="politica" rules="required" #default="{valid,errors}">
                                 <editor output-format="html" :value="formulario.politicas" @input="formulario.politicas = $event"
                                    api-key="t1i940nuarrf1zefgxbf6ow5cxmgjmcad7q7l3fm5prgebyc" :init="optionsEditor" />
                              <b-form-invalid-feedback :state="valid" >
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>
                           </validation-provider>
                        </template>
                     </b-form-group>

                  </b-col>
               </b-row>

               <b-row>
                  <b-col cols="12">
                     <b-button-group size="sm">
                        <b-button type="submit" title="Guardar" v-loading="loading" variant="primary">
                           <feahter-icon icon="SaveIcon"/>
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
   import {ValidationObserver,ValidationProvider} from 'vee-validate'

   import {required} from '@validations'

   import {
      BForm,
      BFormGroup,
      BCard,
      BContainer,
      BRow,
      BCol,
      BButtonGroup,
      BButton,
      BFormInvalidFeedback
   } from 'bootstrap-vue'

   import store from '@/store'

   import {computed,toRefs,ref,onMounted}  from 'vue'

import Editor from '@tinymce/tinymce-vue'

export default {

   components:{
      BForm,
      BFormGroup,
      BCard,
      BContainer,
      BRow,
      BCol,
      BButtonGroup,
      BButton,

      ValidationObserver,
      ValidationProvider,
      BFormInvalidFeedback,
      Editor

   },

   setup() {


      const {politica:formulario} = toRefs(store.state.politica)

      const formValidate = ref(null)

      const cargarForm = () => {

         if(!formulario.value.id){
            store.dispatch('politica/getPolitica')
         }

      }

      onMounted(() => cargarForm())

      const guardar = () => {
         store.dispatch('politica/guardar',formulario.value).then(({result}) => {
            
            if(result){
               toast.success('La política de privacidad se ha actualizado con éxito ')
            }else{

               toast.info('La política de privacidad no pudo guardar, Intentelo de nuevo')
            }

         })

      }

      const optionsEditor = {
         selector: 'textarea#premiumskinsandicons-snow',
         skin: 'snow',
         icons: 'thin',

         plugins: 'quickbars image lists code table codesample advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code wordcount ',

         toolbar: 'formatselect | forecolor backcolor | bold italic underline strikethrough | link image blockquote codesample | align bullist numlist | code | table',
         height: 400,
         width:'100%',
         content_style: 'body { margin: 2rem 10%; }',
         branding: false,
         language: 'es'
      }

      
      return {
         formValidate,
         required,
         formulario,
         optionsEditor,
         guardar,
         loading:computed(() => store.state.loading)
      }
   },
}
</script>