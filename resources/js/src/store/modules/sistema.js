import axios from "axios"
import router from '@/router'

export default{
      namespaced:true,

      state(){
         return{
            sistema:{
               id:null,
               nombre:'',
               logo:null,
               logoblack:null,
               descripcion:'',
               head:'',
               body:'',
               redes:[],
               lema:'',
               usuario_id:null,
               quienes_somos:'',
               metas:[],
               favicon:null,
               usuario:null,
               sucursales:[],
               correos:[],

            }
         }
      },

      getters:{
         draft(state){
            return clone(state.sistema)
         }
      },


      mutations:{

         setSistema(state,sistema){
            state.sistema = sistema
         },

         updateRedes(state,redes){
            state.sistema.redes = redes
         },
         
         updateMetas(state, redes) {
            state.sistema.redes = redes
         },

         pushRedes(state,red){
            if(!state.sistema.redes){
               state.sistema.redes = []
            }
            state.sistema.redes.push(red)
         },

         pushMetas(state,meta){
            if (!state.sistema.metas) {
               state.sistema.metas = []
            }

            state.sistema.metas.push(meta)
         },

         pushEmail(state, correo) {
            if (!state.sistema.correos) {
               state.sistema.correos = []
            }

            state.sistema.correos.push(correo)
         },


         putRed(state,idx){
            state.sistema.redes.splice(idx,1)
         },

         putMeta(state, idx) {
            state.sistema.metas.splice(idx, 1)
         },
         putCorreo(state, idx) {
            state.sistema.correos.splice(idx, 1)
         }

      },

      actions:{

         getSistema({commit}){

            return new Promise((resolve, reject) => {
               
               commit('toggleLoading',null,{root:true})

               axios.get(`/api/get/sistema`).then(({data}) => {

                  commit('setSistema',data)
                  resolve(data)

               }).catch(e => {
                  console.log(e.response.status)
                  if(e.response.status === 503){
                     router.push({ name: 'show.mantenimiento' })
                  }
                
                  reject(e)
               })
               .then(() => commit('toggleLoading',null,{root:true}))


            })
         },



         guardarRedes({commit,state},datos){

            return new Promise((resolve, reject) => {
               commit('toggleLoading', null, { root: true })

               return axios.put(`/api/sistema/${state.sistema.id}/update/redes`,datos).then(({data}) => {

                  if(data.result){
                     commit('updateRedes',data.redes)
                  }
                  resolve(data)
               })
               .catch(e => reject(e))
               .then(() => commit('toggleLoading', null, { root: true }))

            })

         },

         guardarMetas({ commit, state }, datos) {

            return new Promise((resolve, reject) => {
               commit('toggleLoading', null, { root: true })

               

               return axios.post(`/api/sistema/${state.sistema.id}/update/metas`, datos).then(({ data }) => {

                  if (data.result) {
                     commit('updateMetas', data.metas)
                  }
                  resolve(data)
               })
                  .catch(e => reject(e))
                  .then(() => commit('toggleLoading', null, { root: true }))

            })

         },

         guardar({commit,state},datos){
            return new Promise((resolve,reject) => {
               commit('toggleLoading', null, { root: true })

               // const dataForm = new FormData();

               // Object.keys(datos).forEach(val => {
               //    dataForm.append(val, datos[val])
               //    if(val == 'redes'){
               //       console.log(val)
               //       console.log(datos.redes);
               //       if(datos.redes){
               //          datos.redes.forEach(valor => {
               //             dataForm.append('redes[]', valor);
               //          })
               //       }
                    
               //    }

               //    if (val == 'metas') {
               //       if(datos.metas){
               //          datos.metas.forEach(valor => {
               //             dataForm.append('metas[]', valor);
               //          })
               //       }
                   

               //    }

               // })
               // dataForm.append('_method', 'PUT')


               axios.put(`/api/sistemas/${state.sistema.id}`,datos).then(({data}) => {

                  if(data.result){
                     commit('setSistema',data.sistema)
                  }
                  resolve(data)

               }).catch(e => reject(e))
               .then(() => commit('toggleLoading',null,{root:true}))


            })
         },

         guardarLogo({commit,state},{logo}){

            return new Promise((resolve, reject) => {
               commit('toggleLoading', null, { root: true })

               const dataForm = new FormData()

               dataForm.append('logo',logo)
               dataForm.append('_method','PUT')

               axios.post(`/api/sistema/${state.sistema.id}/update/logo`,dataForm,{
                  headers:{
                     'Content-Type':'multipart/form-data'
                  }
               }).
               then(({data}) => {
                  
                  if(data.result){
                     commit('setSistema',data.sistema)
                  }  

                  resolve(data)

               }).catch(e => reject(e))
               .then(() => commit('toggleLoading',null,{root:true}))

            })
         },


         guardarLogoBlack({ commit, state }, { logo }) {

            return new Promise((resolve, reject) => {
               commit('toggleLoading', null, { root: true })

               const dataForm = new FormData()

               dataForm.append('logoblack', logo)
               dataForm.append('_method', 'PUT')

               axios.post(`/api/sistema/${state.sistema.id}/update/logoblack`, dataForm, {
                  headers: {
                     'Content-Type': 'multipart/form-data'
                  }
               }).
                  then(({ data }) => {

                     if (data.result) {
                        commit('setSistema', data.sistema)
                     }

                     resolve(data)

                  }).catch(e => reject(e))
                  .then(() => commit('toggleLoading', null, { root: true }))

            })
         },


         guardarFavicon({ commit, state }, { logo }) {

            return new Promise((resolve, reject) => {
               commit('toggleLoading', null, { root: true })

               const dataForm = new FormData()

               dataForm.append('favicon', logo)
               dataForm.append('_method', 'PUT')

               axios.post(`/api/sistema/${state.sistema.id}/update/favicon`, dataForm, {
                  headers: {
                     'Content-Type': 'multipart/form-data'
                  }
               }).
                  then(({ data }) => {

                     if (data.result) {
                        commit('setSistema', data.sistema)
                     }

                     resolve(data)

                  }).catch(e => reject(e))
                  .then(() => commit('toggleLoading', null, { root: true }))

            })
         }










      }




}