<?php
 
/* Database credentials. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
/*define('DB_SERVER', 'localhost:3306');
define('DB_USERNAME', 'user1');
define('DB_PASSWORD', 'p@ssw0rd');
define('DB_NAME', 'music_player_db');
 
$DBcon; 
//Connect with database
 try
 {
     $DBcon = new PDO("mysql:host={DB_SERVER};dbname={DB_NAME}",DB_USERNAME,DB_PASSWORD);
     $DBcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 }
 catch(PDOException $e)
 {
     echo "ERROR : ".$e->getMessage();
 }
 
 
// verifying user from database using PDO
$stmt = $DBcon->prepare("SELECT username, password from users WHERE username='".$_POST['username']."' && password='".$_POST['password']."'");
$stmt->execute();
$row = $stmt->rowCount();
if ($row > 0){
    echo "correct";
} else{
    echo 'wrong';
}*/


header("Access-Control-Allow-Origin: *");
header("charset=utf-8");

$servername = "localhost:3306";
$username = "user1";
$password = "p@ssw0rd";
$database = "music_player_db";

$conn = new mysqli($servername, $username, $password, $database);
$sql = "DESCRIBE users;";
//$sql = "SELECT id,username,password from users;";
//$sql = "SELECT id,username, password from users WHERE username='".$_POST['username']."' && password='".$_POST['password']."';";
//echo $sql;
$results = mysqli_query($conn, $sql);
//$json = json_encode($results);
/*if ($json->rowCount > 0){
    echo "correct";
} else{
    echo 'wrong';
}*/
echo $results;
?>