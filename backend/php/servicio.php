<?php

header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

/*
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');  //  Todo se devolverá en formato JSON.
*/

require_once 'modelo.php';
$modelo = new Modelo();

//  Con esta línea recogemos los datos (en formato JSON), enviados por el cliente:
$datos = file_get_contents('php://input');  //  $datos es un string, y no un objeto php
//  Lo convertimos a un objeto php:
$objeto=json_decode($datos);

//	$objeto = new stdClass();
//	$objeto->accion = "ObtenerVetId";
//	$objeto->id = 9;

if($objeto != null) {
    switch($objeto->accion) {
			
			
			//  LISTAR Y OBTENER:
			
			case "ListInvestigadores": 
				print json_encode($modelo->ListInvestigadores());
				break;
			
			case "DetailsInvestigador_id":
				$investigadorDatos = $modelo->GetInvestigadorById($objeto->id);
				$investigadorDatos->sucesos = $modelo->GetSucesosInvestigador_id($objeto->id);
				
				$investigadorDatos->especialidades = $modelo->GetEspecialidadInvestigador_id($objeto->id);
				
				print json_encode($investigadorDatos);

				break;

			case "ListInvestigadores_Especialidades":
				print json_encode($modelo->ListInvestigadores_Especialidades());
				break;

			case "ListSucesos":
				print json_encode($modelo->ListSucesos());
				break;

			case "GetTiposSucesos":
				print json_encode($modelo->GetTiposSucesos());
				break;
				
			case "FilterSucesos":
				print json_encode($modelo->FilterSucesos($objeto->nombre, $objeto->tipo, $objeto->lugar));
				break;
			
			case "GetEspecialidades":
				print json_encode($modelo->GetEspecialidades());
				break;

			case "GetPlaces":
				print json_encode($modelo->GetPlaces());
				break;
    }
} 
?>
