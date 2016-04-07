if (window.crtg_content) {
	var crtg_split = crtg_content.split(";");
	for (var i=0; i<crtg_split.length; i++) {
		var item = crtg_split[i];
		if (item) {
			var key = item.split("=")[0];
			var value = item.split("=")[1];
			AMPTManager.addPageLevelTarget("'" + key + "', '" + value + "'");
		}
	}
}
AMPTManager.registry.push([
{
  "rktr_deployed_date": "2016-02-03 14:26:27",
  "rktr_slot_id": "page",
  "rktr_id": "cnn_us_leaf_vls",
  "gpt_id": "8663477",
  "site": "cnn",
  "root": "CNN",
  "targeting": [["transId", cnnad_transactionID], ["kuid", Krux.user], ["ksg", Krux.segments], ["guid", AMPTManager.readCookie("ug")]]
},
{
  "rktr_slot_id": "ad_bnr_atf_01",
  "rktr_ad_id": "CNN/us/leaf/vls",
  "sizes": [[1,2],[320,50],[728,90],[970,66],[970,90],[970,250]],
  "hasInViewRefresh": "false",
  "inViewRefreshCount": "0",  
  "targeting": [["pos",["bnr_atf_01"]]],
  "responsive":[[['1024', '0'], [['970', '250'], ['970', '90'], ['970', '66'], ['728', '90'], ['1', '2']]], [['782', '0'], [['728', '90'], ['1', '2']]], [['0', '0'], [['320', '50'], ['1', '2']]]]
},
{
  "rktr_slot_id": "ad_rect_atf_01",
  "rktr_ad_id": "CNN/us/leaf/vls",
  "sizes": [[1,2],[300,250],[300,600],[300,850],[300,1050]],
  "hasInViewRefresh": "false",
  "inViewRefreshCount": "0",  
  "targeting": [["pos",["rect_atf_01"]]],
  "responsive":[[['1024', '0'], [['300', '1050'], ['300', '850'], ['300', '600'], ['300', '250'], ['1', '2']]], [['782', '0'], [['300', '850'], ['300', '600'], ['300', '250'], ['1', '2']]], [['0', '0'], ['suppress']]]
},
{
  "rktr_slot_id": "ad_rect_atf_02",
  "rktr_ad_id": "CNN/us/leaf/vls",
  "sizes": [[1,2],[300,250]],
  "hasInViewRefresh": "false",
  "inViewRefreshCount": "0",  
  "targeting": [["pos",["rect_atf_02"]]],
  "responsive":[[['1024', '0'], ['suppress']], [['782', '0'], ['suppress']], [['0', '0'], [['300', '250'], ['1', '2']]]]
},
{
  "rktr_slot_id": "ad_ns_btf_01",
  "rktr_ad_id": "CNN/us/leaf/vls",
  "sizes": [[1,2],[300,100]],
  "hasInViewRefresh": "false",
  "inViewRefreshCount": "0",  
  "targeting": [["pos",["ns_btf_01"]]],
  "responsive":[[['1024', '0'], [['300', '100'], ['1', '2']]], [['782', '0'], ['suppress']], [['0', '0'], ['suppress']]]
},
{
  "rktr_slot_id": "ad_rect_atf_03",
  "rktr_ad_id": "CNN/us/leaf/vls",
  "sizes": [[1,2],[300,250],[300,251],[300,600],[300,601]],
  "hasInViewRefresh": "false",
  "inViewRefreshCount": "0",  
  "targeting": [["pos",["rect_atf_03"]]],
  "responsive":[[['1024', '0'], [['300', '601'], ['300', '600'], ['300', '251'], ['300', '250'], ['1', '2']]], [['782', '0'], [['300', '601'], ['300', '600'], ['300', '251'], ['300', '250'], ['1', '2']]], [['0', '0'], [['300', '250'], ['1', '2']]]]
},
{
  "rktr_slot_id": "ad_rect_btf_01",
  "rktr_ad_id": "CNN/us/leaf/vls",
  "sizes": [[1,2],[300,250],[300,251],[300,600],[300,601]],
  "hasInViewRefresh": "false",
  "inViewRefreshCount": "0",  
  "targeting": [["pos",["rect_btf_01"]]],
  "responsive":[[['1024', '0'], [['300', '601'], ['300', '600'], ['300', '251'], ['300', '250'], ['1', '2']]], [['782', '0'], [['300', '601'], ['300', '600'], ['300', '251'], ['300', '250'], ['1', '2']]], [['0', '0'], [['300', '250'], ['1', '2']]]]
},
{
  "rktr_slot_id": "ad_rect_btf_02",
  "rktr_ad_id": "CNN/us/leaf/vls",
  "sizes": [[1,2],[300,250]],
  "hasInViewRefresh": "false",
  "inViewRefreshCount": "0",  
  "targeting": [["pos",["rect_btf_02"]]],
  "responsive":[[['1024', '0'], ['suppress']], [['782', '0'], ['suppress']], [['0', '0'], [['300', '250'], ['1', '2']]]]
},
{
  "rktr_slot_id": "ad_rect_btf_03",
  "rktr_ad_id": "CNN/us/leaf/vls",
  "sizes": [[1,2],[300,250]],
  "hasInViewRefresh": "false",
  "inViewRefreshCount": "0",  
  "targeting": [["pos",["rect_btf_03"]]],
  "responsive":[[['1024', '0'], ['suppress']], [['782', '0'], ['suppress']], [['0', '0'], [['300', '250'], ['1', '2']]]]
},
{
  "rktr_slot_id": "ad_rect_btf_04",
  "rktr_ad_id": "CNN/us/leaf/vls",
  "sizes": [[1,2],[300,250]],
  "hasInViewRefresh": "false",
  "inViewRefreshCount": "0",  
  "targeting": [["pos",["rect_btf_04"]]],
  "responsive":[[['1024', '0'], [['300', '250'], ['1', '2']]], [['782', '0'], ['suppress']], [['0', '0'], ['suppress']]]
},
{
  "rktr_slot_id": "ad_bnr_btf_01",
  "rktr_ad_id": "CNN/us/leaf/vls",
  "sizes": [[1,2],[728,90]],
  "hasInViewRefresh": "false",
  "inViewRefreshCount": "0",  
  "targeting": [["pos",["bnr_btf_01"]]],
  "responsive":[[['1024', '0'], ['suppress']], [['782', '0'], ['suppress']], [['0', '0'], ['suppress']]]
},
{
  "rktr_slot_id": "ad_bnr_btf_02",
  "rktr_ad_id": "CNN/us/leaf/vls",
  "sizes": [[1,2],[728,90]],
  "hasInViewRefresh": "false",
  "inViewRefreshCount": "0",  
  "targeting": [["pos",["bnr_btf_02"]]],
  "responsive":[[['1024', '0'], [['728', '90'], ['1', '2']]], [['782', '0'], ['suppress']], [['0', '0'], ['suppress']]]
},
{
  "rktr_slot_id": "ad_oop_skin_01",
  "rktr_ad_id": "CNN/us/leaf/vls",
  "sizes": [[1,1],[1,2]],
  "hasInViewRefresh": "false",
  "inViewRefreshCount": "0",  
  "targeting": [["pos",["oop_skin_01"]]],
  "responsive":[[['1024', '0'], [['1', '2'], ['1', '1']]], [['782', '0'], ['suppress']], [['0', '0'], ['suppress']]]
},
{
  "rktr_slot_id": "ad_oop_float_01",
  "rktr_ad_id": "CNN/us/leaf/vls",
  "sizes": [[1,1],[1,2]],
  "hasInViewRefresh": "false",
  "inViewRefreshCount": "0",  
  "targeting": [["pos",["oop_float_01"]]],
  "responsive":[[['1024', '0'], [['1', '2'], ['1', '1']]], [['782', '0'], [['1', '2'], ['1', '1']]], [['0', '0'], [['1', '2'], ['1', '1']]]]
}
]);