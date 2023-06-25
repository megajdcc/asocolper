<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\{AuthController};
use App\Http\Controllers\{ApplicationController, UserController,NotificacionController,RolController,PermisoController,HomeController,CategoriaController, CategoriaServicioController, ClienteController, ContenidoController,ComentarioController, PoliticasPrivacidadController, ServicioController, SistemaController, SocioController, SucursalController};

use App\Models\{Pais,Estado,Ciudad};

Route::group(['prefix' => 'auth'], function () {
    
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('recuperar/contrasena',[AuthController::class,'recuperarContrasena']);
    Route::post('reset-password',[AuthController::class,'resetPassword']);
    

    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'user']);
    });

});

Route::group(['middleware' => 'auth:sanctum'], function () {

    // Request de usuarios Form Perfil 

    Route::post('upload/avatar', [UserController::class, 'uploadAvatar'])->name('upload_avatar');
    Route::put('perfil/update/usuario/{usuario}',[UserController::class, 'updatePerfil']);
    Route::post('cambiar/contrasena/usuario/{usuario}',[UserController::class, 'changePassword']);


    /*****************************/
    /* NOTIFICACIONES
    /*****************************/

    Route::get('notificaciones/{usuario}',[NotificacionController::class,'NotificacionesSinLeer']);
    Route::get('notificaciones/markread/{notificacion}/usuario/{usuario}',[NotificacionController::class,'NotificacionLeida']);
    Route::delete('notificaciones/{notificacion}/usuario/{usuario}',[NotificacionController::class,'eliminar']);
    Route::get('notificaciones/marknoread/{notificacion}/usuario/{usuario}',[NotificacionController::class,'NotificacionNoLeida']);

    Route::get('notificaciones/todoleido/usuario/{usuario}',[NotificacionController::class,'todoLeido']);
    Route::post('notificaciones/seleccionados/leidos/usuario/{usuario}',[NotificacionController::class,'seleccionadasLeidas']);
    Route::post('notificaciones/seleccionados/eliminar/usuario/{usuario}', [NotificacionController::class, 'eliminarSeleccionados']);

    /*****************************/
    /* ROLES DE USUARIO
    /*****************************/ 
    Route::resource('roles', RolController::class);
    Route::get('roles/get/permisos', [PermisoController::class, 'getPermisos'])->name('getPermisos');
    Route::get('roles/listar/table', [RolController::class, 'listar']);
    Route::delete('roles/delete/{role}', [RolController::class, 'destroy']);
    Route::get('listar/roles', [RolController::class, 'roles']);
    Route::post('fetch/roles',[RolController::class,'fetchData']);
    Route::get('roles/{role}/get',[RolController::class,'getRol']);
    


    /*****************************/
    /* PERMISOS DE USUARIO
    /*****************************/ 
    Route::resource('permisos', PermisoController::class);
    Route::get('listar/permisos', [PermisoController::class, 'listarPermisos'])->name('listar_permisos');
    Route::post('/revocar/permiso/{permiso}/role/{role}', [RolController::class, 'revocarPermiso']);
    Route::post('/listar/permisos/role/{role}', [RolController::class, 'listarPermisosRole']);
    Route::get('cargar/permisos', [PermisoController::class, 'getPermissions']);
    Route::get('permisos/listar/table',[PermisoController::class, 'listarPermisos']);
    Route::post('fetch/permisos', [PermisoController::class, 'fetchData']);
    Route::get('permisos/{permiso}/get', [PermisoController::class, 'getPermiso']);



    /*****************************/
    /* USUARIOS
    /*****************************/
    Route::get('/usuarios/all', [UserController::class, 'getUsuarios']);
    Route::resource('usuarios', UserController::class)->middleware('format_telefono');
    Route::put('usuarios/{usuario}/add/firma',[UserController::class,'updateFirma']);
    
    Route::get('listar/usuarios', [UserController::class, 'listar'])->name('listar_usuarios');
    Route::get('usuarios/{usuario}/get',[UserController::class,'getUsuario']);

    Route::post('fetch/usuarios',[UserController::class,'getUsers']);
    Route::post('usuario/{usuario}/update/avatar',[UserController::class,'actualizarAvatarUsuario']);


    /**************************/
    /* Categorias
    /**************************/

    Route::post('fetch/categorias', [CategoriaController::class, 'fetchData']);
    Route::resource('categorias', CategoriaController::class);
    Route::get('categorias/{categoria}/get', [CategoriaController::class, 'fetch']);

     /**************************/
    /* Sucursales
    /**************************/

    Route::post('fetch/sucursales', [SucursalController::class, 'fetchData']);
    Route::resource('sucursals', SucursalController::class);
    Route::get('sucursales/{sucursal}/get', [SucursalController::class, 'fetch']);

    /**************************/
    /* Contenido de Blog
    /**************************/

    Route::post('fetch/contenidos', [ContenidoController::class, 'fetchData']);
    Route::resource('contenidos', ContenidoController::class);
    Route::get('contenidos/{contenido}/get', [ContenidoController::class, 'fetch']);

    Route::get('contenidos/{contenido}/favorito/usuario/{usuario}/remover',[ContenidoController::class,'removerFavorito']);
    Route::get('contenidos/{contenido}/favorito/usuario/{usuario}/add', [ContenidoController::class, 'addFavorito']);


    /**************************/
    /* Comentarios
    /**************************/

    Route::post('fetch/comentarios', [ComentarioController::class, 'fetchData']);
    Route::get('comentarios/{comentario}/get', [ComentarioController::class, 'fetch']);



    /**************************/
    /* Home
    /**************************/
    Route::get('home/get/data',[HomeController::class,'getData']);


    /**************************/
    /* Sistema
    /**************************/
    
    Route::put('sistema/{sistema}/update/redes',[SistemaController::class,'updateRedes']);
    Route::put('sistema/{sistema}/update/metas', [SistemaController::class, 'updateMetas']);
    Route::put('sistema/{sistema}/update/logo', [SistemaController::class, 'updateLogo']);
    Route::put('sistema/{sistema}/update/logoblack', [SistemaController::class, 'updateLogoBlack']);
    Route::put('sistema/{sistema}/update/favicon', [SistemaController::class, 'updateFavicon']);


    Route::resource('sistemas',SistemaController::class);


    /**************************/
    /* Servicios
    /**************************/
    Route::post('servicios/fetch-data', [ServicioController::class, 'fetchData']);
    Route::resource('servicios',ServicioController::class);
    Route::get('servicios/{servicio}/fetch',[ServicioController::class,'fetch']);
    Route::get('servicios/get/all',[ServicioController::class,'getAll']);
    Route::put('servicios/{servicio}/add/banner',[ServicioController::class,'addBanner']);


    /**************************/
    /* CategoriasServicios
    /**************************/

    Route::post('categoria-servicios/fetch-data', [CategoriaServicioController::class, 'fetchData']);
    Route::resource('categoria-servicios', CategoriaServicioController::class);
    Route::get('categoria-servicios/{categoria}/get', [CategoriaServicioController::class, 'fetch']);


    /**************************/
    /* Socios
    /**************************/

    Route::post('socios/fetch-data',[SocioController::class, 'fetchData']);
    Route::resource('socios', SocioController::class);
    Route::get('socios/{socio}/get', [SocioController::class, 'fetch']);

    /**************************/
    /* Clientes
    /**************************/

    Route::post('clientes/fetch-data', [ClienteController::class, 'fetchData']);
    Route::resource('clientes', ClienteController::class);
    Route::get('clientes/{cliente}/get', [ClienteController::class, 'fetch']);

    /**************************/
    /* Politicas de privacidad
    /**************************/

    Route::put('politicas/{politica}',[PoliticasPrivacidadController::class,'update']);


});

Route::put('usuario/{usuario}/establecer/contrasena', [UserController::class, 'EstablecerContrasena'])->name('establecercontrasena');
Route::get('categorias/get/all', [CategoriaController::class, 'all']);
Route::post('fetch/contenidos/public', [ContenidoController::class, 'fetchDataPublic']);
Route::get('contenidos/get/utlimos-recientes',[ContenidoController::class,'ultimosRecientes']);
Route::post('fetch/comentarios/public', [ComentarioController::class, 'fetchData']);
Route::get('contenidos/{slug}/get/public', [ContenidoController::class, 'fetchPorSlug']);
Route::resource('comentarios', ComentarioController::class);
Route::get('get/sistema', [SistemaController::class, 'get']);
Route::post('enviar/mensaje/contacto',[ApplicationController::class,'enviarMensajeContacto']);
Route::post('servicios/fetch-data-public', [ServicioController::class, 'fetchData']);
Route::get('categoria-servicios/get/all', [CategoriaServicioController::class, 'getAll']);
Route::get('servicios/url/{url}/fetch',[ServicioController::class,'fetchPorUrl']);
Route::get('get/servicios/randon',[ServicioController::class,'getRandown']);

Route::get('clientes/get/all',[ClienteController::class,'getClientes']);
Route::get('socios/get/all',[SocioController::class,'getSocios']);
Route::get('politicas/get',[PoliticasPrivacidadController::class,'get']);

Route::get('get/paises', function () {
    $paises = Pais::get();
    return response()->json($paises);
});

Route::get('get/estados/{pais}', function (Pais $pais) {
    $estados = $pais->estados;
    return response()->json($estados);
});

Route::get('get/ciudades/{estado}', function (Estado $estado) {
    $ciudades = $estado->ciudades;
    return response()->json($ciudades);
});





