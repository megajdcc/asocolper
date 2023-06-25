export default{
   namespaced:true,

   state(){
      return {
         sucursal:{
            id: null,
            direccion: '',
            principal: false,
            codigo_postal: '',
            telefonos: [],
            ciudad_id: null,
            estado_id: null,
            sistema_id: null,
            lng: -74.0579,
            lat: 4.6659,
            ciudad: null,
            estado: null,
            sistema: null,

         },

         sucursales:[]

      }

   },

   getters:{   

      draft(state){
         return clone(state.sucursal)
      }

   },

   mutations:{

      clear(state) {

         state.sucursal = {
            id: null,
            direccion: '',
            principal: false,
            codigo_postal: '',
            telefonos: [],
            ciudad_id: null,
            estado_id: null,
            sistema_id: null,
            lng: -74.0579,
            lat: 4.6659,
            ciudad: null,
            estado: null,
            sistema: null,
         }

      },


      setSucursal(state, sucursal) {
         state.sucursal = sucursal
      },

      setSucursales(state, sucursales) {
         state.sucursales = sucursales
      },


      push(state, sucursal) {
         state.sucursales.push(sucursal)
      },

      put(state, sucursal_id) {
         state.sucursales.splice(
            state.sucursales.findIndex(val => val.id === sucursal_id),
            1
         )
      },


      capturar(state, sucursal_id) {
         let sucursal = state.sucursales.find(val => val.id === sucursal_id)

         if (sucursal != undefined) {
            state.sucursal = sucursal
         }

      },

      update(state, sucursal) {
         let i = state.sucursales.findIndex(val => val.id === sucursal.id)

         if (i != -1) {
            state.sucursales[i] = sucursal

            if (state.sucursal.id === sucursal.id) {
               state.sucursal = sucursal
            }
         }

      },

   },

   actions:{


      getSucursales({commit}){

         return new Promise((resolve, reject) => {

            commit('toggleLoading',null,{root:true})
            axios.get(`/api/sucursales/get/all`).then(({data}) => {

               commit('setSucursales',data)
               resolve(data)
            
            }).catch(e => reject(e))
            .then(() => {
               commit('toggleLoading',null,{root:true})
            })

         })
      },

      fetchData({commit},datos){

         return new Promise((resolve, reject) => {
            commit('toggleLoading',null,{root:true})

            axios.post('/api/fetch/sucursales',datos).then(({data}) => {
               commit('setSucursales',data.sucursales)
               resolve(data)
            }).catch(e => reject(e))
            .then(() => commit('toggleLoading',null,{root:true}))
         })
      },


      guardar({commit},datos){

         return new Promise((resolve, reject) => {
            commit('toggleLoading',null,{root:true})

            if(datos.id){
               axios.put(`/api/sucursals/${datos.id}`,datos).then(({data}) => {

                  commit('update',data.sucursal)
                  resolve(data)


               }).catch(e => reject(e))
               .then(() => commit('toggleLoading',null,{root:true}))

            }else{

               
               axios.post('/api/sucursals',datos).then(({data}) => {

                  commit('push',data.sucursal)
                  resolve(data)
                  
               }).catch(e => reject(e))
               .then(() => commit('toggleLoading',null,{root:true}))

            }

         })
      },


      eliminar({commit},sucursal_id){

         return new Promise((resolve, reject) => {
            commit('toggleLoading',null,{root:true})

            axios.delete(`/api/sucursals/${sucursal_id}`).then(({data}) => {

               if(data.result){

                  commit('put', sucursal_id)
                 
               }
               resolve(data)

            }).catch(e => reject(e))
            .then(() => commit('toggleLoading',null,{root:true}))


         })
      },

      fetch({ commit }, sucursal_id){
         return new Promise((resolve, reject) => {
            commit('toggleLoading',null,{root:true})

            axios.get(`/api/sucursales/${sucursal_id}/get`).then(({data}) => {

               commit('setSucursal', data)
               resolve(data)

            }).catch(e => reject(e))
            .then(() => commit('toggleLoading',null,{root:true}))

         })
      }


   }


}