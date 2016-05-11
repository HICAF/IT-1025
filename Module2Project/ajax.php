<?php
session_start();
	include('connect-to-db.php');


		
			// if ($_SESSION['name'] == undefined) {
			// 	$_SESSION['name'];	
			// }



$function = $_GET['what_to_do'];


if ($function == 'saveUserId') {	

	if(isset($_GET['savedUserId'])){
	$_SESSION['savedUserId'] = $_GET['savedUserId'];
	} else {
		$_SESSION['savedUserId'] = 0;
	}
	echo $_SESSION['savedUserId']; 	

}

if ($function == 'getUserId') {
	
	echo $_SESSION['savedUserId']; 	

}

if ($function == 'deleteUserId') {

	$_SESSION['savedUserId'] = 0;
	echo $_SESSION['savedUserId']; 		

}


if($function == 'signup'){

		$userUsername = $_GET['userUsername'];
		$userPassword = $_GET['userPassword'];
		$userEmail = $_GET['userEmail'];
		$userMobile = $_GET['userMobile'];

		$query = $conn->prepare("INSERT INTO users (user_name, user_pw, user_email, user_mobile) VALUES (:userUsername, :userPassword, :userEmail, :userMobile)");
		$query->bindParam(':userUsername', $userUsername);
		$query->bindParam(':userPassword', $userPassword);
		$query->bindParam(':userEmail', $userEmail);
		$query->bindParam(':userMobile', $userMobile);
		$query->execute();
		$rowCounted = $query->rowCount();
		$response = $userUsername;
		echo $response;

}


if($function == 'addNewPlane'){

		$regNumber = $_GET['regNumber'];
		$planeType = $_GET['planeType'];

		$query = $conn->prepare("INSERT INTO planes (reg_id, plane_type) VALUES (:regNumber, :planeType)");
		$query->bindParam(':regNumber', $regNumber);
		$query->bindParam(':planeType', $planeType);
		$query->execute();
		$rowCounted = $query->rowCount();
		$response = $regNumber;
		echo $response;

}




if($function == 'addNewTicket'){

		$ticketTo = $_GET['ticketTo'];
		$ticketFrom = $_GET['ticketFrom'];
		$ticketDep = $_GET['ticketDep'];
		$ticketArr = $_GET['ticketArr'];
		$ticketPrice = $_GET['ticketPrice'];
		$ticketPlane = $_GET['ticketPlane'];

		$query = $conn->prepare("INSERT INTO tickets (ticket_from, ticket_to, ticket_dep, ticket_arr, ticket_price, ticket_sold, plane_id) VALUES (:ticketTo, :ticketFrom, :ticketDep, :ticketArr, :ticketPrice, 0, :ticketPlane)");
		$query->bindParam(':ticketTo', $ticketTo);
		$query->bindParam(':ticketFrom', $ticketFrom);
		$query->bindParam(':ticketDep', $ticketDep);
		$query->bindParam(':ticketArr', $ticketArr);
		$query->bindParam(':ticketPrice', $ticketPrice);
		$query->bindParam(':ticketPlane', $ticketPlane);
		$query->execute();
		$rowCounted = $query->rowCount();
		$response = $ticketPlane;
		echo $response;

}




if($function == 'buyTicket'){

		$userIdLogged = $_GET['userIdLogged'];
		$planeTicket = $_GET['planeTicket'];
		

		$query = $conn->prepare("INSERT INTO bought_tickets (`bought_id`, `bticket_id`, `buser_id`) VALUES (NULL, :planeTicket, :userIdLogged)");
		$query->bindParam(':userIdLogged', $userIdLogged);
		$query->bindParam(':planeTicket', $planeTicket);
		$query->execute();
		$rowCounted = $query->rowCount();
		$response = $rowCounted;
		echo $response;
	

}

if($function == 'sendToBuyer'){

		$activeBuyMobile = $_GET['activeBuyMobile'];

		$key = 'ZGZm-MGQy-ZWNi-Njhm-MWU1-Nzg4-ZGUx-ZmUz-Y2Q4-MmFh-NjY0';
		$mobile = $activeBuyMobile;
		$message = urlencode("Thank you for your purchase."); // make the phrase URL friendly
		$sUrl = "http://ecuanota.com/api-send-sms"; // point to this URL
		$sLink = $sUrl."?key=".$key."&mobile=".$mobile."&message=".$message; // create the SMS
		file_get_contents($sLink); // send the SMS
		// echo file_get_contents($sLink); // to see the JSON response from the server

}

if($function == 'sendToSelf'){

	$userIdLogged = $_GET['userIdLogged'];
	$planeTicket = $_GET['planeTicket'];
	$activeBuyMobile = $_GET['activeBuyMobile'];
	
	
		$key = 'ZGZm-MGQy-ZWNi-Njhm-MWU1-Nzg4-ZGUx-ZmUz-Y2Q4-MmFh-NjY0';
		$mobile = '25374729';
		$message = urlencode("User ID: ".$userIdLogged." has bought the ticket ID: ".$planeTicket."."); // make the phrase URL friendly
		$sUrl = "http://ecuanota.com/api-send-sms"; // point to this URL
		$sLink = $sUrl."?key=".$key."&mobile=".$mobile."&message=".$message; // create the SMS
		file_get_contents($sLink); // send the SMS
		// echo file_get_contents($sLink); // to see the JSON response from the server

}


if($function == 'setToSold'){

		$ticketId = $_GET['ticketId'];
		$userActiveId = $_GET['userActiveId'];
		
		

		$query = $conn->prepare("UPDATE `tickets` SET `ticket_sold`=:userActiveId WHERE ticket_id = :ticketId");
		$query->bindParam(':ticketId', $ticketId);
		$query->bindParam(':userActiveId', $userActiveId);
		$query->execute();
		$rowCounted = $query->rowCount();
		$response = $rowCounted;
		echo $response;


}


if($function == 'updateProfile'){

		$newUsername = $_GET['newUsername'];
		$newPassword = $_GET['newPassword'];
		$newEmail = $_GET['newEmail'];
		$newMobile = $_GET['newMobile'];
		$userActiveId = $_GET['userActiveId'];

		$query = $conn->prepare("UPDATE `users` SET `user_name`=:newUsername, user_pw=:newPassword, user_email=:newEmail, user_mobile=:newMobile WHERE user_id = :userActiveId");
		$query->bindParam(':newUsername', $newUsername);
		$query->bindParam(':newPassword', $newPassword);
		$query->bindParam(':newEmail', $newEmail);
		$query->bindParam(':newMobile', $newMobile);
		$query->bindParam(':userActiveId', $userActiveId);
		$query->execute();
		$rowCounted = $query->rowCount();
		$response = $rowCounted;
		echo $response;

}

if($function == 'deleteProfile'){

		$userActiveId = $_GET['userActiveId'];

		$query = $conn->prepare("DELETE FROM `users` WHERE user_id=:userActiveId");
		$query->bindParam(':userActiveId', $userActiveId);
		$query->execute();
		$rowCounted = $query->rowCount();
		$response = $rowCounted;
		echo $response;

}


if($function == 'deleteTicket'){

		$activeTicket = $_GET['activeTicket'];

		$query = $conn->prepare("DELETE FROM `tickets` WHERE ticket_id=:activeTicket");
		$query->bindParam(':activeTicket', $activeTicket);
		$query->execute();
		$rowCounted = $query->rowCount();
		$response = $rowCounted;
		echo $response;

}

if($function == 'deleteBoughtTickets'){

		$userActiveId = $_GET['userActiveId'];

		$query = $conn->prepare("DELETE * FROM `bought_tickets` WHERE buser_id=:userActiveId");
		$query->bindParam(':userActiveId', $userActiveId);
		$query->execute();
		$rowCounted = $query->rowCount();
		$response = $rowCounted;
		echo $response;

}

if($function == 'sellBoughtTicket'){

		$activeTicket = $_GET['activeTicket'];

		$query = $conn->prepare("DELETE FROM `bought_tickets` WHERE bticket_id=:activeTicket");
		$query->bindParam(':activeTicket', $activeTicket);
		$query->execute();
		$rowCounted = $query->rowCount();
		$response = $rowCounted;
		echo $response;

}

if($function == 'returnSoldTicket'){

		$activeTicket = $_GET['activeTicket'];

		$query = $conn->prepare("UPDATE `tickets` SET `ticket_sold`=0 WHERE ticket_id=:activeTicket");
		$query->bindParam(':activeTicket', $activeTicket);
		$query->execute();
		$rowCounted = $query->rowCount();
		$response = $rowCounted;
		echo $response;

}

if($function == 'returnTickets'){

		$userActiveId = $_GET['userActiveId'];

		$query = $conn->prepare("UPDATE `tickets` SET `ticket_sold`=0 WHERE ticket_sold=:userActiveId");
		$query->bindParam(':userActiveId', $userActiveId);
		$query->execute();
		$rowCounted = $query->rowCount();
		$response = $rowCounted;
		echo $response;

}

if($function == 'editTicket'){

		$activeTicket = $_GET['activeTicket'];
		$editNewTicketFrom = $_GET['editNewTicketFrom'];
		$editNewTicketTo = $_GET['editNewTicketTo'];
		$editDepTime = $_GET['editDepTime'];
		$editArrTime = $_GET['editArrTime'];
		$editNewTicketPrice = $_GET['editNewTicketPrice'];
		$editNewTicketPlane = $_GET['editNewTicketPlane'];

		$query = $conn->prepare("UPDATE `tickets` SET `ticket_from`=:editNewTicketFrom, `ticket_to`=:editNewTicketTo,`ticket_dep`=:editDepTime,`ticket_arr`=:editArrTime,`ticket_price`=:editNewTicketPrice,`plane_id`=:editNewTicketPlane WHERE ticket_id=:activeTicket");
		$query->bindParam(':activeTicket', $activeTicket);
		$query->bindParam(':editNewTicketFrom', $editNewTicketFrom);
		$query->bindParam(':editNewTicketTo', $editNewTicketTo);
		$query->bindParam(':editDepTime', $editDepTime);
		$query->bindParam(':editArrTime', $editArrTime);
		$query->bindParam(':editNewTicketPrice', $editNewTicketPrice);
		$query->bindParam(':editNewTicketPlane', $editNewTicketPlane);
		$query->execute();
		$rowCounted = $query->rowCount();
		$response = $rowCounted;
		echo $response;

}


	

if($function == 'makeTable'){

		$tablequery = $conn->prepare('SELECT tickets.ticket_id, plane_types.plane_type, planes.reg_id, tickets.ticket_from, tickets.ticket_to, tickets.ticket_dep, tickets.ticket_arr, tickets.ticket_price, tickets.ticket_sold 
										FROM tickets
										INNER JOIN planes 
										ON tickets.plane_id=planes.plane_id 
										INNER JOIN plane_types 
										ON planes.plane_type=plane_types.type_id
										WHERE tickets.ticket_sold = 0
										ORDER BY `tickets`.`ticket_dep` ASC ');
		$tablequery->execute();
		$tableResult = $tablequery->fetchAll(PDO::FETCH_ASSOC);
		// echo '<pre>';
		// print_r($tableResult);
		// echo '</pre>';

		$response = convertJsonToString($tableResult);

			echo ($response);

}

if($function == 'rememberUser'){

	$remUserId = $_GET['remUserId'];

	$tablequery = $conn->prepare('SELECT * FROM `users`');
	$tablequery->bindParam(':remUserId', $remUserId);
	$tablequery->execute();
	$tableResult = $tablequery->fetchAll(PDO::FETCH_ASSOC);
		// echo '<pre>';
		// print_r($tableResult);
		// echo '</pre>';

	$response = convertJsonToString($tableResult);

		echo ($response);

}

if($function == 'makeUsers'){

		$userquery = $conn->prepare('SELECT * FROM `users`');
		$userquery->execute();
		$userResult = $userquery->fetchAll(PDO::FETCH_ASSOC);
		// echo '<pre>';
		// print_r($userResult);
		// echo '</pre>';

		$response = convertJsonToString($userResult);

			echo ($response);

}



if($function == 'makePlaneTypes'){

		$userquery = $conn->prepare('SELECT * FROM `plane_types`');
		$userquery->execute();
		$userResult = $userquery->fetchAll(PDO::FETCH_ASSOC);
		// echo '<pre>';
		// print_r($userResult);
		// echo '</pre>';

		$response = convertJsonToString($userResult);

			echo ($response);

}




if($function == 'makePlanes'){

// SELECT * FROM `planes` WHERE plane_inUse = 0

		$userquery = $conn->prepare("CALL allThePlanes()");
		$userquery->execute();

		$userResult = $userquery->fetchAll(PDO::FETCH_ASSOC);

		$response = json_encode($userResult);
		// $sResults = json_encode($jResults);



			echo ($response);

}




if($function == 'makeBoughtTable'){




		$ticketquery = $conn->prepare('SELECT users.user_id, users.user_name, tickets.ticket_from, tickets.ticket_to, tickets.ticket_dep, tickets.ticket_arr, tickets.ticket_id
		FROM bought_tickets
		INNER JOIN users                                            
		ON bought_tickets.buser_id=users.user_id    
		INNER JOIN tickets                                            
		ON bought_tickets.bticket_id=tickets.ticket_id');
		$ticketquery->execute();
		$ticketResult = $ticketquery->fetchAll(PDO::FETCH_ASSOC);
		// echo '<pre>';
		// print_r($ticketResult);
		// echo '</pre>';

		$response = convertJsonToString($ticketResult);

			echo ($response);

}

// if ($function == 'getUserID') {

// 	if (isset($_GET['getUserInUse'])) {
// 				$_SESSION['userInUse'] = $_GET['getUserInUse'];
// 				$response = $_SESSION['userInUse'];
// 				echo $response;
        	
// 	}
// 	if (isset($_SESSION['userInUse'])) {
// 				$response = $_SESSION['userInUse'];
// 				echo $response;
// 	}

// }


		function convertJsonToString($jData){ 
		    if(json_encode($jData))
		    {
		      // $sData = json_encode($jData, JSON_PRETTY_PRINT);
		      $sData = json_encode($jData, JSON_UNESCAPED_UNICODE);
		      return $sData;    
		    }
		}


?>


<!-- SELECT name FROM world
  WHERE population >
     (SELECT population FROM world
      WHERE name='Russia') -->