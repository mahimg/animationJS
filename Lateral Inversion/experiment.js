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

var ImageSize = 16;
var ImageObjects = 3;
var NoOfObjects = 26 + 26 + ImageObjects;// Capital and small alphabets
var ImageYdisp = 0;
var ImageXdisp = 0;


var qcount = 0;


var question = true;
var node;
var buttonsT;
var buttonsTL;
var buttonsO;
var bodyy;
var ans;

function initialiseControlVariables() {
	/* Labels */        
	
}
function initialiseControls() {
	initialiseControlVariables();

	/* Create Input Panel *//*
	PIEaddDualCommand("Show " + BallText, handleBall);
	PIEaddDualCommand("Show " + PencilText, handlePencil);*/
}


var helpContent;
function initialiseHelp() {
	helpContent="";
	helpContent = helpContent + "<h2>Lateral Inversion</h2>";
	helpContent = helpContent + "<h3>About the experiment</h3>";
	helpContent = helpContent + "<p>Right side is the mirror.</p>";
	helpContent = helpContent + "<h3>Animation control</h3>";
	helpContent = helpContent + "<p>Click start button to start the animation, wait for a few seconds for the objects and mirror to load. Now drag any object in the yellow part, for optimized dragging select the object from its top.</p>";
	helpContent = helpContent + "<p>To reset the experiment select the reset button on the menu.</p>";
	helpContent = helpContent + "<h2>Have a good time. Happy Experimenting!</h2>";
	// Touch on the top of the object for optimized controls.
	PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo() {
	infoContent =  "";
	infoContent = infoContent + "<h2>Lateral Inversion</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>Lateral inversion is the visual illusion that left and right sides of a mirror image are switched. A person looking in a flat plane mirror who raises his right hand sees his mirror image's left-side hand raise. Lateral inversion is an illusion because, in a plane mirror, the image inverts on an axis perpendicular to the surface of the plane. This means that the mirror image, also known as a virtual image, is the front-to-back invert of the object. Two plane mirrors that are placed at a 90-degree angle from each other create a non-reversing mirror image in each other.</p>";
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

// Custom Dragging {xc < 280 && xc > objects[2*i-2].geometry.vertices[1].x && yc > -210 && yc < 210}
function ObjectDrag(element, newpos)
{
	console.log("ObjectDrag");
    var ObjectX = newpos.x;
    if (newpos.x > 330) { 
    	ObjectX = 330;
    }
    else if (newpos.x < element.geometry.vertices[1].x) { 
    	ObjectX = element.geometry.vertices[1].x;
    }
    var ObjectY = newpos.y;

    if (newpos.y > 210) { 
    	ObjectY = 210;
    }
    else if (newpos.y < -210) { 
    	ObjectY = -210;
    }
    var ObjectZ = newpos.z;

    element.position.set(ObjectX, ObjectY, ObjectZ);
}
function resetExperiment() {
/*
	PIEchangeDisplayCommand("Hide " + GlassText, "Show " + GlassText, handleGlass);
	PIEchangeInputCommand("Hide " + GlassText, "Show " + GlassText, handleGlass);


	PIEchangeDisplayCommand("Hide " + PencilText, "Show " + PencilText, handlePencil);
	PIEchangeInputCommand("Hide " + PencilText, "Show " + PencilText, handlePencil);*/


	ImageYdisp = 0;
	ImageXdisp = 0;
	for (var i = 0; i < NoOfObjects - ImageObjects; i++) {
		j = i%13 + 1;
		ImageXdisp = -3-15*(Math.floor(i/13));
		
		objects[2*i].position.set(250+ImageXdisp, 147-j*(ImageSize + 3), 0);
		objects[2*i+1].position.set(-250-ImageXdisp, 147-j*(ImageSize + 3), 0);
    }

	objects[104].position.set(150, -107 + 40, 0);
	objects[104+1].position.set(-150, -107 + 40, 0);

	objects[106].position.set(150, -107 + 20, 0);
	objects[106+1].position.set(-150, -107 + 20, 0);

	objects[108].position.set(110, -107, 0);
	objects[108+1].position.set(-110, -107, 0);

    PIEstartAnimation();

    

}
function loadExperimentElements() {
	
	PIEsetExperimentTitle("Right or left");
	PIEsetDeveloperName("Mahim Goyal");

	PIEhideControlElement();

	initialiseHelp();
	initialiseInfo();

	initialiseScene();

	// Screen
	var geometry = new THREE.PlaneGeometry( 1000, 1000, 32 );
	var material = new THREE.MeshBasicMaterial( {
		color: 0xFFCC99, 
		side: THREE.DoubleSide, 
		opacity: 1,
		transparent: true,
	} );
	screen1 = new THREE.Mesh( geometry, material );
	screen1.position.set( 0, 0, 200);
	PIEaddElement(screen1);


	//Mirror Screen
	var geometry = new THREE.PlaneGeometry( mySceneW*2 + 20, mySceneH*2 );
	var texture = new THREE.TextureLoader().load( "img/mirror.jpg" );
	var img = new THREE.MeshBasicMaterial({
		color: 0x99FFFF,
		side: THREE.DoubleSide, 
        map: texture,
        opacity: 1,
		transparent: true,
    });
	screen1 = new THREE.Mesh( geometry, img );
	screen1.position.set( -206, 0, 150);
	PIEaddElement(screen1);

	//Middle bar
	var geometry = new THREE.PlaneGeometry( 6, 300 );
	var material = new THREE.MeshBasicMaterial( {
		color: 0x000000, 
		side: THREE.DoubleSide, 
		opacity: 1,
		transparent: true,
	} );
	screen1 = new THREE.Mesh( geometry, material );
	screen1.position.set( 0, 0, -10);
	PIEaddElement(screen1);
	// Light
	var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 1, 200 ).normalize();
    PIEaddElement(light);

    for (var i = 1; i <= NoOfObjects - ImageObjects; i++) {
	 	var imageLocation = "img/" + i + ".png";
	    // Object
	    var texture = new THREE.TextureLoader().load( imageLocation );
		var img = new THREE.MeshBasicMaterial({
			color: 0x99FFFF,
			side: THREE.DoubleSide, 
	        map: texture,
	        opacity: 1,
			transparent: true,
	    });
	    var tempAlpha = new THREE.Mesh(new THREE.PlaneGeometry(ImageSize, ImageSize), img);
	    tempAlpha.position.set(0,0,100);
	    tempAlpha.overflow = true;
	    tempAlpha.scale.x = -1;
	    objects.push(tempAlpha);
	    PIEaddElement(tempAlpha);

	    PIEdragElement(tempAlpha);
	    PIEsetDrag(tempAlpha, ObjectDrag);

	    //Mirror Image
		var img = new THREE.MeshBasicMaterial({
			color: 0x99FFFF,
			side: THREE.DoubleSide, 
	        map: texture,
	        opacity: 1,
			transparent: true,
	    });
	    var tempAlphaCopy = new THREE.Mesh(new THREE.PlaneGeometry(ImageSize, ImageSize), img);
	    tempAlphaCopy.position.set(0,0,-100);
	    tempAlphaCopy.overflow = true;
		objects.push(tempAlphaCopy);
	    PIEaddElement(tempAlphaCopy);
    }
    
	var imageLocation = "img/53.png";
    // Ambulance
    var texture = new THREE.TextureLoader().load( imageLocation );
	var img = new THREE.MeshBasicMaterial({
		color: 0x99FFFF,
		side: THREE.DoubleSide, 
        map: texture,
        opacity: 1,
		transparent: true,
    });
    var tempAlpha = new THREE.Mesh(new THREE.PlaneGeometry(80, 15), img);
    tempAlpha.position.set(0,0,100);
    tempAlpha.overflow = true;
    tempAlpha.scale.x = -1;
    objects.push(tempAlpha);
    PIEdragElement(tempAlpha);
    PIEaddElement(tempAlpha);
	PIEsetDrag(tempAlpha, ObjectDrag);

    //Mirror Image
	var img = new THREE.MeshBasicMaterial({
		color: 0x99FFFF,
		side: THREE.DoubleSide, 
        map: texture,
        opacity: 1,
		transparent: true,
    });
    var tempAlphaCopy = new THREE.Mesh(new THREE.PlaneGeometry(80, 15), img);
    tempAlphaCopy.position.set(0,0,-100);
    tempAlphaCopy.overflow = true;
	objects.push(tempAlphaCopy);
    PIEaddElement(tempAlphaCopy);

    var imageLocation = "img/54.png";
    // google
    var texture = new THREE.TextureLoader().load( imageLocation );
	var img = new THREE.MeshBasicMaterial({
		color: 0x99FFFF,
		side: THREE.DoubleSide, 
        map: texture,
        opacity: 1,
		transparent: true,
    });
    var tempAlpha = new THREE.Mesh(new THREE.PlaneGeometry(60, 24), img);
    tempAlpha.position.set(0,0,100 );
    tempAlpha.overflow = true;
    tempAlpha.scale.x = -1;
    objects.push(tempAlpha);
    PIEdragElement(tempAlpha);
    PIEaddElement(tempAlpha);
    PIEsetDrag(tempAlpha, ObjectDrag);

    //Mirror Image
	var img = new THREE.MeshBasicMaterial({
		color: 0x99FFFF,
		side: THREE.DoubleSide, 
        map: texture,
        opacity: 1,
		transparent: true,
    });
    var tempAlphaCopy = new THREE.Mesh(new THREE.PlaneGeometry(60, 24), img);
    tempAlphaCopy.position.set(0,0,-100);
    tempAlphaCopy.overflow = true;
	objects.push(tempAlphaCopy);
    PIEaddElement(tempAlphaCopy);

    var imageLocation = "img/55.png";
    // Man
    var texture = new THREE.TextureLoader().load( imageLocation );
	var img = new THREE.MeshBasicMaterial({
		color: 0x99FFFF,
		side: THREE.DoubleSide, 
        map: texture,
        opacity: 1,
		transparent: true,
    });
    var tempAlpha = new THREE.Mesh(new THREE.PlaneGeometry(30, 50), img);
    tempAlpha.position.set(0,0,100);
    tempAlpha.overflow = true;
    tempAlpha.scale.x = -1;
    objects.push(tempAlpha);
    PIEdragElement(tempAlpha);
    PIEaddElement(tempAlpha);
    PIEsetDrag(tempAlpha, ObjectDrag);

    //Mirror Image
	var img = new THREE.MeshBasicMaterial({
		color: 0x99FFFF,
		side: THREE.DoubleSide, 
        map: texture,
        opacity: 1,
		transparent: true,
    });
    var tempAlphaCopy = new THREE.Mesh(new THREE.PlaneGeometry(30, 50), img);
    tempAlphaCopy.position.set(0,0,-100);
    tempAlphaCopy.overflow = true;
	objects.push(tempAlphaCopy);
    PIEaddElement(tempAlphaCopy);
    





	/* Instantiate experiment controls */
    initialiseControls();


    /* Reset all positions */
    resetExperiment();

    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY*1.5, mySceneBRX, mySceneBRY*1.5);	


}

function updateExperimentElements(t, dt) {
	for (var i = 1; i <= NoOfObjects; i++) {
		var xc = objects[2*i-2].position.x;
		var yc = objects[2*i-2].position.y;
		var zc = objects[2*i-2].position.z;
		objects[2*i-1].position.set(-1*xc, yc, zc);
		
    }
}
