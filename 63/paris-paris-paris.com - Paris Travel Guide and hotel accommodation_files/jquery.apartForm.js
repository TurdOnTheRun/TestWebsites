$(document).ready(function(){

	var dates = $('#checkinApart, #checkoutApart').datepicker({
		dateFormat : "dd/mm/yy",
		minDate: 0,
		defaultDate: 0,
		numberOfMonths: 1,
		onSelect: function(selectedDate) {

			var option = this.id == "checkinApart" ? "minDate" : "maxDate";
			var instance = $(this).data("datepicker");
			var date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
		
			if(option == "minDate") date.setDate(date.getDate()+3);
			
			dates.not(this).datepicker("option", option, date);
			
			$('#DateArrival').val($.datepicker.formatDate('dd/mm/yy', $("#checkinApart").datepicker( "getDate" ) ));
			$('#DateDeparture').val($.datepicker.formatDate('dd/mm/yy', $("#checkoutApart").datepicker( "getDate" ) ));

		}
	});
	
	var checkinDefaultDate = new Date();
	var checkoutDefaultDate = new Date(checkinDefaultDate.getFullYear(), checkinDefaultDate.getMonth(),checkinDefaultDate.getDate()+3);
	$('#checkinApart').val( $.datepicker.formatDate('dd/mm/yy', checkinDefaultDate ) );
	$('#checkoutApart').val( $.datepicker.formatDate('dd/mm/yy', checkoutDefaultDate ) );
	$('#DateArrival').val($.datepicker.formatDate('dd/mm/yy', checkinDefaultDate  ) );
	$('#DateDeparture').val($.datepicker.formatDate('dd/mm/yy', checkoutDefaultDate ) );
	
}); 