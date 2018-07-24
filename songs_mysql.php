<?
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=UTF-8");

$servername = "localhost:3306";
$username = "user1";
$password = "p@ssw0rd";
$database = "music_player_db";

$conn = new mysqli($servername, $username, $password, $database);

echo "Hello";

// if ($conn->connect_error) {
//    die("Connection failed: " . $conn->connect_error);
// }
//   echo "Connected successfully";


// $result = $conn->query("SELECT name, id, platform FROM song_table");

// // $outp = [];
// // while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
// //     $outp[] = $rs;
// // };


// // $arr = array();
// // if($result->num_rows > 0) {
// // 	while($row = $result->fetch_assoc()) {
// // 		$arr[] = $row;	
// // 	}
// // }

// // //$outp ='{"records":['.$outp.']}';
// // $conn->close();

// // echo json_encode($arr);

// //echo json_encode(["records" => $outp]);

// $myArray = array();
// while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
//         $myArray[] = array(
//             'name' => $rs["name"],
//         );
//     }
// echo $json_response=json_encode($myArray);

?>
