export default {
   namespaced:true,

   state(){
      return {
         socio:{
            id:null,
            nombre:'',
            apellido:'',
            imagen:null,
            perfil:'',
            correo:'',
            telefono:''
         },

         socios:[]
      }

   },

   getters:{
      draft(state){
         return clone(state.socio)
      }
   },


   mutations:{
      clear(state) {

         state.socio = {
            id: null,
            nombre: '',
            apellido: '',
            imagen: null,
            perfil: '',
            correo: '',
            telefono: ''
         }

      },


      setSocio(state, socio) {
         state.socio = socio
      },

      setSocios(state, socios) {
         state.socios = socios
      },


      push(state, socio) {
         state.socios.push(socio)
      },

      put(state, socio_id) {
         state.socios.splice(
            state.socios.findIndex(val => val.id === socio_id),
            1
         )
      },


      capturar(state, socio_id) {
         let socio = state.socios.find(val => val.id === socio_id)

         if (socio != undefined) {
            state.socio = socio
         }

      },

      update(state, socio) {
         let i = state.socios.findIndex(val => val.id === socio.id)

         if (i != -1) {
            state.socios[i] = socio

            if (state.socio.id === socio.id) {
               state.socio = socio
            }
         }

      },
   },

   actions:{

      getSocios({ commit }) {

         return new Promise((resolve, reject) => {

            commit('toggleLoading', null, { root: true })
         axios.get(`/api/socios/get/all`).then(({ data }) => {

               commit('setSocios', data)
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

            axios.post('/api/socios/fetch-data', datos).then(({ data }) => {
               commit('setSocios', data.socios)
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

               axios.post(`/api/socios/${datos.id}`, formData,{
                  headers:{
                     'Content-Type':'multipart/form-data;'
                  }

               }).then(({ data }) => {

                  commit('update', data.socio)
                  resolve(data)


               }).catch(e => reject(e))
                  .then(() => commit('toggleLoading', null, { root: true }))

            } else {


               axios.post('/api/socios', formData, {
                  headers: {
                     'Content-Type': 'multipart/form-data;'
                  }

               }).then(({ data }) => {

                  commit('push', data.socio)
                  resolve(data)

               }).catch(e => reject(e))
                  .then(() => commit('toggleLoading', null, { root: true }))

            }

         })
      },


      eliminar({ commit }, socio_id) {

         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.delete(`/api/socios/${socio_id}`).then(({ data }) => {

               if (data.result) {

                  commit('put', socio_id)

               }
               resolve(data)

            }).catch(e => reject(e))
               .then(() => commit('toggleLoading', null, { root: true }))


         })
      },

      fetch({ commit }, socio_id) {
         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.get(`/api/socios/${socio_id}/get`).then(({ data }) => {

               commit('setSocio', data)
               resolve(data)

            }).catch(e => reject(e))
               .then(() => commit('toggleLoading', null, { root: true }))

         })
      }

   }

}