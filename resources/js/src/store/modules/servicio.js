import axios from "axios"
import { clone } from "lodash"

export default {
   namespaced:true,

   state(){
      return {
            servicio:{
               id:null,
               titulo:'',
               subtitulo:'',
               breve:'',
               banner:null,
               url:null,
               contenido:'',
               usuario_id:null,
               servicio_id:null,
               categoria_id:null,
               usuario:null,
               servicio:null,
               subServicios:[]
            },

            servicios:[]
      }
   },


   getters:{
      draft(state){
         return clone(state.servicio)
      }
   },


   mutations:{
      clear(state){
         state.servicio = {
            id: null,
            titulo: '',
            subtitulo: '',
            breve: '',
            banner: null,
            url: null,
            contenido: '',
            usuario_id: null,
            servicio_id: null,
            categoria_id: null,
            usuario: null,
            servicio: null,
            subServicios: []

         }
      },


      push(state,data){
         state.servicios.push(data)
      },

      put(state,servicio_id){
         state.servicios.splice(
            state.servicios.findIndex(val => val.id === servicio_id),
            1
         )
      },

      update(state,servicio){

         let i = state.servicios.findIndex(val => val.id === servicio.id)

         if(i != -1){
            state.servicios[i] = servicio
            if(state.servicio.id === servicio.id){
               state.servicio = servicio
            }
         }
      },
      
      capturar(state,servicio_id){
         let servicio = state.servicios.find(val => val.id === servicio_id)

         if(servicio != undefined){
            state.servicio = servicio
         }
      },

      setServicios(state,servicios){
         state.servicios = servicios
      },

      setServicio(state,servicio){
         state.servicio = servicio
      },

      updateBanner(state,servicio){

         if(state.servicio.id === servicio.id){
            state.servicio.banner = servicio.banner;
         }

      }

   },

   actions:{

      fetchData({commit},datos){

         return new Promise((resolve, reject) => {
            commit('toggleLoading',null,{root:true})

            axios.post(`/api/servicios/fetch-data`,datos).then(({data}) => {

               commit('setServicios',data.servicios)

               resolve(data)

            }).catch(e => reject(e))
            .then(() => {
               commit('toggleLoading', null, { root: true })

            })
         })

      },


      fetchDataPublic({ commit }, datos) {

         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.post(`/api/servicios/fetch-data-public`, datos).then(({ data }) => {

               commit('setServicios', data.servicios)

               resolve(data)

            }).catch(e => reject(e))
               .then(() => {
                  commit('toggleLoading', null, { root: true })

               })
         })

      },


      guardar({commit},datos){

         return new Promise((resolve, reject) => {
            
            commit('toggleLoading', null, { root: true })
          

            if(datos.id){

               axios.put(`/api/servicios/${datos.id}`,datos).then(({data}) => {
                  
                  if(data.result){
                     commit('update',data.servicio)
                  }
                  resolve(data)
               })
               .catch(e => reject(e))
               .then(() => {
                  commit('toggleLoading', null, { root: true })

               })

            }else{
               axios.post(`/api/servicios`,datos).then(({ data }) => {

                  if (data.result) {
                     commit('push', data.servicio)
                  }
                  resolve(data)
               })
               .catch(e => reject(e))
               .then(() => {
                  commit('toggleLoading', null, { root: true })

               })
            }

         })
      },


      eliminar({commit},servicio_id){
         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.delete(`/api/servicios/${servicio_id}`).then(({data}) => {
               if(data.result){
                  commit('put',servicio_id)
               }

               resolve(data)

            }).catch(e => reject(e))
            .then(() => {
               commit('toggleLoading', null, { root: true })

            })
         })
      },

      fetch({commit},servicio_id){
         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.get(`/api/servicios/${servicio_id}/fetch`).then(({data}) => {
               commit('setServicio',data)
               resolve(data)

            }).catch(e => reject(e))
            .then(() => {
               commit('toggleLoading', null, { root: true })
            })
         })
      },

      getServicios({commit}){
         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.get(`/api/servicios/get/all`).then(({data}) => {
               commit('setServicios',data)
               resolve(data)               
            }).catch(e => reject(e))
            .then(() => {
               commit('toggleLoading', null, { root: true })

            })
         })
      },

      addBanner({commit},datos){

         return new Promise((resolve, reject) => {
            
            commit('toggleLoading',null,{root:true})

            const formData = new FormData();

            formData.append('banner',datos.banner)
            formData.append('_method','PUT');

            axios.post(`/api/servicios/${datos.servicio_id}/add/banner`,formData,{headers:{
               'Content-Type':'multipart/form-data;'
            }}).then(({data}) => {

               if(data.result){
                  // commit('updateBanner',data.servicio)
               }
               resolve(data)
            }).catch(e => reject(e))
            .then(() => {
               commit('toggleLoading', null, { root: true })
            })


         })
      },

      cargarPorUrl({commit},url){
         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.get(`/api/servicios/url/${url}/fetch`).then(({ data }) => {
               resolve(data)

            }).catch(e => reject(e))
               .then(() => {
                  commit('toggleLoading', null, { root: true })
               })
         })
      },

      RandonServicios({commit}){
         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.get(`/api/get/servicios/randon`).then(({data}) => {

               resolve(data)
            }).catch(e => reject(e))
            .then(() => {
               commit('toggleLoading',null,{root:true})
            })
         })
      }

   }


}