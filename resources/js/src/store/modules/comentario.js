import axios from "axios"

export default {
   namespaced: true,

   state() {
      return {
         comentario: {
            id: null,
            comentario: '',
            usuario_id: null,
            contenido_id:null,
            comentario_id:null,
            nombre: localStorage.getItem('comentario') ? JSON.parse(localStorage.getItem('comentario')).nombre : '',
            email: localStorage.getItem('comentario') ? JSON.parse(localStorage.getItem('comentario')).email : '',
            telefono: localStorage.getItem('comentario') ? JSON.parse(localStorage.getItem('comentario')).telefono : '',
            usuario:null,
            contenido:null,
            comentario:null
         },

         comentarios: []
      }
   },


   getters: {
      draft(state) {
         return clone(state.comentario)
      }
   },

   mutations: {

      clear(state) {

         state.comentario = {
            id: null,
            comentario: '',
            usuario_id: null,
            contenido_id: null,
            comentario_id: null,
            nombre: localStorage.getItem('comentario') ? JSON.parse(localStorage.getItem('comentario')).nombre : '',
            email: localStorage.getItem('comentario') ? JSON.parse(localStorage.getItem('comentario')).email : '',
            telefono: localStorage.getItem('comentario') ? JSON.parse(localStorage.getItem('comentario')).telefono : '',
            usuario: null,
            contenido: null,
            comentario: null

         }

      },


      setComentario(state, comentario) {
         state.comentario = comentario
      },

      setComentarios(state, comentarios) {
         state.comentarios = comentarios
      },


      push(state, comentario) {
         state.comentarios.push(comentario)
      },

      put(state, comentario_id) {
         state.comentarios.splice(
            state.comentarios.findIndex(val => val.id === comentario_id),
            1
         )
      },


      capturar(state, comentario_id) {
         let comentario = state.comentarios.find(val => val.id === comentario_id)

         if (comentario != undefined) {
            state.comentario = comentario
         }

      },

      update(state, comentario) {
         let i = state.comentarios.findIndex(val => val.id === comentario.id)

         if (i != -1) {
            state.comentarios[i] = comentario

            if (state.comentario.id === comentario.id) {
               state.comentario = comentario
            }
         }

      },

   },

   actions: {

      fetchData({ commit }, datos) {

         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.post('/api/fetch/comentarios', datos).then(({ data }) => {
               commit('setComentarios', data.comentarios)
               resolve(data)
            }).catch(e => reject(e))
               .then(() => commit('toggleLoading', null, { root: true }))
         })

      },

      fetchDataPublic({ commit }, datos) {

         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.post('/api/fetch/comentarios/public', datos).then(({ data }) => {
               commit('setComentarios', data.comentarios)
               resolve(data)
            }).catch(e => reject(e))
               .then(() => commit('toggleLoading', null, { root: true }))
         })

      },


      guardar({ commit }, datos) {



         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            if (datos.id) {

               axios.put(`/api/comentarios/${datos.id}`, datos).then(({ data }) => {

                  commit('update', data.comentario)
                  resolve(data)


               }).catch(e => reject(e))
                  .then(() => commit('toggleLoading', null, { root: true }))

            } else {


               axios.post('/api/comentarios',datos).then(({ data }) => {

                  commit('push', data.comentario)
                  resolve(data)

               }).catch(e => reject(e))
                  .then(() => commit('toggleLoading', null, { root: true }))

            }

         })
      },


      eliminar({ commit }, comentario_id) {

         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.delete(`/api/comentarios/${comentario_id}`).then(({ data }) => {

               if (data.result) {

                  commit('put', comentario_id)

               }
               resolve(data)

            }).catch(e => reject(e))
               .then(() => commit('toggleLoading', null, { root: true }))


         })
      },

      fetch({ commit }, comentario_id) {
         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })
            axios.get(`/api/comentarios/${comentario_id}/get`).then(({ data }) => {

               commit('setComentario', data)
               resolve(data)

            }).catch(e => reject(e))
               .then(() => commit('toggleLoading', null, { root: true }))

         })
      }
   }

}