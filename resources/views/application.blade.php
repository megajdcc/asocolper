<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <!-- <link rel="icon" href="<%= BASE_URL %>favicon.ico"> -->
  <link rel="manifest" href="/manifest.json">

  {{-- <title>{{  $sistema->nombre }}</title> --}}

@if ($sistema->metas)

{{-- @foreach ($sistema->metas as $meta)
  <meta name="{{ $meta['nombre'] }}" content="{{ $meta['contenido'] }}">
@endforeach --}}

@endif
{{-- 
@if ($sistema->descripcion)

@if ($sistema->descripcion)
       <meta name="description" content="{{ $sistema->descripcion }}">
@endif

@endif --}}

 

  @if ($sistema->lema)
    {{-- <meta name="description" content="{{ $sistema->lema }}"> --}}
  @endif
  


  <!-- Splash Screen/Loader Styles -->
  <link rel="stylesheet" type="text/css" href="{{ mix('css/loader.css') }}" />

  {{-- Animate --}}
  <link rel="stylesheet" type="text/css" href="{{ mix('css/animate.min.css') }}" />


  <!-- Styles -->
  <link rel="stylesheet" href="{{ mix('css/app.css') }}">

  <!-- Favicon -->

  <link rel="shortcut icon" href="{{ "storage/logotipos/{$sistema->favicon}" }}">


  {!! $sistema->head !!}

</head>

<body>
   {!! $sistema->body !!}
  <div id="loading-bg">
    <div class="loading-logo">
      <img src="{{ asset('/storage/logotipo.png') }}" alt="Logo" width="200" height="68" />
    </div>
    <cite>{{ $sistema->lema }}</cite>
    <div class="loading">
      <div class="effect-1 effects"></div>
      <div class="effect-2 effects"></div>
      <div class="effect-3 effects"></div>
    </div>
  </div>
  <div id="app">
  </div>
  
  <script>
    // Check that service workers are supported Jhonatan
    if ('serviceWorker' in navigator) {
      // Use the window load event to keep the page load performant
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }
  </script> 
    <script src="{{ asset('js/wow.min.js') }}"></script>
    <script src="{{ mix('js/manifest.js')}}"></script>
    <script src="{{ mix('js/vendor.js')}}"></script>
    <script src="{{ mix('js/app.js')}}"></script>


</body>

</html>
