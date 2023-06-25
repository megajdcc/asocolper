import { ref, watch, computed, onMounted } from 'vue'
import store from '@/store'
import { title } from '@core/utils/filter'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import useFilterTable from '@core/utils/useFilterTable';


export default function useSociosList() {


   const tableColumns = [
      { key: 'id', sortable: true, label: '#' },
      { key: 'nombre', sortable: true, label: "Socio" },
      { key: 'correo', sortable: true, label: "Correo" },
      { key: 'telefono', sortable: true, label: "Teléfono" },
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
         
         store.dispatch('socio/fetchData', {
            q: searchQuery.value,
            perPage: perPage.value,
            page: currentPage.value,
            sortBy: sortBy.value,
            sortDesc: isSortDirDesc.value,
         })
         .then(({ socios, total: cant }) => {
            callback(socios)
            total.value = cant

         })
         .catch(() => {
            toast({
               component: ToastificationContent,
               props: {
                  title: 'Error trayendo los socios',
                  icon: 'AlertTriangleIcon',
                  variant: 'danger',
               },
            })
         })
   }

   const eliminar = (socio_id) => {

      store.dispatch('socio/eliminar', socio_id).then(({ result }) => {

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
