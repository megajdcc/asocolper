import { ref, watch, computed, onMounted } from 'vue'
import store from '@/store'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import useFilterTable from '@core/utils/useFilterTable';


export default function useSucursalesList() {


   const tableColumns = [
      { key: 'id', sortable: true, label: '#' },
      { key: 'direccion', sortable: true, label: "Dirección" },
      { key: 'telefono', sortable: true, label: "Teléfono principal" },
      { key: 'principal', sortable: true, label: "Es la sucursal principal?" },
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
         .dispatch('sucursal/fetchData', {
            q: searchQuery.value,
            perPage: perPage.value,
            page: currentPage.value,
            sortBy: sortBy.value,
            sortDesc: isSortDirDesc.value,
         })
         .then(({ sucursales, total: cant }) => {
            callback(sucursales)
            total.value = cant

         })
         .catch(() => {
            toast({
               component: ToastificationContent,
               props: {
                  title: 'Error trayendo Sucursales',
                  icon: 'AlertTriangleIcon',
                  variant: 'danger',
               },
            })
         })
   }

   const eliminar = (sucursal_id) => {

      store.dispatch('sucursal/eliminar', sucursal_id).then(({ result }) => {

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
