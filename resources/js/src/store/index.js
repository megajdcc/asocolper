import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'



// Import Modulos

import usuario from './modules/usuario';
import rol from './modules/configuracion/rol.js';
import permiso from './modules/configuracion/permiso.js';
// 
import notificacion from './modules/notificaciones.js';

// Tableros 

import UserTablero from './modules/tableros/UserTablero.js';

import dashboard from './modules/dashboard/dashboard.js'

//  Home Dashboard
import home from './modules/home.js'

// Categorias

import categoria from './modules/categoria.js'

// Blog Contenido 

import contenido from './modules/contenido.js';

// Comentario

import comentario from './modules/comentario.js'

// Sistema

import sistema from './modules/sistema.js';

// Sucursal

import sucursal from './modules/sucursal.js'

// servicio

import servicio from './modules/servicio.js'
// CategporiaServicio

import CategoriaServicio  from './modules/CategoriaServicio.js';

// Socio

import socio from './modules/socio.js'

// Cliente
import cliente from './modules/cliente.js'

// Politicas de privaidad

import politica from './modules/politica.js'


Vue.use(Vuex)

export default new Vuex.Store({

  
	state: {
		errors: {},
		loading: false,
    token:null,
    canales:[],
    auth:{
      message:null
    }
	},

	mutations: {



		cerrarApp(state) {
			state.usuario = null
		},

		toggleLoading(state,bol = null) {
			state.loading = (bol != null) ? bol : !state.loading
		},



		setError(state, data) {

      
      if (typeof data === 'string'){
        state.errors.message = data;
      }else{
        state.errors = data;
      }

		},

		clearErrors(state) {

			state.errors = {
				carta: {}
			}

		},
    setAuthMessage(state,data){
      state.auth.message = data;

    },


    setToken(state,token){
      state.token = token
    },

    pushCanal(state,canal){
      state.canales.push(canal)
    }


	},

	actions: {

    async cerrarSesion({ state, commit }) {
      return await axios.get('/api/auth/logout',null,{
        headers: {
          'WWW-Authenticate': 'Bearer', 'Authorization': (state.token) ? state.token : localStorage.getItem('accessToken')
        }
      });

    }


	},

  modules: {
    app,
    appConfig,
    verticalMenu,
    usuario,
    rol,
    notificacion,
    permiso,
    'user-tablero': UserTablero,
    dashboard,
    home,
    categoria,
    contenido,
    comentario,
    sistema,
    sucursal,
    servicio,
    'categoria-servicio': CategoriaServicio,
    socio,
    cliente,
    politica
  },

  strict: process.env.DEV,

})
