import { ref, watch, computed, onMounted } from 'vue'
import store from '@/store'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import useFilterTable from '@core/utils/useFilterTable';


export default function useServiciosList() {


   const tableColumns = [
      { key: 'id', sortable        : true, label: '#' },
      { key: 'titulo', sortable    : true, label: "Título" },
      { key: 'subtitulo', sortable : true, label: "Sub Título" },
      { key: 'categoria_id', sortable     : true, label: "Categoría" },
      { key: 'usuario_id', sortable: true, label: "Usuario" },
      { key: 'sub_servicio', sortable: true, label: "¿Es un sub servicio?" },
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
         .dispatch('servicio/fetchData', {
            q: searchQuery.value,
            perPage: perPage.value,
            page: currentPage.value,
            sortBy: sortBy.value,
            sortDesc: isSortDirDesc.value,
         })
         .then(({ servicios, total: cant }) => {
            callback(servicios)
            total.value = cant

         })
         .catch(() => {
            toast({
               component: ToastificationContent,
               props: {
                  title: 'Error trayendo Servicios',
                  icon: 'AlertTriangleIcon',
                  variant: 'danger',
               },
            })
         })
   }

   const eliminar = (servicio_id) => {

      store.dispatch('servicio/eliminar', servicio_id).then(({ result }) => {

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
