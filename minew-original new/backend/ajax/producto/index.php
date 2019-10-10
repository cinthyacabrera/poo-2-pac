<?php 
 header('Content-Type: application/json'); //tipos MIME
 include_once('../../class/class-producto.php');
 require_once('../../class/class-database.php');
 $database = new Database();

    //Guardar, segun la arquitectura REST para guardar el metodo debe ser POST y la URL es /Productos
    if ($_SERVER['REQUEST_METHOD'] =='POST'){
        //if (!Producto::verificarAutenticacion($database->getDB())){
        //    echo '{"mensaje":"acceso no autorizado"}';
         //   exit();
        //}
        $u = new Producto(
                
                $_POST['nombre'],
                $_POST['precio'],
                $_POST['descripcion'],
                $_POST['foto']
            );
        echo $u->crearProducto($database->getDB());
        exit();
    }

    //Listar todos los Productos
    if ($_SERVER['REQUEST_METHOD']=='GET' && !isset($_GET['id'])){ 
        //if (!Producto::verificarAutenticacion($database->getDB())){
        //    echo '{"mensaje":"acceso no autorizado"}';
         //   exit();
        //}
        Producto::obtenerProductos($database->getDB());
        exit();
    }
    

    //Listar solo un Producto mediante el id, en este caso se tomaría el indice
    if ($_SERVER['REQUEST_METHOD']=='GET' && isset($_GET['id'])){
        //if (!Producto::verificarAutenticacion($database->getDB())){
        //    echo '{"mensaje":"acceso no autorizado"}';
         //   exit();
        //}
        Producto::obtenerProducto($database->getDB(),$_GET['id']);
        exit();
    }

    
    //Eliminar un Producto especifico
    if ($_SERVER['REQUEST_METHOD']=='DELETE' && isset($_GET['id'])){
        if (!Producto::verificarAutenticacion($database->getDB())){
            echo '{"mensaje":"acceso no autorizado"}';
           exit();
        }
        Producto::eliminarProducto($database->getDB(),$_GET['id']);
        exit();
    }

    //Actualizar, segun la arquitectura REST para guardar el metodo debe ser POST y la URL es /Productos
    if ($_SERVER['REQUEST_METHOD'] =='PUT' && isset($_GET['id'])){
        //if (!Producto::verificarAutenticacion($database->getDB())){
        //    echo '{"mensaje":"acceso no autorizado"}';
         //   exit();
        //}
        $_PUT=array();
        if ($_SERVER['REQUEST_METHOD'] == 'PUT')
            parse_str(file_get_contents("php://input"), $_PUT); //Convierte de URLEncoded a Arreglo Asociativo
    
        $u = new Producto(
            
            $_PUT['nombre'],
            $_PUT['precio'],
            $_PUT['descripcion'],
            $_PUT['foto']
            
        );
        echo $u->actualizarProducto($database->getDB(),$_GET['id']);
        exit();
    }

?>