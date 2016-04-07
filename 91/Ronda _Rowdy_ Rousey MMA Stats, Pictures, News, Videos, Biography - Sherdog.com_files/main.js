//GSAP
CSSPlugin.defaultForce3D = true;
var tw = TweenLite;
var sw = 300;
var sh = 600;

var prevTime = tw.ticker.time;
var currentTime = tw.ticker.time;
var deltaTime = 0;
var elapsedTime = 0;
var interactTime = 10;

//elems
var contain = this;
var containerDC;
var container;
var logo;
var logoHeight = 69;
var logoCircle;
var logoArrow;
var logoArrowHold;
var logoBar1;
var logoBar2;
var logoBar3;
var logoDate;
var logoCopyTop;
var logoCopyBottom;
var logoCopyTopHold;
var logoCopyBottomHold;
var lockup;
var lockupTop;
var lockupBottom;
var cta;
var ctaClick;

var replay;

var copyTop;
var copyMain;
var target;

var mouseX = 0;
var mouseY = 0;
var isPaused = false;
var mousePauseTick = 0;

var bg;

var cellPos = [{type: 'cancer', x: 147.95, y: 56.35, scale: 1}, {type: 'cancer', x: 360.15, y: -63.1, scale: 1}, {type: 'cancer', x: 568.3, y: 22.4, scale: 1}, {type: 'healthy', x: 237.25, y: -68, scale: 0.259}, {type: 'healthy', x: 49.35, y: -139.4, scale: 0.259}, {type: 'healthy', x: 328.85, y: 164.95, scale: 0.259}, {type: 'healthy', x: 297.45, y: -141.8, scale: 0.259}, {type: 'healthy', x: 194.55, y: -120.05, scale: 0.259}, {type: 'healthy', x: 17.9, y: 5.95, scale: 0.259}, {type: 'healthy', x: 56.9, y: -64.4, scale: 0.259}, {type: 'healthy', x: 352.45, y: 75.35, scale: 0.259}, {type: 'healthy', x: 666.2, y: -68.2, scale: 0.259}, {type: 'healthy', x: 472.65, y: 52.8, scale: 0.259}, {type: 'healthy', x: 432.25, y: 145.1, scale: 0.259}, {type: 'healthy', x: 460.25, y: -139.4, scale: 0.259}, {type: 'healthy', x: 410, y: 27.95, scale: 0.259}, {type: 'healthy', x: 528.8, y: -140.5, scale: 0.259}, {type: 'healthy', x: 575.4, y: -86.25, scale: 0.259}, {type: 'healthy', x: 543.2, y: 130.95, scale: 0.259}, {type: 'healthy', x: 630.4, y: 120.4, scale: 0.259}, {type: 'healthy', x: 666.2, y: 63.15, scale: 0.259}, {type: 'healthy', x: 666.2, y: -139.4, scale: 0.259}, {type: 'healthy', x: 480.25, y: -43.8, scale: 0.259}, {type: 'healthy', x: 134.35, y: -90.75, scale: 0.259}, {type: 'healthy', x: 235.45, y: 141.1, scale: 0.259}, {type: 'healthy', x: 134.35, y: 158.95, scale: 0.259}, {type: 'healthy', x: 38.25, y: 120.4, scale: 0.259}, {type: 'healthy', x: 264.5, y: 26.45, scale: 0.259}];

var mainscene;
var mainscene1;
var mainscene2;

var cellFreq = 1;
var maxRot = 0.8;
var maxR = 10;
var cells = [];
var cancerCells = [[], []];
var driftSpeedTarget;
var driftSpeed = 60;
var leftStartX;
var rightEndX = 600;
var isAttacking = false;
var isOnEndFrame = false;
var endFrameStartTime = 0;
var numKills = 0;
var numAllowedKills = 8;

var endframe;
var efCells = [];

//DC
if (!Enabler.isInitialized()){
	Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitialized);
} else {
	enablerInitialized();
}
function enablerInitialized(){
	if (Enabler.isPageLoaded()){
		pageLoadedHandler();
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, pageLoadedHandler);
	}
}
function pageLoadedHandler(){
	if (Enabler.isVisible()){
		adVisible();
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, adVisible);
	}
}

function adVisible(){
	//elems
	containerDC = document.getElementById("container-dc");
	container = document.getElementById("container-inner");
	logo = document.getElementById("logo");
	logoCircle = document.getElementById("logo-circle");
	logoArrow = document.getElementById("logo-arrow");
	logoArrowHold = document.getElementById("logo-arrow-hold");
	logoBar1 = document.getElementById("logo-bar1");
	logoBar2 = document.getElementById("logo-bar2");
	logoBar3 = document.getElementById("logo-bar3");
	logoDate = document.getElementById("logo-date");
	logoCopyTop = document.getElementById("logo-copy-top");
	logoCopyBottom = document.getElementById("logo-copy-bottom");
	logoCopyTopHold = document.getElementById("logo-copy-top-hold");
	logoCopyBottomHold = document.getElementById("logo-copy-bottom-hold");
	lockup = document.getElementById("lockup");
	lockupTop = document.getElementById("lockup-top");
	lockupBottom = document.getElementById("lockup-bottom");
	cta = document.getElementById("cta");
	ctaClick = document.getElementById("cta-click");
	bg = document.getElementById("bg");
	endframe = document.getElementById("endframe");

	copyTop = document.getElementById("copy-top");
	copyMain = document.getElementById("copy-main");
	target = document.getElementById("target");
	mainscene = document.getElementById("mainscene");
	mainscene1 = document.getElementById("mainscene1");
	mainscene2 = document.getElementById("mainscene2");
	cancerCellNode = document.getElementById("cancer-cell");
	healthyCellNode = document.getElementById("healthy-cell");
	replay = document.getElementById("replay");



	driftSpeedTarget = driftSpeed;

	for(i = 0; i < cellPos.length; i++){
		for(j = 1; j <= 2; j++){
			var scene = contain["mainscene"+j];
			var pos = cellPos[i];
			var cell = contain[pos.type + "CellNode"].cloneNode(true);
			cell.className = "";
			var rot = (cell.type == "healthy") ? 0 : Math.random() * 360;
			tw.set(cell, {transformOrigin: "0% 0%", x: pos.x, y: pos.y, z: 0.1, scale: pos.scale * ((pos.type == "healthy") ? 0.8 : 0.5)});
			scene.appendChild(cell);
			cells.push({
				cellElem: cell,
				ox: Math.round(pos.x),
				oy: Math.round(pos.y),
				x: Math.round(pos.x),
				y: Math.round(pos.y),
				xd: -maxR + (Math.random() * maxR * 2),
				yd: -maxR + (Math.random() * maxR * 2),
				rs: -maxRot + (Math.random() * maxRot * 2),
				scene: scene,
				rotation: rot,
				scale: pos.scale,
				isDead: false,
				isCancer: (pos.type == "healthy") ? false : true
			});
			if(pos.type == "cancer"){
				cell.onclick = targetCancer;
				cancerCells[j-1].push({cellElem: cell, id: cells.length - 1});
			}
		}
	}

	ctaClick.onclick = function(){
		Enabler.exit("Main Exit");
	}

	//set up
	initGFX();

	//endframe
	var efCancerCell = document.getElementById("ef-cancercell");
	tw.set(efCancerCell, {autoAlpha: 1, scale: 0.48, x: 0, y: -26, top: -130, left: -5, rotation: -10});
	efCells.push(efCancerCell);
	var efHealthyCell = document.getElementById("ef-healthycell1");
	tw.set(efHealthyCell, {autoAlpha: 1, scale: 0.18, x: 20, y: -60, top: -80, left: -4, rotation: 120});
	efCells.push(efHealthyCell);
	efHealthyCell = document.getElementById("ef-healthycell2");
	tw.set(efHealthyCell, {autoAlpha: 1, scale: 0.22, x: 120, y: -60, top: -60, left: 20, rotation: -60});
	efCells.push(efHealthyCell);
	efHealthyCell = document.getElementById("ef-healthycell3");
	tw.set(efHealthyCell, {autoAlpha: 1, scale: 0.2, x: 145, y: 0, top: -10, left: 80, rotation: -80});
	efCells.push(efHealthyCell);
	efHealthyCell = document.getElementById("ef-healthycell4");
	tw.set(efHealthyCell, {autoAlpha: 1, scale: 0.22, x: -64, y: -48, top: -8, left: -80, rotation: 10});
	efCells.push(efHealthyCell);


	tw.set(copyTop, {y: 120});
	tw.set(copyMain, {alpha: 0});
	tw.set(target, {alpha: 0, scale: 0.55});

	tw.set(mainscene, {scale: 0.7, y: -125});
	tw.set(mainscene1, {x: -670});
	tw.set(mainscene2, {x: 0});

	startAnim();

}

function initGFX(){
	tw.set(logo, {transformOrigin: "0% 0%", scale: 0.82, autoAlpha: 1});
	tw.set(logoArrowHold, {y: logoHeight, autoAlpha: 1});
	tw.set(logoArrow, {y: -logoHeight, autoAlpha: 1});
	tw.set(logoCircle, {height: 0, autoAlpha: 1});
	tw.set(logoBar1, {scaleX: 0, autoAlpha: 1});
	tw.set(logoBar2, {scaleX: 0, autoAlpha: 1});
	tw.set(logoBar3, {scaleX: 0, autoAlpha: 1});
	tw.set(logoDate, {alpha: 0, autoAlpha: 1});
	tw.set(logoCopyTop, {y: 15, autoAlpha: 1});
	tw.set(logoCopyBottom, {y: -15, autoAlpha: 1});
	tw.set(lockup, {transformOrigin: "100% 0%", scale: 0.65, autoAlpha: 1});
	tw.set(lockupTop, {x: 94, autoAlpha: 1});
	tw.set(lockupBottom, {x: 94, autoAlpha: 1});
	tw.set(cta, {alpha: 0});
	tw.set(replay, {autoAlpha: 0});
}

//start
function startAnim() {
	var d = 0;
	//show banner
	tw.set(containerDC, {display: "block"});
	tw.to(containerDC, 0.4, {autoAlpha: 1, opacity: 1, ease: Quad.easeInOut});
	d += 0.4;
	tw.to(copyMain, 0.4, {autoAlpha: 1, ease: Quad.easeInOut, delay: d});
	d += 5;
	tw.to(copyMain, 0.4, {autoAlpha: 0, ease: Quad.easeInOut, delay: d, overwrite: 0});

	tw.delayedCall(d, function(){
		currentTime = tw.ticker.time;
		container.onmousemove = mouseTrack;
		tw.ticker.addEventListener("tick", frameTick, this, true, 1);
	});
	tw.to(copyTop, 0.4, {y: 0, autoAlpha: 1, ease: Quad.easeInOut, delay: d});

	d += 0.2;
	tw.to(bg, 0.4, {autoAlpha: 0, ease: Quad.easeInOut, delay: d, overwrite: 0});
	tw.set(ctaClick, {autoAlpha: 0, display: "none", delay: d});

	d += 0.2;
	tw.to(target, 0.4, {autoAlpha: 1, ease: Quad.easeInOut, delay: d});

}

function targetCancer(e){
	elapsedTime = 0;
	interactTime = 7;
	if(e.target.parentNode.id == "cancer-cell"){
		Enabler.counter("Cancer Cell Killed");
		var cancerCell = e.target.parentNode;
		var id;
		var cell;
		for(i = 0; i < cells.length; i++){
			cell = cells[i];
			if(cancerCell == cell.cellElem){
				id = i;
				break;
			}
		}
		if(cell.isDead){
			return;
		}
		cell.isDead = true;
		numKills++;
		if(numKills >= numAllowedKills && !isOnEndFrame){
			showEndFrame();
		}
		tw.to(cancerCell, 0.3, {scale: 0, ease: Quad.easeIn, delay: 0.2});
		var id = 0;
		for(i = 0; i < cells.length; i++){
			var attackCellData = cells[i];
			var attackCell = attackCellData.cellElem;
			if(attackCell.parentNode != cancerCell.parentNode){
				continue;
			}
			if(attackCell.id.substr(0, 6) == "cancer"){
				continue;
			}
			var dx = attackCellData.x - cell.x;
			var dy = attackCellData.y - cell.y;
			var d = Math.sqrt(dx*dx + dy*dy);
			if(d < 250){
				var attackDistance = 20 + Math.random() * 16;
				tw.to(attackCell, 0.2 + (id * 0.01), {x: cell.x + (dx/d) * attackDistance, y: cell.y + (dy/d) * attackDistance, delay: 0, ease: Circ.easeInOut});
				tw.to(attackCell, 1, {x: attackCellData.ox, y: attackCellData.oy, delay: 0.3 + (id * 0.02), ease:Quad.easeInOut, overwrite:0});
				id++;
			}
		}
	}
}

function showEndFrame(){
	tw.set(ctaClick, {autoAlpha: 1, display: "block", delay: d});
	isOnEndFrame = true;
	var slideD = 0.8;
	var d = 0;
	tw.to(bg, slideD, {autoAlpha: 1, ease: Quad.easeInOut});
	tw.to(copyTop, slideD, {y: 120, ease: Quad.easeInOut});
	d += slideD;
	tw.to(cta, 0.4, {autoAlpha: 1, delay: slideD, ease: Quad.easeInOut});
	tw.to(ctaClick, 0.4, {autoAlpha: 1, delay: slideD, ease: Quad.easeInOut});
	for (i = 0; i < efCells.length; i++){
		tw.to(efCells[i], 0.8, {top: 0, left: 0, ease: Quad.easeInOut, delay: d + i * 0.06});
	}
	d += 0.8;
	//logo
	tw.to(logoArrow, 0.4, {y: 0, ease: Quad.easeInOut, delay: d});
	tw.to(logoArrowHold, 0.4, {y: 0, ease: Quad.easeInOut, delay: d});
	d += 0.2;
	tw.to(logoCircle, 0.4, {height: logoHeight, ease: Quad.easeInOut, delay: d});
	tw.to(logoBar1, 0.2, {scaleX: 1, ease: Quad.easeInOut, delay: d});
	d += 0.1;
	tw.to(logoBar2, 0.2, {scaleX: 1, ease: Quad.easeInOut, delay: d});
	d += 0.1;
	tw.to(logoBar3, 0.2, {scaleX: 1, ease: Quad.easeInOut, delay: d});
	d += 0.1;
	tw.to(logoDate, 0.2, {alpha: 1, ease: Quad.easeInOut, delay: d});
	tw.to(logoCopyTop, 0.4, {y: 0, ease: Quad.easeInOut, delay: d});
	tw.to(logoCopyBottom, 0.4, {y: 0, ease: Quad.easeInOut, delay: d});
	d += 0.4;
	//lockup
	tw.to(lockupTop, 0.4, {x: 0, ease: Quad.easeInOut, delay: d});
	tw.to(lockupBottom, 0.4, {x: 0, ease: Quad.easeInOut, delay: d + 0.5});
	d += 1.1;
	tw.to(replay, 0.4, {autoAlpha: 1, ease: Quad.easeInOut, delay: d});
	tw.delayedCall(d, function(){
		replay.onclick = function(e){
			Enabler.counter("Replay Click");
			replayBanner();
		}
		replay.onmouseover = function(e){
			tw.to(replay,  0.2, {scale: 1.14, ease: Back.easeOut});
		}
		replay.onmouseout = function(e){
			tw.to(replay,  0.4, {scale: 1, ease: Quad.easeInOut});
		}
	});
}

function replayBanner(){
	var d = 0;
	replay.onclick = null;
	replay.onmouseover = null;
	replay.onmouseout = null;
	tw.to(replay, 0.2, {autoAlpha: 0, scale: 1, ease: Quad.easeInOut, delay: d});
	var cellSlide = 0.4;
	var efCancerCell = document.getElementById("ef-cancercell");
	tw.to(efCancerCell, cellSlide, {top: -130, left: -5, ease: Quad.easeIn});
	var efHealthyCell = document.getElementById("ef-healthycell1");
	tw.to(efHealthyCell, cellSlide, {top: -80, left: -4, ease: Quad.easeIn});
	efHealthyCell = document.getElementById("ef-healthycell2");
	tw.to(efHealthyCell, cellSlide, {top: -60, left: 20, ease: Quad.easeIn});
	efHealthyCell = document.getElementById("ef-healthycell3");
	tw.to(efHealthyCell, cellSlide, {top: -10, left: 80, ease: Quad.easeIn});
	efHealthyCell = document.getElementById("ef-healthycell4");
	tw.to(efHealthyCell, cellSlide, {top: -8, left: -80, ease: Quad.easeIn});
	d += 0.2;
	var slideD = 0.4;
	tw.to(cta, slideD, {autoAlpha: 0, delay: d, ease: Quad.easeInOut});
	tw.to(ctaClick, slideD, {autoAlpha: 0, delay: d, ease: Quad.easeInOut});
	tw.to(logo, slideD, {autoAlpha: 0, delay: d, ease: Quad.easeInOut});
	tw.to(lockup, slideD, {autoAlpha: 0, delay: d, ease: Quad.easeInOut});
	tw.to(logoCopyTop, slideD, {autoAlpha: 0, ease: Quad.easeInOut, delay: d});
	tw.to(logoCopyBottom, slideD, {autoAlpha: 0, ease: Quad.easeInOut, delay: d});
	d += slideD;
	tw.to(bg, slideD, {autoAlpha: 0, delay: d, ease: Quad.easeInOut});
	d += slideD;
	tw.to(copyTop, slideD, {y: 0, ease: Quad.easeInOut, delay: d});
	tw.delayedCall(d, function(){
		numKills = 0;
		elapsedTime = 0;
		interactTime = 15;
		isOnEndFrame = false;
		initGFX();
	});
}

function setupButtons(){
	//buttonLeftInvert.addEventListener("mouseover", function(){
	//});
}
function frameTick(e){
	//delta time
	prevTime = currentTime;
	currentTime = tw.ticker.time;
	deltaTime = (currentTime - prevTime);
	elapsedTime += deltaTime;


	if(elapsedTime > interactTime && !isOnEndFrame){
		showEndFrame();
	}

	mousePauseTick += deltaTime;
	if(mousePauseTick > 5 && !isPaused){
		//isPaused = true;
		//tw.to(contain, 1.6, {driftSpeedTarget: 0});
	}

	tw.set(target, {x: mouseX, y: mouseY});
	tw.set(mainscene1, {x: mainscene1._gsTransform.x + deltaTime * driftSpeedTarget});
	tw.set(mainscene2, {x: mainscene2._gsTransform.x + deltaTime * driftSpeedTarget});
	if(mainscene1._gsTransform.x > rightEndX){
		tw.set(mainscene1, {x: mainscene2._gsTransform.x - 670});
		for(i = 0; i < cancerCells[0].length; i++){
			var cancerCell = cancerCells[0][i];
			cells[cancerCell.id].isDead = false;
			tw.set(cancerCell.cellElem, {scale: cells[cancerCell.id].scale * 0.5});
		}
	}
	if(mainscene2._gsTransform.x > rightEndX){
		for(i = 0; i < cancerCells[1].length; i++){
			var cancerCell = cancerCells[1][i];
			cells[cancerCell.id].isDead = false;
			tw.set(cancerCell.cellElem, {scale: cells[cancerCell.id].scale * 0.5});
		}
		tw.set(mainscene2, {x: mainscene1._gsTransform.x - 670});
	}
	for(i = 0; i < cells.length; i++){
		var cell = cells[i];
		if(!cell.isCancer){
			var p = driftSpeedTarget / driftSpeed;
			//tw.set(cell.cellElem, {x: cell.ox + Math.cos(currentTime * cellFreq) * cell.xd * p, y: cell.oy + Math.sin(currentTime * cellFreq) * cell.yd * p});
		}
		var dx;
		var dy;
		var drot;
		if (!cell.isCancer){
			dx = mouseX - cell.cellElem._gsTransform.x - cell.scene._gsTransform.x;
			dy = mouseY - cell.cellElem._gsTransform.y - 200;
			drot = Math.atan2(dy, dx);
			if(dy < 0){
				drot += Math.PI * 2;
			}
			drot = (drot * 180) / Math.PI;
			if(drot > cell.rotation + 180) drot -= 360;
			if(drot < cell.rotation - 180) drot += 360;
			cell.rotation += ((drot - cell.rotation) / 10) * (driftSpeedTarget / driftSpeed);
			tw.set(cell.cellElem, {rotation: cell.rotation});
		} else {
			cell.rotation += cell.rs * (driftSpeedTarget / driftSpeed);
			tw.set(cell.cellElem, {rotation: cell.rotation});
		}
	}
}

function mouseTrack(e){
	mouseX = e.clientX;
	mouseY = e.clientY;
	mousePauseTick = 0;
	if(isPaused){
		isPaused = false;
		tw.to(contain, 1.6, {driftSpeedTarget: driftSpeed});
	}
}

function print(log){
	console.log(log);
}