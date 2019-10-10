<?php 
 header('Content-Type: application/json'); //tipos MIME
 include_once('../../class/class-usuario.php');
 require_once('../../class/class-database.php');
 $database = new Database();

//servicio web para login
 if ($_SERVER['REQUEST_METHOD']=='POST' && isset($_GET['accion']) && $_GET['accion']=='login'){ 
    Usuario::login($_POST['email'],$_POST['password'],$database->getDB());
    exit();
}
//servicio web para log out
 if ($_SERVER['REQUEST_METHOD']=='GET' && isset($_GET['accion']) && $_GET['accion']=='logout'){ 
    Usuario::logout();
    exit();
}
    //Guardar, segun la arquitectura REST para guardar el metodo debe ser POST y la URL es /usuarios
    if ($_SERVER['REQUEST_METHOD'] =='POST'){
        //if (!Usuario::verificarAutenticacion($database->getDB())){
        //    echo '{"mensaje":"acceso no autorizado"}';
         //   exit();
        //}
        $u = new Usuario(
                
                $_POST['firstName'],
                $_POST['lastName'],
                $_POST['email'],
                $_POST['password'],
                $_POST['direccion'],
                $_POST['facebook']
            );
        echo $u->crearUsuario($database->getDB());
        exit();
    }

    //Listar todos los usuarios
    if ($_SERVER['REQUEST_METHOD']=='GET' && !isset($_GET['id'])){ 
        //if (!Usuario::verificarAutenticacion($database->getDB())){
        //    echo '{"mensaje":"acceso no autorizado"}';
         //   exit();
        //}
        Usuario::obtenerUsuarios($database->getDB());
        exit();
    }
    

    //Listar solo un usuario mediante el id, en este caso se tomaría el indice
    if ($_SERVER['REQUEST_METHOD']=='GET' && isset($_GET['id'])){
        //if (!Usuario::verificarAutenticacion($database->getDB())){
        //    echo '{"mensaje":"acceso no autorizado"}';
         //   exit();
        //}
        Usuario::obtenerUsuario($database->getDB(),$_GET['id']);
        exit();
    }

    
    //Eliminar un usuario especifico
    if ($_SERVER['REQUEST_METHOD']=='DELETE' && isset($_GET['id'])){
        if (!Usuario::verificarAutenticacion($database->getDB())){
            echo '{"mensaje":"acceso no autorizado"}';
           exit();
        }
        Usuario::eliminarUsuario($database->getDB(),$_GET['id']);
        exit();
    }

    //Actualizar, segun la arquitectura REST para guardar el metodo debe ser POST y la URL es /usuarios
    if ($_SERVER['REQUEST_METHOD'] =='PUT' && isset($_GET['id'])){
        //if (!Usuario::verificarAutenticacion($database->getDB())){
        //    echo '{"mensaje":"acceso no autorizado"}';
         //   exit();
        //}
        $_PUT=array();
        if ($_SERVER['REQUEST_METHOD'] == 'PUT')
            parse_str(file_get_contents("php://input"), $_PUT); //Convierte de URLEncoded a Arreglo Asociativo
    
        $u = new Usuario(
            
            $_PUT['firstName'],
            $_PUT['lastName'],
            $_PUT['email'],
            $_PUT['password'],
            $_PUT['direccion'],
            $_PUT['facebook']
            
        );
        echo $u->actualizarUsuario($database->getDB(),$_GET['id']);
        exit();
    }

?>