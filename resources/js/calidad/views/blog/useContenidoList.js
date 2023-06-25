
import {computed,ref,toRefs,onMounted,watch} from 'vue'

import store from '@/store'

export default function useContenidoList() {

   
   // const {contenidos} = toRefs(store.state.contenido)

   const items = ref([])

   const isSortDirDesc = ref(true)
   const sortBy = ref('id')
   const searchQuery = ref('')
   const perPage = ref(25)
   const currentPage = ref(1)
   const total = ref(0);

   const perPageOptions = ref([
      {
         label: '10',
         value: 10,
      },
      {
         label: '25',
         value: 25,
      },
      {
         label: '50',
         value: 50,
      },
      {
         label: '100',
         value: 100,
      },
      {
         label: 'Todas',
         value: 0,
      },

   ])


   const dataMeta = computed(() => {

      const localItemsCount = items.value.length


      return {
         from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
         to: perPage.value * (currentPage.value - 1) + localItemsCount,
         of: total.value,
      }

   })

   watch(perPage,() => refetchData())


   watch(searchQuery, _.debounce(() => refetchData(), 500))



   const refetchData = () => {
      fetchData((contenidos) => {
         items.value = contenidos
      })

   }

   const fetchData = (done) => {

      store.dispatch('contenido/fetchData',{
         q: searchQuery.value,
         sortBy: sortBy.value,
         sortDesc: isSortDirDesc.value,
         perPage:perPage.value,
         page:currentPage.value
      }).then(({total:count,contenidos}) => {

         total.value = count

         done(contenidos)
      }).catch(e => {
         toast.error('No se pudo cargar la data')
      })

   }

   const eliminar = (contenido_id) => {

      store.dispatch('contenido/eliminar',contenido_id).then(({result}) => {

         if(result) {

            toast.info('Se ha eliminado con éxito el registro')
            refetchData();


         }else{
            toast.error('No se pudo eliminar el registro')
         }

      })
   }

   const alternarFavorito = (data,is_favorito) => {

      if(is_favorito){
         
         store.dispatch('contenido/removerFavorito', data).then(({result,contenido}) => {
            refetchData();

         })

      }else{
         store.dispatch('contenido/addFavorito', data).then(() => {
            refetchData();
         })
      }

   }



   return {
      contenidos:computed(() => items.value),
      perPageOptions,
      isSortDirDesc,
      sortBy,
      searchQuery,
      perPage,
      currentPage,
      total,
      fetchData,
      refetchData,
      dataMeta,
      eliminar,
      alternarFavorito
      
   }

}  