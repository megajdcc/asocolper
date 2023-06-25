import axios from "axios"
import { clone } from "lodash"

export default {
   namespaced:true,


   state(){
      return {
         politica:{
            id:null,
            politicas:''
         }
      }
   },
   
   getters:{

      draft(state){
         return clone(state.politica)
      }
   },


   mutations:{

      update(state,politica){
         state.politica = politica
      },

      setPolitica(state,politica){
         state.politica = politica
      }

   },
   
   actions:{

      getPolitica({commit}){

         return new Promise((resolve, reject) => {
               commit('toggleLoading',null,{root:true})

               axios.get(`/api/politicas/get`).then(({data}) => {

                  commit('setPolitica',data)
                  resolve(data)

               }).catch(e => reject(e))
               .then(() => {
                  commit('toggleLoading',null,{root:true})
               })

         })
      },

      guardar({ state, commit },datos) {

         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.put(`/api/politicas/${state.politica.id}`,datos).then(({ data }) => {

               commit('update', data.politica)
               resolve(data)

            }).catch(e => reject(e))
               .then(() => {
                  commit('toggleLoading', null, { root: true })
            })

         })
      },




   }


}