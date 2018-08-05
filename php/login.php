<?php
header("Access-Control-Allow-Origin: *");
header("charset=utf-8");

$servername = "localhost:3306";
$username = "user1";
$password = "p@ssw0rd";
$database = "music_player_db";

$conn = new mysqli($servername, $username, $password, $database);

$sql = "SELECT id,username, password from users WHERE username='".$_POST['username']."' && password='".$_POST['password']."';";
$results = mysqli_query($conn, $sql);
$data = array();

while($row = mysqli_fetch_assoc($results)) {
    $data[] = $row;
}

if(count($data)>0){
	echo "correct";
}
else {
	echo "wrong";
}
?>