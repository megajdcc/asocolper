<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">


	<title>Factura - nro {{ $factura->id }}</title>
	
{{-- 	<link rel="stylesheet" type="text/css" href="{{ asset('css/estilos.css') }}">
 --}}	{{-- <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}"> --}}


	<style>

		  	html{
         	margin:2rem !important; 
			}
			body{
            background-color:#ffffff;
            margin: 0cm 0cm 0cm !important;
            font-family: "Montserrat", Helvetica, Arial, serif;
         }

			table td{
				margin:0px;
			}

			.logo-template{
				width: auto;
				height: 70px;
			}
			.container-header{
				width: 100%;
				margin-bottom: 25px;
				
			}	

			th{
				text-align: left !important;
			}

			h2{
				margin: 0px;
			},

			p{
				line-height: 16px;
				margin: 0 !important; 
			}

			.table-1{
				width: 70%;
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
				/* background-color: #35656F !important; */
				/* color: white; */
			}
			.container-cliente{
					/* width: 100%; */
					/* float: left; */
					/* margin-top: 25pt; */
			}

			.table-cliente{
				border-collapse: collapse;
				/* border: 1px solid black; */

			}
			.table-cliente td{
				padding: 3px;
				text-align: center;
			}
			

			.title-head{
				background-color: #a03bb3 !important;
				color: white;
				border: 1px solid black;
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
				left: auto;right: auto;
				margin: auto auto 0px auto;
				width:100% !important;
			}


	</style>
</head>
<body>

	@php
		
		$clasificaciones = ['Muelle','Local','Us','Otros'];

	@endphp
	
	<div class="container">
		<div class="container-header">

				<div class="header-left">
					 <table class="table-cliente" width="100%" border="0">
							<tr>
								<td width="25%" class="text-center">
									<img src="{{ $logo }}" alt="Logotipo" style="width:100%">
								</td>
								<td width="50%">
									<h3 class="text-center my-1">RDSC TRANSPORT LLC <br> FACTURA </h3>
								</td>
								<td width="25%">

								</td>
							</tr>
						</table>

					<table class="table-1" border="0" style="width:100% !important">
						<tbody>
							<tr>
								<td colspan="2">
								</td>
							</tr>
							<tr>

								<td style="vertical-align:text-top !important; line-height:18px;width:60% !important">
									<h3 class="invoice_name_cliente font-weight-bold" style="color:#a03bb3">Facturado a:<br> {{ $compania->nombre }}</h3>
									{{ $factura->direccion_facturacion }}
								</td>

								<td style="text-align:right !important;width:60% !important">
									<table border="0" style="margin-left:auto !important; margin-right:0px !important">
										<tr>
											<td>Factura Nro:</td>
											<td>{{ $factura->id }}</td>
										</tr>
											<tr>
											<td>Conduce:</td>
											<td> {{ $orden->numero }}</td>
										</tr>

										<tr>
											<td>Clasificación:</td>
											<td> {{ $clasificaciones[$factura->clasificacion - 1] }}</td>
										</tr>


										<tr>
											<td>Fecha de emisión:</td>
											<td>{{ date('d-m-Y h:i A', strtotime($factura->created_at)) }} </td>
										</tr>

										<tr>
											<td>Fecha de facturación:</td>
											<td>{{ date('d-m-Y', strtotime($factura->fecha)) }} </td>
										</tr>

										{{-- <tr>
											<td>Monto total:</td>
											<td> {{ number_format((float) $factura->total,2,',','.').' $' }}</td>
										</tr> --}}


									</table>
								</td>

							</tr>

						</tbody>
					</table>
				</div>
				
	
			
		</div>

		<div class="container-cliente">
			<table class="table-cliente" width="100%" border="0" class="">
				<thead>
					<tr>
						<th class="" style="align-text:left">No.</th>
						<th class="" style="align-text:left">Descripcion</th>
						<th class="" style="align-text:left">Referencia</th>
						<th class="" style="align-text:left">Vagón</th>
						<th class="" style="align-text:left">Millas</th>
						<th class="" style="align-text:left">Cantidad</th>
						<th class="" style="align-text:left">Precio Unit</th>
						<th class="" style="align-text:left">Total</th>
					</tr>
					
				</thead>
				<tbody>

					@for($i = 0 ; $i < count($vendido); $i++)
							<tr style="border-bottom:1px solid rgba(0,0,0,0.4)">
								<td>{{ $i + 1  }}</td>
								<td>{{ $vendido[$i]['descripcion'] }}</td>
								<td>{{ $vendido[$i]['referencia'] }}</td>
								
								<td>{{ $vendido[$i]['vagon'] }}</td>
								<td>{{ $vendido[$i]['millas'] }}</td>


								<td>{{ $vendido[$i]['cantidad'] }}</td>
								<td>{{ number_format((float) $vendido[$i]['precio_unitario'],2,',','.').' $' }}</td>
								<td>{{ number_format((float) $vendido[$i]['total'] ,2,',','.').' $' }}</td>
							</tr>
					@endfor


					
				</tbody>
			</table>
		</div>


			<div class="container-data">
				

				<table class="table-totales" width="100%" >
					<tbody>
						<tr>
							<td><h2 style="color:rgba(0,0,0,0.4)">SUBTOTAL</h2></td>
							<td colspan="4" style="text-align: right"><h2 style="color:rgba(0,0,0,0.4)">{{ number_format((float) $factura->subtotal,2,',','.').' $' }}</h2></td>
						</tr>

						<tr>
							<td><h2 style="color:rgba(0,0,0,0.4)">IVA</h2></td>
							<td colspan="4" style="text-align: right"><h2 style="color:rgba(0,0,0,0.4)">{{ number_format((float) $factura->iva,2,',','.').' $' }}</h2></td>
						</tr>


						<tr>
							<td><h2 style="color:rgba(0,0,0,1)">TOTAL</h2></td>
							<td colspan="4" style="text-align: right"><h2 style="color:rgba(0,0,0,0.4)">{{ number_format((float) $factura->total,2,',','.').' $' }}</h2></td>
						</tr>
					</tbody>
				</table>
			</div>


			<div class="pie-pagina">
				<small>
								PMB # 529 HC-01 Box 29030 <br>
								Caguas PR, 00725-8900 <br>
								Tel. 787-789-9264 / 787-720-0407 <br>
								Fax. 787-790-7742
				</small>

					<table width="100%" border="0" >
					<tbody>
						<tr>
							<td style="width:auto;text-align: center"></td>
						</tr>

						
					</tbody>
				</table>

             {{--    <strong>Copyright &copy; {{ date('Y') }} <a href="{{ route('home') }}" title="{{ env('APP_NAME') }}">{{ env('APP_NAME') }}</a>.</strong>
                All rights reserved. --}}
			</div>
		
	</div>
</body>
</html>