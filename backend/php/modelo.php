<?php

    class Modelo {

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

        public function ListInvestigadores() {
            try {
                $sql = "SELECT id, nombre, apellidos, dni, telefono, email, foto, id_rol FROM usuarios WHERE id_rol = 2 OR id_rol = 1 ORDER BY id ASC";
                
                $stm = $this->pdo->prepare($sql);
                $stm->execute();
                return ($stm->fetchAll(PDO::FETCH_ASSOC));
            } 
            catch(Exception $e) {
                die($e->getMessage());
            }
        }

        // Details investigador

        public function GetInvestigadorById ($id){
            try {
                $sql = "SELECT i.id, i.nombre, apellidos, dni, telefono, email, foto FROM usuarios i 
                            LEFT JOIN sucesos s ON (i.id = s.investigador_id) WHERE i.id = ?";
                $stm = $this->pdo->prepare($sql);
                $stm->execute(array($id));
                return ($stm->fetch(PDO::FETCH_OBJ));
            }
            catch(Exception $e) {
                die($e->getMessage());
            }
        }

        public function GetSucesosInvestigador_id ($id){
            try {
                $sql = "SELECT s.id, s.nombre, lugar, fecha, descripcion, t.nombre nombreTipo, investigador_id 
                        FROM sucesos s INNER JOIN tipos_sucesos t ON (s.tipo_sucesos_id = t.id) 
                            WHERE investigador_id = ?";
                $stm = $this->pdo->prepare($sql);
                $stm->execute(array($id));
                $res = $stm->fetchAll(PDO::FETCH_OBJ);
                return ($res);
            } 
            catch(Exception $e) {
                die($e->getMessage());
            }
        }

        public function GetEspecialidadInvestigador_id ($id){
            try {
                $sql = "SELECT e.id, ie.id, nombre, nivel_experiencia FROM invest_espc ie 
                            INNER JOIN especialidades e ON (ie.especialidad_id = e.id) 
                                WHERE ie.investigador_id =?";
                $stm = $this->pdo->prepare($sql);
                $stm->execute(array($id));
                $res = $stm->fetchAll(PDO::FETCH_OBJ);
                return ($res);
            } 
            catch(Exception $e) {
                die($e->getMessage());
            }
        } 
        
        //Details Investigador

        public function GetTiposSucesos(){
            try {
                $sql = "SELECT * FROM tipos_sucesos";
                $stm = $this->pdo->prepare($sql);
                $stm->execute();
                return ($stm->fetchAll(PDO::FETCH_OBJ));
            } 
            catch(Exception $e) {
                die($e->getMessage());
            }
        }

        public function ListSucesos(){
            try {
                $sql = "SELECT s.id, s.nombre, fecha, lugar, descripcion, donacion, t.nombre nombre_tipo, i.id id_investigador, i.nombre nombre_investigador, i.apellidos apellidos_investigador 
                            FROM sucesos s INNER JOIN tipos_sucesos t ON (s.tipo_sucesos_id = t.id) 
                                INNER JOIN usuarios i ON (s.investigador_id = i.id) ORDER BY s.id";
                
                $stm = $this->pdo->prepare($sql);
                $stm->execute();
                return ($stm->fetchAll(PDO::FETCH_ASSOC));
            } 
            catch(Exception $e) {
                die($e->getMessage());
            }
        }

        public function FilterSucesos($nombre, $tipo, $lugar){
            try {
                $sql = "SELECT s.id, s.nombre, fecha, lugar, descripcion, donacion, t.nombre nombre_tipo, i.id id_investigador, i.nombre nombre_investigador, i.apellidos apellidos_investigador 
                            FROM sucesos s INNER JOIN tipos_sucesos t ON (s.tipo_sucesos_id = t.id) 
                                INNER JOIN usuarios i ON (s.investigador_id = i.id) 
                                    WHERE ((i.nombre LIKE :searchInvestigador) OR (i.apellidos LIKE :searchInvestigador)
                                        OR (CONCAT(i.nombre, ' ', i.apellidos) LIKE :searchInvestigador)) 
                                        AND (t.nombre LIKE :searchTipo) AND (lugar LIKE :searchLugar) ORDER BY s.id";
                                        
                
                $stm = $this->pdo->prepare($sql);
                $stm->execute(array(':searchInvestigador' => '%'.$nombre.'%',
                                    ':searchTipo' => '%'.$tipo.'%',
                                    ':searchLugar' => '%'.$lugar.'%'));
                return ($stm->fetchAll(PDO::FETCH_ASSOC));
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

        public function ListInvestigadores_Especialidades(){
            try {
                $sql = "SELECT DISTINCTROW investigador_id, i.foto, i.id, i.nombre, i.apellidos FROM invest_espc ie 
                            INNER JOIN usuarios i ON (ie.investigador_id = i.id)";

                $stm = $this->pdo->prepare($sql);
                $stm->execute();
                $res = $stm->fetchAll(PDO::FETCH_OBJ);
                foreach ($res as $fila) {
                    $fila->especialidades = $this->GetEspecialidades_IdInvestigador($fila->investigador_id);
                }
                return ($res);
            }
            catch(Exception $e){
                die($e->getMessage());
            }
        }

        public function GetPlaces(){
            try {
                $sql = "SELECT * FROM mapa";
                $stm = $this->pdo->prepare($sql);
                $stm->execute();
                return ($stm->fetchAll(PDO::FETCH_OBJ));
            }
            catch(Exception $e){
                die($e->getMessage());
            }
        }
    }
?>

