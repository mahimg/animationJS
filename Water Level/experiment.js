var renderer = new THREE.WebGLRenderer();
var objects = [];
var scene = new THREE.Scene();
/* Scene Dimensions (in meters: at z = 0) */
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */

var Zdefault = -20;
var Zmin = -100;
var Zmax = 100;
var Zstep = 1;

var qcount = 0;

var bottle;
var tap;
var Yshift = 30;
var waterBodies = [[70,150,265,-190], [100,150,180,-190], [100,150,80,-190], [120,150,-50,-190], [80,150,-160,-190], [100,150,-250,-190], [800,310,0,-165] ];
var tapPos = [[367.6603917747751, 113.86172726321324, -1], [298.56, 113.86172726321324, -1], [224.24, 113.86172726321324, -1], [140, 113.86172726321324, -1], [-289, 113.86172726321324, 1], [-361, 113.86172726321324, 1]];
var drop = [[270.711], [175], [70.43], [-48], [-160], [-263]];
var waterBody = [];
var selectedBody = [];
var dropBody = [];
var question = true;
var node;
var buttonsT;
var buttonsTL;
var buttonsO;
var bodyy;
var ans;
var state = 0;
var depends;

function initialiseControlVariables() {
	/* Labels */        
	
}
function StartTap(pos) {
	tap.position.set( tapPos[pos][0], tapPos[pos][1], -10);
    tap.scale.x = tapPos[pos][2];
    tap.visible = true;
    for (var i = 0; i <= dropBody.length; i++) {
		dropBody[i].position.set( drop[pos], 80 + i*10, 210);
	    dropBody[i].scale.x = -1;
	}
}
function fillBottle0() {
	resetExperiment();
	PIEstartAnimation();
	selectedBody.push(0);
	StartTap(0);
}
function fillBottle1() {
	resetExperiment();
	PIEstartAnimation();
	selectedBody.push(1);
	StartTap(1);

}
function fillBottle2() {
	resetExperiment();
	PIEstartAnimation();
	selectedBody.push(2);
	StartTap(2);
}
function fillBottle3() {
	resetExperiment();
	PIEstartAnimation();
	selectedBody.push(3);
	StartTap(3);
}
function fillBottle4() {
	resetExperiment();
	PIEstartAnimation();
	selectedBody.push(4);
	StartTap(4);
}
function fillBottle5() {
	resetExperiment();
	PIEstartAnimation();
	selectedBody.push(5);
	StartTap(5);
}
function initialiseControls() {
	initialiseControlVariables();

	// Create Input Panel
	PIEaddDualCommand("Bottle A", fillBottle0);
	PIEaddDualCommand("Bottle B", fillBottle1);
	PIEaddDualCommand("Bottle C", fillBottle2);
	PIEaddDualCommand("Bottle D", fillBottle3);
	PIEaddDualCommand("Bottle E", fillBottle4);
	PIEaddDualCommand("Bottle F", fillBottle5);
/*	PIEaddDualCommand("Drop pos", droppos);
*/

}


var helpContent;
function initialiseHelp() {
	helpContent="";
	helpContent = helpContent + "<h2>Lateral Inversion</h2>";
	helpContent = helpContent + "<h3>Animation control</h3>";
	helpContent = helpContent + "<p>Click on the buttons on the control panel to start the water flow in the respective bottle. If you want to increase the speed of the water, click more than once on the button.</p>";
	helpContent = helpContent + "<p>To reset the experiment select the reset button on the menu.</p>";
	helpContent = helpContent + "<h2>Have a good time. Happy Experimenting!</h2>";
	// Touch on the top of the object for optimized controls.
	PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo() {
	infoContent =  "";
	infoContent = infoContent + "<h2>A liquid seeks its own level</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>Irrespective of the type of the vessel the height or level of the liquid is the same. This happens because at the bottom,i.e at the long tube, the pressure should be the same. </p>";
    infoContent = infoContent + "<p>Pressure at depth h of liquid is given by P=Density*(acc. due to gravity)*h. </p>";
    infoContent = infoContent + "<p>Density is the same for all of them and so is the acceleration due to gravity. Hence to keep the pressure same, they attain the same height. So you may force the liquid into whatever shape of vessel you wish, it will always seek to attain it's own level.</p>";
	PIEupdateInfo(infoContent);
}
function initialiseScene() {

	/* Initialise Scene Variables */
	mySceneTLX = -100.0;
	mySceneTLY = -100.0;
	mySceneBRX = 100.0;
	mySceneBRY = 100.0;
	mySceneW   = (mySceneBRX - mySceneTLX);
	mySceneH   = (mySceneTLY - mySceneBRY);
	myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
	myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;

}

function resetExperiment() {
/*
	PIEchangeDisplayCommand("Hide " + GlassText, "Show " + GlassText, handleGlass);
	PIEchangeInputCommand("Hide " + GlassText, "Show " + GlassText, handleGlass);


	PIEchangeDisplayCommand("Hide " + PencilText, "Show " + PencilText, handlePencil);
	PIEchangeInputCommand("Hide " + PencilText, "Show " + PencilText, handlePencil);*/
	PIEstopAnimation();
	bottle.position.set( 0, 0 - Yshift, 0);
	tap.position.set( 0, 0, -10);
    tap.visible = false;
    for (var i = 0; i <= 25; i++) {
		dropBody[i].position.set( -1000, 1000, 5);
	    dropBody[i].scale.x = -1;
	    dropBody[i].visible = false;
	}
	for (var i = 0; i <= 6; i++) {
		waterBody[i].visible = false;
		waterBody[i].position.set( waterBodies[i][2], waterBodies[i][3] - Yshift, 200);
	}
	selectedBody = [];
	state = 0;
	

    

}
function loadExperimentElements() {
	
	PIEsetExperimentTitle("A Liquid seeks its own level");
	PIEsetDeveloperName("Mahim Goyal");

	PIEhideControlElement();

	initialiseHelp();
	initialiseInfo();

	initialiseScene();

	// Screen
	var geometry = new THREE.PlaneGeometry( 5000, 5000 );
	var material = new THREE.MeshBasicMaterial( {
		color: 0xFFCC99, 
		side: THREE.DoubleSide, 
		opacity: 1,
		transparent: true,
	} );
	screen1 = new THREE.Mesh( geometry, material );
	screen1.position.set( 0, 0, 300);
	PIEaddElement(screen1);


	//Bottles
	var geometry = new THREE.PlaneGeometry( 600, 600 );
	var texture = new THREE.TextureLoader().load( "img/bottleOuter1.png" );
	texture.wrapS = THREE.ClampToEdgeWrapping
	texture.wrapT = THREE.ClampToEdgeWrapping
	var img = new THREE.MeshBasicMaterial({
		color: 0xFFFFFF,
		side: THREE.DoubleSide, 
        map: texture,
        opacity: 1,
		transparent: true,
    });
	bottle = new THREE.Mesh( geometry, img );
	bottle.position.set( 0, 0 - Yshift, 0);
    bottle.scale.x = -1;
    bottle.overflow = true;
	PIEaddElement(bottle);

	// depends
	var geometry = new THREE.PlaneGeometry( 378/2, 31/2 );
	var texture = new THREE.TextureLoader().load( "img/depends.png" );
	texture.wrapS = THREE.ClampToEdgeWrapping
	texture.wrapT = THREE.ClampToEdgeWrapping
	var img = new THREE.MeshBasicMaterial({
		color: 0xFFFFFF,
		side: THREE.DoubleSide, 
        map: texture,
        opacity: 1,
		transparent: true,
    });
	depends = new THREE.Mesh( geometry, img );
	depends.position.set( 8, -100, -100);
    depends.scale.x = -1;
    depends.overflow = true;
	PIEaddElement(depends);


	//Tap
	var geometry = new THREE.PlaneGeometry( 400, 72.5 );
	var texture = new THREE.TextureLoader().load( "img/tap.png" );
	texture.wrapS = THREE.ClampToEdgeWrapping
	texture.wrapT = THREE.ClampToEdgeWrapping
	var img = new THREE.MeshBasicMaterial({
		color: 0xFFFFFF,
		side: THREE.DoubleSide, 
        map: texture,
        opacity: 1,
		transparent: true,
    });
	tap = new THREE.Mesh( geometry, img );
	tap.position.set( 0, 0, -10);
    tap.scale.x = 1;
    tap.visible = false;
    tap.overflow = true;
	PIEaddElement(tap);

	//drop
	for (var i = 0; i <= 25; i++) {
		var geometry = new THREE.PlaneGeometry( 10, 10 );
		var texture = new THREE.TextureLoader().load( "img/drop.png" );
		texture.wrapS = THREE.ClampToEdgeWrapping
		texture.wrapT = THREE.ClampToEdgeWrapping
		var img = new THREE.MeshBasicMaterial({
			color: 0xFFFFFF,
			side: THREE.DoubleSide, 
	        map: texture,
	        opacity: 1,
			transparent: true,
	    });
		var drops = new THREE.Mesh( geometry, img );
		drops.position.set( -1000, 1000, 5);
	    drops.scale.x = -1;
	    drops.visible = false;
	    drops.overflow = true;
		PIEaddElement(drops);
	    dropBody.push(drops);	    
/*        PIEdragElement(drops);
*/	}


	// Water bodies
	for (var i = 0; i <= 6; i++) {
		console.log(i);
		var geometry = new THREE.PlaneGeometry( waterBodies[i][0], waterBodies[i][1], 32 );
		var material = new THREE.MeshBasicMaterial( {
			color: 0x0099FF, 
			side: THREE.DoubleSide, 
			opacity: 1,
			transparent: true,
		} );
		var waterB = new THREE.Mesh( geometry, material );
		waterB.visible = false;
		waterB.position.set( waterBodies[i][2], waterBodies[i][3] - Yshift, 200);
		PIEaddElement(waterB);
	    waterBody.push(waterB);


	}
	


	/* Instantiate experiment controls */
    initialiseControls();


    /* Reset all positions */
    resetExperiment();
    PIEstartAnimation();


    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY*1.5, mySceneBRX, mySceneBRY*1.5);	


}
function cleanDrop() {
	for(var i in dropBody){
		dropBody[i].visible = false;
	}
}
function updateExperimentElements(t, dt) {
	for(var i in selectedBody){
		waterBody[selectedBody[i]].visible = true;
		if(waterBody[selectedBody[i]].position.y > -87 - Yshift){
			var selection = selectedBody[i];
			selectedBody.splice(i, 1);
			if(selection-1 >= 0 && waterBody[selection-1].position.y <= -87 - Yshift){
				selectedBody.push(selection-1);
			}
			if(selection+1 <= 5 && waterBody[selection+1].position.y <= -87 - Yshift){
				selectedBody.push(selection+1);
			}
			if(selectedBody.length == 0 && selection != 6){
				selectedBody.push(6);
			}
			else if(selectedBody.length == 0){
				state = 1;
				PIEstopAnimation();
			}
			
		}
		else{
			waterBody[selectedBody[i]].position.y = waterBody[selectedBody[i]].position.y + 0.2;
		}
	}
	for(var i = 0; i <= 25; i++){
		if(state){
			for(var i in dropBody){
				dropBody[i].visible = false;
			}	
		}
		else{
			dropBody[i].position.y = dropBody[i].position.y - 1;
			if(dropBody[i].position.y <= 110) {
				dropBody[i].visible = true;
			}
			else{
				dropBody[i].visible = false;

			}
			if(dropBody[i].position.y <= -120) {
				dropBody[i].visible = false;
				dropBody[i].position.y = 110;
			}
		}
		

	}
}
