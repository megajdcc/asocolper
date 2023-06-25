<script>
import form from './form';
import { h, onMounted, onActivated,toRefs,watch } from 'vue'
import store from '@/store'

export default {

   props:['id'],

   setup(props) {

      const {id} = toRefs(props)
      const {servicios} = toRefs(store.state.servicio)


      const cargarForm = () => {

         if(!servicios.value.length){
            store.dispatch('servicio/fetch',id.value)
         }else{
            store.commit('servicio/capturar',id.value)
         }

      }



      onActivated(() => cargarForm())

      onMounted(() => cargarForm())


      watch([servicios,id],() => cargarForm())


      return () => h(form, {
         on: {
            save: (datos, formValidate) => {

               store.dispatch('servicio/guardar', datos).then(({ result, servicio }) => {

                  if (result) {

                     toast.success('Se guardado con éxito el registro')

                     store.commit('servicio/update',servicio)

                  } else {
                     toast.info('No se pudo guardar el servicio, inténtelo de nuevo')
                  }

               }).catch(e => {
                  if (e.response.status === 422) {
                     formValidate.setErrors(e.response.data.errors)
                  }
                  console.log(e)
               })

            }

         }
      });


   }

}

</script>