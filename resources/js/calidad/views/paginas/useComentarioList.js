
import { computed, ref, toRefs, onMounted, watch } from 'vue'

import store from '@/store'

export default function useComentarioList(slug_contenido) {

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
      }
   ])


   const dataMeta = computed(() => {

      const localItemsCount = items.value.length


      return {
         from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
         to: perPage.value * (currentPage.value - 1) + localItemsCount,
         of: total.value,
      }

   })

   watch([perPage, currentPage], () => refetchData())


   watch(searchQuery, _.debounce(() => refetchData(), 500))



   const refetchData = () => {
      fetchData((contenidos) => {
         items.value = contenidos
      })

   }

   const fetchData = (done) => {

      store.dispatch('comentario/fetchDataPublic', {
         q: searchQuery.value,
         sortBy: sortBy.value,
         sortDesc: isSortDirDesc.value,
         perPage: perPage.value,
         page: currentPage.value,
         slug: slug_contenido
      }).then(({ total: count, comentarios }) => {

         total.value = count

         done(comentarios)
      }).catch(e => {
         toast.error('No se pudo cargar la data')
      })

   }


   onMounted(() => refetchData())


   return {
      comentarios: computed(() => items.value),
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

   }

}  