var myFT = new FT;
offer_copy = document.getElementById("offer_copy"),
kohls_logo = document.getElementById("kohls_logo"),
CTA_Button = document.getElementById("CTA_Button"),
product_background_image = document.getElementById("product_background_image")
background = document.getElementById("background")
carousel = document.getElementById("carousel");
container = document.getElementById("container");
sonoma_logo = document.getElementById("sonoma_logo");

var BANNER_WIDTH = '728';
var BANNER_HEIGHT = '90';
			//
			var carouselArr = [ {elem:c_img_0, id:0},
								{elem:c_img_1, id:1},
								{elem:c_img_2, id:2},
								{elem:c_img_3, id:3}];//
		
			var allowClick = true;
			var number_of_products;
			var doAuto = true;

			//*********************************************************FUNCTIONS
			//LOADING FUNCTIONS
			myFT.on("instantads", function(){
				//set the image src or data-src attribute
				console.log("ia vars loaded");
				number_of_products = myFT.instantAds.number_of_products;
				number_of_products = Number(number_of_products);
				for(var i = 0; i < number_of_products; i++){
					var iaName = "product_image"+(i+1);
					var elem = carouselArr[i].elem;
					elem.setAttribute("src", myFT.instantAds[iaName]); 
				}
				

				kohls_logo.addEventListener('click', function() {
					myFT.clickTag(2);
				});

				CTA_Button.addEventListener('click', function() {
					myFT.clickTag(3);
				});

				background.addEventListener('click', function() {
					myFT.clickTag(1);
				});
				carousel.addEventListener('click', function() {
					myFT.clickTag(1);
				});
				offer_copy.addEventListener('click', function() {
					myFT.clickTag(1);
				});
				boarderHold.addEventListener('click', function() {
					myFT.clickTag(1);
				});
				sonoma_logo.addEventListener('click', function() {
					myFT.clickTag(1);
				});

				//if the number of products does not equal 
				if(number_of_products != carouselArr.length){
					var diff =  carouselArr.length - number_of_products;
					carouselArr = carouselArr.slice(0,(carouselArr.length-diff));
					
				}
				//

				//container.style.background = "url('" + myFT.instantAds.background + "') repeat-x left top";
			
				background.src = myFT.instantAds.background;
				CTA_Button.src = myFT.instantAds.CTA_Button;
				kohls_logo.src = myFT.instantAds.kohls_logo;
				
				offer_copy.src = myFT.instantAds.offer_copy;
				startAdWarmup();
				
			});

			function startAdWarmup() {
				CTA_Button.style.opacity = "0";
				CTA_Button.style.visibility = 'visible';			
				kohls_logo.style.opacity = "1";
				kohls_logo.style.visibility = 'visible';
				offer_copy.style.opacity = "1";
				offer_copy.style.visibility = 'visible';
				sonoma_logo.style.opacity = "0";
				sonoma_logo.style.visibility = 'invisible';
				
				var d = 0;
				
				
				TweenLite.to(c_img_0, 0, {alpha: 0, delay: d+0});
				TweenLite.to(c_img_0, 0, {alpha: 1, delay: d+0.80});
				TweenLite.to(kohls_logo, 0.65, {top : '15', ease:Sine.easeOut, delay: d+0.5});
				TweenLite.to(offer_copy, .55, {top:'6', ease:Sine.easeOut, delay: d+1.5});
				TweenLite.to(CTA_Button, 0.65, {alpha: 1, display:'block', ease:Sine.easeOut, delay: d+2.2});boarderHold
				TweenLite.to(container, 0, {alpha: 1, display:'block', ease:Sine.easeOut, delay: d+0});
				TweenLite.to(sonoma_logo, 0, {alpha: 1, display:'block', ease:Sine.easeOut, delay: d+0.011});
				
				
				TweenLite.to("#background",0,{css:{display:"block", visibility:"visible", opacity:"1"}, delay:0})

				d += 1.75;
				TweenLite.delayedCall(0, startAd); 
			}

			
			function startAd(){
				var elem = carouselArr[0].elem;
				TweenLite.to(elem, 0,{left:0});
   				TweenLite.to(elem,0,{left:0, alpha:1, ease:Sine.easeOut, delay:0})
   				// TweenLite.to(elem, 0.35,{left:0, ease:Sine.easeOut, delay:.3});
				TweenLite.delayedCall(3.5, autoCall);
			};
			function autoCall(){
				if(doAuto){
					autoRotation();
				}
			}

			function autoRotation(){
				if(doAuto){
					allowClick = false;
					var currElem = carouselArr[0].elem;
					TweenLite.to(currElem, 0.65,{left:362});
					//
					var obj = carouselArr.shift();
					carouselArr.push(obj);
					//
					var nextElem = carouselArr[0].elem;
					nextElem.style.left="-362px";
					TweenLite.to(nextElem, 0.65,{left:0, onComplete:resetClick});
					//
					console.log("element 0 is now :: "+carouselArr[0].id);

					if(carouselArr[0].id != 0){
						TweenLite.delayedCall(2.5, autoCall);
					}
				}	
			}
			
			function resetClick(){
				allowClick = true;
			};

