import Vue from 'vue'

// axios
import axios from 'axios'
import {Notification} from 'element-ui';

import useAuth from '@core/utils/useAuth.js';

import ToastificationContent from '@core/components/toastification/ToastificationContent';


const axiosIns = axios.create({
  baseURL: window.location.origin,
  withCredentials:true,
  timeout: 0,
  headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: "application/json, text/plain, */*, text/html"}
})


if(localStorage.getItem('token')){

  let token = localStorage.getItem('token');
  axiosIns.defaults.headers.common = { 'Authorization': `bearer ${token}` }
}

import store from '@/store';
import router from '@/router';

axiosIns.interceptors.response.use(undefined, (error) => {

  const response = error.response;
  
  console.log(response);
  
  if (response.status === 503) {
    router.push({ name: 'show.mantenimiento' })
  }

  if (response.status === 401) {
    
    if (response.data.message == "Unauthenticated."){
      
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      localStorage.removeItem('habilidades');

      if (window.location.pathname != '/login'){
        useAuth().logout();
        router.push({ name: 'login' })
      }
     
    } else if (response.data.message == 'Unauthorized'){

      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      localStorage.removeItem('habilidades');
     
      if(window.location.pathname != '/login') {
        useAuth().logout();
        router.push({ name: 'login' })
      }

    }


    if(response.data.message){

      toast({
        component: ToastificationContent,
        props:{
          title:response.data.message,
          icon:'AlertCircleIcon'
        }
      },{
        position:'bottom-left'
      })

    }
  

    // store.commit('toggleLoading',false)

  }

  if(response.status === 404) {
    // location.reload()
    router.push({ name: 'error-404' })
  }

  if (response.status === 419) {
    
    
    useAuth().logout();
    // router.push({name:'login'})
    // location.reload()
  }
  
 

  

  return Promise.reject(error);

});

Vue.prototype.$http = axiosIns
window.axios = axiosIns;

export default axiosIns
