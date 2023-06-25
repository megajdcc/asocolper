import axios from "axios"
import { calendarFormat } from "moment"

export default {
   namespaced:true,

   state(){
      return{
         categoria:{
            id:null,
            nombre:'',
            icono:''
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
         
         state.categoria  = {
            id: null,
            nombre: '',
            icono: ''
         } 

      },


      setCategoria(state,categoria){
         state.categoria = categoria
      },

      setCategorias(state,categorias){
         state.categorias = categorias
      },


      push(state,categoria){
         state.categorias.push(categoria)
      },

      put(state,categoria_id){
         state.categorias.splice(
            state.categorias.findIndex(val => val.id === categoria_id),
            1
         )
      },


      capturar(state,categoria_id){
         let categoria = state.categorias.find(val => val.id === categoria_id)

         if(categoria != undefined){
            state.categoria = categoria
         }

      },

      update(state, categoria) {
         let i = state.categorias.findIndex(val =>  val.id === categoria.id)

         if (i != -1) {
            state.categorias[i] = categoria

            if(state.categoria.id === categoria.id){
               state.categoria = categoria
            }
         }

      },

   },

   actions:{


      getCategorias({commit}){

         return new Promise((resolve, reject) => {

            commit('toggleLoading',null,{root:true})
            axios.get(`/api/categorias/get/all`).then(({data}) => {

               commit('setCategorias',data)
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

            axios.post('/api/fetch/categorias',datos).then(({data}) => {
               commit('setCategorias',data.categorias)
               resolve(data)
            }).catch(e => reject(e))
            .then(() => commit('toggleLoading',null,{root:true}))
         })
      },


      guardar({commit},datos){

         return new Promise((resolve, reject) => {
            commit('toggleLoading',null,{root:true})

            if(datos.id){
               axios.put(`/api/categorias/${datos.id}`,datos).then(({data}) => {

                  commit('update',data.categoria)
                  resolve(data)


               }).catch(e => reject(e))
               .then(() => commit('toggleLoading',null,{root:true}))

            }else{

               
               axios.post('/api/categorias',datos).then(({data}) => {

                  commit('push',data.categoria)
                  resolve(data)
                  
               }).catch(e => reject(e))
               .then(() => commit('toggleLoading',null,{root:true}))

            }

         })
      },


      eliminar({commit},categoria_id){

         return new Promise((resolve, reject) => {
            commit('toggleLoading',null,{root:true})

            axios.delete(`/api/categorias/${categoria_id}`).then(({data}) => {

               if(data.result){

                  commit('put',categoria_id)
                 
               }
               resolve(data)

            }).catch(e => reject(e))
            .then(() => commit('toggleLoading',null,{root:true}))


         })
      },

      fetch({commit},categoria_id){
         return new Promise((resolve, reject) => {
            commit('toggleLoading',null,{root:true})

            axios.get(`/api/categorias/${categoria_id}/get`).then(({data}) => {

               commit('setCategoria', data)
               resolve(data)

            }).catch(e => reject(e))
            .then(() => commit('toggleLoading',null,{root:true}))

         })
      }
   }
   
}