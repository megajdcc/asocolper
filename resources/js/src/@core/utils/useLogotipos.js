import {computed,ref,toRefs,onMounted} from 'vue'

import store from '@/store'

const useLogotipos = () => {
   const {sistema} = toRefs(store.state.sistema)

   const logotipo = computed(() => `/storage/logotipos/${sistema.value.logo}`)
   const logotipobg = computed(() => `/storage/logotipos/${sistema.value.logoblack}`)
   const favicon = computed(() => `/storage/logotipos/${sistema.value.favicon}` )
 
   return {
      logotipo,
      logotipobg,
      favicon
   }

}  

export default useLogotipos;