
<script>

import form from './form';
import { h, onMounted, onActivated } from 'vue'
import store from '@/store'
import router from '@/router'

export default {

   setup() {

      onActivated(() => store.commit('socio/clear'))
      onMounted(() => store.commit('socio/clear'))

      return () => h(form, {
         on: {
            save: (data, formValidate) => {

               store.dispatch('socio/guardar', data).then(({ result, socio }) => {

                  if (result) {
                     toast.success('Se ha registrado con éxito al socio')
                     router.push({ name: 'edit.socio', params: { id: socio.id } })
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