
<script>

import form from './form';
import { h, onMounted, onActivated } from 'vue'
import store from '@/store'
import router from '@/router'

export default {

   setup() {

      onActivated(() => store.commit('cliente/clear'))
      onMounted(() => store.commit('cliente/clear'))

      return () => h(form, {
         on: {
            save: (data, formValidate) => {

               store.dispatch('cliente/guardar', data).then(({ result, cliente }) => {

                  if (result) {
                     toast.success('Se ha registrado con éxito al cliente')
                     router.push({ name: 'edit.cliente', params: { id: cliente.id } })
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