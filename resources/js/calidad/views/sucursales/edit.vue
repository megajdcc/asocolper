<script>

import form from './form';
import { h, onMounted, toRefs, watch } from 'vue'
import store from '@/store'

export default {

   props: ['id'],

   setup(props) {

      const { id } = toRefs(props)

      const { sucursales } = toRefs(store.state.sucursal)


      const cargarForm = () => {

         if (!sucursales.value.length) {
            store.dispatch('sucursal/fetch', id.value)
         } else {
            store.commit('sucursal/capturar', id.value)
         }

      }


      onMounted(() => cargarForm())

      watch([id, sucursales], () => cargarForm())

      return () => h(form, {
         on: {
            save: (data, formValidate) => {

               store.dispatch('sucursal/guardar', data).then(({ result, sucursal }) => {

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