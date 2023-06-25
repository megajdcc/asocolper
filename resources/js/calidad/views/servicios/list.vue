<template>
   <b-container fluid class="px-0 mx-0">

      <!-- Table Container Card -->
      <b-card no-body class="mb-0">

         <div class="m-2">
            <!-- Table Top -->
            <b-row>
               <!-- Per Page -->
               <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
                  <per-page v-model="perPage" :perPageOptions="perPageOptions"></per-page>
               </b-col>

               <b-col md="6">
                  <div class="d-flex align-items-center justify-content-end">

                     <b-input-group size="sm">

                        <b-form-input v-model="searchQuery" type="search" placeholder="..." />

                        <template #append>
                           <b-button variant="dark" :to="{name:'create.servicio'}"
                              v-if="$can('write','servicios')">
                              <feather-icon size="18" icon="PlusSquareIcon" />
                              Añadir
                           </b-button>
                        </template>
                     </b-input-group>


                  </div>
               </b-col>

            </b-row>

         </div>

         <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id"
            :sort-by.sync="sortBy" empty-text="No se encontró ningúna categoría" :sort-desc.sync="isSortDirDesc"
            sticky-header="700px" :no-border-collapse="false" borderless outlined small :busy="loading">


            <template #empty>
               <span class="text-nowrap text-center d-block">
                  No se encontró níngúna categoría...
               </span>
            </template>

            <template #table-busy>
               <div class="text-center my-2">
                  <b-spinner class="align-middle" variant="primary"></b-spinner>
                  <strong>Cargando...</strong>
               </div>
            </template>

            <template #cell(id)="{item,toggleDetails,detailsShowing}">
               <b-button variant="primary" @click="toggleDetails" size="sm" class="d-flex" >
                  {{ item.id }}
                  <feather-icon class="ml-1" :icon="detailsShowing ? 'ArrowUpIcon':'ArrowDownIcon' "/>
               </b-button>
            </template>
            
            <template #row-details="{item}">
               <show-servicio :servicio="item" :imgBanner="`/storage/servicios/banner/${item.banner}`"/>

            </template>

            <template #cell(titulo)="{item}">
               <b-link :to="{name:'show.servicio',params:{url:item.url}}" :alt="item.titulo" class="text-nowrap">
                  {{ item.titulo }}
               </b-link>
            </template>

            <template #cell(categoria_id)="{item}">
               <span class="text-nowrap">
                  {{ item.categoria.nombre }}
               </span>
            </template>

           

            <template #cell(sub_servicio)="{item}">
               <span class="text-nowrap">{{ item.servicio_id ? 'Sí' : 'Nó' }}</span>
            </template>

            <template #cell(usuario_id)="{item}">

               <span class="text-nowrap">
                  <b-avatar :src="item.usuario.avatar" :alt="item.usuario.nombre" />
                  {{ item.usuario.nombre+' '+item.usuario.apellido }}
               </span>
              
            </template>



            <!-- Column: Actions -->
            <template #cell(actions)="{item}">

               <b-button-group size="sm">

                  <b-button :to="{name:'edit.servicio',params:{id:item.id}}"
                     v-if="$can('update','servicios')" variant="primary" title="Editar Servicio">
                     <feather-icon icon="EditIcon" />
                  </b-button>

                  <b-button @click="eliminar(item.id)" variant="danger" title="Eliminar servicio"
                     v-if="$can('delete','servicios')">
                     <feather-icon icon="TrashIcon" />
                  </b-button>

               </b-button-group>

            </template>

         </b-table>

         <paginate-table :dataMeta="dataMeta" :currentPage.sync="currentPage" :perPage="perPage" :total="total" />


         <b-container class="mb-1">
            <b-row>
               <b-col class="px-1">
                  <b-button @click="regresar" size="sm">Regresar</b-button>
               </b-col>
            </b-row>
         </b-container>


      </b-card>
   </b-container>
</template>


<script>

import useServiciosList from './useServiciosList.js'
import {
   BCard,
   BContainer,
   BRow,
   BCol,
   BTable,
   BButtonGroup,
   BButton,
   BInputGroup,
   BFormInput,
   BSpinner,
   BLink,
   BAvatar

} from 'bootstrap-vue'

import { regresar } from '@core/utils/utils'
import { computed, onMounted } from 'vue'

import store from '@/store'

export default {

   components: {
      BCard,
      BContainer,
      BRow,
      BCol,
      BTable,
      BButtonGroup,
      BButton,
      PerPage: () => import('components/PerPage'),
      PaginateTable: () => import('components/PaginateTable'),
      BInputGroup,
      BFormInput,
      BSpinner,
      BLink,
      BAvatar,
      ShowServicio:() => import('components/ShowServicio.vue')



   },

   setup(props) {


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
         fetchData,
         tableColumns,
         eliminar
      } = useServiciosList();



      onMounted(() => {
         setTimeout(() => {
            refetchData()
         }, 1000)
      })


      return {
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
         fetchData,
         tableColumns,
         eliminar,
         regresar,
         loading: computed(() => store.state.loading)
      }
   }
}

</script>