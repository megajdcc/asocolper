<template>

  <div class="container-fluid w-100 px-0 mx-0">

    <!-- Filters -->
    <users-list-filters :role-filter.sync="roleFilter" :role-options="getRols" />

    <!-- Table Container Card -->
    <b-card no-body class="mb-0">

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col cols="12" md="4" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <per-page v-model="perPage" :perPageOptions="perPageOptions" size="sm" />
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="8" class="d-flex align-items-center justify-content-end">
            <b-input-group size="sm">
              <b-form-input v-model="searchQuery" placeholder="Buscar..." />
              <template #append is-text>
                <b-button variant="primary" @click="$router.push({name:'create.usuario'})">
                  <span class="text-nowrap">Agregar usuario</span>
                </b-button>
              </template>
            </b-input-group>
            
          </b-col>
        </b-row>

      </div>

      <b-table ref="refUserListTable" class="position-relative" :items="fetchUsers" responsive :fields="tableColumns"
        primary-key="id" :sort-by.sync="sortBy" show-empty empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"  :busy="loading">

          <template #empty>
               <span class="text-nowrap text-center d-block">
                  No se encontró níngún usuario...
               </span>
            </template>

            <template #table-busy>
               <div class="text-center my-2">
                  <b-spinner class="align-middle" variant="primary"></b-spinner>
                  <strong>Cargando...</strong>
               </div>
            </template>


        <!-- Column: User -->
        <template #cell(usuario)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar size="32" :src="data.item.avatar" :text="avatarText(data.item.usuario)"
                :variant="`light-${resolveUserRoleVariant(data.item.rol)}`"
                :to="{ name: 'mostrar.usuario', params: { id: data.item.id } }" disabled />
            </template>
            <b-link :to="{ name: 'mostrar.usuario', params: { id: data.item.id } }" disabled
              class="font-weight-bold d-block text-nowrap">
              {{ data.item.usuario }}
            </b-link>
            <small class="text-muted" v-if="data.item.username">@{{ data.item.username }}</small>
          </b-media>
        </template>

        <!-- Column: Rol -->
        <template #cell(rol)="data">
          <div class="text-nowrap">
            <feather-icon :icon="resolveUserRoleIcon(data.item.rol)" size="18" class="mr-50"
              :class="`text-${resolveUserRoleVariant(data.item.rol)}`" />
            <span class="align-text-top text-capitalize">{{ data.item.rol }}</span>
          </div>
        </template>


        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">

            <template #button-content>
              <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
            </template>


            <b-dropdown-item :to="{ name: 'edit.usuario', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Editar</span>
            </b-dropdown-item>

            <b-dropdown-item @click="eliminarUsuario(data.item)">
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Eliminar</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>

      </b-table>

      <paginate-table :dataMeta="dataMeta" :currentPage.sync="currentPage" :perPage="perPage" :total="totalUsers" />


    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BInputGroup,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BDropdownItemButton,
  BPagination,
  BSpinner
} from 'bootstrap-vue'

import vSelect from 'vue-select'
import store from '@/store'
import { ref, onUnmounted,onMounted, computed } from 'vue'
import { avatarText } from '@core/utils/filter'
import UsersListFilters from './UsersListFilters.vue'
import useUsersList from './useUsersList'

// import UserListAddNew from './UserListAddNew.vue'

import { mapGetters,mapMutations,mapActions } from 'vuex';

export default {
  components: {
    UsersListFilters,
    // UserListAddNew,

    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BDropdownItemButton,
    BPagination,
    PaginateTable:() => import('components/PaginateTable'),
    vSelect,
    PerPage:() => import('components/PerPage'),
    BInputGroup,
    BSpinner
  },

  computed:{
    ...mapGetters('rol',['getRols'])
  },

  mounted(){

    this.$eventHub.$on('fetch-user', () => {
      this.refetchData();
    })

  },

  setup() {
    


    const {
      fetchUsers,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      refetchData,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      // resolveUserStatusVariant,

      // Extra Filters
      roleFilter
    } = useUsersList()



    return {


      fetchUsers,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      refetchData,

      // Filter
      avatarText,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,

      // Extra Filters
      roleFilter,

      loading:computed(() => store.state.loading)
    }
  },


  methods:{
     ...mapMutations('app',['TOGGLE_OVERLAY']),
    ...mapActions('usuario',['eliminar']),

    eliminarUsuario(item){

      this.TOGGLE_OVERLAY();

      this.eliminar(item.id).then(respon => {
        
        if(respon.data.result){
          this.$notify.info('Cuenta eliminada exitosamente');
          this.refetchData();
        }else{
           this.$notify.info('La cuenta de usuario no se pudo eliminar ');
        }

      }).catch(e => {
        console.log(e)
      }).then(() =>  {
        this.TOGGLE_OVERLAY()
      })

    }


  }
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
