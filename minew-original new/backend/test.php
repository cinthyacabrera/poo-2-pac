<?php

    include_once('class/class-usuario.php');
    $u = new Usuario('user','mario','perez','jperez@gmail.com','asd.456','direc','face','foto');
    /*echo 'Nombre: ' . $u->getFirstName();
    $u->email = 'otro@gmail.com';
    echo 'Correo'.$u->email;*/

    echo $u;

?>