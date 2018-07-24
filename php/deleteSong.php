<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=utf-8");

$servername = "localhost:3306";
$username = "user1";
$password = "p@ssw0rd";
$database = "music_player_db";

$conn = new mysqli($servername, $username, $password, $database);


if(isset($_GET['link'])){
	$link = $conn->real_escape_string($_GET['link']);

	// sql to delete a record
	$query = "DELETE FROM song_table WHERE id='$link'";
	$result = $conn->query($query) or die($conn->error.__LINE__);

  	$result = $conn->affected_rows;
}

$conn->close();
?>