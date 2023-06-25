export default {
   namespaced:true,

   state(){
      return {
         cliente:{
            id:null,
            nombre:'',
            logo:null,
            url:''
          
         },

         clientes:[]
      }

   },

   getters:{
      draft(state){
         return clone(state.cliente)
      }
   },

   mutations:{
      clear(state) {

         state.cliente = {
            id: null,
            nombre: '',
            logo:null,
            url: ''

         }

      },


      setCliente(state, cliente) {
         state.cliente = cliente
      },

      setClientes(state, clientes) {
         state.clientes = clientes
      },


      push(state, cliente) {
         state.clientes.push(cliente)
      },

      put(state, cliente_id) {
         state.clientes.splice(
            state.clientes.findIndex(val => val.id === cliente_id),
            1
         )
      },


      capturar(state, cliente_id) {
         let cliente = state.clientes.find(val => val.id === cliente_id)

         if (cliente != undefined) {
            state.cliente = cliente
         }

      },

      update(state, cliente) {
         let i = state.clientes.findIndex(val => val.id === cliente.id)

         if (i != -1) {
            state.clientes[i] = cliente

            if (state.cliente.id === cliente.id) {
               state.cliente = cliente
            }
         }

      },
   },

   actions:{

      getClientes({ commit }) {

         return new Promise((resolve, reject) => {

            commit('toggleLoading', null, { root: true })
            axios.get(`/api/clientes/get/all`).then(({ data }) => {

               commit('setClientes', data)
               resolve(data)

            }).catch(e => reject(e))
               .then(() => {
                  commit('toggleLoading', null, { root: true })
               })

         })
      },

      fetchData({ commit }, datos) {

         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.post('/api/clientes/fetch-data', datos).then(({ data }) => {
               commit('setClientes', data.clientes)
               resolve(data)
            }).catch(e => reject(e))
               .then(() => commit('toggleLoading', null, { root: true }))
         })
      },


      guardar({ commit }, datos) {

         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            let formData = new FormData()


            Object.keys(datos).forEach(val => {
               formData.append(val,datos[val]);
            })

            if (datos.id) {
               formData.append('_method','PUT')

               axios.post(`/api/clientes/${datos.id}`, formData,{
                  headers:{
                     'Content-Type':'multipart/form-data;'
                  }

               }).then(({ data }) => {

                  commit('update', data.cliente)
                  resolve(data)


               }).catch(e => reject(e))
                  .then(() => commit('toggleLoading', null, { root: true }))

            } else {


               axios.post('/api/clientes', formData, {
                  headers: {
                     'Content-Type': 'multipart/form-data;'
                  }

               }).then(({ data }) => {

                  commit('push', data.cliente)
                  resolve(data)

               }).catch(e => reject(e))
                  .then(() => commit('toggleLoading', null, { root: true }))

            }

         })
      },


      eliminar({ commit }, cliente_id) {

         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.delete(`/api/clientes/${cliente_id}`).then(({ data }) => {

               if (data.result) {

                  commit('put', cliente_id)

               }
               resolve(data)

            }).catch(e => reject(e))
               .then(() => commit('toggleLoading', null, { root: true }))


         })
      },

      fetch({ commit }, cliente_id) {
         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.get(`/api/clientes/${cliente_id}/get`).then(({ data }) => {

               commit('setCliente', data)
               resolve(data)

            }).catch(e => reject(e))
               .then(() => commit('toggleLoading', null, { root: true }))

         })
      }

   }

}