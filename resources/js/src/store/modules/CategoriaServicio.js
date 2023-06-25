import axios from "axios"
import { clone } from "lodash"

export default {
   namespaced:true,

   state(){
      return {
            categoria:{
               id:null,
               nombre:'',
               breve:'',
               servicios:[],
            },

            categorias:[]
      }
   },


   getters:{
      draft(state){
         return clone(state.categoria)
      }
   },


   mutations:{
      clear(state){
         state.categoria = {
            id: null,
            nombre: '',
            breve: '',
            servicios: [],

         }
      },


      push(state,data){
         state.categorias.push(data)
      },

      put(state,categoria_id){
         state.categorias.splice(
            state.categorias.findIndex(val => val.id === categoria_id),
            1
         )
      },

      update(state,categoria){

         let i = state.categorias.findIndex(val => val.id === categoria.id)

         if(i != -1){
            state.categorias[i] = categoria
            if(state.categoria.id === categoria.id){
               state.categoria = categoria
            }
         }
      },
      
      capturar(state,categoria_id){
         let categoria = state.categorias.find(val => val.id === categoria_id)

         if(categoria != undefined){
            state.categoria = categoria
         }
      },

      setCategorias(state,categorias){
         state.categorias = categorias
      },

      setCategoria(state,categoria){
         state.categoria = categoria
      }

   },

   actions:{

      fetchData({commit},datos){

         return new Promise((resolve, reject) => {
            commit('toggleLoading',null,{root:true})

            axios.post(`/api/categoria-servicios/fetch-data`,datos).then(({data}) => {

               commit('setCategorias',data.categorias)

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

               axios.put(`/api/categoria-servicios/${datos.id}`,datos).then(({data}) => {
                  
                  if(data.result){
                     commit('update',data.categoria)
                  }
                  resolve(data)
               }).catch(e => reject(e))
               .then(() => {
                  commit('toggleLoading', null, { root: true })

               })

            }else{
               axios.post(`/api/categoria-servicios`, datos).then(({ data }) => {

                  if (data.result) {
                     commit('push', data.categoria)
                  }
                  resolve(data)
               }).catch(e => reject(e))
               .then(() => {
                  commit('toggleLoading', null, { root: true })

               })
            }

         })
      },


      eliminar({commit},categoria_id){
         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.delete(`/api/categoria-servicios/${categoria_id}`).then(({data}) => {
               if(data.result){
                  commit('put',categoria_id)
               }

               resolve(data)

            }).catch(e => reject(e))
            .then(() => {
               commit('toggleLoading', null, { root: true })

            })
         })
      },

      fetch({commit},categoria_id){
         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.get(`/api/categoria-servicios/${categoria_id}/fetch`).then(({data}) => {
               commit('setCategoria',data)
               resolve(data)

            }).catch(e => reject(e))
            .then(() => {
               commit('toggleLoading', null, { root: true })
            })
         })
      },

      getCategorias({commit}){
         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.get(`/api/categoria-servicios/get/all`).then(({data}) => {
               commit('setCategorias',data)
               resolve(data)               
            }).catch(e => reject(e))
            .then(() => {
               commit('toggleLoading', null, { root: true })
            })
         })
      }

   }


}