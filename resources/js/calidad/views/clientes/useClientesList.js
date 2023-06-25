import { ref, watch, computed, onMounted } from 'vue'
import store from '@/store'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import useFilterTable from '@core/utils/useFilterTable';


export default function useClientesList() {


   const tableColumns = [
      { key: 'id', sortable: true, label: '#' },
      { key: 'logo', sortable: true, label: "Logotipo" },
      { key: 'nombre', sortable: true, label: "Cliente" },
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

      store.dispatch('cliente/fetchData', {
         q: searchQuery.value,
         perPage: perPage.value,
         page: currentPage.value,
         sortBy: sortBy.value,
         sortDesc: isSortDirDesc.value,
      })
         .then(({ clientes, total: cant }) => {
            callback(clientes)
            total.value = cant

         })
         .catch(() => {
            toast({
               component: ToastificationContent,
               props: {
                  title: 'Error trayendo los clientes',
                  icon: 'AlertTriangleIcon',
                  variant: 'danger',
               },
            })
         })
   }

   const eliminar = (cliente_id) => {

      store.dispatch('cliente/eliminar', cliente_id).then(({ result }) => {

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
