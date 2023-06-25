<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Orden - nro {{ $orden->numero }}</title>
{{-- 	<link rel="stylesheet" type="text/css" href="{{ asset('css/estilos.css') }}">
 --}}	{{-- <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}"> --}}


	<style>
      html{
         margin:0px !important; 
      }
      table td{
         margin:0px;
      }


         body{
            background-color:#ffffff;
            margin: 0cm 0cm 0cm !important;
            font-family: "Montserrat", Helvetica, Arial, serif;
         }
			.logo-template{
				width: auto;
				height: 70px;
			}
			.container-header{
				width: 100%;
				margin-bottom: 25px;
				
			}	
			.table-1{
				width: 100%;
			}
			.table-2{
				width: 50%;
				float: right;
			}
			.title-documento{
				/* border: 2px solid black; */
				text-align: center;
				font-size: 24pt;
				font-weight: bold;
				height: 70px;
				margin-bottom: 10px;
				border-radius: 10px;
				/* border-style: outset; */
				background-color: #a03bb3 !important;
				color: white;
			}
			.container-cliente{
					/* width: 100%; */
					/* float: left; */
					/* margin-top: 25pt; */
			}

			.table-cliente{
				border-collapse: collapse;
            border:0px !important;
				/* border: 1px solid black; */

			}
			.table-cliente td,.table-cliente tr{
				/* padding: 3px; */
            border:none !important;
			}
			

			.title-head{
				background-color: #a03bb3 !important;
				color: white;
				/* border: 1px solid black; */
				text-align: center;

			}
			.container-data{
					margin-top: 1rem;
			}
			.table-data{
				border-collapse: collapse;
			}

			.table-totales{
				/* float: right; */
				border-collapse: collapse;
				margin-top: 1rem;
				margin-left: auto;
				margin-right: 0px;
			}

			.pie-pagina{
				text-align: center;
				margin-bottom: 0px;
				position: absolute;
				bottom: 1rem;
				left: auto;
            right: auto;
				margin: auto auto auto auto;
            width:100% !important;

			}

       

         .my-0{
            margin-top: 0px;
            margin-bottom: 0px;
         }
         .my-1{
            margin-top: .5rem;
            margin-bottom: .5rem;
         }
         .mx-1{
            margin-left: 2rem;
            margin-right: 2rem;
         }

         .mb-2{
            margin-bottom: 2rem;
         }
         .mb-1{
            margin-bottom: .5rem;
         }

         p,h4{
             margin-top: .1rem;
            margin-bottom: .1rem;
         }

         .text-center{
            text-align: center !important;
         }
         .bt-1{
            border-top: 1px solid black;
            /* width: 80% !important; */
            display: block;
         }

	</style>
</head>
<body>
	
	<div class="container">


		<div class="container-cliente">
         {{-- <h3 class="text-center my-1">CUPÓN DE HOSPEDAJE  <br> Boda de {{ $reserva->boda->novios->novia }} y {{ $reserva->boda->novios->novio }}</h3> --}}
         
         <table class="table-cliente" width="100%" border="0">
            <tr>
               <td width="25%" class="text-center">
                  <img src="{{ $logo }}" alt="Logotipo" style="width:100%">
               </td>
               <td width="50%">
                  <h3 class="text-center my-1">RDSC TRANSPORT <br> REQUEST DELIVERY FORM </h3>
               </td>
               <td width="25%">

               </td>
            </tr>
         </table>
         
			<table class="table-cliente " width="100%" border="0">
				<thead>
					<tr>
						<th class="title-head"><h4 class="my-0 ">CUSTOMER INFORMATION</h4></th>
					</tr>
					
				</thead>
		
			</table>

         <table width="100%" >
            <tr>
               <td class="text-center"><strong>Customer:</strong> </td>
               <td class="text-center">{{ $compania }}</h4></td>
               <td class="text-center"><strong>Name:</strong></td>
               <td class="text-center">{{ $cliente->getNombreCompleto() }}</h4></td>
            </tr>
         </table>

         <table class="table-cliente " width="100%" border="0">
				<thead>
					<tr>
						<th class="title-head"><h4 class="my-0 ">CONTAINER INFORMATION</h4></th>
					</tr>
				</thead>
		
			</table>

          <table width="100%" >
            <thead>
               <th>Containter</th>
               <th>Seal #</th>
               <th>Arrival Date</th>
               <th>Vessel</th>
               <th>Booking or BL</th>
            </thead>
            <tr>
               <td class="text-center">{{ $contenedor }}</td>
               <td class="text-center">{{ $seal }}</td>
               <td class="text-center">{{ $llegada }}</td>
               <td class="text-center">{{ $vessel }}</td>
               <td class="text-center">{{ $booking }}</td>
            </tr>
         </table>

           <table class="table-cliente"  width="100%" border="0">
				<thead>
					<tr>
						<th class="title-head">DELIVERY TO</th>
					</tr>
				</thead>
		
			</table>

          <table width="100%"  class="mb-1">
            <thead>
               <th>Customer Name</th>
               <th>Town</th>
               <th>Appoinment Date</th>
               <th>Time</th>
               <th>Confirmation number or name</th>
            </thead>
            <tr>
               <td class="text-center">{{ $cliente_destino }}</td>
               <td class="text-center">{{ $destino }}</td>
               <td class="text-center">{{ $fecha_cita }}</td>
               <td class="text-center">{{ date('h:i A',strtotime(date('Y-m-d '.$hora_cita))) }}</td>
               <td class="text-center">{{ $confirmacion }}</td>
            </tr>
         </table>
         @if($informacion_adicional)
            <table width="100%"  >
               <thead>
                  <th>PO</th>
                  <th>Invoice #</th>
                  <th>Delivery</th>
                  <th>Sales Order</th>
                  <th>Shipment</th>
               </thead>
            
                  <tr  >
                     <td class="text-center">{{ $informacion_adicional['po'] }}</td>
                     <td class="text-center">{{ $informacion_adicional['invoice'] }}</td>
                     <td class="text-center">{{ $orden->numero }}</td>
                     <td class="text-center">{{ $informacion_adicional['sales_order'] }}</td>
                     <td class="text-center">{{ $informacion_adicional['shipment'] }}</td>
                  </tr>
            
            </table>
         @endif

         <table class="table-cliente" width="100%" border="0">
				<thead>
					<tr>
						<th class="title-head"><h4 class="my-0 ">COMMENTS</h4></th>
					</tr>
				</thead>
			</table>

         <table width="100%" >
            <tr>
               <td ><span class="mx-1 ">{{ $comentarios }}</span></td>
            </tr>
         </table>
		</div>

      <div class="pie-pagina">
            <table class="table-cliente" width="100%" border="0" style="margin-bottom:3rem">
				<thead>
					<tr>
						<th class=""><h4 class="my-0 ">DELIVERY CONFIRMATION</h4></th>
					</tr>
				</thead>
			</table>

         <table width="80%" style="margin-bottom:3rem; margin-left:auto !important; margin-right:auto !important;">

            @if ($orden->firmada)
               <tr>
                  <td class="text-center" style="widht:40% !important">
                     <img src="{{ $orden->chofer->firma_digital }}" alt="Firma Chofer" style="width:100% !important;">
                  </td>
                  
                  <td style="widht:20% !important">
                  </td>

                  <td class="text-center" style="widht:40% !important">
                     <img src="{{ $orden->cliente->firma_digital }}" alt="Firma Cliente" style="width:100% !important;">
                  </td>

               </tr>
            @endif
           
            
            <tr>
               <td class="text-center" style="widht:40% !important">
                  <strong class="bt-1 text-center">Driver</strong>
               </td>
               <td style="widht:20% !important">
               </td>
                <td class="text-center" style="widht:40% !important">
                  <strong class="bt-1 text-center">Cliente</strong>
               </td>
            </tr>
            <tr>
               <td class="text-center" style="line-height:10px;widht:40% !important" width="40%">
                  <small class="text-center"><strong>{{ $orden->chofer->getNombreCompleto() }}</strong></small>
               </td>
               <td style="widht:20% !important" width="20%"></td>
               <td class="text-center" style="line-height:10px;widht:40% !important" width="40%">
                  <small class="text-center"><strong>{{ $orden->cliente->getNombreCompleto() }}</strong></small>
               </td>
            </tr>

         </table>

         <strong class="text-center">RDSC TRANSPORT  &copy; {{ date('Y-m-d') }} <br> </strong>
         All rights reserved.
      </div>
		
	</div>
</body>
</html>
