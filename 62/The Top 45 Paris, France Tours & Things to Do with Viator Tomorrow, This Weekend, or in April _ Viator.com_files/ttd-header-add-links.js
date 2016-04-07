
// clear cache after upload     
// https://cache.graphicslib.viator.com/graphicslib/TnT/ttd-header-add-links.js
// http://monitor.viator.com/purgeCDN.php
		
$( document ).ready(function() {
	

	var arr_ttd = {}; // no need for an array

	//ITS-33552
        arr_ttd["cairo-263978.jpg"] = "http://thingstodo.viator.com/egypt/unrest-in-egypt-what-travelers-need-to-know/";
	arr_ttd["egypt-263977.jpg"] = "http://thingstodo.viator.com/egypt/unrest-in-egypt-what-travelers-need-to-know/";


	arr_ttd["thailand-157051.jpg"] = "http://thingstodo.viator.com/bangkok/safety-what-travelers-need-to-know/";
	arr_ttd["bangkok-157036.jpg"] = "http://thingstodo.viator.com/bangkok/safety-what-travelers-need-to-know/";

	// ITS-19116 - Oct 31
        arr_ttd["orlando-162538.jpg"] = "http://www.viator.com/Orlando-tours/4WD-ATV-and-Off-Road-Tours/d663-g9-c32?aid=ttd1003";

        // ITS-20638
        arr_ttd["los-angeles-168027.jpg"] = "http://www.viator.com/Los-Angeles-attractions/Universal-Studios-Hollywood/d645-a1047?aid=ttd1004";

	//Added: ITS-21437 Removed: ITS-21730 Added again: ITS-23090
        arr_ttd["paris-177448.jpg"] = "http://cache.graphicslib.viator.com/graphicslib/mkg/TravelGuides/paris-travel-guide.pdf";
        arr_ttd["paris-177449.jpg"] = "http://cache.graphicslib.viator.com/graphicslib/mkg/TravelGuides/paris-travel-guide.pdf";
        arr_ttd["paris-178470.jpg"] = "http://cache.graphicslib.viator.com/graphicslib/mkg/TravelGuides/paris-travel-guide.pdf";

	arr_ttd["las-vegas-183094.jpg"] = "http://www.viator.com/tours/Las-Vegas/Top-Gun-and-Air-Combat-Experience/d684-5278TOPGUN?aid=smp1004";
	arr_ttd["las-vegas-183306.jpg"] = "http://www.viator.com/tours/Las-Vegas/Las-Vegas-Richard-Petty-Ride-Along-Experience/d684-5089RPDA?aid=smp1005";
	arr_ttd["orlando-183849.jpg"] = "http://www.viator.com/Everglades-National-Park-attractions/Wild-Florida-Wildlife-Park-tours-tickets/d5286-a16087?aid=smp1013";

	//ITS-32918 Removed
        //arr_ttd["nepal-193878.jpg"] = "http://thingstodo.viator.com/nepal/nepal-earthquake/";
	//arr_ttd["kathmandu-193880.jpg"] = "http://thingstodo.viator.com/nepal/nepal-earthquake/";

  	// ITS-26718 Change link: ITS-30433
        arr_ttd["las-vegas-198517.jpg"] = "http://www.viator.com/tours/Las-Vegas/The-High-Roller-at-The-LINQ/d684-5084LASHIG?pub=ttd1078";

        // ITS-32284-Ends December 31 2015
        arr_ttd["orlando-250349.png"] = "http://www.viator.com/tours/Orlando/Legoland-Florida/d663-5343ENTRY?pub=smp1036";
        
        // ITS-32899 ITS-33571
        arr_ttd["paris-256924.png"] =  "http://thingstodo.viator.com/paris/safety-in-paris-what-travelers-need-to-know-right-now/";
        arr_ttd["france-256930.png"] =  "http://thingstodo.viator.com/paris/safety-in-paris-what-travelers-need-to-know-right-now/";
	arr_ttd["paris-256965.jpg"] =  "http://thingstodo.viator.com/paris/safety-in-paris-what-travelers-need-to-know-right-now/";
	arr_ttd["paris-256923.png"] =  "http://thingstodo.viator.com/paris/safety-in-paris-what-travelers-need-to-know-right-now/";
	arr_ttd["paris-256964.jpg"] =  "http://thingstodo.viator.com/paris/safety-in-paris-what-travelers-need-to-know-right-now/";
	arr_ttd["paris-257058.png"] =  "http://thingstodo.viator.com/paris/safety-in-paris-what-travelers-need-to-know-right-now/";        
        arr_ttd["paris-264785.jpg"] =  "http://thingstodo.viator.com/paris/safety-in-paris-what-travelers-need-to-know-right-now/";

        // ITS-33326
        arr_ttd["israel-261944.jpg"] = "http://thingstodo.viator.com/israel/tips-for-staying-safe-in-israel/";
        arr_ttd["jerusalem-261945.jpg"] = "http://thingstodo.viator.com/israel/tips-for-staying-safe-in-israel/";
        arr_ttd["tel-aviv-260209.jpg"] = "http://thingstodo.viator.com/israel/tips-for-staying-safe-in-israel/";

        // ITS-33552
        arr_ttd["turkey-263981.jpg"] = "http://thingstodo.viator.com/istanbul/turkey-safety-and-travel-tips/";
        arr_ttd["istanbul-263982.jpg"] = "http://thingstodo.viator.com/istanbul/turkey-safety-and-travel-tips/";

        arr_ttd["lebanon-263979.jpg"] = "http://thingstodo.viator.com/lebanon/safety-in-lebanon-what-travelers-need-to-know/";
        arr_ttd["beirut-263980.jpg"] = "http://thingstodo.viator.com/lebanon/safety-in-lebanon-what-travelers-need-to-know/";
        
        // ITS-34753
        arr_ttd["cancun-253813.jpg"] = "http://www.viator.com/Cancun-tourism/Cirque-du-Soleil-in-Riviera-Maya/d631-t17623";

        // ITS-131524
        arr_ttd["brussels-308727.jpg"] = "http://thingstodo.viator.com/belgium/safety-in-belgium-what-travelers-need-to-know-right-now/";
        arr_ttd["brussels-218778.jpg"] = "http://thingstodo.viator.com/belgium/safety-in-belgium-what-travelers-need-to-know-right-now/";
 

	// ITS-XXXXX
        //         arr_ttd[""] = "";


	for (var img in arr_ttd) {
		// console.log(arr_ttd[url]);
		
		if ( $("img[src$='" + img + "']").length ) // if the image exists
			 $("img[src$='" + img + "']").wrap( "<a href='" + arr_ttd[img] + "'></a>" ); // wrap it with anchor tag			
		}

 
	
	
});
