<script>

import { onMounted, h,watch,toRefs } from 'vue'
import store from '@/store'

import form from './form'

export default {

   props:['id'],

   setup(props) {

      const {id} = toRefs(props)
      const { contenidos } = toRefs(store.state.contenido)

      const cargarForm = () => {
         
         if(!contenidos.value.length){
            store.dispatch('contenido/fetch',Number(id.value)).then((data) => {

            })

         }else{
            store.commit('contenido/capturar',Number(id.value))
         }

      }

      onMounted(() => cargarForm())

      watch([id], () => {
         cargarForm()
      })

      return () => h(form, {


         on: {
            save: (data, formValidate) => {

               store.dispatch('contenido/guardar', data).then(({ result, contenido }) => {

                  if (result) {
                     toast.info('Se actualizado con éxito el contenido del blog')
                     store.commit('contenido/update',contenido)
                  } else {
                     toast.error('No se pudo registrar el contenido, inténtelo de nuevo')
                  }

               }).catch(e => {
                  if (e.response.status === 422) {
                     formValidate.setErrors(e.response.data.errors)
                  } else {
                     toast.error('No se pudo registrar el contenido, inténtelo de nuevo mas tarde...')
                  }
               })

            }

         }

      })

   }

}
</script>