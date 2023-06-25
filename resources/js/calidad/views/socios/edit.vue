<script>
import form from './form';
import { h, onMounted, onActivated,toRefs } from 'vue'
import store from '@/store'

export default {

   props:['id'],

   setup(props) {

      const {id} = toRefs(props)
      const {socios} = toRefs(store.state.socio)

      const cargarForm = () => {

         if(!socios.value.length){
            
            store.dispatch('socio/fetch',id.value).then((socio) => {
               
            })

         }else{
            store.commit('socio/capturar',id.value)
         }

      }

      onActivated(() => cargarForm())
      onMounted(() => cargarForm())

      return () => h(form, {
         on: {
            save: (data, formValidate) => {

               store.dispatch('socio/guardar', data).then(({ result, socio }) => {

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