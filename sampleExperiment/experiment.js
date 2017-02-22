var renderer = new THREE.WebGLRenderer();
var objects = [];
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

var BallText;
var PencilText;
var PaperText;
var GlassText;
var BottleText;
var WoodText;
var FglassText;


var rubberball;
var plane;
var cone;
var cylinder_1;
var cone1;
var glass;
var wood;	
var bottle;
var fglass;

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
	BallText = "Ball";                
	PencilText = "Pencil";                  
	PaperText = "Paper";               
	GlassText = "Glass Slab";    
	WoodText = "Wood";
	FglassText = "Frosted Glass";
	BottleText = "Plastic Bottle";
}

function handleBall() {	
	objectshow(rubberball);
	PIEchangeDisplayCommand("Show " + BallText, "Hide " + BallText , handleBallHide);
	PIEchangeInputCommand("Show " + BallText, "Hide " + BallText , handleBallHide);
}
function handleBallHide() {
	objecthide(rubberball);
	PIEchangeDisplayCommand("Hide " + BallText, "Show " + BallText , handleBall);
	PIEchangeInputCommand("Hide " + BallText, "Show " + BallText , handleBall);
}

function handlePaper() {
	objectshow(plane);
	PIEchangeDisplayCommand("Show " + PaperText, "Hide " + PaperText , handlePaperHide);
	PIEchangeInputCommand("Show " + PaperText, "Hide " + PaperText , handlePaperHide);
}
function handlePaperHide() {
	objecthide(plane);
	PIEchangeDisplayCommand("Hide " + PaperText, "Show " + PaperText , handlePaper);
	PIEchangeInputCommand("Hide " + PaperText, "Show " + PaperText , handlePaper);
}

function handlePencil() {
	objectshow(cylinder_1);
	PIEchangeDisplayCommand("Show " + PencilText, "Hide " + PencilText , handlePencilHide);
	PIEchangeInputCommand("Show " + PencilText, "Hide " + PencilText , handlePencilHide);
}
function handlePencilHide() {
	objecthide(cylinder_1);
	PIEchangeDisplayCommand("Hide " + PencilText, "Show " + PencilText , handlePencil);
	PIEchangeInputCommand("Hide " + PencilText, "Show " + PencilText , handlePencil);
}

function handleGlass() {
	objectshow(glass);
	PIEchangeDisplayCommand("Show " + GlassText, "Hide " + GlassText , handleGlassHide);
	PIEchangeInputCommand("Show " + GlassText, "Hide " + GlassText , handleGlassHide);
}
function handleGlassHide() {
	objecthide(glass);
	PIEchangeDisplayCommand("Hide " + GlassText, "Show " + GlassText , handleGlass);
	PIEchangeInputCommand("Hide " + GlassText, "Show " + GlassText , handleGlass);
}
function handleWood() {
	objectshow(wood);
	PIEchangeDisplayCommand("Show " + WoodText, "Hide " + WoodText , handleWoodHide);
	PIEchangeInputCommand("Show " + WoodText, "Hide " + WoodText , handleWoodHide);
}
function handleWoodHide() {
	objecthide(wood);
	PIEchangeDisplayCommand("Hide " + WoodText, "Show " + WoodText , handleWood);
	PIEchangeInputCommand("Hide " + WoodText, "Show " + WoodText , handleWood);
}
function handleBottle() {
	objectshow(bottle);
	PIEchangeDisplayCommand("Show " + BottleText, "Hide " + BottleText , handleBottleHide);
	PIEchangeInputCommand("Show " + BottleText, "Hide " + BottleText , handleBottleHide);
}
function handleBottleHide() {
	objecthide(bottle);
	PIEchangeDisplayCommand("Hide " + BottleText, "Show " + BottleText , handleBottle);
	PIEchangeInputCommand("Hide " + BottleText, "Show " + BottleText , handleBottle);
}
function handleFglass() {
	objectshow(fglass);
	PIEchangeDisplayCommand("Show " + FglassText, "Hide " + FglassText , handleFglassHide);
	PIEchangeInputCommand("Show " + FglassText, "Hide " + FglassText , handleFglassHide);
}
function handleFglassHide() {
	objecthide(fglass);
	PIEchangeDisplayCommand("Hide " + FglassText, "Show " + FglassText , handleFglass);
	PIEchangeInputCommand("Hide " + FglassText, "Show " + FglassText , handleFglass);
}







function objectshow(object) {
	object.visible = true;
    PIErender();
}
function objecthide(object) {
	object.visible = false;
	PIErender();
}

function BallhandleZ(newValue) {
    rubberball.position.set(rubberball.position.x, rubberball.position.y, newValue*(-1));
    PIErender()
}
function PencilhandleZ(newValue) {
    cylinder_1.position.set(cylinder_1.position.x, cylinder_1.position.y, newValue*(-1));
    PIErender()
}
function GlasshandleZ(newValue) {
    glass.position.set(glass.position.x, glass.position.y, newValue*(-1));
    PIErender()
}
function PaperhandleZ(newValue) {
    plane.position.set(plane.position.x, plane.position.y, newValue*(-1));
    PIErender()
}
function WoodhandleZ(newValue) {
    wood.position.set(wood.position.x, wood.position.y, newValue*(-1));
    PIErender()
}
function FglasshandleZ(newValue) {
    fglass.position.set(fglass.position.x, fglass.position.y, newValue*(-1));
    PIErender()
}
function BottlehandleZ(newValue) {
    bottle.position.set(bottle.position.x, bottle.position.y, newValue*(-1));
    PIErender()
}

function initialiseControls() {
	initialiseControlVariables();

	/* Create Input Panel */
	PIEaddDualCommand("Show " + BallText, handleBall);
	PIEaddDualCommand("Show " + PencilText, handlePencil);
	PIEaddDualCommand("Show " + PaperText, handlePaper);
	PIEaddDualCommand("Show " + GlassText, handleGlass);
	PIEaddDualCommand("Show " + WoodText, handleWood);
	PIEaddDualCommand("Show " + FglassText, handleFglass);
	PIEaddDualCommand("Show " + BottleText, handleBottle);

	PIEaddDualCommand("Show Question", insertText);

	PIEaddInputSlider(BallText, Zdefault, BallhandleZ, Zmin, Zmax, Zstep);
	PIEaddInputSlider(PencilText, Zdefault, PencilhandleZ, Zmin, Zmax, Zstep);
	PIEaddInputSlider(PaperText, Zdefault, PaperhandleZ, Zmin, Zmax, Zstep);
	PIEaddInputSlider(GlassText, Zdefault, GlasshandleZ, Zmin, Zmax, Zstep);
	PIEaddInputSlider(WoodText, Zdefault, WoodhandleZ, Zmin, Zmax, Zstep);
	PIEaddInputSlider(BottleText, Zdefault, BottlehandleZ, Zmin, Zmax, Zstep);
	PIEaddInputSlider(FglassText, Zdefault, FglasshandleZ, Zmin, Zmax, Zstep);
}


var helpContent;
function initialiseHelp() {
	helpContent="";
	helpContent = helpContent + "<h2>Transparent, translucent and opaque objects </h2>";
	helpContent = helpContent + "<h3>About the experiment</h3>";
	helpContent = helpContent + "<p>The experiment shows a burning Candle. Bring objects in front of it to observe their property</p>";
	helpContent = helpContent + "<h3>Animation control</h3>";
	helpContent = helpContent + "<p>The top line has animation controls. To display an object select the button on the controls panel.</p>";
	helpContent = helpContent + "<p>To reset the experiment select the reset button on the menu.</p>";

	helpContent = helpContent + "<h3>The setup stage</h3>";
	helpContent = helpContent + "<p>You can drag the objects in front of candle to observe the behaviour of the object.</p>";
	helpContent = helpContent + "<p>To hide a object click on the appropriate button on the control panel.</p>";
	helpContent = helpContent + "</ul>";
	helpContent = helpContent + "<p>You can also try viewing the candle from multiple objects. To do this move the input slider in the input panel. To bring an object to front increase the value in the panel and vice versa.</p>";
	helpContent = helpContent + "<h3>Learning</h3>";
	helpContent = helpContent + "<p>When you have tried out the objects take a quiz.</p>";
	helpContent = helpContent + "<p>Select the 'Show Question'/'Next Question' button on the control panel. A Question will be displayed. </p>";
	helpContent = helpContent + "<p>To remove the question pane just refresh the page.</p>";
	helpContent = helpContent + "<h2>Have a good time. Happy Experimenting!</h2>";
	PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo() {
	infoContent =  "";
	infoContent = infoContent + "<h2>TRANSPARENT, OPAQUE AND TRANSLUCENT OBJECTS</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p> If we cannot see through an object at all, it is an opaque object. If you are able to see clearly through an object, it is allowing light to pass through it and is transparent. There are some objects through which we can see, but not very clearly. Such objects are known as translucent.</p>";
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
    rubberball.position.set(0, 40, -20);
    plane.position.set(0, 40, -20);
	cylinder_1.position.set(0, 40, -20);
	glass.position.set(0, 40, -20);
	wood.position.set(0, 40, -20);
	fglass.position.set(0, 40, -20);
	bottle.position.set(0, 40, -20);

	rubberball.visible = false;
	plane.visible = false;
	cylinder_1.visible = false;
	glass.visible = false;
	wood.visible = false;
	fglass.visible = false;
	bottle.visible = false;



	if (!question) {
		document.getElementById("answer").innerHTML = "";
	}
	PIErender();


	PIEchangeDisplayCommand("Hide " + GlassText, "Show " + GlassText, handleGlass);
	PIEchangeInputCommand("Hide " + GlassText, "Show " + GlassText, handleGlass);


	PIEchangeDisplayCommand("Hide " + PencilText, "Show " + PencilText, handlePencil);
	PIEchangeInputCommand("Hide " + PencilText, "Show " + PencilText, handlePencil);


	PIEchangeDisplayCommand("Hide " + PaperText, "Show " + PaperText, handlePaper);
	PIEchangeInputCommand("Hide " + PaperText, "Show " + PaperText, handlePaper);


	PIEchangeDisplayCommand("Hide " + BallText, "Show " + BallText, handleBall);
	PIEchangeInputCommand("Hide " + BallText, "Show " + BallText, handleBall);

	PIEchangeDisplayCommand("Hide " + WoodText, "Show " + WoodText, handleWood);
	PIEchangeInputCommand("Hide " + WoodText, "Show " + WoodText, handleWood);

	PIEchangeDisplayCommand("Hide " + FglassText, "Show " + FglassText, handleFglass);
	PIEchangeInputCommand("Hide " + FglassText, "Show " + FglassText, handleFglass);

	PIEchangeDisplayCommand("Hide " + BottleText, "Show " + BottleText, handleBottle);
	PIEchangeInputCommand("Hide " + BottleText, "Show " + BottleText, handleBottle);
}
function loadExperimentElements() {
	
	PIEsetExperimentTitle("Transparent, translucent and opaque objects");
	PIEsetDeveloperName("Mahim Goyal");

	PIEhideControlElement();

	initialiseHelp();
	initialiseInfo();

	initialiseScene();

	// Light
	var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 1, 200 ).normalize();
    PIEaddElement(light);

	// Candle geometry
	var geometry = new THREE.SphereGeometry( 5, 32, 32, 0, 2*Math.PI );
	var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	var sphere = new THREE.Mesh( geometry, material );
	sphere.position.set( 0, 10, 0);
	sphere.castShadow = true;


	var geometry = new THREE.ConeGeometry( 5, 20, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	var cone = new THREE.Mesh( geometry, material );
	cone.position.set( 0, 10, 0);
	sphere.add(cone);
	PIEaddElement(sphere);

	var geometry = new THREE.CylinderGeometry( 5, 5, 70, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0x66CCCC} );
	var cylinder = new THREE.Mesh( geometry, material );
	cylinder.position.set( 0, -30, 0);
	PIEaddElement(cylinder);

	//Rubber Ball
	var geometry = new THREE.SphereGeometry( 15, 32, 32, 0, 2*Math.PI );
	var material = new THREE.MeshBasicMaterial( {color: 0x660000} );
	rubberball = new THREE.Mesh( geometry, material );
	rubberball.position.set( 0, 0, 0);
	rubberball.visible = false;
	objects.push(rubberball);
	PIEaddElement(rubberball);
	PIEdragElement(rubberball);


	//Sheet of paper
	var geometry = new THREE.PlaneGeometry( 50, 50, 32 );
	var material = new THREE.MeshBasicMaterial( {
		color: 0xFFCC99, 
		side: THREE.DoubleSide, 
		opacity: 0.8,
		transparent: true,
	} );
	plane = new THREE.Mesh( geometry, material );
	plane.position.set( 0, 40, 0);
	plane.visible = false;
	objects.push(plane);
	PIEaddElement(plane);
	PIEdragElement(plane);
	
	//Pencil
	var geometry = new THREE.ConeGeometry( 2, 10, 8 );
	var material = new THREE.MeshBasicMaterial( {color: 0xFFCC66} );
	cone = new THREE.Mesh( geometry, material );
	cone.position.set( 0, 40, 0);

	var geometry = new THREE.CylinderGeometry( 2, 2, 70, 8 );
	for ( var i = 0; i < geometry.faces.length-1; i = i + 2 ) {
	    geometry.faces[ i ].color.setHex(  0x660000 );
	    geometry.faces[ i+1 ].color.setHex(  0x990000 );
	}
	var material = new THREE.MeshBasicMaterial( {color: 0xFF3333} );
	material.vertexColors = THREE.FaceColors;
	cylinder_1 = new THREE.Mesh( geometry, material );
	cylinder_1.position.set( 0, 50, 0);
	cylinder_1.add(cone);

	var geometry = new THREE.ConeGeometry( 1, 5, 8 );
	var material = new THREE.MeshBasicMaterial( {color: 0x000000} );
	cone1 = new THREE.Mesh( geometry, material );
	cone1.position.set( 0, 43, 0);
	cylinder_1.add(cone1);
	cylinder_1.visible = false;
	objects.push(cylinder_1);
	PIEaddElement(cylinder_1);
	PIEdragElement(cylinder_1);


	//Glass Slab
	var geometry = new THREE.BoxGeometry( 50, 50 ,10);
	var material = new THREE.MeshBasicMaterial( {
		color: 0x99FFFF	,
		side: THREE.DoubleSide, 
		opacity: 0.2,
		transparent: true,
	} );
	glass = new THREE.Mesh( geometry, material );
	glass.position.set( 0, 40, 0);
	glass.visible = false;
	objects.push(glass);
	PIEaddElement(glass);
	PIEdragElement(glass);


	// Screen
	var geometry = new THREE.PlaneGeometry( 5000, 5000, 32 );
	var material = new THREE.MeshBasicMaterial( {
		color: 0xFF3333, 
		side: THREE.DoubleSide, 
		opacity: 1,
		transparent: true,
	} );
	screen1 = new THREE.Mesh( geometry, material );
	screen1.position.set( 0, 0, 200);
	PIEaddElement(screen1);

	var ambient = new THREE.AmbientLight( 0x555555 );
	PIEaddElement( ambient );


	// wood	

	var texture = new THREE.TextureLoader().load( "img/wood1.png" );
	texture.wrapS = THREE.ClampToEdgeWrapping
	texture.wrapT = THREE.ClampToEdgeWrapping
	var img = new THREE.MeshBasicMaterial({
		side: THREE.DoubleSide, 
        map: texture,
        opacity: 1,
		transparent: true,
    });
    wood = new THREE.Mesh(new THREE.CircleGeometry(22, 20), img);
    wood.position.set(0,0,-100);
    wood.overflow = true;
    objects.push(wood);
    PIEdragElement(wood);
    PIEaddElement(wood);

    // bottle
    var texture = new THREE.TextureLoader().load( "img/bottle4.png" );
	texture.wrapS = THREE.ClampToEdgeWrapping
	texture.wrapT = THREE.ClampToEdgeWrapping
	var img = new THREE.MeshBasicMaterial({
		color: 0x99FFFF,
		side: THREE.DoubleSide, 
        map: texture,
        opacity: 1,
		transparent: true,
    });
    bottle = new THREE.Mesh(new THREE.PlaneGeometry(60, 80), img);
    bottle.position.set(0,0,-100);
    bottle.overflow = true;
    objects.push(bottle);
    PIEdragElement(bottle);
    PIEaddElement(bottle);

    // frosted glass
    var texture = new THREE.TextureLoader().load( "img/fglass.jpg" );
	texture.wrapS = THREE.ClampToEdgeWrapping
	texture.wrapT = THREE.ClampToEdgeWrapping
	var img = new THREE.MeshBasicMaterial({
		color: 0x99FFFF,
		side: THREE.DoubleSide, 
        map: texture,
        opacity: 0.85,
		transparent: true,
    });
    fglass = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), img);
    fglass.position.set(0,0,-100);
    fglass.overflow = true;
    objects.push(fglass);
    PIEdragElement(fglass);
    PIEaddElement(fglass);





	/* Instantiate experiment controls */
    initialiseControls();


    /* Reset all positions */
    resetExperiment();

    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);	

}
function insertText () {
	resetExperiment();
	if (question) {
		node = document.createElement("DIV");      
		var textnode = document.createTextNode("Is the object displayed: ");
		node.appendChild(textnode);
		bodyy = document.getElementsByTagName("BODY")[0];
		bodyy.appendChild(node);

		var att = document.createAttribute("id");
		att.value = "infoo";
		node.setAttributeNode(att);

		var att = document.createAttribute("style");
		att.value = "position: absolute; top: 100px; left : -100px; width: 100%; text-align: center; display:block; color: 0x663333; font-size: 20px; font-family: Times New Roman;";
		node.setAttributeNode(att);

		buttonsT = document.createElement("BUTTON");
		var textnode = document.createTextNode("Transparent");
		buttonsT.appendChild(textnode);
		node.appendChild(buttonsT);	

		var att = document.createAttribute("onclick");
		att.value = "ans_wrong()";
		buttonsT.setAttributeNode(att);


		var textnode = document.createTextNode(" or ");
		node.appendChild(textnode);

		buttonsTL = document.createElement("BUTTON");
		var textnode = document.createTextNode("Translucent");
		buttonsTL.appendChild(textnode);
		node.appendChild(buttonsTL);	

		var att = document.createAttribute("onclick");
		att.value = "ans_wrong()";
		buttonsTL.setAttributeNode(att);

		
		var textnode = document.createTextNode(" or ");
		node.appendChild(textnode);

		buttonsO = document.createElement("BUTTON");
		var textnode = document.createTextNode("Opaque");
		buttonsO.appendChild(textnode);
		node.appendChild(buttonsO);	

		var att = document.createAttribute("onclick");
		att.value = "ans_wrong()";
		buttonsO.setAttributeNode(att);
		question = false;

		var textnode = document.createTextNode(" ?");
		node.appendChild(textnode);
		document.getElementsByTagName("BODY")[0].appendChild(node);


		br = document.createElement("BR");
		node.appendChild(br);	

		ans = document.createElement("DIV");
		node.appendChild(ans);

		var att = document.createAttribute("id");
		att.value = "answer";
		ans.setAttributeNode(att);
	}
	qcount++;
	if (qcount > 6){
		qcount = 0;
	}; // rubberball, paper, pencil, glass slab, wood, bottle, frosted glass
	var randomNo = qcount;
	objects[randomNo].visible = true;
	objects[randomNo].position.set(-50, 40, -20);
	PIErender();

	if (!question) {
		
	}


	if (randomNo == 0 || randomNo == 2 || randomNo == 4) {
		buttonsO.setAttribute("onclick", "ans_right()");
		buttonsTL.setAttribute("onclick", "ans_wrong()");
		buttonsT.setAttribute("onclick", "ans_wrong()");
	}
	else if (randomNo == 1 || randomNo == 6) {
		buttonsTL.setAttribute("onclick", "ans_right()");
		buttonsO.setAttribute("onclick", "ans_wrong()");
		buttonsT.setAttribute("onclick", "ans_wrong()");
	}
	else {
		buttonsT.setAttribute("onclick", "ans_right()");
		buttonsTL.setAttribute("onclick", "ans_wrong()");
		buttonsO.setAttribute("onclick", "ans_wrong()");
	}
	PIEchangeInputCommand("Show Question", "Next Question", insertText);
	PIEchangeDisplayCommand("Show Question", "Next Question", insertText);




} 
function ans_wrong() {
	document.getElementById("answer").innerHTML = "";
	var colorcode = document.createAttribute("style");
	colorcode.value = "color: #B60000;";
	document.getElementById("answer").setAttributeNode(colorcode); 
	var textnode = document.createTextNode("Wrong Answer, Try Again!");
	ans.appendChild(textnode);
}
function ans_right() {
	document.getElementById("answer").innerHTML = "";

	var colorcode = document.createAttribute("style");
	colorcode.value = "color: #106800;";
	document.getElementById("answer").setAttributeNode(colorcode); 
	var textnode = document.createTextNode("Congratulations, thats right answer!");
	ans.appendChild(textnode);
}
