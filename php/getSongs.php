<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=utf-8");

$servername = "localhost:3306";
$username = "user1";
$password = "p@ssw0rd";
$database = "music_player_db";

$conn = new mysqli($servername, $username, $password, $database);
$sql = "SELECT name, id, platform FROM song_table";
$results = mysqli_query($conn, $sql);
$data = array();

while($row = mysqli_fetch_assoc($results)) {
    $data[] = $row;
}

$json = json_encode( $data );
echo $json;

?>
