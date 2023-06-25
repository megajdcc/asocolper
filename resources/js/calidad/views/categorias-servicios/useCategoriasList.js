import { ref, watch, computed, onMounted } from 'vue'
import store from '@/store'
import { title } from '@core/utils/filter'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import useFilterTable from '@core/utils/useFilterTable';


export default function useCategoriasList() {


   const tableColumns = [
      { key: 'id', sortable: true, label: '#' },
      { key: 'nombre', sortable: true, label: "Categoría" },
      { key: 'breve', sortable: true, label: "Categoría" },
      { key: 'actions', sortable: false },
   ]

   const {
      perPageOptions,
      currentPage,
      perPage,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refTable,
      total,
      dataMeta,
      refetchData,
   } = useFilterTable();



   const fetchData = (ctx, callback) => {
      store
         .dispatch('categoria-servicio/fetchData', {
            q: searchQuery.value,
            perPage: perPage.value,
            page: currentPage.value,
            sortBy: sortBy.value,
            sortDesc: isSortDirDesc.value,
         })
         .then(({ categorias, total: cant }) => {
            callback(categorias)
            total.value = cant

         })
         .catch(() => {
            toast({
               component: ToastificationContent,
               props: {
                  title: 'Error trayendo Categorías',
                  icon: 'AlertTriangleIcon',
                  variant: 'danger',
               },
            })
         })
   }

   const eliminar = (categoria_id) => {

      store.dispatch('categoria-servicio/eliminar', categoria_id).then(({ result }) => {

         if (result) {

            toast.info('Se ha eliminado con éxito el registro')

            setTimeout(() => {
               refetchData();
            }, 1000);

         } else {
            toast.info('No se pudo eliminar el registro, intentelo de nuevo mas tarde')
         }

      })

   }




   return {
      fetchData,
      perPageOptions,
      currentPage,
      perPage,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refTable,
      total,
      dataMeta,
      refetchData,
      tableColumns,
      eliminar
   }
}
