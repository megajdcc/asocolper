<script>

import form from './form';
import { h, onMounted, onActivated, toRefs, watch } from 'vue'
import store from '@/store'
import router from '@/router'

export default {

   props: ['id'],

   setup(props) {

      const { id } = toRefs(props)

      const { categorias } = toRefs(store.state['categoria-servicio'])


      const cargarForm = () => {

         if (!categorias.value.length) {
            store.dispatch('categoria-servicio/fetch', id.value)
         } else {
            store.commit('categoria-servicio/capturar', id.value)
         }

      }


      onMounted(() => cargarForm())

      watch([id, categorias], () => cargarForm())

      return () => h(form, {
         on: {
            save: (data, formValidate) => {

               store.dispatch('categoria-servicio/guardar', data).then(({ result, categoria }) => {

                  if (result) {
                     toast.success('Se ha guardado con éxito el registro')
                  } else {
                     toast.error('No se pudo guardar el registro, inténtelo de nuevo mas tarde')
                  }

               }).catch(e => {
                  console.log(e)
                  if (e.response.status === 422) {
                     formValidate.setErrors(e.response.data.errors)
                  }
               })
            }
         }
      })
   }

}

</script>