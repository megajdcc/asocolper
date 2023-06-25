<script>

import form from './form';
import { h, onMounted, onActivated } from 'vue'
import store from '@/store'
import router from '@/router'

export default {

   setup() {

      onActivated(() => store.commit('categoria/clear'))
      onMounted(() => store.commit('categoria/clear'))

      return () => h(form, {
         on: {
            save: (data, formValidate) => {

               store.dispatch('categoria/guardar', data).then(({ result, categoria }) => {

                  if (result) {
                     toast.success('Se ha registrado con éxito la catégoria')
                     router.push({ name: 'edit.categoria', params: { id: categoria.id } })
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