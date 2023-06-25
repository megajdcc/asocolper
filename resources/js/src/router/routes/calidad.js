export default [

   /*****************************************/
   /* Sistema
   /*************************************** */
   {
      path:'/sistema',
      name:'sistema',
      component:() => import('views/sistema.vue'),
      meta:{
         resource:'sistema',
         action:'read',
         pageTitle:'Información del sistema',
         breadcrumb:[
            {
               text:'Home',
               to:{name:'home'},
               active:false
            },
            {
               text: 'Info del sistema',
               active: true
            }
         ]

      }
   },

   /*****************************************/
   /* Sucursales
   /*************************************** */
   {
      path:'/sucursales',
      name:'sucursales',
      component:() => import('views/sucursales/index.vue'),

      children:[
         {
            path:'',
            component:() => import('views/sucursales/list.vue'),
            name:'listar.sucursales',
            meta:{
               pageTitle:'Sucursales',
               resource:'sucursales',
               action:'read',
               breadcrumb:[
                  {
                     text:'Home',
                     to:{name:'home'},
                     active:false
                  },

                  {
                     text: 'Sucursales',
                     active: true
                  }

               ]
            }
         },

         {
            path: 'create',
            component: () => import('views/sucursales/create.vue'),
            name: 'create.sucursal',
            meta: {
               pageTitle: 'Sucursales',
               resource: 'sucursales',
               action: 'write',
               navActiveLink:'listar.sucursales',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },

                  {
                     text: 'Sucursales',
                     to: { name: 'listar.sucursales' },
                     active: false
                  },
                  {
                     text:'Crear',
                     active:true
                  }

               ]
            }
         },


         {
            path: ':id/edit',
            component: () => import('views/sucursales/edit.vue'),
            props:true,
            name: 'edit.sucursal',
            meta: {
               pageTitle: 'Sucursales',
               resource: 'sucursales',
               action: 'update',
               navActiveLink: 'listar.sucursales',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },

                  {
                     text: 'Sucursales',
                     to: { name: 'listar.sucursales' },
                     active: false
                  },
                  {
                     text: 'Editar',
                     active: true
                  }

               ]
            }
         }
      ]

   },


   /*****************************************/
   /* USUARIO
   /*************************************** */

   {
      path:'/usuarios',
      name:'usuarios',
      component: () => import(
         /*  webpackChunkName: "group-usuario"  */ 
         /* webpackPreload:true  */ 'views/usuarios'),

      children:[
         {
            path:'',
            name:'listar.usuarios',
            component: () => import(/*  webpackChunkName: "group-usuario" */ 'views/usuarios/lists'),
          
            meta:{
               resource: 'usuarios',
               action: 'read',
               pageTitle:'Usuarios',
               breadcrumb:[
                  {
                     text:'listado',
                     active:true
                  }
               ]
            }
         },
         {
            path:'create',
            name:'create.usuario',
            component: () => import( /*  webpackChunkName: "group-usuario" */ 'views/usuarios/create'),
           

            meta: {
               pageTitle: 'Agregar usuario',
               navActiveLink: 'listar.usuarios',
               resource: 'usuarios',
               action: 'write',
               breadcrumb: [

                  {
                     text: 'Usuarios',
                     active: false,
                     to: { name: 'listar.usuarios' }
                  },

                  {
                     text: 'crear',
                     active: true
                  }
               ]
            }
            

         },
         {
            path: ':id/edit',
            props:true,
            name: 'edit.usuario',
            component: () => import( /*  webpackChunkName: "group-usuario" */ 'views/usuarios/edit'),
            

            meta: {
               pageTitle: 'Editar usuario',
               navActiveLink: 'listar.usuarios',
               resource: 'usuarios',
               action: 'update',
               breadcrumb: [

                  {
                     text: 'Usuarios',
                     active: false,
                     to: { name: 'listar.usuarios' }
                  },

                  {
                     text: 'editar',
                     active: true
                  }
               ]
            }


         }
      ]
   },


   /*****************************************/
   /* ROL DE USUARIO
   /*************************************** */

   {
      path: '/roles',
      name: 'roles',
      component: () => import(  'views/roles'),
      exact:false,
      children: [
         {
            path: '',
            name: 'listar.roles',
            component: () => import('views/roles/lists'),
            meta: {
               pageTitle: 'Rol de usuarios',
               breadcrumb: [
                  {
                     text: 'Listado',
                     active: true,
                  },
               ],
               resource: 'roles',
               action: 'read'
            }
         },
         {
            path: 'create',
            name: 'create.role',
            component: () => import('views/roles/create'),
            meta: {
               pageTitle: 'Crear Rol',
               navActiveLink:'listar.roles',
               breadcrumb: [
                  {
                     text: 'Rol de usuarios',
                     active: false,
                     to: { name: 'listar.roles' }
                  },

                  {
                     text: 'Crear',
                     active: true,
                  },
               ],
               resource: 'roles',
               action: 'write'
            }
         },
         {
            path: ':id/edit',
            props:true,
            name: 'edit.role',
            component: () => import('views/roles/edit'),
            meta: {
               pageTitle: 'Editar Rol',
               navActiveLink: 'listar.roles',
               breadcrumb: [
                  {
                     text: 'Rol de usuarios',
                     active: false,
                     to: { name: 'listar.roles' }
                  },

                  {
                     text: 'Editar',
                     active: true,
                  },
               ],
               resource: 'roles',
               action: 'update'
            }
         },

      ]
   },


   /*****************************************/
   /* PERMISOS DE USUARIO
   /*************************************** */

   {
      path: '/permisos',
      name: 'permisos',

      component: () => import('views/permisos'),

      exact: false,
      children: [
         {
            path: '',
            name: 'listar.permisos',
            component: () => import('views/permisos/lists'),
            meta: {
               pageTitle: 'Permisos de usuario',
               breadcrumb: [
                  {
                     text: 'Listado',
                     active: true,
                  },
               ],
               resource: 'permisos',
               action: 'read'
            }
         },
         {
            path: 'create',
            name: 'create.permiso',
            component: () => import('views/permisos/create'),
            meta: {
               pageTitle: 'Crear Permiso',
               navActiveLink: 'listar.permisos',
               breadcrumb: [
                  {
                     text: 'Permisos de usuario',
                     active: false,
                     to: { name: 'listar.permisos' }
                  },

                  {
                     text: 'Crear',
                     active: true,
                  },
               ],
               resource: 'permisos',
               action: 'write'
            }
         },
         {
            path: ':id/edit',
            props: true,
            name: 'edit.permiso',
            component: () => import('views/permisos/edit'),
            meta: {
               pageTitle: 'Editar Permiso',
               navActiveLink: 'listar.permisos',
               breadcrumb: [
                  {
                     text: 'Permisos de usuario',
                     active: false,
                     to: { name: 'listar.permisos' }
                  },

                  {
                     text: 'Editar',
                     active: true,
                  },
               ],
               resource: 'permisos',
               action: 'update'
            }
         },

         

      ]
   },
   

   /*****************************************/
   /* Categorias
   /*************************************** */
   {
      path:'/categorias',
      name:'categorias',
      component:() => import('views/categorias/index.vue'),

      children:[
         {
            path:'',
            name:'listar.categorias',
            component:() => import('views/categorias/list.vue'),
            meta:{
               resource:'categorias',
               action:'read',
               pageTitle:'Listar Categorías',
               breadcrumb:[
                  {
                     text:'Home',
                     to:{name:'home'},
                     active:false
                  },

                  {
                     text: 'Categorías',
                     active: true
                  }
               ]
            }
         },

         {
            path: 'create',
            name: 'create.categoria',
            component: () => import('views/categorias/create.vue'),
            meta: {
               resource: 'categorias',
               action: 'write',
               pageTitle: 'Crear Categoría',
               navActiveLink:'listar.categorias',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },

                  {
                     text: 'Categorías',
                     to: { name: 'listar.categorias' },
                     active: false
                  },

                  {
                     text: 'Crear registrar',
                     active: true
                  },
                  
               ]
            }
         },

         {
            path: ':id/edit',
            name: 'edit.categoria',
            props:true,
            component: () => import('views/categorias/edit.vue'),
            meta: {
               resource: 'categorias',
               action: 'update',
               pageTitle: 'Actualizar Registro',
               navActiveLink: 'listar.categorias',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },

                  {
                     text: 'Categorías',
                     to: { name: 'listar.categorias' },
                     active: false
                  },

                  {
                     text: 'Actualizar registrar',
                     active: true
                  },

               ]
            }
         }
      ]
   },


   /*****************************************/
   /* Socios
   /*************************************** */
   {
      path: '/socios',
      name: 'socios',
      component: () => import('views/socios/index.vue'),

      children: [
         {
            path: '',
            name: 'listar.socios',
            component: () => import('views/socios/list.vue'),
            meta: {
               resource: 'socios',
               action: 'read',
               pageTitle: 'Listar socios',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },

                  {
                     text: 'Socios',
                     active: true
                  }
               ]
            }
         },

         {
            path: 'create',
            name: 'create.socio',
            component: () => import('views/socios/create.vue'),
            meta: {
               resource: 'socios',
               action: 'write',
               pageTitle: 'Afiliar socio',
               navActiveLink: 'listar.socios',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },

                  {
                     text: 'Socios',
                     to: { name: 'listar.socios' },
                     active: false
                  },

                  {
                     text: 'Crear registro',
                     active: true
                  },

               ]
            }
         },

         {
            path: ':id/edit',
            name: 'edit.socio',
            props: true,
            component: () => import('views/socios/edit.vue'),
            meta: {
               resource: 'socios',
               action: 'update',
               pageTitle: 'Actualizar Registro',
               navActiveLink: 'listar.socios',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },

                  {
                     text: 'Socios',
                     to: { name: 'listar.socios' },
                     active: false
                  },

                  {
                     text: 'Actualizar registro',
                     active: true
                  },

               ]
            }
         }
      ]
   },

   /*****************************************/
   /* Clientes
   /*************************************** */
   {
      path: '/clientes',
      name: 'clientes',
      component: () => import('views/clientes/index.vue'),

      children: [
         {
            path: '',
            name: 'listar.clientes',
            component: () => import('views/clientes/list.vue'),
            meta: {
               resource: 'clientes',
               action: 'read',
               pageTitle: 'Listar clientes',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },

                  {
                     text: 'Clientes',
                     active: true
                  }
               ]
            }
         },

         {
            path: 'create',
            name: 'create.cliente',
            component: () => import('views/clientes/create.vue'),
            meta: {
               resource: 'clientes',
               action: 'write',
               pageTitle: 'Afiliar cliente',
               navActiveLink: 'listar.clientes',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },

                  {
                     text: 'Clientes',
                     to: { name: 'listar.clientes' },
                     active: false
                  },

                  {
                     text: 'Crear registro',
                     active: true
                  },

               ]
            }
         },

         {
            path: ':id/edit',
            name: 'edit.cliente',
            props: true,
            component: () => import('views/clientes/edit.vue'),
            meta: {
               resource: 'clientes',
               action: 'update',
               pageTitle: 'Actualizar Registro',
               navActiveLink: 'listar.clientes',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },

                  {
                     text: 'Clientes',
                     to: { name: 'listar.clientes' },
                     active: false
                  },

                  {
                     text: 'Actualizar registro',
                     active: true
                  },

               ]
            }
         }
      ]
   },


   /*****************************************/
   /* Categorias de serivicios
   /*************************************** */
   {
      path: '/categorias-servicios',
      name: 'categorias.servicios',
      component: () => import('views/categorias-servicios/index.vue'),

      children: [
         {
            path: '',
            name: 'listar.categorias.servicios',
            component: () => import('views/categorias-servicios/list.vue'),
            meta: {
               resource: 'Categorías de servicios',
               action: 'read',
               pageTitle: 'Listar Categorías',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },

                  {
                     text: 'Categorías',
                     active: true
                  }
               ]
            }
         },

         {
            path: 'create',
            name: 'create.categoria.servicio',
            component: () => import('views/categorias-servicios/create.vue'),
            meta: {
               resource: 'Categorías de servicios',
               action: 'write',
               pageTitle: 'Crear Categoría',
               navActiveLink: 'listar.categorias.servicios',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },

                  {
                     text: 'Categorías',
                     to: { name: 'listar.categorias.servicios' },
                     active: false
                  },

                  {
                     text: 'Crear registrar',
                     active: true
                  },

               ]
            }
         },

         {
            path: ':id/edit',
            name: 'edit.categoria.servicio',
            props: true,
            component: () => import('views/categorias-servicios/edit.vue'),
            meta: {
               resource: 'Categorías de servicios',
               action: 'update',
               pageTitle: 'Actualizar Registro',
               navActiveLink: 'listar.categorias.servicios',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },

                  {
                     text: 'Categorías',
                     to: { name: 'listar.categorias.servicios' },
                     active: false
                  },

                  {
                     text: 'Actualizar registrar',
                     active: true
                  },

               ]
            }
         }
      ]
   },

   /*****************************************/
   /* Servicios
   /*************************************** */
   {
      path:'/admin/servicios',
      name:'servicios',
      component:() => import('views/servicios/index.vue'),

      children:[
         {
            path:'',
            name:'listar.servicios',
            component:() => import('views/servicios/list.vue'),
            meta:{
               resource:'servicios',
               action:'read',
               pageTitle:'Servicios',
               breadcrumb:[
                  {
                     text:'Home',
                     to:{name:'home'},
                     active:false
                  },
                  {
                     text: 'Servicios',
                     active: true
                  }
               ]
            }
         },

         {
            path: 'create',
            name: 'create.servicio',
            component: () => import('views/servicios/create.vue'),
            meta: {
               resource: 'servicios',
               action: 'write',
               pageTitle: 'Crear',
               navActiveLink:'listar.servicios',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },
                  {
                     text: 'Servicios',
                     to: { name: 'listar.servicios' },
                     active: false
                  },
                  {
                     text: 'Crear',
                     active: true
                  },
               ]
            }
         },

         {
            path: ':id/edit',
            name: 'edit.servicio',
            props:true,
            component: () => import('views/servicios/edit.vue'),
            meta: {
               resource: 'servicios',
               action: 'update',
               pageTitle: 'Actualizar',
               navActiveLink: 'listar.servicios',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },
                  {
                     text: 'Servicios',
                     to: { name: 'listar.servicios' },
                     active: false
                  },
                  {
                     text: 'Editar',
                     active: true
                  },
               ]
            }
         }

      ]

   },

   /*****************************************/
   /* Blogs
   /*************************************** */
   {
      path:'/admin-blog',
      component:() => import('views/blog/index.vue'),
      name: 'admin.blog',
      children:[
         {
            path:'',
            component:() => import('views/blog/lists.vue'),

            name:'listar.blog',
            meta:{
               resource:'blogs',
               action:'read',
               pageTitle:'Blog',
               breadcrumb:[
                  {
                     text:'Home',
                     to:{name:'home'},
                     active:false,
                  },

                  {
                     text: 'Contenidos',
                     active: true,
                  },

               ]
            }

         },

         {
            path:'create',
            name:'create.blog',
            component:() => import('views/blog/create.vue'),

            meta:{
               pageTitle:'Agregar Contenido',
               resource:'blogs',
               action:'write',
               navActiveLink:'listar.blog',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false,
                  },

                  {
                     text: 'Contenidos',
                     to: { name: 'listar.blog' },
                     active: false,
                  },


                  {
                     text: 'Crear Contenido',
                     active: true,
                  },

               ]

            }
         },

         {
            path: ':id/edit',
            name: 'edit.blog',
            props:true,
            component: () => import('views/blog/edit.vue'),

            meta: {
               pageTitle: 'Editar Contenido',
               resource: 'blogs',
               action: 'update',
               navActiveLink: 'listar.blog',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false,
                  },

                  {
                     text: 'Contenidos',
                     to: { name: 'listar.blog' },
                     active: false,
                  },


                  {
                     text: 'Editar Contenido',
                     active: true,
                  },

               ]

            }
         },

         {
            path: ':id/show',
            name: 'show.contenido',
            props: true,
            component: () => import('views/blog/show.vue'),

            meta: {
               pageTitle: 'Detalles del Contenido',
               resource: 'blogs',
               action: 'read',
               navActiveLink: 'listar.blog',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false,
                  },

                  {
                     text: 'Contenidos',
                     to: { name: 'listar.blog' },
                     active: false,
                  },


                  {
                     text: 'Contenido',
                     active: true,
                  },

               ]

            }
         }
      ]
   },


   /*****************************************/
   /* POliticas de Privacidad
   /*************************************** */

   {
      path:'/admin/politicas-privacidad',
      name:'admin.politicas',
      component:() => import('views/politicas.vue'),

      meta:{
         resource:'políticas',
         action:'read',
         pageTitle:'Políticas de Privacidad'
      }

   },

   /*****************************************/
   /* PAGINA DE Mantenimiento
   /*************************************** */
   {
      path:'/mantenimiento',
      name:'show.mantenimiento',
      component:() => import('views/mantenimiento/index.vue'),
      meta:{
         layout:'full',
         resource: 'Auth',
         action: 'read',
       
      }
   },

  



  

   
]
