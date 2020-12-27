
<?php



header("Access-Control-Allow-Origin: *"); // allow request from all origin
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");

header('Content-Type: application/json');  //  Todo se devolverá en formato JSON.



//  Para poder hacer uso de la clase jwt:
require_once 'jwt.php';
$jwt = new jwt();
$claveSecreta = 'Ciao bella ciao';

require_once 'modeloPrivado.php';
$modelo = new BD_Servidor();

//  Vamos a comprobar el JWT:
//  Obtenemos el JWT que nos ha debido de pasar el cliente (en la cabecera):
$token = $jwt->getBearerToken();
if (($token == null) || ($token == "")) {
	//  Devuelve información indicando que la sesión NO está creada:
	print '{"sesion":"NO"}';
	//  Finaliza la ejecución:
  return;
}

$tokenValido = $jwt->validarJWT($token, $claveSecreta);
// var_dump($tokenValido);

if (!$tokenValido->valido) {
	//  Devuelve información indicando que la sesión NO está creada:
	print '{"sesion":"NO"}';
	//  Finaliza la ejecución:
  return;
}


/*
	****************************************************************************

  ¡¡¡¡¡ SI LLEGAMOS AQUI ES PORQUE EL TOKEN ES VALIDO Y NO HA EXPIRADO !!!!

	****************************************************************************

	(El resto ya es similar a lo visto anteriormente)
*/



//  Definimos la variable global $idUsuairo:
$idUsuairo = $tokenValido->datos->id;
$id_rol = $tokenValido->datos->id_rol;

require_once 'modeloPrivado.php';
//  Instanciamos un objeto del tipo BD_Servidor:
$bd = new BD_Servidor();


//  Con esta línea recogemos los datos (en formato JSON), enviados por el cliente:
$datos = file_get_contents('php://input');  //  $datos es un string, y no un objeto php
//  Lo convertimos a un objeto php:
$objeto=json_decode($datos);

// print "<br>Datos: " . $datos;
// return;


//if($objeto != null) {
    switch ($objeto->servicio) {
			
        case "GetInvestigadorById": 
			print json_encode($modelo->GetInvestigadorById($objeto->id));
			break;   

        case "GetSucesos_id":
			print json_encode($modelo->GetSucesos_id($objeto->id));
            break;
            
        case "GetTipoSucesosById":
			print json_encode($modelo->GetTipoSucesosById($objeto->id));
			break;
		
		case "GetPlaceById":
			print json_encode($modelo->GetPlaceById($objeto->id));
			break;
           
        case "GetEspecialidades":
			print json_encode($modelo->GetEspecialidades());
			break;

		case "GetEspecialidadesInvest_id":
			print json_encode($modelo->GetEspecialidadesInvest_id($objeto->id));
			break;

		case "GetEspecialidades_IdInvestigador":
			print json_encode($modelo->GetEspecialidades_IdInvestigador($objeto->id));
			break;

		case "GetEspecialidad_Id":
			print json_encode($modelo->GetEspecialidad_Id($objeto->id));
			break;

		case "Check_tipoSuceso":
			print ($modelo->Check_tipoSuceso($objeto->id));
			break;

		case "Check_tipoEspecialidad":
			print ($modelo->Check_tipoEspecialidad($objeto->id));
			break;

		case "Check_Especialidades":
			print ($modelo->Check_Especialidades($objeto->id));
			break;

		case "Check_Sucesos":
			print ($modelo->Check_Sucesos($objeto->id));
			break;


		//  INSERTAR:
		
		case "InsertInvestigador":
			if($modelo->InsertInvestigador($objeto->investigador))
				print '{"result":"OK"}';
			else
				print '{"result":"FAIL"}';
			break;

        case "InsertSuceso":
            if ($modelo->InsertSuceso($objeto->sucesos))
                print '{"result":"OK"}';
            else
                print '{"result":"FAIL"}';
            break;

        case "InsertTipoSuceso":
            if ($modelo->InsertTipoSuceso($objeto->tipoSuceso))
                print '{"result":"OK"}';
            else
                print '{"result":"FAIL"}';
            break;

        case "InsertEspecialidadInvestigador":
            if ($modelo->InsertEspecialidadInvestigador($objeto->invest_espc))
                print '{"result":"OK"}';
            else
                print '{"result":"FAIL"}';
            break;

        case "InsertEspecialidad":
            if ($modelo->InsertEspecialidad($objeto->especialidad))
            	print '{"result":"OK"}';
            else
                print '{"result":"FAIL"}';
			break;


		case "InsertPlace":
			if ($modelo->InsertPlace($objeto->mapa))
				print '{"result":"OK"}';
			else
				print '{"result":"FAIL"}';
			break;

        //  ELIMINAR:
				
			case "DeleteInvestigador":
				if ($modelo->DeleteInvestigador($objeto->id))
					print '{"result":"OK"}';
				else
					print '{"result":"FAIL"}';
				break;
				
			case "DeleteSuceso": 
				if ($modelo->DeleteSuceso($objeto->id))
					print '{"result":"OK"}';
				else
					print '{"result":"FAIL"}';
				break;

			case "DeleteTipoSuceso":
				if ($modelo->DeleteTipoSuceso($objeto->id))
					print '{"result":"OK"}';
				else
					print '{"result":"FAIL"}';
				break;

			case "DeleteEspecialidadInvestigador":
				if($modelo->DeleteEspecialidadInvestigador($objeto->id))
					print '{"result":"OK"}';
				else
					print '{"result":"FAIL"}';
				break;

			case "DeleteEspecialidad":
				if($modelo->DeleteEspecialidad($objeto->id))
					print '{"result":"OK"}';
				else
					print '{"result":"FAIL"}';
				break;

            case "DeletePlace":
                if($modelo->DeletePlace($objeto->id))
					print '{"result":"OK"}';
				else
					print '{"result":"FAIL"}';
				break;

			//  MODIFICAR (ACTUALIZAR):
				
			case "UpdateInvestigador": 
				if ($modelo->UpdateInvestigador($objeto->investigador))
					print '{"result":"OK"}';
				else
					print '{"result":"FAIL"}';
				break;

			case "UpdateSuceso":
				if ($modelo->UpdateSuceso($objeto->suceso))
					print '{"result":"OK"}';
				else
					print '{"result":"FAIL"}';
				break;

			case "UpdateDonacion":
				if($modelo->UpdateDonacion($objeto->suceso))
					print '{"result":"OK"}';
				else
					print '{"result":"FAIL"}';
				break;

			case "UpdateTipoSuceso":
				if($modelo->UpdateTipoSuceso($objeto->tipoSuceso))
					print '{"result":"OK"}';
				else
					print '{"result":"FAIL"}';
				break;

			case "UpdateEspecialidadInvest":
				if($modelo->UpdateEspecialidadInvest($objeto->investEspecialidad))
					print '{"result":"OK"}';
				else
					print '{"result":"FAIL"}';
				break;
			
			case "UpdateEspecialidad":
                if($modelo->UpdateEspecialidad($objeto->especialidad))
					print '{"result":"OK"}';
				else
					print '{"result":"FAIL"}';
				break;

			case "UpdatePlace":
                if($modelo->UpdatePlace($objeto->map))
					print '{"result":"OK"}';
				else
					print '{"result":"FAIL"}';
				break;
                
        //  Devuelve la info del token. SI ha llegado hasta aquí es porque es válido:
        case "validaJWTconInfo":	
            $infoToken = new stdClass();
            $infoToken->id = $tokenValido->datos->id;
            $infoToken->usuario = $tokenValido->datos->nombre;
            $infoToken->id_rol = $tokenValido->datos->id_rol;
            $infoToken->rol = $tokenValido->datos->rol;
                print json_encode($infoToken);
            break;
                    
        default:
            print '{"servicio": "NO"}';
    }
//}

?>

