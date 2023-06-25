@component('mail::message')

# Hola **{{ trim($Nombre) }}**  
> Has recibido autorización para ingresar al Sistema de Villamizar & Jarava Abogados Asociados S.A.S  

>Tus credenciales son:

>Usuario:**{{ $Email }}**  

@component('mail::button', ['url' => $Url, 'color' => 'success'])
	Por favor establezca su contraseña a continuación
@endcomponent  

# ¡Te damos la bienvenida al equipo Villamizar & Jarava! #
@endcomponent
