 
function g_cagir(){
		$(".g_cagir").text("Please wait!");
		var g_adres = $.trim($("#g_adres").val());
		//alert(g_adres);
		
		if(g_adres==""){
			alert("Enter URL");
			$(".g_cagir").text("Check Video");
		} else {
		urEk = {'adres':g_adres}
		jQuery.ajax({  
		type: "POST",  
		url: "receiveData.py",  
		data: urEk,  
		success: function(gadurum){
			var gelen = gadurum.split("|");
				if(gelen[0]==0){
					alert(gelen[1]);
					$(".g_cagir").text("Check Video");
					$("#g_adres").val("");
				} else if(gelen[0]==1){
					$("#g_sonuc").html(gelen[1]);		
					$(".g_cagir").text("Check Video");	
					$("#video_bolumu").hide();					
				}
			
		}
		});
		}

}
 

function bunuEkle(id){
			var mood_id  = $("#rhm_ic").val();
			var gelenBaslik   = $.trim($("input#g_baslik_input").val());
			var gelenAciklama = $.trim($("textarea#g_aciklama_input").val());
			
			var muzEk = {'id':id,'gelenbaslik':gelenBaslik,'gelenaciklama':gelenAciklama} //'id='+id+'&gelenbaslik='+gelenBaslik;
				jQuery.ajax({ 
				type: "POST", 
				url : 'youtubevideoAdd.py', 
				data: muzEk, 
				success: function(ekleGelen){
					var eg=ekleGelen.split("|");
				if(eg[0]==0){
					alert(eg[1]);
				} else if(eg[0]==1){
					// eklendi yap hareketini
					alert(eg[1]);
					$("#g_sonuc").empty();
					$("#video_bolumu").fadeIn();
				} else {
					alert("Ekleme Hatası");				
					}
				}
				});
}



 		
$("#g_adres").click(function(){
		$(this).val("");
});