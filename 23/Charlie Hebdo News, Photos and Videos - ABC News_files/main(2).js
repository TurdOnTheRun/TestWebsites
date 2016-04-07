// initialize FT object
var myFT = new FT;

//Define the required variables
offer_copy = document.getElementById("offer_copy");
kohls_logo = document.getElementById("kohls_logo");
CTA_Button = document.getElementById("CTA_Button");
background = document.getElementById("background");
carousel = document.getElementById("carousel");

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

	//Apply clickTag
	myFT.applyClickTag(container, 1);
	myFT.applyClickTag(kohls_logo, 2);
	myFT.applyClickTag(CTA_Button, 3);

	//Apply clickTag on products
	myFT.applyClickTag(c_img_0, 1);
	myFT.applyClickTag(c_img_1, 1);
	myFT.applyClickTag(c_img_2, 1);
	myFT.applyClickTag(c_img_3, 1);

	
	//if the number of products does not equal 
	if(number_of_products != carouselArr.length){
		var diff =  carouselArr.length - number_of_products;
		carouselArr = carouselArr.slice(0,(carouselArr.length-diff));
		
	}

	background.src = myFT.instantAds.background;
	CTA_Button.src = myFT.instantAds.CTA_Button;
	kohls_logo.src = myFT.instantAds.kohls_logo;
	offer_copy.src = myFT.instantAds.offer_copy;

	//CAll the method to init the animation
	startAdWarmup();
});

//Method to init the animation
function startAdWarmup() {
	CTA_Button.style.opacity = "0";
	CTA_Button.style.visibility = 'visible';			
	background.style.visibility = "visible";
	background.style.opacity = "1";
	sonoma_img.style.opacity = "1";
	sonoma_img.style.visibility = 'visible';
	
	var d = 0;

	TweenLite.to(c_img_0, 0, {alpha: 0, delay: d+0});
	TweenLite.to(c_img_0, 0, {alpha: 1, delay: d+0});

	TweenLite.to(kohls_logo, 0.65, {top:"11", ease:Sine.easeOut, delay: d+0.2});
	TweenLite.to(offer_copy, .8, {top:"48", ease:Sine.easeOut, delay: d+1});
	TweenLite.to(CTA_Button, 0.65, {alpha: 1, display:'block', visible: "visible", delay: d+2.0});

	d += 1.75;
	TweenLite.delayedCall(0, startAd); 
}


function startAd(){
	var elem = carouselArr[0].elem;
	TweenLite.to(elem, 0,{left:0});
	TweenLite.to(elem,1,{left:0, alpha:1, ease:Sine.easeOut, delay:0})
	TweenLite.to(sonoma_img, 0,{right:-1});
	TweenLite.delayedCall(3.5, autoCall);
};

function autoCall(){
	if(doAuto){
		autoRotation();
	}
}

//Method to auto rotate the carousel product
function autoRotation(){
	if(doAuto){
		allowClick = false;
		var currElem = carouselArr[0].elem;
		TweenLite.to(currElem, .5,{left:137});

		//
		var obj = carouselArr.shift();
		carouselArr.push(obj);
		//
		var nextElem = carouselArr[0].elem;
		nextElem.style.left="-137px";
		TweenLite.to(nextElem, .5,{left:0, onComplete:resetClick});
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
