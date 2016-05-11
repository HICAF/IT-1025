var loggedIn = false;
var userIDLoggedIn = 0;

$("#wdw-planes").fadeIn(500);


      $.ajax({
        method: "GET",
        url: "logo.xml",
        dataType : "xml"
      }).done(function(oXml){
        $xml = $(oXml);
        $title = $xml.find("name").attr('id');
        console.log($title);
        $("#logoSpan").text($title);

      });

      




$.ajax('ajax.php', {
		    data: {"what_to_do":"getUserId"},
	    	method: "get"
		}).done(function(response){



			    userIDLoggedIn = response;

			    if (userIDLoggedIn > 0) {
					loggedIn = true;
					$("#btnLogIn").text("Logout");
				} else {
					loggedIn = false;
					$("#btnLogIn").text("Login");

												$.ajax('ajax.php', {
												    data: {"what_to_do":"makeTable"},
											    	method: "get"
												}).done(function(response){


													    rowTable = JSON.parse(response);

													    for (var i = 0; i < rowTable.length; i++) {
													    	var tblRow = "<tr id='"+rowTable[i].ticket_id+"' data-row='"+rowTable[i].ticket_id+"' class='planeRow'><td>"+rowTable[i].plane_type+"</td><td>"+rowTable[i].reg_id+"</td><td>"+rowTable[i].ticket_from+"</td><td>"+rowTable[i].ticket_to+"</td><td>"+rowTable[i].ticket_dep+"</td><td>"+rowTable[i].ticket_arr+"</td><td>"+rowTable[i].ticket_price+"</td><td class='btnRow' id='btnRow"+rowTable[i].ticket_id+"'><button id='"+rowTable[i].ticket_id+"' class='btnPay btn'><i class='fa fa-shopping-cart'></i></button></td></tr>"; 
												     	    $("#planesTable tbody").append(tblRow);

													    };

												  
												}).fail(function(){

													console.log("ERROR makeTable");

												});
				}
		  
		}).fail(function(){

			console.log("ERROR getUserId");

		});

						$.ajax('ajax.php', {
		   						data: {"what_to_do":"rememberUser", "remUserId":userIDLoggedIn},
	    						method: "get"
							}).done(function(response){

		     	    					
									jsonToName = JSON.parse(response);

									for (var i = 0; i < jsonToName.length; i++) {
										if(jsonToName[i].user_id == userIDLoggedIn){
											$("#btnUserProfile").text(jsonToName[i].user_name);
		    								$("#btnUserProfile").fadeIn(1000); 
		    								console.log(jsonToName[i].user_admin+" admin number");
		    								if(jsonToName[i].user_admin == 1){

		    									
		    									$("#btnViewEditTickets").fadeIn(500);
		    									$("#btnViewEditPlanes").fadeIn(500);


		    									$.ajax('ajax.php', {
												    data: {"what_to_do":"makeTable"},
											    	method: "get"
												}).done(function(response){

													console.log("admin");

													$(".planeRow").remove();


													    rowTable = JSON.parse(response);

													    for (var i = 0; i < rowTable.length; i++) {

		    												var tblRow = "<tr id='"+rowTable[i].ticket_id+"' data-row='"+rowTable[i].ticket_id+"' class='planeRow'><td>"+rowTable[i].plane_type+"</td><td>"+rowTable[i].reg_id+"</td><td>"+rowTable[i].ticket_from+"</td><td>"+rowTable[i].ticket_to+"</td><td>"+rowTable[i].ticket_dep+"</td><td>"+rowTable[i].ticket_arr+"</td><td>"+rowTable[i].ticket_price+"</td><td class='btnRow' id='btnRow"+rowTable[i].ticket_id+"'><button id='"+rowTable[i].ticket_id+"' class='btnPay btn'><i class='fa fa-shopping-cart'></i></button><button id='"+rowTable[i].ticket_id+"' class='btnDeleteTicket btn'><i class='fa fa-trash'></i></button><button id='"+rowTable[i].ticket_id+"' class='btnEditTicket btn'><i class='fa fa-pencil'></i></button></td></tr>"; 
		     	    										$("#planesTable tbody").append(tblRow);

													    };

												  
												}).fail(function(){

													console.log("ERROR makeTable");

												});




		    								} else if(jsonToName[i].user_admin == 0){
		    										console.log("not admin");

		    									$.ajax('ajax.php', {
												    data: {"what_to_do":"makeTable"},
											    	method: "get"
												}).done(function(response){

													$(".planeRow").remove();


													    rowTable = JSON.parse(response);

													    for (var i = 0; i < rowTable.length; i++) {
													    	var tblRow = "<tr id='"+rowTable[i].ticket_id+"' data-row='"+rowTable[i].ticket_id+"' class='planeRow'><td>"+rowTable[i].plane_type+"</td><td>"+rowTable[i].reg_id+"</td><td>"+rowTable[i].ticket_from+"</td><td>"+rowTable[i].ticket_to+"</td><td>"+rowTable[i].ticket_dep+"</td><td>"+rowTable[i].ticket_arr+"</td><td>"+rowTable[i].ticket_price+"</td><td class='btnRow' id='btnRow"+rowTable[i].ticket_id+"'><button id='"+rowTable[i].ticket_id+"' class='btnPay btn'><i class='fa fa-shopping-cart'></i></button></td></tr>"; 
												     	    $("#planesTable tbody").append(tblRow);

													    };

												  
												}).fail(function(){

													console.log("ERROR makeTable");

												});

		    								}
										}					
			    					}
																		

		  
					}).fail(function(){

								console.log("ERROR rememberUser");

					});





					$.ajax('ajax.php', {
		    			data: {"what_to_do":"makeBoughtTable"},
	    				method: "get"
					}).done(function(response){

						$('.ticketRow').remove();

			    rowTicketTable = JSON.parse(response);

			    for (var i = 0; i < rowTicketTable.length; i++) {
			    	if (rowTicketTable[i].user_id == userIDLoggedIn) {
			    		var tblTicketRow = "<tr class='ticketRow'><td>"+rowTicketTable[i].user_name+"</td><td>"+rowTicketTable[i].ticket_from+"</td><td>"+rowTicketTable[i].ticket_to+"</td><td>"+rowTicketTable[i].ticket_dep+"</td><td>"+rowTicketTable[i].ticket_arr+"</td><td><button id='"+rowTicketTable[i].ticket_id+"' class='btnSellBought btn'><i class='fa fa-times'></i></button></td></tr>"; 
		     	  	  	$("#ticketTable tbody").append(tblTicketRow);
					}
			    };

		  
					}).fail(function(){

						console.log("ERROR makeTable");

					});


if (loggedIn == true) {

			    	$(".wdw").fadeOut(500);
		   			$("#wdw-planes").fadeIn(500);



		    	

		    		

		    		$("#btnLogIn").text("Logout");

		    				 $.ajax('ajax.php', {
		    						data: {"what_to_do":"saveUserId", "savedUserId":userIDLoggedIn},
	    							method: "get"
								}).done(function(response){

			    				console.log(response);

		  
								}).fail(function(){

									console.log("ERROR saveUserId Login");

								});



					$.ajax('ajax.php', {
		    			data: {"what_to_do":"makeBoughtTable"},
	    				method: "get"
					}).done(function(response){

						$('.ticketRow').remove();

			    rowTicketTable = JSON.parse(response);

			    for (var i = 0; i < rowTicketTable.length; i++) {
			    	if (rowTicketTable[i].user_id == userIDLoggedIn) {
			    		var tblTicketRow = "<tr class='ticketRow'><td>"+rowTicketTable[i].user_name+"</td><td>"+rowTicketTable[i].ticket_from+"</td><td>"+rowTicketTable[i].ticket_to+"</td><td>"+rowTicketTable[i].ticket_dep+"</td><td>"+rowTicketTable[i].ticket_arr+"</td><td><button id='"+rowTicketTable[i].ticket_id+"' class='btnSellBought btn'><i class='fa fa-times'></i></button></td></tr>"; 
		     	  	  	$("#ticketTable tbody").append(tblTicketRow);
					}
			    };

		  
					}).fail(function(){

						console.log("ERROR makeTable");

					});


		    		

}

	



	$(document).on('click','#btnLogIn', function(){


		if (loggedIn == false) {



		
		loggedIn = false;
		$("#btnLogIn").text("Login");
		$("#btnUserProfile").text("");
		$("#lblUsername").val("");
		$("#lblPassword").val("");
		$("#lblSignUsername").val("");
		$("#lblSignName").val("");
		$("#lblSignEmail").val("");
		$("#lblSignMobile").val("");
		$("#lblSignPassword").val("");
		$(".alert").fadeOut(10);
     	$(".wdw").fadeOut(500);
     	$("#wdw-login").fadeIn(500);

     								$.ajax('ajax.php', {
			    						data: {"what_to_do":"saveUserId"},
		    							method: "get"
									}).done(function(response){

				    				console.log(response);

			  
									}).fail(function(){

										console.log("ERROR saveUserId");

									});


		} else if (loggedIn == true) {

			swal({   
				title: "Are you sure?",   
				text: "You are about to logout.",   
				type: "warning",   
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: "Yes, log me out!",   
				closeOnConfirm: false }, function(){   
					swal("Success!", "You are now logged out.", "success"); 

						loggedIn = false;
						$("#btnLogIn").text("Login");
						$("#btnUserProfile").text("");
						$("#lblUsername").val("");
						$("#lblPassword").val("");
						$("#lblSignUsername").val("");
						$("#lblSignName").val("");
						$("#lblSignEmail").val("");
						$("#lblSignMobile").val("");
						$("#lblSignPassword").val("");
						$(".alert").fadeOut(10);
				     	$(".wdw").fadeOut(500);
				     	$("#btnViewEditTickets").fadeOut(500);
		    			$("#btnViewEditPlanes").fadeOut(500);
				     	$("#wdw-login").fadeIn(500);

     								$.ajax('ajax.php', {
			    						data: {"what_to_do":"deleteUserId"},
		    							method: "get"
									}).done(function(response){

				    				console.log(response);

			  
									}).fail(function(){

										console.log("ERROR deleteUserId");

									});

									$.ajax('ajax.php', {
												    data: {"what_to_do":"makeTable"},
											    	method: "get"
												}).done(function(response){

													$(".planeRow").remove();


													    rowTable = JSON.parse(response);



													    for (var i = 0; i < rowTable.length; i++) {
													    	var tblRow = "<tr id='"+rowTable[i].ticket_id+"' data-row='"+rowTable[i].ticket_id+"' class='planeRow'><td>"+rowTable[i].plane_type+"</td><td>"+rowTable[i].reg_id+"</td><td>"+rowTable[i].ticket_from+"</td><td>"+rowTable[i].ticket_to+"</td><td>"+rowTable[i].ticket_dep+"</td><td>"+rowTable[i].ticket_arr+"</td><td>"+rowTable[i].ticket_price+"</td><td class='btnRow' id='btnRow"+rowTable[i].ticket_id+"'><button id='"+rowTable[i].ticket_id+"' class='btnPay btn'><i class='fa fa-shopping-cart'></i></button></td></tr>"; 
												     	    $("#planesTable tbody").append(tblRow);

													    };

												  
												}).fail(function(){

													console.log("ERROR makeTable");

												});

			});


		} else {
			console.log("ERROR loginbtn")
		}

	});

$(document).on('click','#btnSignupTrans', function(){


      $(".wdw").fadeOut(500);
      $("#wdw-signup").fadeIn(500);

});

$(document).on('click','#btnLoginTrans', function(){


      $(".wdw").fadeOut(500);
      $("#wdw-login").fadeIn(500);

});

$(document).on('click','#btnViewEditPlanes', function(){

	$(".wdw").fadeOut(500);
    $("#wdw-editPlane").fadeIn(500);

    $('#lblNewPlaneReg').val("");
	$('#lblNewPlaneType').val("");





    				$.ajax('ajax.php', {
		    			data: {"what_to_do":"makePlaneTypes"},
	    				method: "get"
					}).done(function(response){

						$(".planeTypeSelect").remove();
						


			   			rowSPType = JSON.parse(response);

			    		for (var i = 0; i < rowSPType.length; i++) {


			    				var selectRow = "<option class='planeTypeSelect' value="+rowSPType[i].type_id+">"+rowSPType[i].plane_type+"</option>";
								$("#lblNewPlaneType").append(selectRow);

					    };

		  
					}).fail(function(){

						console.log("ERROR makePlaneTypes");

					});






});


















$(document).on('click','#btnViewEditTickets', function(){

	$(".wdw").fadeOut(500);
    $("#wdw-editTicket").fadeIn(500);

    $('#lblNewTicketFrom').val("");
	$('#lblNewTicketTo').val("");
	$('#lblNewTicketPrice').val("");
	$('#lblNewTicketPlane').val("");






    				$.ajax('ajax.php', {
		    			data: {"what_to_do":"makePlanes"},
	    				method: "get"
					}).done(function(response){

						$(".addPlaneSelect").remove();
						

			   			rowSPlane = JSON.parse(response);

			    		for (var i = 0; i < rowSPlane.length; i++) {


			    				var selectRow = "<option class='addPlaneSelect' value="+rowSPlane[i].plane_id+">"+rowSPlane[i].reg_id+"</option>";
								$("#lblNewTicketPlane").append(selectRow);

					    };

		  
					}).fail(function(){

						console.log("ERROR makePlanes");

					});






});













$(document).on('click','#btnAddTicket', function(){

	var ticketTo = $('#lblNewTicketFrom').val();
	var ticketFrom = $('#lblNewTicketTo').val();
	var ticketDep = $('#lblDepTime').val();
	var ticketArr = $('#lblArrTime').val();
	var ticketPrice = $('#lblNewTicketPrice').val();
	var ticketPlane = $('#lblNewTicketPlane').val();

	if (ticketPlane == "" || ticketPlane == 0 || ticketPlane == null){

		swal("WARNING!", "You need to pick a plane.");

	} else if (ticketTo == "" || ticketFrom == "" || ticketDep == "" || ticketArr == "" || ticketPrice == "") {

		swal("WARNING!", "You need to fill all fields.");

	} else {


    				$.ajax('ajax.php', {
		    			data: {"what_to_do":"addNewTicket","ticketTo":ticketTo ,"ticketFrom":ticketFrom ,"ticketDep":ticketDep ,"ticketArr":ticketArr ,"ticketPrice":ticketPrice ,"ticketPlane":ticketPlane},
	    				method: "get"
					}).done(function(response){

						swal({   title: "Ticket has been added!",   text: ticketFrom+" to "+ticketTo,   timer: 2000,   showConfirmButton: false });

						
						$(".wdw").fadeOut(500);
   						$("#wdw-planes").fadeIn(500);
   						console.log(response);

	   						$.ajax('ajax.php', {
		   						data: {"what_to_do":"rememberUser", "remUserId":userIDLoggedIn},
	    						method: "get"
							}).done(function(response){

		     	    					
									jsonToName = JSON.parse(response);

									for (var i = 0; i < jsonToName.length; i++) {
										if(jsonToName[i].user_id == userIDLoggedIn){
											$("#btnUserProfile").text(jsonToName[i].user_name);
		    								$("#btnUserProfile").fadeIn(1000); 
		    								console.log(jsonToName[i].user_admin+" admin number");
		    								if(jsonToName[i].user_admin == 1){

		    									
		    									$("#btnViewEditTickets").fadeIn(500);
		    									$("#btnViewEditPlanes").fadeIn(500);


		    									$.ajax('ajax.php', {
												    data: {"what_to_do":"makeTable"},
											    	method: "get"
												}).done(function(response){

													console.log("admin");

													$(".planeRow").remove();


													    rowTable = JSON.parse(response);

													    for (var i = 0; i < rowTable.length; i++) {

		    												var tblRow = "<tr id='"+rowTable[i].ticket_id+"' data-row='"+rowTable[i].ticket_id+"' class='planeRow'><td>"+rowTable[i].plane_type+"</td><td>"+rowTable[i].reg_id+"</td><td>"+rowTable[i].ticket_from+"</td><td>"+rowTable[i].ticket_to+"</td><td>"+rowTable[i].ticket_dep+"</td><td>"+rowTable[i].ticket_arr+"</td><td>"+rowTable[i].ticket_price+"</td><td class='btnRow' id='btnRow"+rowTable[i].ticket_id+"'><button id='"+rowTable[i].ticket_id+"' class='btnPay btn'><i class='fa fa-shopping-cart'></i></button><button id='"+rowTable[i].ticket_id+"' class='btnDeleteTicket btn'><i class='fa fa-trash'></i></button><button id='"+rowTable[i].ticket_id+"' class='btnEditTicket btn'><i class='fa fa-pencil'></i></button></td></tr>"; 
		     	    										$("#planesTable tbody").append(tblRow);

													    };

												  
												}).fail(function(){

													console.log("ERROR makeTable");

												});




		    								} else if(jsonToName[i].user_admin == 0){
		    										console.log("not admin");

		    									$.ajax('ajax.php', {
												    data: {"what_to_do":"makeTable"},
											    	method: "get"
												}).done(function(response){

														$(".planeRow").remove();

													    rowTable = JSON.parse(response);

													    for (var i = 0; i < rowTable.length; i++) {
													    	var tblRow = "<tr id='"+rowTable[i].ticket_id+"' data-row='"+rowTable[i].ticket_id+"' class='planeRow'><td>"+rowTable[i].plane_type+"</td><td>"+rowTable[i].reg_id+"</td><td>"+rowTable[i].ticket_from+"</td><td>"+rowTable[i].ticket_to+"</td><td>"+rowTable[i].ticket_dep+"</td><td>"+rowTable[i].ticket_arr+"</td><td>"+rowTable[i].ticket_price+"</td><td class='btnRow' id='btnRow"+rowTable[i].ticket_id+"'><button id='"+rowTable[i].ticket_id+"' class='btnPay btn'><i class='fa fa-shopping-cart'></i></button></td></tr>"; 
												     	    $("#planesTable tbody").append(tblRow);

													    };

												  
												}).fail(function(){

													console.log("ERROR makeTable");

												});

		    								}
										}					
			    					}
																		

		  
					}).fail(function(){

								console.log("ERROR rememberUser");

					});

		  
					}).fail(function(){

						console.log("ERROR makePlaneTypes");

					});



	
	}

});














$(document).on('click','#btnAddPlane', function(){

	var regNumber = $('#lblNewPlaneReg').val();
	var planeType = $('#lblNewPlaneType').val();

	if (planeType == "" || planeType == 0 || planeType == null){

		swal("WARNING!", "You need to pick a plane type.");

	} else if (regNumber == "") {

		swal("WARNING!", "You need to right a register number.");

	} else {


    				$.ajax('ajax.php', {
		    			data: {"what_to_do":"addNewPlane","regNumber":regNumber ,"planeType":planeType},
	    				method: "get"
					}).done(function(response){

						
						$(".wdw").fadeOut(500);
   						$("#wdw-planes").fadeIn(500);

		  
					}).fail(function(){

						console.log("ERROR makePlaneTypes");

					});

	
	}

});





	$(document).on('click','#btnUserProfile', function(){


	      $(".wdw").fadeOut(500);
	      $("#wdw-about").fadeIn(500);

	     						 $.ajax('ajax.php', {
								    data: {"what_to_do":"makeUsers"},
	    							method: "get"
								}).done(function(response){

								jUsers = JSON.parse(response);

							    for (var i = 0; i < jUsers.length; i++) {

							    	if(jUsers[i].user_id == userIDLoggedIn){

							    		userIDLoggedIn = jUsers[i].user_id;
							    		$("#lblMyUsername").val(jUsers[i].user_name);
							    		$("#lblMyPassword").val(jUsers[i].user_pw);
			    						$("#lblMyEmail").val(jUsers[i].user_email);
							    		$("#lblMyMobile").val(jUsers[i].user_mobile);
			    					
			    					}

			    				}

			    				}).fail(function(){

										console.log("ERROR insert creds into input");

								});

			    				

	});


$(document).on('click','#btnSaveProfile', function(){


								newUsername = $("#lblMyUsername").val();
			    				newPassword = $("#lblMyPassword").val();
			    				newEmail = $("#lblMyEmail").val();
			    				newMobile = $("#lblMyMobile").val();
			    				userActiveId = userIDLoggedIn;


								$.ajax('ajax.php', {
								    data: {"what_to_do":"updateProfile", "newUsername":newUsername, "newPassword":newPassword, "newEmail":newEmail, "newMobile":newMobile, "userActiveId":userActiveId},
	    							method: "get"
								}).done(function(response){

									console.log(newUsername);

							    		$("#btnUserProfile").text(newUsername);
			    						
			    						$(".wdw").fadeOut(500);
	      								$("#wdw-planes").fadeIn(500);

			    				}).fail(function(){

										console.log("ERROR update profile");

								});


});


$(document).on('click','.btnEditTicket', function(){

	activeTicket = $(this).attr("id");

	console.log(activeTicket);

	$(".wdw").fadeOut(500);
	$("#wdw-editEditTicket").fadeIn(500);

	$(".editTicketSelect").remove();


	$.ajax('ajax.php', {
	    data: {"what_to_do":"makeTable"},
		method: "get"
		}).done(function(response){


		rowTable = JSON.parse(response);

		for (var i = 0; i < rowTable.length; i++) {

			if(rowTable[i].ticket_id == activeTicket){

				$("#lblEditNewTicketFrom").val(rowTable[i].ticket_from);
				$("#lblEditNewTicketTo").val(rowTable[i].ticket_to);
				$("#lblEditDepTime").val(rowTable[i].ticket_dep);
				$("#lblEditArrTime").val(rowTable[i].ticket_arr);
				$("#lblEditNewTicketPrice").val(rowTable[i].ticket_price);

				var selectEditPlane = "<option class='editTicketSelect' value='"+rowTable[i].ticket_id+"' selected>"+rowTable[i].reg_id+"</option>";
				$("#lblEditNewTicketPlane").append(selectEditPlane);

				console.log(selectEditPlane);

			}


		};												   

												  
		}).fail(function(){
			console.log("ERROR makeTable");

		});


		$.ajax('ajax.php', {
		    			data: {"what_to_do":"makePlanes"},
	    				method: "get"
		}).done(function(response){

						
						

			   			rowSPlane = JSON.parse(response);

			    		for (var i = 0; i < rowSPlane.length; i++) {

			    			if(rowSPlane[i].plane_id != activeTicket){

			    				var selectRow = "<option class='editTicketSelect' value="+rowSPlane[i].plane_id+">"+rowSPlane[i].reg_id+"</option>";
								$("#lblEditNewTicketPlane").append(selectRow);
							}

					    };

		  
		}).fail(function(){

						console.log("ERROR makePlanes");

		});


});




$(document).on('click','#btnEditTicket', function(){

	console.log(activeTicket);

	editNewTicketFrom = $("#lblEditNewTicketFrom").val();
	editNewTicketTo = $("#lblEditNewTicketTo").val();
	editDepTime = $("#lblEditDepTime").val();
	editArrTime = $("#lblEditArrTime").val();
	editNewTicketPrice = $("#lblEditNewTicketPrice").val();
	editNewTicketPlane = $("#lblEditNewTicketPlane").val();


	if(editNewTicketFrom == "" || editNewTicketTo == "" || editDepTime == "" || editArrTime == "" || editNewTicketPrice == "" || editNewTicketPlane == "" || editNewTicketPlane == null){

		swal("warning!", "Some fields are missing!", "warning");

	} else {


		swal({   
			title: "Are you sure?",   
			text: "You are about to update the ticket. "+editNewTicketFrom+" to "+editNewTicketTo+" for "+editNewTicketPrice+"kr.",   
			type: "warning",   
			showCancelButton: true,   
			confirmButtonColor: "#DD6B55",   
			confirmButtonText: "Yes, edit it",   
			closeOnConfirm: false }, function(){   
				swal("Success!", "The ticket has been updated.", "success"); 


						$(".wdw").fadeOut(500);
						$("#wdw-planes").fadeIn(500);


						$.ajax('ajax.php', {
						    data: {"what_to_do":"editTicket", "activeTicket":activeTicket, "editNewTicketFrom":editNewTicketFrom, "editNewTicketTo":editNewTicketTo, "editDepTime":editDepTime, "editArrTime":editArrTime, "editNewTicketPrice":editNewTicketPrice, "editNewTicketPlane":editNewTicketPlane},
							method: "get"
						}).done(function(response){


																  
						}).fail(function(){
							console.log("ERROR editTicket");

						});


							    									$.ajax('ajax.php', {
																	    data: {"what_to_do":"makeTable"},
																    	method: "get"
																	}).done(function(response){

																		console.log("admin");

																		$(".planeRow").remove();


																		    rowTable = JSON.parse(response);

																		    for (var i = 0; i < rowTable.length; i++) {

							    												var tblRow = "<tr id='"+rowTable[i].ticket_id+"' data-row='"+rowTable[i].ticket_id+"' class='planeRow'><td>"+rowTable[i].plane_type+"</td><td>"+rowTable[i].reg_id+"</td><td>"+rowTable[i].ticket_from+"</td><td>"+rowTable[i].ticket_to+"</td><td>"+rowTable[i].ticket_dep+"</td><td>"+rowTable[i].ticket_arr+"</td><td>"+rowTable[i].ticket_price+"</td><td class='btnRow' id='btnRow"+rowTable[i].ticket_id+"'><button id='"+rowTable[i].ticket_id+"' class='btnPay btn'><i class='fa fa-shopping-cart'></i></button><button id='"+rowTable[i].ticket_id+"' class='btnDeleteTicket btn'><i class='fa fa-trash'></i></button><button id='"+rowTable[i].ticket_id+"' class='btnEditTicket btn'><i class='fa fa-pencil'></i></button></td></tr>"; 
							     	    										$("#planesTable tbody").append(tblRow);

																		    };

																	  
																	}).fail(function(){

																		console.log("ERROR makeTable");

																	});


			});


	


	}





});




$(document).on('click','.btnSellBought', function(){

	activeTicket = $(this).attr("id");

	console.log(activeTicket);

	swal({   
		title: "Are you sure?",   
		text: "You are about to sell the ticket back to the airline.",   
		type: "warning",   
		showCancelButton: true,   
		confirmButtonColor: "#DD6B55",   
		confirmButtonText: "Delete",   
		cancelButtonText: "Cancel",   
		closeOnConfirm: false,   
		closeOnCancel: false }, 
		function(isConfirm){   
		if (isConfirm) {     
			swal("Deleted!", "The ticket has been sold back.", "success"); 

			$.ajax('ajax.php', {
				data: {"what_to_do":"sellBoughtTicket", "activeTicket":activeTicket},
				method: "get"
			}).done(function(response){




				$.ajax('ajax.php', {
					data: {"what_to_do":"returnSoldTicket", "activeTicket":activeTicket},
					method: "get"
				}).done(function(response){


					



				}).fail(function(){

					console.log("ERROR returnSoldTicket");

				});




			}).fail(function(){

				console.log("ERROR sellBoughtTicket");

			});

												$.ajax('ajax.php', {
							   						data: {"what_to_do":"rememberUser", "remUserId":userIDLoggedIn},
						    						method: "get"
												}).done(function(response){

							     	    					
														jsonToName = JSON.parse(response);

														for (var i = 0; i < jsonToName.length; i++) {
															if(jsonToName[i].user_id == userIDLoggedIn){
																$("#btnUserProfile").text(jsonToName[i].user_name);
							    								$("#btnUserProfile").fadeIn(1000); 
							    								console.log(jsonToName[i].user_admin+" admin number");
							    								if(jsonToName[i].user_admin == 1){

							    									
							    									$("#btnViewEditTickets").fadeIn(500);
							    									$("#btnViewEditPlanes").fadeIn(500);


							    									$.ajax('ajax.php', {
																	    data: {"what_to_do":"makeTable"},
																    	method: "get"
																	}).done(function(response){

																		console.log("admin");

																		$(".planeRow").remove();


																		    rowTable = JSON.parse(response);

																		    for (var i = 0; i < rowTable.length; i++) {

							    												var tblRow = "<tr id='"+rowTable[i].ticket_id+"' data-row='"+rowTable[i].ticket_id+"' class='planeRow'><td>"+rowTable[i].plane_type+"</td><td>"+rowTable[i].reg_id+"</td><td>"+rowTable[i].ticket_from+"</td><td>"+rowTable[i].ticket_to+"</td><td>"+rowTable[i].ticket_dep+"</td><td>"+rowTable[i].ticket_arr+"</td><td>"+rowTable[i].ticket_price+"</td><td class='btnRow' id='btnRow"+rowTable[i].ticket_id+"'><button id='"+rowTable[i].ticket_id+"' class='btnPay btn'><i class='fa fa-shopping-cart'></i></button><button id='"+rowTable[i].ticket_id+"' class='btnDeleteTicket btn'><i class='fa fa-trash'></i></button><button id='"+rowTable[i].ticket_id+"' class='btnEditTicket btn'><i class='fa fa-pencil'></i></button></td></tr>"; 
							     	    										$("#planesTable tbody").append(tblRow);

																		    };

																	  
																	}).fail(function(){

																		console.log("ERROR makeTable");

																	});




							    								} else if(jsonToName[i].user_admin == 0){
							    										console.log("not admin");

							    									$.ajax('ajax.php', {
																	    data: {"what_to_do":"makeTable"},
																    	method: "get"
																	}).done(function(response){

																			$(".planeRow").remove();

																		    rowTable = JSON.parse(response);

																		    for (var i = 0; i < rowTable.length; i++) {
																		    	var tblRow = "<tr id='"+rowTable[i].ticket_id+"' data-row='"+rowTable[i].ticket_id+"' class='planeRow'><td>"+rowTable[i].plane_type+"</td><td>"+rowTable[i].reg_id+"</td><td>"+rowTable[i].ticket_from+"</td><td>"+rowTable[i].ticket_to+"</td><td>"+rowTable[i].ticket_dep+"</td><td>"+rowTable[i].ticket_arr+"</td><td>"+rowTable[i].ticket_price+"</td><td class='btnRow' id='btnRow"+rowTable[i].ticket_id+"'><button id='"+rowTable[i].ticket_id+"' class='btnPay btn'><i class='fa fa-shopping-cart'></i></button></td></tr>"; 
																	     	    $("#planesTable tbody").append(tblRow);

																		    };

																	  
																	}).fail(function(){

																		console.log("ERROR makeTable");

																	});

							    								}
															}					
								    					}
																							

							  
										}).fail(function(){

													console.log("ERROR rememberUser");

										});

										$.ajax('ajax.php', {
							    			data: {"what_to_do":"makeBoughtTable"},
						    				method: "get"
										}).done(function(response){

											$('.ticketRow').remove();

										    rowTicketTable = JSON.parse(response);

										    for (var i = 0; i < rowTicketTable.length; i++) {
										    	if (rowTicketTable[i].user_id == userIDLoggedIn) {
										    		var tblTicketRow = "<tr class='ticketRow'><td>"+rowTicketTable[i].user_name+"</td><td>"+rowTicketTable[i].ticket_from+"</td><td>"+rowTicketTable[i].ticket_to+"</td><td>"+rowTicketTable[i].ticket_dep+"</td><td>"+rowTicketTable[i].ticket_arr+"</td><td><button id='"+rowTicketTable[i].ticket_id+"' class='btnSellBought btn'><i class='fa fa-times'></i></button></td></tr>"; 
									     	  	  	$("#ticketTable tbody").append(tblTicketRow);
												}
										    };

							  
										}).fail(function(){

											console.log("ERROR makeTable");

										});

		} else {     
			swal("Cancelled", "The ticket is still yours", "error");   } 
		});

});

$(document).on('click','.btnDeleteTicket', function(){

	activeTicket = $(this).attr("id");

	console.log(activeTicket);



												swal({   
													title: "Are you sure?",   
													text: "You are about to delete the ticket from the database.",   
													type: "warning",   
													showCancelButton: true,   
													confirmButtonColor: "#DD6B55",   
													confirmButtonText: "Delete",   
													cancelButtonText: "Cancel",   
													closeOnConfirm: false,   
													closeOnCancel: false }, 
													function(isConfirm){   
														if (isConfirm) {     
															swal("Deleted!", "The ticket has been deleted from the database.", "success"); 

											$.ajax('ajax.php', {
									    		data: {"what_to_do":"deleteTicket", "activeTicket":activeTicket},
		    									method: "get"
											}).done(function(response){

												$(".wdw").fadeOut(500);
	      										$("#wdw-planes").fadeIn(500);

	      										$.ajax('ajax.php', {
							   						data: {"what_to_do":"rememberUser", "remUserId":userIDLoggedIn},
						    						method: "get"
												}).done(function(response){

							     	    					
														jsonToName = JSON.parse(response);

														for (var i = 0; i < jsonToName.length; i++) {
															if(jsonToName[i].user_id == userIDLoggedIn){
																$("#btnUserProfile").text(jsonToName[i].user_name);
							    								$("#btnUserProfile").fadeIn(1000); 
							    								console.log(jsonToName[i].user_admin+" admin number");
							    								if(jsonToName[i].user_admin == 1){

							    									
							    									$("#btnViewEditTickets").fadeIn(500);
							    									$("#btnViewEditPlanes").fadeIn(500);


							    									$.ajax('ajax.php', {
																	    data: {"what_to_do":"makeTable"},
																    	method: "get"
																	}).done(function(response){

																		console.log("admin");

																		$(".planeRow").remove();


																		    rowTable = JSON.parse(response);

																		    for (var i = 0; i < rowTable.length; i++) {

							    												var tblRow = "<tr id='"+rowTable[i].ticket_id+"' data-row='"+rowTable[i].ticket_id+"' class='planeRow'><td>"+rowTable[i].plane_type+"</td><td>"+rowTable[i].reg_id+"</td><td>"+rowTable[i].ticket_from+"</td><td>"+rowTable[i].ticket_to+"</td><td>"+rowTable[i].ticket_dep+"</td><td>"+rowTable[i].ticket_arr+"</td><td>"+rowTable[i].ticket_price+"</td><td class='btnRow' id='btnRow"+rowTable[i].ticket_id+"'><button id='"+rowTable[i].ticket_id+"' class='btnPay btn'><i class='fa fa-shopping-cart'></i></button><button id='"+rowTable[i].ticket_id+"' class='btnDeleteTicket btn'><i class='fa fa-trash'></i></button><button id='"+rowTable[i].ticket_id+"' class='btnEditTicket btn'><i class='fa fa-pencil'></i></button></td></tr>"; 
							     	    										$("#planesTable tbody").append(tblRow);

																		    };

																	  
																	}).fail(function(){

																		console.log("ERROR makeTable");

																	});




							    								} else if(jsonToName[i].user_admin == 0){
							    										console.log("not admin");

							    									$.ajax('ajax.php', {
																	    data: {"what_to_do":"makeTable"},
																    	method: "get"
																	}).done(function(response){

																			$(".planeRow").remove();

																		    rowTable = JSON.parse(response);

																		    for (var i = 0; i < rowTable.length; i++) {
																		    	var tblRow = "<tr id='"+rowTable[i].ticket_id+"' data-row='"+rowTable[i].ticket_id+"' class='planeRow'><td>"+rowTable[i].plane_type+"</td><td>"+rowTable[i].reg_id+"</td><td>"+rowTable[i].ticket_from+"</td><td>"+rowTable[i].ticket_to+"</td><td>"+rowTable[i].ticket_dep+"</td><td>"+rowTable[i].ticket_arr+"</td><td>"+rowTable[i].ticket_price+"</td><td class='btnRow' id='btnRow"+rowTable[i].ticket_id+"'><button id='"+rowTable[i].ticket_id+"' class='btnPay btn'><i class='fa fa-shopping-cart'></i></button></td></tr>"; 
																	     	    $("#planesTable tbody").append(tblRow);

																		    };

																	  
																	}).fail(function(){

																		console.log("ERROR makeTable");

																	});

							    								}
															}					
								    					}
																							

							  
										}).fail(function(){

													console.log("ERROR rememberUser");

										});


											}).fail(function(){

												console.log("ERROR deleteTicket");

											});

														} else {     
															swal("Cancelled", "The ticket is still in the database", "error");   } 
														});



											



})

$(document).on('click','#btnDeleteProfile', function(){


			    				userActiveId = userIDLoggedIn;


								$.ajax('ajax.php', {
								    data: {"what_to_do":"deleteProfile", "userActiveId":userActiveId},
	    							method: "get"
								}).done(function(response){

							    		


								     	$.ajax('ajax.php', {
								    		data: {"what_to_do":"deleteBoughtTickets", "userActiveId":userActiveId},
	    									method: "get"
										}).done(function(response){



											$.ajax('ajax.php', {
									    		data: {"what_to_do":"returnTickets", "userActiveId":userActiveId},
		    									method: "get"
											}).done(function(response){




											}).fail(function(){

												console.log("ERROR deleteBoughtTickets");

											});




										}).fail(function(){

											console.log("ERROR deleteBoughtTickets");

										});


										




										

			    				}).fail(function(){

										console.log("ERROR delete profile");

								});

								
										  	
										  	loggedIn = false;
										  	userIDLoggedIn = 0;
										$("#btnLogIn").text("Login");
										$("#btnUserProfile").text("");


								     	$.ajax('ajax.php', {
				    						data: {"what_to_do":"saveUserId", "savedUserId":userIDLoggedIn},
			    							method: "get"
										}).done(function(response){

											swal({   
												title: "Wait 2 seconds!",   
												text: "Page in process of deleting your profile",   
												timer: 2000,   
												showConfirmButton: false }, 
												function(){   
													location.reload(); 
												});
					    				

				  
										}).fail(function(){

											console.log("ERROR saveUserId Login");

										});



								

});



$(document).on('click','.btnPay', function(){

	if(loggedIn == true){
      	$(".wdw").fadeOut(500);
      	$("#wdw-payment").fadeIn(500);
      	btnPayActive = $(this).attr("id");
    } else {
    	$("#btnLogIn").text("Login");
    	$("#btnUserProfile").text("");
		$("#lblUsername").val("");
		$("#lblPassword").val("");
		$("#lblSignUsername").val("");
		$("#lblSignName").val("");
		$("#lblSignEmail").val("");
		$("#lblSignMobile").val("");
		$("#lblSignPassword").val("");
		$(".alert").fadeOut(10);
     	$(".wdw").fadeOut(500);
     	$("#wdw-login").fadeIn(500);
    }
});



$(document).on('click','#btnViewPlanes', function(){


      $(".wdw").fadeOut(500);
      $("#wdw-planes").fadeIn(500);

});



$(document).on('click','#btnSignup', function(){

	$("#alertWarnSign").fadeOut(10);
	loggedIn = false;

	var userUsername = $('#lblSignUsername').val();
	var signEmail = $('#lblSignEmail').val();
	var signMobile = $('#lblSignMobile').val();
	var userPassword = $('#lblSignPassword').val();



	if(userUsername == "" || signEmail == "" || signMobile == "" || userPassword == ""){
	  
		$("#alertWarnSign").fadeIn(500);


	} else {




						$.ajax('ajax.php', {
						    data: {"what_to_do":"signup", "userUsername":userUsername, "userPassword":userPassword, "userEmail":signEmail, "userMobile":signMobile},
					    	method: "get"
						}).done(function(response){
				    
				    		$(".wdw").fadeOut(500);
						    $("#wdw-planes").fadeIn(500);




								$.ajax('ajax.php', {
								    data: {"what_to_do":"makeUsers"},
	    							method: "get"
								}).done(function(response){

								loggedIn = true;
								$("#btnLogIn").text("Logout");
								jUsers = JSON.parse(response);

							    for (var i = 0; i < jUsers.length; i++) {

							    	if(jUsers[i].user_name == userUsername){

							    		userIDLoggedIn = jUsers[i].user_id;
			    						console.log("logged in as: "+userUsername+" userID: "+userIDLoggedIn);
			    						
			    					
			    					}

			    				};


				    				$.ajax('ajax.php', {
			    						data: {"what_to_do":"saveUserId", "savedUserId":userIDLoggedIn},
		    							method: "get"
									}).done(function(response){

				    				console.log(response);

			  
									}).fail(function(){

										console.log("ERROR saveUserId Signup");

									});

				    				  


				  
				 				}).fail(function(){

									console.log("ERROR signup");

								});



								// $.ajax('ajax.php', {
								//     data: {"what_to_do":"getUserID", "getUserInUse":userIDLoggedIn},
	    			// 				method: "get"
								// }).done(function(response){

			    	// 					console.log("UserID set. ID: "+response);   				  
				  
				 			// 	}).fail(function(){

								// 	console.log("ERROR getUserID");

								// });




			$("#btnUserProfile").text(response);
			$("#btnUserProfile").fadeIn(1000);  

		}).fail(function(){

				console.log("ERROR makeUsers");

		});



	}
	  

});



$(document).on('click','#btnLogin', function(){

	userIDLoggedIn = 0;

	$("#alertWarnLog").fadeOut(10);
	$("#alertDangLog").fadeOut(10);


	loggedIn = false;
	var userUsername = $('#lblUsername').val();
	var userPassword = $('#lblPassword').val();

	if(userUsername == "" || userPassword == ""){
	  
		$("#alertWarnLog").fadeIn(500);


	} else {



		 $.ajax('ajax.php', {
		    data: {"what_to_do":"makeUsers"},
	    	method: "get"
		}).done(function(response){


		    // $.get('ajax.php', function(table){
			    jUsers = JSON.parse(response);

			    for (var i = 0; i < jUsers.length; i++) {

			    	if(jUsers[i].user_name == userUsername && jUsers[i].user_pw == userPassword){

			    		loggedIn = true;
			    		userIDLoggedIn = jUsers[i].user_id;
			    		console.log("logged in as: "+userUsername+" userID: "+userIDLoggedIn);

			    		if(jsonToName[i].user_admin == 1){

		    									
		    									$("#btnViewEditTickets").fadeIn(500);
		    									$("#btnViewEditPlanes").fadeIn(500);

		    			}
			    		
			    	}

			    };

			    if (loggedIn == true) {

			    	$(".wdw").fadeOut(500);
		   			$("#wdw-planes").fadeIn(500);
		    

		    		$("#btnUserProfile").text(userUsername);
		    		$("#btnUserProfile").fadeIn(1000); 

		    		$("#btnLogIn").text("Logout");

		    				 $.ajax('ajax.php', {
		    						data: {"what_to_do":"saveUserId", "savedUserId":userIDLoggedIn},
	    							method: "get"
								}).done(function(response){

			    				console.log(response);

		  
								}).fail(function(){

									console.log("ERROR saveUserId Login");

								});


					$.ajax('ajax.php', {
		   						data: {"what_to_do":"rememberUser", "remUserId":userIDLoggedIn},
	    						method: "get"
							}).done(function(response){

		     	    					
									jsonToName = JSON.parse(response);

									for (var i = 0; i < jsonToName.length; i++) {
										if(jsonToName[i].user_id == userIDLoggedIn){
											$("#btnUserProfile").text(jsonToName[i].user_name);
		    								$("#btnUserProfile").fadeIn(1000); 
		    								console.log(jsonToName[i].user_admin+" admin number");
		    								if(jsonToName[i].user_admin == 1){

		    									
		    									$("#btnViewEditTickets").fadeIn(500);
		    									$("#btnViewEditPlanes").fadeIn(500);


		    									$.ajax('ajax.php', {
												    data: {"what_to_do":"makeTable"},
											    	method: "get"
												}).done(function(response){

													console.log("admin");

													$(".planeRow").remove();


													    rowTable = JSON.parse(response);

													    for (var i = 0; i < rowTable.length; i++) {

		    												var tblRow = "<tr id='"+rowTable[i].ticket_id+"' data-row='"+rowTable[i].ticket_id+"' class='planeRow'><td>"+rowTable[i].plane_type+"</td><td>"+rowTable[i].reg_id+"</td><td>"+rowTable[i].ticket_from+"</td><td>"+rowTable[i].ticket_to+"</td><td>"+rowTable[i].ticket_dep+"</td><td>"+rowTable[i].ticket_arr+"</td><td>"+rowTable[i].ticket_price+"</td><td class='btnRow' id='btnRow"+rowTable[i].ticket_id+"'><button id='"+rowTable[i].ticket_id+"' class='btnPay btn'><i class='fa fa-shopping-cart'></i></button><button id='"+rowTable[i].ticket_id+"' class='btnDeleteTicket btn'><i class='fa fa-trash'></i></button><button id='"+rowTable[i].ticket_id+"' class='btnEditTicket btn'><i class='fa fa-pencil'></i></button></td></tr>"; 
		     	    										$("#planesTable tbody").append(tblRow);

													    };

												  
												}).fail(function(){

													console.log("ERROR makeTable");

												});




		    								} else if(jsonToName[i].user_admin == 0){
		    										console.log("not admin");

		    									$.ajax('ajax.php', {
												    data: {"what_to_do":"makeTable"},
											    	method: "get"
												}).done(function(response){

														$(".planeRow").remove();

													    rowTable = JSON.parse(response);

													    for (var i = 0; i < rowTable.length; i++) {
													    	var tblRow = "<tr id='"+rowTable[i].ticket_id+"' data-row='"+rowTable[i].ticket_id+"' class='planeRow'><td>"+rowTable[i].plane_type+"</td><td>"+rowTable[i].reg_id+"</td><td>"+rowTable[i].ticket_from+"</td><td>"+rowTable[i].ticket_to+"</td><td>"+rowTable[i].ticket_dep+"</td><td>"+rowTable[i].ticket_arr+"</td><td>"+rowTable[i].ticket_price+"</td><td class='btnRow' id='btnRow"+rowTable[i].ticket_id+"'><button id='"+rowTable[i].ticket_id+"' class='btnPay btn'><i class='fa fa-shopping-cart'></i></button></td></tr>"; 
												     	    $("#planesTable tbody").append(tblRow);

													    };

												  
												}).fail(function(){

													console.log("ERROR makeTable");

												});

		    								}
										}					
			    					}
																		

		  
					}).fail(function(){

								console.log("ERROR rememberUser");

					});



					$.ajax('ajax.php', {
		    			data: {"what_to_do":"makeBoughtTable"},
	    				method: "get"
					}).done(function(response){

						$('.ticketRow').remove();

			    rowTicketTable = JSON.parse(response);

			    for (var i = 0; i < rowTicketTable.length; i++) {
			    	if (rowTicketTable[i].user_id == userIDLoggedIn) {
			    		var tblTicketRow = "<tr class='ticketRow'><td>"+rowTicketTable[i].user_name+"</td><td>"+rowTicketTable[i].ticket_from+"</td><td>"+rowTicketTable[i].ticket_to+"</td><td>"+rowTicketTable[i].ticket_dep+"</td><td>"+rowTicketTable[i].ticket_arr+"</td><td><button id='"+rowTicketTable[i].ticket_id+"' class='btnSellBought btn'><i class='fa fa-times'></i></button></td></tr>"; 
		     	  	  	$("#ticketTable tbody").append(tblTicketRow);
					}
			    };

		  
					}).fail(function(){

						console.log("ERROR makeTable");

					});




		    		

			    } else {

			    	$("#alertDangLog").fadeIn(500);

			    }


	    	


		  
		 }).fail(function(){

			console.log("ERROR makeTable");

		});



	}
	  

});		



$(document).on('click','#btnConfirmPay', function(){


	// $("#alertWarnLog").fadeOut(10);
	// $("#alertDangLog").fadeOut(10);
		var activeBuyName = "";
		var activeBuyMobile = "";
		// activeBuyFrom = "";
		// activeBuyTo = "";
		// activeBuyDep = "";
		// activeBuyArr = "";
		// activeBuyPrice = "";

					$("tr.ticketRow").remove();


					// $.ajax('ajax.php', {
					// 	data: {"what_to_do":"makeTable"},
					// 	method: "get"
					// }).done(function(response){

					// 	rowTable = JSON.parse(response);

					// 	for (var i = 0; i < rowTable.length; i++) {

					// 		if(rowTable[i].ticket_id == btnPayActive){

					// 			activeBuyFrom = rowTable[i].ticket_from;
					// 			activeBuyTo = rowTable[i].ticket_to;
					// 			activeBuyDep = rowTable[i].ticket_dep;
					// 			activeBuyArr = rowTable[i].ticket_arr;
					// 			activeBuyPrice = rowTable[i].ticket_price;

					// 		}

					// 	};

												  
					// }).fail(function(){

					// 	console.log("ERROR makeTable");

					// });

					$.ajax('ajax.php', {
						data: {"what_to_do":"makeUsers"},
						method: "get"
					}).done(function(response){

						rowTable = JSON.parse(response);

						for (var i = 0; i < rowTable.length; i++) {

							if(rowTable[i].user_id == userIDLoggedIn){
								
								activeBuyName = rowTable[i].user_name;
								activeBuyMobile = rowTable[i].user_mobile;

							}

						};

												  
					}).fail(function(){

						console.log("ERROR makeTable");

					});


					$.ajax('ajax.php', {
		    			data: {"what_to_do":"buyTicket", "userIdLogged":userIDLoggedIn, "planeTicket":btnPayActive},
	    				method: "get"
					}).done(function(response){


		  
							$.ajax('ajax.php', {
		    					data: {"what_to_do":"sendToBuyer", "activeBuyMobile":activeBuyMobile},
	    						method: "get"
							}).done(function(response){

								console.log("send to "+activeBuyMobile);

			    				console.log(response);
		  
							}).fail(function(){

								console.log("ERROR sendToBuyer");

							});

							$.ajax('ajax.php', {
		    					data: {"what_to_do":"sendToSelf", "activeBuyMobile":activeBuyMobile, "userIdLogged":userIDLoggedIn, "planeTicket":btnPayActive},
	    						method: "get"
							}).done(function(response){

								console.log("send from "+activeBuyMobile);

			    				console.log(response);
		  
							}).fail(function(){

								console.log("ERROR sendToSelf");

							});



							$.ajax('ajax.php', {
		    					data: {"what_to_do":"setToSold", "ticketId":btnPayActive, "userActiveId":userIDLoggedIn},
	    						method: "get"
							}).done(function(response){

			    				console.log(response);
		  
							}).fail(function(){

								console.log("ERROR buyTicket");

							});




							$.ajax('ajax.php', {
				    			data: {"what_to_do":"makeBoughtTable"},
			    				method: "get"
							}).done(function(response){

								$('.ticketRow').remove();

							    rowTicketTable = JSON.parse(response);

							    for (var i = 0; i < rowTicketTable.length; i++) {
							    	if (rowTicketTable[i].user_id == userIDLoggedIn) {
							    		var tblTicketRow = "<tr class='ticketRow'><td>"+rowTicketTable[i].user_name+"</td><td>"+rowTicketTable[i].ticket_from+"</td><td>"+rowTicketTable[i].ticket_to+"</td><td>"+rowTicketTable[i].ticket_dep+"</td><td>"+rowTicketTable[i].ticket_arr+"</td><td><button id='"+rowTicketTable[i].ticket_id+"' class='btnSellBought btn'><i class='fa fa-times'></i></button></td></tr>"; 
						     	  	  	$("#ticketTable tbody").append(tblTicketRow);
									}
							    };
								swal("Payment complete!", "Thank you for buying a ticket!", "success");
				  
							}).fail(function(){

								console.log("ERROR makeBoughtTable");

							});


							$.ajax('ajax.php', {
		   						data: {"what_to_do":"rememberUser", "remUserId":userIDLoggedIn},
	    						method: "get"
							}).done(function(response){

		     	    					
									jsonToName = JSON.parse(response);

									for (var i = 0; i < jsonToName.length; i++) {
										if(jsonToName[i].user_id == userIDLoggedIn){
											$("#btnUserProfile").text(jsonToName[i].user_name);
		    								$("#btnUserProfile").fadeIn(1000); 
		    								console.log(jsonToName[i].user_admin+" admin number");
		    								if(jsonToName[i].user_admin == 1){

		    									
		    									$("#btnViewEditTickets").fadeIn(500);
		    									$("#btnViewEditPlanes").fadeIn(500);


		    									$.ajax('ajax.php', {
												    data: {"what_to_do":"makeTable"},
											    	method: "get"
												}).done(function(response){

													console.log("admin");

													$(".planeRow").remove();


													    rowTable = JSON.parse(response);

													    for (var i = 0; i < rowTable.length; i++) {

		    												var tblRow = "<tr id='"+rowTable[i].ticket_id+"' data-row='"+rowTable[i].ticket_id+"' class='planeRow'><td>"+rowTable[i].plane_type+"</td><td>"+rowTable[i].reg_id+"</td><td>"+rowTable[i].ticket_from+"</td><td>"+rowTable[i].ticket_to+"</td><td>"+rowTable[i].ticket_dep+"</td><td>"+rowTable[i].ticket_arr+"</td><td>"+rowTable[i].ticket_price+"</td><td class='btnRow' id='btnRow"+rowTable[i].ticket_id+"'><button id='"+rowTable[i].ticket_id+"' class='btnPay btn'><i class='fa fa-shopping-cart'></i></button><button id='"+rowTable[i].ticket_id+"' class='btnDeleteTicket btn'><i class='fa fa-trash'></i></button><button id='"+rowTable[i].ticket_id+"' class='btnEditTicket btn'><i class='fa fa-pencil'></i></button></td></tr>"; 
		     	    										$("#planesTable tbody").append(tblRow);

													    };

												  
												}).fail(function(){

													console.log("ERROR makeTable");

												});




		    								} else if(jsonToName[i].user_admin == 0){
		    										console.log("not admin");

		    									$.ajax('ajax.php', {
												    data: {"what_to_do":"makeTable"},
											    	method: "get"
												}).done(function(response){

														$(".planeRow").remove();

													    rowTable = JSON.parse(response);

													    for (var i = 0; i < rowTable.length; i++) {
													    	var tblRow = "<tr id='"+rowTable[i].ticket_id+"' data-row='"+rowTable[i].ticket_id+"' class='planeRow'><td>"+rowTable[i].plane_type+"</td><td>"+rowTable[i].reg_id+"</td><td>"+rowTable[i].ticket_from+"</td><td>"+rowTable[i].ticket_to+"</td><td>"+rowTable[i].ticket_dep+"</td><td>"+rowTable[i].ticket_arr+"</td><td>"+rowTable[i].ticket_price+"</td><td class='btnRow' id='btnRow"+rowTable[i].ticket_id+"'><button id='"+rowTable[i].ticket_id+"' class='btnPay btn'><i class='fa fa-shopping-cart'></i></button></td></tr>"; 
												     	    $("#planesTable tbody").append(tblRow);

													    };

												  
												}).fail(function(){

													console.log("ERROR makeTable");

												});

		    								}
										}					
			    					}
																		

		  
					}).fail(function(){

								console.log("ERROR rememberUser");

					});


							$(".wdw").fadeOut(500);
      						$("#wdw-planes").fadeIn(500);






					}).fail(function(){

						console.log("ERROR makeTicketTable");

					});




					



	  

});		





(function timeDatePickerDepNew() {
          $('#lblDepTime').
            click( function(e) { $(this).off('click').AnyTime_picker().focus(); } ).
            keydown(
              function(e) {
                var key = e.keyCode || e.which;
                if ( ( key != 16 ) && ( key != 9 ) ) { // shift, del, tab
                  $(this).off('keydown').AnyTime_picker().focus();
                  e.preventDefault();
                  }
                } );
          $('#btnViewEditTickets').
            click(
              function() {
                $('#lblDepTime').AnyTime_noPicker().val('');
                timeDatePickerDepNew();
                } );
})();

(function timeDatePickerArrNew() {
          $('#lblArrTime').
            click( function(e) { $(this).off('click').AnyTime_picker().focus(); } ).
            keydown(
              function(e) {
                var key = e.keyCode || e.which;
                if ( ( key != 16 ) && ( key != 9 ) ) { // shift, del, tab
                  $(this).off('keydown').AnyTime_picker().focus();
                  e.preventDefault();
                  }
                } );
          $('#btnViewEditTickets').
            click(
              function() {
                $('#lblArrTime').AnyTime_noPicker().val('');
                timeDatePickerArrNew();
                } );
})();

(function timeDatePickerDepEdit() {
          $('#lblEditDepTime').
            click( function(e) { $(this).off('click').AnyTime_picker().focus(); } ).
            keydown(
              function(e) {
                var key = e.keyCode || e.which;
                if ( ( key != 16 ) && ( key != 9 ) ) { // shift, del, tab
                  $(this).off('keydown').AnyTime_picker().focus();
                  e.preventDefault();
                  }
                } );
          $('#btnViewEditTickets').
            click(
              function() {
                $('#lblEditDepTime').AnyTime_noPicker().val('');
                timeDatePickerDepEdit();
                } );
})();

(function timeDatePickerArrEdit() {
          $('#lblEditArrTime').
            click( function(e) { $(this).off('click').AnyTime_picker().focus(); } ).
            keydown(
              function(e) {
                var key = e.keyCode || e.which;
                if ( ( key != 16 ) && ( key != 9 ) ) { // shift, del, tab
                  $(this).off('keydown').AnyTime_picker().focus();
                  e.preventDefault();
                  }
                } );
          $('#btnViewEditTickets').
            click(
              function() {
                $('#lblEditArrTime').AnyTime_noPicker().val('');
                timeDatePickerArrEdit();
                } );
})();