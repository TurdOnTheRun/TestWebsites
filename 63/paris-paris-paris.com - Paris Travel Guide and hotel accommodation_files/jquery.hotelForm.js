$(document).ready(function(){

	var dates = $('#checkinHotel, #checkoutHotel').datepicker({
		dateFormat : "dd/mm/yy",
		changeMonth: false,
		minDate: 0,
		defaultDate: 0,
		numberOfMonths: 1,
		onSelect: function(selectedDate) {

			var option = this.id == "checkinHotel" ? "minDate" : "maxDate";
			var instance = $(this).data("datepicker");
			var date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
		
			if(option == "minDate") date.setDate(date.getDate()+1);

			dates.not(this).datepicker("option", option, date);
			
			$('#checkinHotelDay').val($.datepicker.formatDate('dd', $("#checkinHotel").datepicker( "getDate" ) ));
			$('#checkinHotelYearMonth').val($.datepicker.formatDate('yy-mm', $("#checkinHotel").datepicker( "getDate" ) ));
			$('#checkoutHotelDay').val($.datepicker.formatDate('dd', $("#checkoutHotel").datepicker( "getDate" ) ));
			$('#checkoutHotelYearMonth').val($.datepicker.formatDate('yy-mm', $("#checkoutHotel").datepicker( "getDate" ) ));

		}
	});
	
	var today = new Date();
	var tomorrow = new Date(today.getFullYear(), today.getMonth(),today.getDate()+1);
	$('#checkinHotel').val( $.datepicker.formatDate('dd/mm/yy', today ) );
	$('#checkoutHotel').val( $.datepicker.formatDate('dd/mm/yy', tomorrow ) );
	$('#checkinHotelDay').val( $.datepicker.formatDate('dd', today ) );
	$('#checkinHotelYearMonth').val( $.datepicker.formatDate('yy-mm', today ) );
	$('#checkoutHotelDay').val( $.datepicker.formatDate('dd', tomorrow ) );
	$('#checkoutHotelYearMonth').val( $.datepicker.formatDate('yy-mm', tomorrow ) );
	
	// HTML String to build form
	var roomRowHtml = '<tr class="roomRow"><td valign="top" class="roomNum">'+roomStr+' 0</td><td valign="top"><select name="group_adults"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></td><td valign="top"><select name="group_children"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></td><td valign="top" class="childrenAge"></td></tr>';
	var childrenInput = '<input name="age" value="" /> ';
	
	// Optimisation : multipe use of selector in var 
	var selectMainRooms = $("select#main_rooms");
	var selectMainAdults = $("select#main_adults");
	var selectMainChildren = $("select#main_children");
	
	var roomContainer = $('#hotel_form_rooms_infos');
	

	
	
	// Draw room form
	selectMainRooms.change(function () {

		var numRooms = $('#hotel_form_rooms_infos tr.roomRow').length;
		var rooms = selectMainRooms.val();
		
		var adults = selectMainAdults.val();
		var children = selectMainChildren.val();
		var myregexp = new RegExp(eval('/'+roomStr+' [0-9]{1,2}/'));
		var total = 0;
		
		// Build rooms form
		if ( rooms > numRooms ) {
			for (i=numRooms; i<rooms; i++) {
				roomRowHtml = roomRowHtml.replace(myregexp, roomStr+" " + parseInt(i+1));
				roomContainer.append(roomRowHtml);
			}
		}
		else{
			while ( rooms < numRooms ) {
			  roomContainer.find("tr.roomRow").last().remove();
			  numRooms = $('#hotel_form_rooms_infos tr.roomRow').length;
			}
		}
		
		// Optimisation : multipe use of selector in var 
		// Need to be after form building
		var selectGroupAdults = $("select[name=group_adults]");
		var selectGroupChildren = $("select[name=group_children]");

		// Main adults number change
		selectMainAdults.change(function () {
		
			// Dispatch adults in rooms
			adults = selectMainAdults.val();

			adultsPerRoom = Math.floor(adults / rooms);
			selectGroupAdults.val(adultsPerRoom);
			adultsPerRoomRest = adults % rooms;
			
			// Dispatch rest
			selectGroupAdults.each(function() {
				if ( adultsPerRoomRest > 0 ) {
					$(this).val(parseInt($(this).val())+1);
					adultsPerRoomRest--;
				}
			});
			
			// show/hide rooms infos form
			showRoomsInfos();
			
		});
		
		// // Call main adults selectbox change trigger to dispatch adults in rooms
		selectMainAdults.trigger("change");
		
		// Change number of adults in rooms	
		selectGroupAdults.off("change");
		selectGroupAdults.on("change", function() {
		
			// Update main select box
			adults = 0;
			selectGroupAdults.each(function() {
				adults += parseInt($(this).val());
			});
			selectMainAdults.val(adults);
			
			// show/hide rooms infos form
			showRoomsInfos();
		});
		
		// Change number of children in rooms
		selectGroupChildren.off("change");
		selectGroupChildren.on("change", function() {
		
			// Update main select box
			total = 0;
			selectGroupChildren.each(function() {
				total += parseInt($(this).val());
			});
			selectMainChildren.val(total);
			updateChildAge($(this));
			
			// show/hide rooms infos form
			showRoomsInfos();

		});
			

		// Main children number change
		selectMainChildren.off("change");
		selectMainChildren.on("change", function() {
			
			// Dispatch children in rooms
			children = selectMainChildren.val();
			childrenPerRoom = Math.floor(children / rooms);
			selectGroupChildren.val(childrenPerRoom);
			childrenPerRoomRest = children % rooms;
			
			selectGroupChildren.each(function() {
				if ( childrenPerRoomRest > 0 ) {
					$(this).val(parseInt($(this).val())+1);
					childrenPerRoomRest--;
				}
				updateChildAge($(this));
			});
			
			// show/hide rooms infos form
			showRoomsInfos();
		});
		
		// Call main children selectbox change trigger to dispatch children in rooms
		selectMainChildren.trigger("change");
			
		// Show rooms infos form if needed and change submit button margin
		showRoomsInfos();
		
		// Show rooms infos form if needed and change submit button margin
		function showRoomsInfos() {
		
			var rooms = selectMainRooms.val();
			var adults = selectMainAdults.val();
			var children = selectMainChildren.val();
			
			if ( ( children > 0 ) || ( rooms > 1 && adults > 4)){
				$("#hotel_submit_button").css('margin-top','10px');
				$("#hotel_form_rooms_infos_container").show(100);
			}else
			{
				$("#hotel_submit_button").css('margin-top','-30px');
				$("#hotel_form_rooms_infos_container").hide(100);
			}
		}
		
        // Change number of children in rooms
        function updateChildAge(childrenSelect) {
            var numChildren = $("td.childrenAge input",childrenSelect.parent().parent()).length;
            var children = childrenSelect.val();

            if ( children > numChildren ) {
                for (i=numChildren; i<children; i++) {
                    $("td.childrenAge",childrenSelect.parent().parent()).append(childrenInput);
                }
            }
            else{
                while ( children < numChildren ) {
                  $("td.childrenAge input",childrenSelect.parent().parent()).last().remove();
                  numChildren = $("td.childrenAge input",childrenSelect.parent().parent()).length;
                }
            }
        }


	});
	
	// Change main number of children	
	selectMainChildren.off("change");
	selectMainChildren.on("change", function() {
		alert('on change');
		selectMainRooms.trigger("change");
	});
	
	// Initialisation
	selectMainRooms.trigger("change");
	


});