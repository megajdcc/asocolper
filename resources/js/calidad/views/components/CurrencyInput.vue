<template>

  

   <input  ref="inputRef" :value="formattedValue" :class="InputClass" :disabled="disabled">

</template>

<script>

import { ref, watch, toRefs } from 'vue'
import { useCurrencyInput } from 'vue-currency-input'
import { ValidationProvider } from 'vee-validate';

import { BFormInvalidFeedback } from 'bootstrap-vue';

export default {

   name:'CurrencyInput',

   props:{
      options:{
         type:Object,
         required:true
      },
      modelValue:Number,
      value:Number|String,
      name:{
         type:String,
         default:'monto'
      },
     
      InputClass:{
         type:String,
         required:false,
         default:'w-100 '
      },

      disabled:{
         type:Boolean,
         required:false,
         default:false
      }

   },

   components:{
      ValidationProvider,
      BFormInvalidFeedback
   },

   setup(props){

      const {value,options} = toRefs(props) 
      let validateFormInput = ref(null)

      // let errors = ref([]);


      const { formattedValue, inputRef, setOptions, setValue } = useCurrencyInput(options.value)
      
      watch(value,(val) => {
         setValue(val)
      })

        
      watch(options,(options) => {
         setOptions(options)
      })

      // watch(validateFormInput, (val) => {
      //    errors.value = val.errors;
      // })


    

return {
         formattedValue,
         inputRef,
         validateFormInput,
         // errors
      }
   }
   
}
</script>