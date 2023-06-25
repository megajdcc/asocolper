<script>
import form from './form';
import { h, onMounted, onActivated } from 'vue'
import store from '@/store'
import router from '@/router'

export default {

   setup() {

      onActivated(() => store.commit('servicio/clear'))
      onMounted(() => store.commit('servicio/clear'))

      return () => h(form,{
         on:{
            save:(datos,formValidate) => {

               store.dispatch('servicio/guardar',datos).then(({result,servicio}) => {

                  if(result){

                     store.dispatch('servicio/addBanner',{banner:datos.banner,servicio_id:servicio.id}).then(({result:resultado,servicio:service}) => {
                        if(resultado){
                           toast.success('Se registrado con éxito el servicio')
                           router.push({ name: 'edit.servicio', params: { id: service.id } })
                        }
                     })

                  }else{
                     toast.info('No se pudo guardar el servicio, inténtelo de nuevo')
                  }

               }).catch(e => {
                  if(e.response.status === 422){
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