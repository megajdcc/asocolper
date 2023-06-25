export default [
   {
      path: '/',
      name: 'inicio',
      component: () => import(/* webpackChunkName: "home" */ 'views/paginas'),
      meta: {
         layout: 'public',
         resource: 'Auth',

      },


   },

   {
      path: '/quienes-somos',
      name: 'quienes.somos',
      component: () => import(/* webpackChunkName: "QuienesSomos" */ 'views/paginas/QuienesSomos.vue'),
      meta: {
         layout: 'public',
         resource: 'Auth',
      
      },

   },



   {
      path: '/nuestros-socios',
      name: 'nuestros.socios',
      component: () => import(/* webpackChunkName: "Nuestros Socios" */ 'views/paginas/NuestrosSocios.vue'),
      meta: {
         layout: 'public',
         resource: 'Auth',
        
      },

   },

   {
      path: '/servicios/:categoria?',
      props:true,
      name: 'servicios',
      component: () => import(/* webpackChunkName: "Servicios" */ 'views/paginas/Servicios.vue'),
      meta: {
         layout: 'public',
         resource: 'Auth',

      },

   },

   {
      path: '/servicio/:url',
      props: true,
      name: 'show.servicio',
      component: () => import(/* webpackChunkName: "ShowServicio" */ 'views/paginas/ShowServicio.vue'),
      meta: {
         layout: 'public',
         resource: 'Auth',
         navActiveLink: 'servicios'
      },

   },

   {
      path: '/blog/:categoria?',
      props:true,
      name: 'blog.public',
      component: () => import(/* webpackChunkName: "blog" */'views/paginas/Blog.vue'),
      
      meta: {
         layout: 'public',
         resource: 'Auth',
         navActiveLink: 'blog.public',
      },

   },

   {
      path: '/blog/post/:slug',
      props: true,
      name: 'blog.public.show',
      component: () => import('views/paginas/BlogShow.vue'),
      meta: {
         layout: 'public',
         resource: 'Auth',
         navActiveLink:'blog.public'
      },

   },
   


   {
      path: '/contacto',
      name: 'contacto',
      component: () => import( /* webpackChunkName: "contact" */ 'views/paginas/Contacto.vue'),
      meta: {
         layout: 'public',
         resource: 'Auth',
       
      },

   },

   {
      path: '/politicas-privacidad',
      name: 'politicas.public',
      component: () => import( /* webpackChunkName: "politicas-privacidad" */ 'views/paginas/PoliticasPrivacidad.vue'),
      meta: {
         layout: 'public',
         resource: 'Auth',

      },

   },


]
