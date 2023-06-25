<script>

import {onMounted,h} from 'vue'
import store from '@/store'
import router from '@/router'

import form from './form'

export default {
   
   setup() {

      onMounted(() => {
         store.commit('contenido/clear')
      })

      return () => h(form,{


         on:{
            save:(data,formValidate) => {
               
               store.dispatch('contenido/guardar',data).then(({result,contenido}) => {

                  if(result){
                     toast.info('Se registrado con éxito el contenido del blog, sin embargo está pendiente de publicación')
                     store.commit('contenido/push', contenido)

                     router.push({name:'edit.blog',params:{id:contenido.id}})
                  }else{
                     toast.error('No se pudo registrar el contenido, inténtelo de nuevo')
                  }

               }).catch(e => {
                  
                  if(e.response.status === 422){
                     formValidate.setErrors(e.response.data.errors)
                  }else{
                     toast.error('No se pudo registrar el contenido, inténtelo de nuevo mas tarde...')
                  }

                 
               })

            }

         }

      })

   }

}
</script>