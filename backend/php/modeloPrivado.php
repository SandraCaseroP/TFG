<?php

    class BD_Servidor {

        private $pdo;

        public function __CONSTRUCT() {
            try {
                $opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
                $this->pdo = new PDO('mysql:host=localhost;dbname=paranormal', 'root', '', $opciones);
                $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);                
            } catch(Exception $e) {
                    die($e->getMessage());
            }
        }


        // LISTAR/OBTENER

        public function GetInvestigadorById ($id){
            try {
                $sql = "SELECT id, nombre, apellidos, dni, telefono, email, foto, user FROM usuarios i WHERE id = ?";
                $stm = $this->pdo->prepare($sql);
                $stm->execute(array($id));
                return ($stm->fetch(PDO::FETCH_OBJ));
            }
            catch(Exception $e) {
                die($e->getMessage());
            }
        }

        public function GetSucesos_id($id){
            try {
                $sql = "SELECT id, tipo_sucesos_id, investigador_id, nombre, lugar, fecha, donacion, descripcion 
                            FROM sucesos WHERE id = ?";
                $stm = $this->pdo->prepare($sql);
                $stm->execute(array($id));
                $res = $stm ->fetch(PDO::FETCH_OBJ);
                $res->tipo = $this->GetTipoSucesosById($res->tipo_sucesos_id);
                return ($res);
            }
            catch(Excepcion $e) {
                die($e->getMessage());
            }
        }

        public function GetTipoSucesosById($id){
            try {
                $sql = "SELECT * FROM tipos_sucesos WHERE id = ?";
                $stm = $this->pdo->prepare($sql);
                $stm->execute(array($id));
                return ($stm->fetch(PDO::FETCH_OBJ));
            } 
            catch(Exception $e) {
                die($e->getMessage());
            }
        }

        public function GetEspecialidades(){
            try {
                $sql = "SELECT * FROM especialidades";
                $stm = $this->pdo->prepare($sql);
                $stm->execute();
                return ($stm->fetchAll(PDO::FETCH_OBJ));
            }
            catch(Exception $e){
                die($e->getMessage());
            }
        }

        public function GetEspecialidad_Id($id){
            try{
                $sql = "SELECT * FROM especialidades
                            WHERE id = ?";
                $stm = $this->pdo->prepare($sql);
                $stm->execute(array($id));
                return ($stm->fetch(PDO::FETCH_OBJ));
            }
            catch(Exception $e){
                die($e->getMessage());
            }
        }

        public function GetEspecialidadesInvest_id($id){
            try{
                $sql = "SELECT id, investigador_id, especialidad_id, nivel_experiencia 
                            FROM invest_espc WHERE id = ?";
                $stm = $this->pdo->prepare($sql);
                $stm->execute(array($id));
                $res = $stm->fetch(PDO::FETCH_OBJ);
                $res->tipo_especialidad = $this->GetTipoEspecialidadById($res->especialidad_id);
                return ($res);
            }
            catch(Exception $e) {
                die($e->getMessage());
            }
        }

        public function GetEspecialidades_IdInvestigador($id){
            try {
                $sql = "SELECT DISTINCTROW ie.nivel_experiencia, ie.id, ie.especialidad_id, e.nombre nombreEspecialidad FROM invest_espc ie 
                INNER JOIN especialidades e ON (ie.especialidad_id = e.id) 
                    INNER JOIN usuarios i ON (ie.investigador_id = ?)";

                $stm = $this->pdo->prepare($sql);
                $stm->execute(array($id));
                return ($stm->fetchAll(PDO::FETCH_ASSOC));
            }
            catch(Exception $e) {
                die($e->getMessage());
            }
        }
        
        public function GetTipoEspecialidadById($id){ //funcion para ObtenerEspecialidadesInvest_id
            try {
                $sql = "SELECT * FROM especialidades WHERE id = ?";
                $stm = $this->pdo->prepare($sql);
                $stm->execute(array($id));
                return ($stm->fetch(PDO::FETCH_OBJ));
            } 
            catch(Exception $e) {
                die($e->getMessage());
            }
        }

        public function GetPlaceById($id){
            try {
                $sql = "SELECT * FROM mapa WHERE id = ?";
                $stm = $this->pdo->prepare($sql);
                $stm->execute(array($id));
                return ($stm->fetch(PDO::FETCH_OBJ));
            } 
            catch(Exception $e) {
                die($e->getMessage());
            }
        }

        

        public function Check_tipoSuceso($tipo_sucesos_id){
            try {
                $sql = "SELECT tipo_sucesos_id FROM sucesos WHERE tipo_sucesos_id = ?";
                $stm = $this->pdo->prepare($sql);
                $stm->execute(array($tipo_sucesos_id));
                if ($stm->rowCount() == 0)
                    return '{"estado":"libre"}';
                else
                    return '{"estado":"ocupado"}';
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

        public function Check_tipoEspecialidad($especialidad_id){
            try {
                $sql = "SELECT especialidad_id FROM invest_espc WHERE especialidad_id = ?";
                $stm = $this->pdo->prepare($sql);
                $stm->execute(array($especialidad_id));
                if ($stm->rowCount() == 0)
                    return '{"estado":"libre"}';
                else
                    return '{"estado":"ocupado"}';
            } catch (Exception $e) {
                die($e->getMessage());
            }
        }

        public function Check_Especialidades ($investigador_id){
            try{
                $sql = "SELECT investigador_id FROM invest_espc WHERE investigador_id = ?";
                $stm = $this->pdo->prepare($sql);
                $stm->execute(array($investigador_id));
                if ($stm->rowCount() == null)
                    return '{"estado":"libre"}';
                else
                    return '{"estado":"ocupado"}';
                } catch (Exception $e) {
                    die($e->getMessage());
                }
        }

        public function Check_Sucesos ($investigador_id){
            try{
                $sql = "SELECT investigador_id FROM sucesos WHERE investigador_id = ?";
                $stm = $this->pdo->prepare($sql);
                $stm->execute(array($investigador_id));
                if ($stm->rowCount() == null)
                    return '{"estado":"libre"}';
                else
                    return '{"estado":"ocupado"}';
                } catch (Exception $e) {
                    die($e->getMessage());
                }
        }
        

        // INSERTAR

        public function InsertInvestigador($data) {
            try {
                $sql = "INSERT INTO usuarios (nombre, apellidos, dni, telefono, email, foto, id_rol, user, password) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                $this->pdo->prepare($sql)->execute(array(
                                $data->nombre, 
                                $data->apellidos, 
                                $data->dni,
                                $data->telefono,
                                $data->email,
                                $data->foto,
                                2,
                                $data->user,
                                $data->password));
                return true;
            } catch (Exception $e) {
                die($e->getMessage());
                return false;
            }
        }

        public function InsertSuceso($data){
            try {
                $sql = "INSERT INTO sucesos (tipo_sucesos_id, investigador_id, nombre, lugar, fecha, descripcion) 
                            VALUES (?,?,?,?,?,?)";
                $this->pdo->prepare($sql)->execute(array(
                                $data->tipo->id,
                                $data->id_investigador, 
                                $data->nombre,
                                $data->lugar, 
                                $data->fecha,
                                $data->descripcion));
                return true;
            } 
            catch (Exception $e) {
                die($e->getMessage());
                return false;
            }
        }

        public function InsertTipoSuceso($data){
            try {
                $sql = "INSERT INTO tipos_sucesos (nombre, definicion)
                            VALUES (?,?)";
                $this->pdo->prepare($sql)->execute(array(
                                $data->nombre,
                                $data->definicion));
                return true;                
            }
            catch (Exception $e) {
                die($e->getMessage());
                return false;
            }
        }

        public function InsertEspecialidadInvestigador($data){
            try{
                $sql = "INSERT INTO invest_espc (investigador_id, especialidad_id, nivel_experiencia)
                            VALUES (?,?,?)"; 
                $this->pdo->prepare($sql)->execute(array(
                                $data->id_investigador,
                                $data->tipo_especialidad->id,
                                $data->nivel_experiencia));
                return true;
            }
            catch (Exception $e) {
                die($e->getMessage());
                return false;
            }
        }

        public function InsertEspecialidad($data){
            try{
                $sql = "INSERT INTO especialidades (nombre) VALUES (?)";
                $this->pdo->prepare($sql)->execute(array(
                                $data->nombre));
                return true;
            }
            catch(Exception $e){
                die($e->getMessage());
                return false;
            }
        }

        public function InsertPlace($data){
            try {
                $sql = "INSERT INTO mapa (latitud, longitud, titulo) 
                            VALUES (?,?,?)";
                $this->pdo->prepare($sql)->execute(array(
                                $data->latitud,
                                $data->longitud, 
                                $data->titulo));
                return true;
            } 
            catch (Exception $e) {
                die($e->getMessage());
                return false;
            }
        }

        // UPDATE

        public function UpdateInvestigador($data) {
            try {
                $sql = "UPDATE usuarios SET 
                                        nombre = ?, 
                                        apellidos = ?,
                                        dni = ?, 
                                        telefono = ?,
                                        email = ?,
                                        foto = ?,
                                        user = ?,
                                        password = ?
                                WHERE id = ?";	
                $this->pdo->prepare($sql)->execute(array(
                                $data->nombre, 
                                $data->apellidos, 
                                $data->dni,
                                $data->telefono,
                                $data->email,
                                $data->foto,
                                $data->user,
                                $data->password,
                                $data->id));
                return true;
            } 
            catch (Exception $e) {
                die($e->getMessage());
                return false;
            }
        }

        public function UpdateSuceso($data) {
            try {
                $sql = "UPDATE sucesos SET 
                                        nombre = ?, 
                                        lugar = ?,
                                        fecha = ?, 
                                        descripcion = ?
                                WHERE id = ?";	
                $this->pdo->prepare($sql)->execute(array(
                                $data->nombre, 
                                $data->lugar, 
                                $data->fecha,
                                $data->descripcion,
                                $data->id));
                return true;
            } 
            catch (Exception $e) {
                die($e->getMessage());
                return false;
            }
        }

        public function UpdateTipoSuceso($data) {
            try {
                $sql = "UPDATE tipos_sucesos SET
                                            nombre = ?,
                                            definicion = ?
                                WHERE id = ?";
                $this->pdo->prepare($sql)->execute(array(
                                $data->nombre,
                                $data->definicion,
                                $data->id));
                return true;
            }
            catch (Exception $e) {
                die($e->getMessage());
                return false;
            }
        }

        public function UpdateEspecialidadInvest($data) {
            try {
                $sql = "UPDATE invest_espc SET
                                            nivel_experiencia = ?
                                WHERE id = ?";
                $this->pdo->prepare($sql)->execute(array(
                                $data->nivel_experiencia,
                                $data->id));
                return true;
            }
            catch (Exception $e){
                die($e->getMessage());
                return false;
            }
        }

        public function UpdateEspecialidad($data) {
            try {
                $sql = "UPDATE especialidades SET
                                                nombre = ?
                                        WHERE id = ?";
                $this->pdo->prepare($sql)->execute(array(
                                $data->nombre,
                                $data->id));
                return true;
            }
            catch (Exception $e){
                die($e->getMessage());
                return false;
            }
        }

        public function UpdateDonacion($data) {
            try {
                $sql = "UPDATE sucesos SET
                                            donacion = ?
                                WHERE id = ?";
                $this->pdo->prepare($sql)->execute(array(
                                $data->donacion,
                                $data->id));
                return true;
            }
            catch (Exception $e){
                die($e->getMessage());
                return false;
            }
        }

        public function UpdatePlace($data) {
            try {
                $sql = "UPDATE mapa SET
                                        titulo = ?,
                                        latitud = ?,
                                        longitud = ?
                                WHERE id = ?";
                $this->pdo->prepare($sql)->execute(array(
                                $data->titulo,
                                $data->latitud,
                                $data->longitud,
                                $data->id));
                return true;
            }
            catch (Exception $e){
                die($e->getMessage());
                return false;
            }
        }

        // DELETE

        public function DeleteInvestigador($id) {
            try {
                $stm = $this->pdo->prepare("DELETE FROM usuarios WHERE id = ?");                      
                $stm->execute(array($id));
                return true;
            } 
            catch(Exception $e) {
                die($e->getMessage());
                return false;
            }
        }

        public function DeleteSuceso($id){
            try {
                $stm = $this->pdo->prepare("DELETE FROM sucesos WHERE id = ?");
                $stm->execute(array($id));
                return true;
            }
            catch (Exception $e) {
                die($e->getMessage());
                return false;
            }
        }

        public function DeleteTipoSuceso($id){
            try {
                $stm = $this->pdo->prepare("DELETE FROM tipos_sucesos WHERE id = ?");
                $stm->execute(array($id));
                return true;
            }
            catch (Exception $e) {
                die($e->getMessage());
                return false;
            }
        }

        public function DeleteEspecialidadInvestigador($id){
            try {
                $stm = $this->pdo->prepare("DELETE FROM invest_espc WHERE id = ?");
                $stm->execute(array($id));
                return true;
            }
            catch (Exception $e){
                die($e->getMessage());
                return false;
            }
        }

        public function DeleteEspecialidad($id){
            try {
                $stm = $this->pdo->prepare("DELETE FROM especialidades WHERE id = ?");
                $stm->execute(array($id));
                return true;
            }
            catch (Exception $e){
                die($e->getMessage());
                return false;
            }
        }

        public function DeletePlace($id){
            try {
                $stm = $this->pdo->prepare("DELETE FROM mapa WHERE id = ?");
                $stm->execute(array($id));
                return true;
            }
            catch (Exception $e){
                die($e->getMessage());
                return false;
            }
        }
  
    }
?>

