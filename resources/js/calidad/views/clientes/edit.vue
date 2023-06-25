<script>
import form from './form';
import { h, onMounted, onActivated, toRefs } from 'vue'
import store from '@/store'

export default {

   props: ['id'],

   setup(props) {

      const { id } = toRefs(props)
      const { clientes } = toRefs(store.state.cliente)

      const cargarForm = () => {

         if (!clientes.value.length) {

            store.dispatch('cliente/fetch', id.value).then((cliente) => {

            })

         } else {
            store.commit('cliente/capturar', id.value)
         }

      }

      onActivated(() => cargarForm())
      onMounted(() => cargarForm())

      return () => h(form, {
         on: {
            save: (data, formValidate) => {

               store.dispatch('cliente/guardar', data).then(({ result, cliente }) => {

                  if (result) {
                     toast.success('Se ha guardado con éxito el registro ')
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