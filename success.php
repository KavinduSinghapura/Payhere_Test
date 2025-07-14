<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

<?PHP

$id = $_GET["id"];

$connection = new mysqli("localhost","root","Kavindu@1972","ex","3306");

$q = "SELECT * FROM `invoice` WHERE `id` = '".$id."'";
$rs = $connection->query($q);

$num = $rs->num_rows;

$data = $rs->fetch_assoc();

?>
<div id="page">

<h1 style="color: green;">Success</h1>
<h5><?PHP echo $data["id"];?></h5>
<h5><?PHP echo $data["fname"];?></h5>
<h5><?PHP echo $data["address"];?></h5>
<h5><?PHP echo $data["email"];?></h5>
<h5><?PHP echo $data["mobile"];?></h5>
</div>
<button onclick="printInvoice();">Download</button>


<script src="script.js"></script>
</body>
</html>