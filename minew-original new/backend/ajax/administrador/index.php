<?php 
 header('Content-Type: application/json'); //tipos MIME
 include_once('../../class/class-admin.php');
 require_once('../../class/class-database.php');
 $database = new Database();

//servicio web para login
 if ($_SERVER['REQUEST_METHOD']=='POST' && isset($_GET['accion']) && $_GET['accion']=='login'){ 
    Administrador::login($_POST['email'],$_POST['password'],$database->getDB());
    exit();
}
//servicio web para log out
 if ($_SERVER['REQUEST_METHOD']=='GET' && isset($_GET['accion']) && $_GET['accion']=='logout'){ 
    Administrador::logout();
    exit();
}
    //Guardar, segun la arquitectura REST para guardar el metodo debe ser POST y la URL es /Administradors
    if ($_SERVER['REQUEST_METHOD'] =='POST'){
        //if (!Administrador::verificarAutenticacion($database->getDB())){
        //    echo '{"mensaje":"acceso no autorizado"}';
         //   exit();
        //}
        $u = new Administrador(
                
                $_POST['firstName'],
                $_POST['lastName'],
                $_POST['email'],
                $_POST['password'],
                $_POST['direccion']
            );
        echo $u->crearAdministrador($database->getDB());
        exit();
    }

    //Listar todos los Administradors de Administrador
    if ($_SERVER['REQUEST_METHOD']=='GET' && !isset($_GET['id'])){ 
        //if (!Administrador::verificarAutenticacion($database->getDB())){
        //    echo '{"mensaje":"acceso no autorizado"}';
         //   exit();
        //}
        Administrador::obtenerAdministradors($database->getDB());
        exit();
    }

    //Listar solo un Administrador mediante el id, en este caso se tomaría el indice
    if ($_SERVER['REQUEST_METHOD']=='GET' && isset($_GET['id'])){
        //if (!Administrador::verificarAutenticacion($database->getDB())){
        //    echo '{"mensaje":"acceso no autorizado"}';
         //   exit();
        //}
        Administrador::obtenerAdministrador($database->getDB(),$_GET['id']);
        exit();
    }

    //Eliminar un Administrador especifico
    if ($_SERVER['REQUEST_METHOD']=='DELETE' && isset($_GET['id'])){
        if (!Administrador::verificarAutenticacion($database->getDB())){
            echo '{"mensaje":"acceso no autorizado"}';
           exit();
        }
        Administrador::eliminarAdministrador($database->getDB(),$_GET['id']);
        exit();
    }

    //Actualizar, segun la arquitectura REST para guardar el metodo debe ser POST y la URL es /Administradors
    if ($_SERVER['REQUEST_METHOD'] =='PUT' && isset($_GET['id'])){
        //if (!Administrador::verificarAutenticacion($database->getDB())){
        //    echo '{"mensaje":"acceso no autorizado"}';
         //   exit();
        //}
        $_PUT=array();
        if ($_SERVER['REQUEST_METHOD'] == 'PUT')
            parse_str(file_get_contents("php://input"), $_PUT); //Convierte de URLEncoded a Arreglo Asociativo
    
        $u = new Administrador(
            
            $_PUT['firstName'],
            $_PUT['lastName'],
            $_PUT['email'],
            $_PUT['password'],
            $_PUT['direccion']
        );
        echo $u->actualizarAdministrador($database->getDB(),$_GET['id']);
        exit();
    }

?>