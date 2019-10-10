<?php
 class Producto{
    
    private $nombre;
    private $precio;
    private $descripcion;
    private $foto;

    public function __construct(
        
        $nombre,
        $precio,
        $descripcion,
        $foto
    ){
        $this->nombre = $nombre;
        $this->precio = $precio;
        $this->descripcion = $descripcion;
        $this->foto = $foto;
        
    }

        public function getNombre(){
            return $this->nombre;
        }

        public function setNombre($nombre){
            $this->nombre = $nombre;
        }

        public function getPrecio(){
            return $this->precio;
        }

        public function setPrecio($precio){
            $this->precio = $precio;
        }

        public function getDescripcion(){
            return $this->descripcion;
        }

        public function setDescripcion($descripcion){
            $this->descripcion = $descripcion;
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

        public function crearProducto($db){
            $productos = $this->getData();
            $result = $db->getReference('users')
               ->push($productos);
               
            if ($result->getKey() != null)
                return '{"mensaje":"Registro almacenado","key":"'.$result->getKey().'"}';
            else 
                return '{"mensaje":"Error al guardar el registro"}';
        }
        //static sirve para llamar a un atributo o metodo de una clase sin instanciarla.
        public static function obtenerProductos($db){
            $result = $db->getReference('users/producto')
                ->getSnapshot()
                ->getValue();

            echo json_encode($result);
        }


        public static function obtenerProducto($db, $id){
            $result = $db->getReference('users/producto')
                ->getChild($id)
                ->getValue();

            echo json_encode($result);
        }

        public static function eliminarProducto($db, $id){
            $db->getReference('users')
                ->getChild($id)
                ->remove();
            echo '{"mensaje":"Se eliminó el elemento '.$id.'"}';
        }

        public function actualizarProducto($db, $id){
            $result = $db->getReference('users/producto')
                ->getChild($id)
                ->set($this->getData());
            
            if ($result->getKey() != null)
                return '{"mensaje":"Registro actualizado","key":"'.$result->getKey().'"}';
            else 
                return '{"mensaje":"Error al actualizar el registro"}';
        }

        //Retornar un arreglo asociativo con todos los atributos de la clase
        public function getData(){
            $result['nombre'] = $this->nombre;
            $result['precio'] = $this->precio;
            $result['descripcion'] = $this->descripcion;
            $result['foto'] = $this->foto;
            return $result;
        }
    

 }
?> 