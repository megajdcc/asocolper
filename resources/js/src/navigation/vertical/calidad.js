export default [


   {
      title: 'Usuarios',
      route: 'listar.usuarios',
      action: 'read',
      resource: 'usuarios',
      fontAwesome: true,

      icon: 'fa-users',
   },


   {
      title: 'Blog',
      icon: 'fa-newspaper',
      fontAwesome:true,
      children:[
         {
            title: 'Contenido de Blog',
            route: 'listar.blog',
            resource: 'blogs',
            action: 'read',
            icon: 'ListIcon',
         },
         {
            title: 'Categorías',
            route: 'listar.categorias',
            resource: 'categorias',
            action: 'read',
            icon: 'ListIcon'
         },

      ]
   },

   {
      title:'Socios y Cliente',
      icon:'UsersIcon',
      children:[
         {
            title:'Socios',
            icon:'UsersIcon',
            route:'listar.socios',
            action:'read',
            resource:'socios',
         },

         {
            title: 'Clientes',
            icon: 'GridIcon',
            route: 'listar.clientes',
            action: 'read',
            resource: 'clientes',
         }
      ]
   },

   {
      title: 'Servicios',
      icon: 'RssIcon',
      
      children: [
         {
            title:'Servicios',
            icon:'ListIcon',
            route:'listar.servicios',
            resource:'servicios',
            action:'read'
         },

         {
            title: 'Categoría de servicios',
            icon: 'ListIcon',
            route: 'listar.categorias.servicios',
            resource: 'Categoría de servicios',
            action: 'read'
         },
      ]
   },

   {
      title: 'Ajustes',
      icon: 'SettingsIcon',
      children: [

         {
            title:'Info del Sistema',
            resource:'sistema',
            action:'read',
            icon:'MonitorIcon',
            route:'sistema'
         },

         {
            title: 'Sucursales',
            resource: 'sucursales',
            action: 'read',
            icon: 'MapPinIcon',
            route: 'listar.sucursales'
         },

         {
            title: 'Políticas de Privacidad',
            resource: 'políticas',
            action: 'read',
            icon: 'fa-user-shield',
            fontAwesome:true,
            route: 'admin.politicas'
         },


      
         {
            title: 'Roles',
            // exact:false,
            route: 'listar.roles',
            action: 'read',
            resource: 'roles'
         },
         {
            title: 'Permisos',
            route: 'listar.permisos',
            action: 'read',
            resource: 'permisos'
         }

      ]
   },

   {
      header: 'Mi Cuenta',
      icon: 'MinusIcon'
   },
   {
      title: 'Perfil',
      route: 'perfil',
      icon: 'UserIcon',
      action: 'read',
      resource: 'perfil',
   }

]

