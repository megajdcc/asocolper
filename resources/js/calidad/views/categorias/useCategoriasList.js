import { ref, watch, computed, onMounted } from 'vue'
import store from '@/store'
import { title } from '@core/utils/filter'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import useFilterTable from '@core/utils/useFilterTable';


export default function useCategoriasList() {


   const tableColumns = [
      { key: 'id', sortable: true, label: '#' },
      { key: 'nombre', sortable: true, label: "Categoría" },
      { key: 'contenido', sortable: true, label: 'Nro de Contenido en esta categoía' },
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
         .dispatch('categoria/fetchData', {
            q: searchQuery.value,
            perPage: perPage.value,
            page: currentPage.value,
            sortBy: sortBy.value,
            sortDesc: isSortDirDesc.value,
         })
         .then(({categorias,total:cant}) => {
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

      store.dispatch('categoria/eliminar',categoria_id).then(({result}) => {

         if(result){
         
            toast.info('Se ha eliminado con éxito el registro')
            
            refetchData();

         }else{
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
