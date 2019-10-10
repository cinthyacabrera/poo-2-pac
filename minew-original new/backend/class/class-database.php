<?php
    require_once(__DIR__.'/../vendor/autoload.php');
    use Kreait\Firebase\Factory;

    class Database{
        private $keyFile = __DIR__.'/../secret/proyecto-poo-4da6f-4b8644569fb4.json';
        private $URI = 'https://proyecto-poo-4da6f.firebaseio.com/';
        private $db;

        public function __construct(){
            $firebase = (new Factory)
                ->withServiceAccount($this->keyFile)
                ->withDatabaseUri($this->URI)
                ->create();

            $this->db = $firebase->getDatabase();
        }
        
        public function getDB(){
            return $this->db;
        }
    }
?>