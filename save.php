<?PHP

$fname = $_POST["f"];
$lname = $_POST["l"];
$email = $_POST["e"];
$id = $_POST["i"];
$address = $_POST["a"];
$mobile = $_POST["m"];

$connection = new mysqli("localhost","root","Kavindu@1972","ex","3306");

$q = "INSERT INTO `invoice` (`id`,`fname`,`lname`, `email`, `mobile`, `address`) VALUES ('".$id."','".$fname."','".$lname."','".$email."','".$mobile."','".$address."')";

$connection->query($q);

echo("success");


?>