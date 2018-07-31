<?php  
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=utf-8");

$servername = "localhost:3306";
$username = "user1";
$password = "p@ssw0rd";
$database = "music_player_db";

$conn = new mysqli($servername, $username, $password, $database);

if(isset($_GET['name']) && isset($_GET['platform']) && isset($_GET['link'])){
  $name = $conn->real_escape_string($_GET['name']);
  $platform = $conn->real_escape_string($_GET['platform']);
  $link = $conn->real_escape_string($_GET['link']);

  $query="INSERT INTO song_table(name, id, platform) VALUES ('$name', '$link', '$platform')";
  $result = $conn->query($query) or die($conn->error.__LINE__);

  $result = $conn->affected_rows;

  echo $json_response = json_encode($result);
  }

$conn->close();
?>  