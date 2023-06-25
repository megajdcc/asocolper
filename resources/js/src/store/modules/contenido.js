import axios from "axios"

export default {
   namespaced: true,

   state() {
      return {
         contenido: {
            id: null,
            titulo: '',
            slug: '',
            status:2, // 1 => Publicado, 2 => pendiente, 3 => borrador
            contenido:'',
            banner:null,
            usuario_id:null,
            usuario:null,
            categorias:[],
            comentarios:[],
            likes:[]
         },

         contenidos: []
      }
   },


   getters: {
      draft(state) {
         return clone(state.contenido)
      },

      isFavorito:(state) => {
         return (usuario_id,contenido_id = null) => {

       

            if(contenido_id){
               return (state.contenidos.find(val => val.id == contenido_id)).likes.filter(val => val.id === usuario_id).length > 0 ? true : false
            }

            return state.contenido.likes.filter(val => val.id === usuario_id).length > 0 ? true : false
         }

      }
   },

   mutations: {

      clear(state) {

         state.contenido = {
            id: null,
            titulo: '',
            slug: '',
            status: 2, // 1 => Publicado, 2 => pendiente, 3 => borrador
            contenido: '',
            banner: null,
            usuario_id: null,
            usuario: null,
            categorias: [],
            comentarios: [],
            likes: []

         }

      },


      setContenido(state, contenido) {
         state.contenido = contenido
      },

      setContenidos(state, contenidos) {
         state.contenidos = contenidos
      },


      push(state, contenido) {
         state.contenidos.push(contenido)
      },

      put(state, contenido_id) {
         state.contenidos.splice(
            state.contenidos.findIndex(val => val.id === contenido_id),
            1
         )
      },


      capturar(state, contenido_id) {
         let contenido = state.contenidos.find(val => val.id === contenido_id)

         if (contenido != undefined) {
            state.contenido = contenido
         }

      },

      capturarSlug(state, slug) {
         let contenido = state.contenidos.find(val => val.slug === slug)

         if (contenido != undefined) {
            state.contenido = contenido
         }

      },

      update(state, contenido) {
         let i = state.contenidos.findIndex(val => val.id === contenido.id)

         if (i != -1) {
            state.contenidos[i] = contenido

            if (state.contenido.id === contenido.id) {
               state.contenido = contenido
            }
         }

      },

   },

   actions: {

      fetchData({ commit }, datos) {

         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.post('/api/fetch/contenidos', datos).then(({ data }) => {
               commit('setContenidos', data.contenidos)
               resolve(data)
            }).catch(e => reject(e))
               .then(() => commit('toggleLoading', null, { root: true }))
         })
      },

       fetchDataPublic({ commit }, datos) {

         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.post('/api/fetch/contenidos/public', datos).then(({ data }) => {
               commit('setContenidos', data.contenidos)
               resolve(data)
            }).catch(e => reject(e))
               .then(() => commit('toggleLoading', null, { root: true }))
         })
      },



      guardar({ commit }, datos) {

         const dataForm = new FormData();


         Object.keys(datos).forEach(val => {
            dataForm.append(val,datos[val])
         })


         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            if (datos.id) {
               dataForm.append('_method','PUT');

               axios.post(`/api/contenidos/${datos.id}`, dataForm,{
                  headers:{
                     'Content-Type':'multipart/form-data; boundary=something'
                  }

               }).then(({ data }) => {

                  commit('update', data.contenido)
                  resolve(data)


               }).catch(e => reject(e))
                  .then(() => commit('toggleLoading', null, { root: true }))

            } else {


               axios.post('/api/contenidos', dataForm,{
                     headers: {
                        'Content-Type': 'multipart/form-data; boundary=something'
                     }

               }).then(({ data }) => {

                  commit('push', data.contenido)
                  resolve(data)

               }).catch(e => reject(e))
                  .then(() => commit('toggleLoading', null, { root: true }))

            }

         })
      },


      eliminar({ commit }, contenido_id) {

         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.delete(`/api/contenidos/${contenido_id}`).then(({ data }) => {

               if (data.result) {

                  commit('put', contenido_id)

               }
               resolve(data)

            }).catch(e => reject(e))
               .then(() => commit('toggleLoading', null, { root: true }))


         })
      },

      fetch({ commit }, contenido_id) {
         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })
            axios.get(`/api/contenidos/${contenido_id}/get`).then(({ data }) => {
               commit('push', data)
               commit('setContenido', data)
               resolve(data)

            }).catch(e => reject(e))
               .then(() => commit('toggleLoading', null, { root: true }))

         })
      },

      fetchPublic({ commit }, slug) {
         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })
            axios.get(`/api/contenidos/${slug}/get/public`).then(({ data }) => {
               commit('push',data)
               commit('setContenido', data)
               resolve(data)

            }).catch(e => reject(e))
               .then(() => commit('toggleLoading', null, { root: true }))

         })
      },


      removerFavorito({commit},{contenido_id,usuario_id}){
         return new Promise((resolve, reject) => {
            commit('toggleLoading',null,{root:true})

            axios.get(`/api/contenidos/${contenido_id}/favorito/usuario/${usuario_id}/remover`).then(({data}) => {
               
               if(data.result){
                  commit('setContenido',data.contenido)
               }
               resolve(data)
            }).catch(e => reject(e))
            .then(() => commit('toggleLoading',null,{root:true}))

         })
      },

      addFavorito({ commit }, { contenido_id, usuario_id }){

         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.get(`/api/contenidos/${contenido_id}/favorito/usuario/${usuario_id}/add`).then(({ data }) => {

               if (data.result) {
                  commit('setContenido', data.contenido)
               }
               resolve(data)
            }).catch(e => reject(e))
               .then(() => commit('toggleLoading', null, { root: true }))

         })
         
      },


      getUltimosRecientes({commit}){
         return new Promise((resolve, reject) => {
            axios.get(`/api/contenidos/get/utlimos-recientes`).then(({ data }) => {
               resolve(data)
            }).catch(e => reject(e))
         })
      }


   },



}