<?php
 class Empresa{
    
    private $nombreEmpresa;
    private $pais;
    private $email;
    private $password;
    private $direccion;
    private $facebook;

    public function __construct(
        
        $nombreEmpresa,
        $pais,
        $email,
        $password,
        $direccion,
        $facebook
    ){
        $this->nombreEmpresa = $nombreEmpresa;
        $this->pais = $pais;
        $this->email = $email;
        $this->password = $password;
        $this->direccion = $direccion;
        $this->facebook= $facebook;
        
    }

        public function getNombreEmpresa(){
            return $this->nombreEmpresa;
        }

        public function setNombreEmpresa($nombreEmpresa){
            $this->nombreEmpresa = $nombreEmpresa;
        }

        public function getPais(){
            return $this->pais;
        }

        public function setPais($pais){
            $this->pais = $pais;
        }

        public function getEmail(){
            return $this->email;
        }

        public function setEmail($email){
            $this->email = $email;
        }

        public function getPassword(){
            return $this->password;
        }

        public function setPassword($password){
            $this->password = $password;
        }

        public function getDireccion(){
            return $this->direccion;
        }

        public function setDireccion($direccion){
            $this->direccion = $direccion;
        }

        public function getFacebook(){
            return $this->facebook;
        }

        public function setFacebook($facebook){
            $this->facebook= $facebook;
        }

        public function getFoto(){
            return $this->foto;
        }

        public function setFoto($foto){
            $this->foto= $foto;
        }


        public function __toString(){
            return json_encode($this->getData());
        }

        public function crearEmpresa($db){
            $empresas = $this->getData();
            $result = $db->getReference('company')
               ->push($empresas);
               
            if ($result->getKey() != null)
                return '{"mensaje":"Registro almacenado","key":"'.$result->getKey().'"}';
            else 
                return '{"mensaje":"Error al guardar el registro"}';
        }
        //static sirve para llamar a un atributo o metodo de una clase sin instanciarla.
        public static function obtenerEmpresas($db){
            $result = $db->getReference('company')
                ->getSnapshot()
                ->getValue();

            echo json_encode($result);
        }


        public static function obtenerEmpresa($db, $id){
            $result = $db->getReference('company')
                ->getChild($id)
                ->getValue();

            echo json_encode($result);
        }

        public static function eliminarEmpresa($db, $id){
            $db->getReference('company')
                ->getChild($id)
                ->remove();
            echo '{"mensaje":"Se eliminó el elemento '.$id.'"}';
        }

        public function actualizarEmpresa($db, $id){
            $result = $db->getReference('company')
                ->getChild($id)
                ->set($this->getData());
            
            if ($result->getKey() != null)
                return '{"mensaje":"Registro actualizado","key":"'.$result->getKey().'"}';
            else 
                return '{"mensaje":"Error al actualizar el registro"}';
        }

        //Retornar un arreglo asociativo con todos los atributos de la clase
        public function getData(){
            $result['nombreEmpresa'] = $this->nombreEmpresa;
            $result['pais'] = $this->pais;
            $result['email'] = $this->email;
            $result['password'] = password_hash($this->password, PASSWORD_DEFAULT);
            $result['direccion'] = $this->direccion;
            $result['facebook'] = $this->facebook;
            return $result;
        }
    
    public static function login($email, $password, $db){
           // echo '{"mensaje":"informacion: '.$email.','.$password.'"}';
            $result = $db->getReference('company')
                ->orderByChild('email')
                ->equalTo($email)
                ->getSnapshot()
                ->getValue();

            $key =array_key_first($result);
            $valido = password_verify($password, $result[$key]['password']);
            //echo '{"valido":"'.$valido.'"}';
            $respuesta["valido"] = $valido==1?true:false;
            if ($respuesta["valido"]){
                $respuesta["key"] = $key;
                $respuesta["email"] = $result[$key]["email"];
                $respuesta["token"] = bin2hex(openssl_random_pseudo_bytes(16));
                setcookie('key', $respuesta["key"], time() + (86400 * 30), "/");
                setcookie('email', $respuesta["email"], time() + (86400 * 30), "/");
                setcookie('token', $respuesta["token"], time() + (86400 * 30), "/");

                //guardar token de autenticar en firebase
                $db->getReference('company/'.$key.'/token')
                    ->set($respuesta["token"]);
            }
            echo json_encode($respuesta);
    }

    public static function logout(){
        setcookie('key', "", time() - 3600, "/");
        setcookie('email', "", time() - 3600, "/");
        setcookie('token', "", time() - 3600, "/");
        header("Location: ../../../frontend/registrate.html");
        //echo '{"mensaje":"cerrar sesion"}';
    }

    public static function verificarAutenticacion($db){
        if (!isset($_COOKIE['key']))
            return false;
            
        $result =$db->getReference('company')
            ->getChild($_COOKIE['key'])
            ->getValue();

        if ($result["token"]==$_COOKIE["token"])
            return true;
        else
            return false;  
    }
 }
?>      
