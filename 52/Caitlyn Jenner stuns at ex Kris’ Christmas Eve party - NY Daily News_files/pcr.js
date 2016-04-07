
document.addEventListener('DOMContentLoaded',PCRichards)


function PCRichards(){
	$.ajax({
		url:'http://www.nydailynews.com/xml/cmlink/nydn.content.PcRichard.xml?ff',
		dataType:'text',
		success:formatData,
		error:function(xhr, error){
			console.group();
				console.dir(error);
				console.dir(xhr);
			console.groupEnd();
		}
	});
	function formatData(data){
		var jProduct=$(data).find('product');
		var jProducts=[];
		var limit4=[];

		jProduct.each(function(i, el, val){
			var img=$(this).find('imageUrl').text();
			var sku=$(this).find('sku').text();
			var desc=$(this).find('description').text();
			var url=$(this).find('url').text();
			var price=$(this).find('price').text();

			var chunk=$('<li class="box"><a target="_blank" href="'+url+'"><img src="'+img+'"><span class="price">$ '+price+'</span><span class="desc">'+desc+'</span></a></li>');
			jProducts.push(chunk);

			jProducts.sort(function(){
				return .5 - Math.random();
			})

			limit4=jProducts.slice(0,4);

			// limit4.sort(function(){
			// 	return .5 - Math.random();
			// });

		})

		$('#pc-richards .products').append(limit4);
	}
}
