<?php 
 header('Content-Type: application/json'); //tipos MIME
 include_once('../../class/class-empresa.php');
 require_once('../../class/class-database.php');
 $database = new Database();

//servicio web para login
 if ($_SERVER['REQUEST_METHOD']=='POST' && isset($_GET['accion']) && $_GET['accion']=='login'){ 
    Empresa::login($_POST['email'],$_POST['password'],$database->getDB());
    exit();
}
//servicio web para log out
 if ($_SERVER['REQUEST_METHOD']=='GET' && isset($_GET['accion']) && $_GET['accion']=='logout'){ 
    Empresa::logout();
    exit();
}
    //Guardar, segun la arquitectura REST para guardar el metodo debe ser POST y la URL es /Empresas
    if ($_SERVER['REQUEST_METHOD'] =='POST'){
        //if (!Empresa::verificarAutenticacion($database->getDB())){
        //    echo '{"mensaje":"acceso no autorizado"}';
         //   exit();
        //}
        $u = new Empresa(
                
                $_POST['nombreEmpresa'],
                $_POST['pais'],
                $_POST['email'],
                $_POST['password'],
                $_POST['direccion'],
                $_POST['facebook']
            );
        echo $u->crearEmpresa($database->getDB());
        exit();
    }

    //Listar todos los Empresas
    if ($_SERVER['REQUEST_METHOD']=='GET' && !isset($_GET['id'])){ 
        //if (!Empresa::verificarAutenticacion($database->getDB())){
        //    echo '{"mensaje":"acceso no autorizado"}';
         //   exit();
        //}
        Empresa::obtenerEmpresas($database->getDB());
        exit();
    }
    

    //Listar solo un Empresa mediante el id, en este caso se tomaría el indice
    if ($_SERVER['REQUEST_METHOD']=='GET' && isset($_GET['id'])){
        //if (!Empresa::verificarAutenticacion($database->getDB())){
        //    echo '{"mensaje":"acceso no autorizado"}';
         //   exit();
        //}
        Empresa::obtenerEmpresa($database->getDB(),$_GET['id']);
        exit();
    }

    
    //Eliminar un Empresa especifico
    if ($_SERVER['REQUEST_METHOD']=='DELETE' && isset($_GET['id'])){
        if (!Empresa::verificarAutenticacion($database->getDB())){
            echo '{"mensaje":"acceso no autorizado"}';
           exit();
        }
        Empresa::eliminarEmpresa($database->getDB(),$_GET['id']);
        exit();
    }

    //Actualizar, segun la arquitectura REST para guardar el metodo debe ser POST y la URL es /Empresas
    if ($_SERVER['REQUEST_METHOD'] =='PUT' && isset($_GET['id'])){
        //if (!Empresa::verificarAutenticacion($database->getDB())){
        //    echo '{"mensaje":"acceso no autorizado"}';
         //   exit();
        //}
        $_PUT=array();
        if ($_SERVER['REQUEST_METHOD'] == 'PUT')
            parse_str(file_get_contents("php://input"), $_PUT); //Convierte de URLEncoded a Arreglo Asociativo
    
        $u = new Empresa(
            
            $_PUT['nombreEmpresa'],
            $_PUT['pais'],
            $_PUT['email'],
            $_PUT['password'],
            $_PUT['direccion'],
            $_PUT['facebook']
            
        );
        echo $u->actualizarEmpresa($database->getDB(),$_GET['id']);
        exit();
    }

?>