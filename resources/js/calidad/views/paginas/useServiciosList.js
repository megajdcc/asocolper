
import { computed, ref, toRefs, onMounted, watch } from 'vue'

import store from '@/store'

export default function useServiciosList() {



   const items = ref([])

   const isSortDirDesc = ref(true)
   const sortBy = ref('id')
   const searchQuery = ref('')
   const perPage = ref(25)
   const currentPage = ref(1)
   const total = ref(0);
   const {categorias} = toRefs(store.state['categoria-servicio'])
   const categoria_id = ref(null)
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

   watch([perPage, currentPage, categoria_id], () => refetchData())


   watch(searchQuery, _.debounce(() => refetchData(), 500))



   const refetchData = () => {
      fetchData((contenidos) => {
         items.value = contenidos
      })

   }

   onMounted(() => {

      if (!categorias.value.length) {
         store.dispatch('categoria-servicio/getCategorias');
      }


   })


   const fetchData = (done) => {

      store.dispatch('servicio/fetchDataPublic', {
         q: searchQuery.value,
         sortBy: sortBy.value,
         sortDesc: isSortDirDesc.value,
         perPage: perPage.value,
         page: currentPage.value,
         categoria_id: categoria_id.value
      }).then(({ total: count, servicios }) => {

         total.value = count

         done(servicios)
      }).catch(e => {
         toast.error('No se pudo cargar la data')
      })

   }






   return {
      servicios: computed(() => items.value),
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
      categorias,
      categoria_id

   }

}  