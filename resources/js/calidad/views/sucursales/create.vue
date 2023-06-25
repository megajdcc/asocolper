<script>

import form from './form';
import { h, onMounted, onActivated } from 'vue'
import store from '@/store'
import router from '@/router'

export default {

   setup() {

      onActivated(() => store.commit('sucursal/clear'))
      onMounted(() => store.commit('sucursal/clear'))

      return () => h(form, {
         on: {
            save: (data, formValidate) => {

               store.dispatch('sucursal/guardar', data).then(({ result, sucursal }) => {

                  if (result) {
                     toast.success('Se ha registrado con éxito la sucursal')
                     router.push({ name: 'edit.sucursal', params: { id: sucursal.id } })
                  } else {
                     toast.error('No se pudo guardar el registro, inténtelo de nuevo mas tarde')
                  }

               }).catch(e => {
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