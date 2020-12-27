<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');  //  Todo se devolverá en formato JSON.

//  Para poder hacer uso de la clase jwt:
require_once 'jwt.php';

$login = new BD_login();


//  Con esta línea recogemos los datos (en formato JSON), enviados por el cliente:
$datos = file_get_contents('php://input');  //  $datos es un string, y no un objeto php
//  Lo convertimos a un objeto php:
$objeto=json_decode($datos);


if($objeto != null) {
    switch($objeto->servicio) {
			
			case "comprobar_user":			
				print ($login->comprobar_user($objeto->user));
                break;
            
            case "comprobar_email":
				print ($login->comprobar_email($objeto->email));
				break;
				
			case "inicio_sesion":
				print ($login->inicio_sesion($objeto));
				break;
				
				
			case "inicio_sesion_perfil":
				print ($login->inicio_sesion_perfil($objeto));
				break;
				
				
			case "registro":
				if ($objeto->CONTROL == "EstoEsUnControl")
					print ($login->insertar_usuario($objeto));
				else
					print '{"campo_clave":"NO"}';
				break;
				
				
    }
} else
	print '{"data":"Sin datos"}';



class BD_login {

	private $pdo;
	private $claveSecreta = 'Ciao bella ciao';

	public function __CONSTRUCT() {
		try {
			$opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
			$this->pdo = new PDO('mysql:host=localhost;dbname=paranormal', 'root', '', $opciones);
			$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);                
		} catch(Exception $e) {
				die($e->getMessage());
		}
	}


//  TABLA USUARIOS:
	public function comprobar_user($user){
		try {
			$sql = "SELECT id FROM usuarios WHERE user = ?";
			$stm = $this->pdo->prepare($sql);
			$stm->execute(array($user));
			if ($stm->rowCount() == 0)
				return '{"estado":"libre"}';
			else
				return '{"estado":"ocupado"}';
		} catch (Exception $e) {
			die($e->getMessage());
		}
    }
    
    public function comprobar_email($email){
		try {
			$sql = "SELECT id FROM usuarios WHERE email = ?";
			$stm = $this->pdo->prepare($sql);
			$stm->execute(array($email));
			if ($stm->rowCount() == 0)
				return '{"estado":"libre"}';
			else
				return '{"estado":"ocupado"}';
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}
	
	public function inicio_sesion($datos){
		//  Instanciamos un objeto de la clase jwt:
		$jwt = new jwt();
		$dur = 1;
		
		$claveSecreta = 'Ciao bella ciao';
		try {
			$sc = "SELECT * FROM usuarios WHERE user = ?";
			$stm = $this->pdo->prepare($sc);
			$stm->execute(array($datos->email));
			if ($stm->rowCount() == 1) {
				$fila = $stm->fetch(PDO::FETCH_ASSOC);	
				if (($fila["user"] == $datos->user) && ($fila["password"] == $datos->password)  && ($fila["email"] == $datos->email)) {
					//  Todo bien. Creamos el JWT:
					$miToken = $jwt->generarJWT($fila["id"], $fila["nombre"].$fila["apellidos"], $dur, $claveSecreta);
					//  Devolvemos los datos al cliente:
					return '{"id":' . $fila["id"] . ', 
						"nombre":"' . $fila["nombre"] . '", "apellidos":"' . $fila["apellidos"] . '", 
						"JWT":"' . $miToken . '"}';
				}	else
						return '{"estado":"NO"}';
			} else {
				return '{"estado":"NO"}';
			}
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}  //  public function inicio_sesion
	
	
	
	public function inicio_sesion_perfil($datos){
		//  Instanciamos un objeto de la clase jwt:
		$jwt = new jwt();
		$dur = 1;
	
		//  NUEVO
		$res = new stdClass();  //  Creamos un objeto al cual le añadimos atributos que devolveremos.
		
		$claveSecreta = 'Ciao bella ciao';
		try {
			$sc = "SELECT u.*, r.nombre rol FROM usuarios u INNER JOIN rol r ON (u.id_rol = r.id) WHERE user = ?";
			$stm = $this->pdo->prepare($sc);
			$stm->execute(array($datos->user));
			if ($stm->rowCount() == 1) {
				$fila = $stm->fetch(PDO::FETCH_ASSOC);	
				if (($fila["user"] == $datos->user) && ($fila["password"] == $datos->password) && ($fila["email"] == $datos->email)) {
					//  Todo bien. Creamos el JWT:
					$miToken = $jwt->generarJWT_Perfil($fila["id"], $fila["nombre"]. " " .$fila["apellidos"], $fila["id_rol"], $fila["rol"], $dur, $claveSecreta);
					//  Devolvemos los datos al cliente:
					//  Componemos un objeto php para más comodidad:
					
					//  NUEVO:
					$res->id = $fila["id"];
					$res->usuario = $fila["nombre"] . " " . $fila["apellidos"];
					$res->id_rol = $fila["id_rol"];
					$res->rol = $fila["rol"];
					$res->JWT = $miToken;
					
					//  Devolvemos el string de json:
					return (json_encode($res));
					
				}	else
						return '{"estado":"NO"}';
			} else {
				return '{"estado":"NO"}';
			}
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}  //  public function inicio_sesion_perfil
	
	
	
	
	public function insertar_usuario($datos){
		try {
            $sql = "INSERT INTO usuarios (nombre, apellidos, dni, telefono, email, id_rol, user, password) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
			$this->pdo->prepare($sql)->execute(
					array(
							$datos->nombre, 
                            $datos->apellidos,
                            $datos->dni,
                            $datos->telefono, 
							$datos->email,
							3,
                            $datos->user,
							$datos->password
					)
			);
				return '{"estado":"OK"}';
			} catch (Exception $e) {
					die($e->getMessage());
					return '{"estado":"ERROR"}';
			}
	}
	
	
	
}  //  class BD_login


	
?>


