var renderer = new THREE.WebGLRenderer();

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


var rubberball;
var plane;
var cone;
var cylinder_1;
var cone1;
var glass;

function initialiseControlVariables()
{
	/* Labels */
	BallText="Ball";                
	PencilText="Pencil";                  
	PaperText="Paper";               
	GlassText="Glass Slab";      

	/* Default (initial) Values */
}

function handleBall()
{	
	objectshow(rubberball);
	PIEchangeDisplayCommand(BallText+ " Show", BallText + " Hide", handleBallHide);
	PIEchangeInputCommand(BallText+ " Show", BallText + " Hide", handleBallHide);
}
function handleBallHide()
{
	objecthide(rubberball);
	PIEchangeDisplayCommand(BallText+ " Hide", BallText + " Show", handleBall);
	PIEchangeInputCommand(BallText+ " Hide", BallText + " Show", handleBall);
}

function handlePaper()
{
	objectshow(plane);
	PIEchangeDisplayCommand(PaperText+ " Show", PaperText + " Hide", handlePaperHide);
	PIEchangeInputCommand(PaperText+ " Show", PaperText + " Hide", handlePaperHide);
}
function handlePaperHide()
{
	objecthide(plane);
	PIEchangeDisplayCommand(PaperText+ " Hide", PaperText + " Show", handlePaper);
	PIEchangeInputCommand(PaperText+ " Hide", PaperText + " Show", handlePaper);
}

function handlePencil()
{
	objectshow(cylinder_1);
	PIEchangeDisplayCommand(PencilText+ " Show", PencilText + " Hide", handlePencilHide);
	PIEchangeInputCommand(PencilText+ " Show", PencilText + " Hide", handlePencilHide);
}
function handlePencilHide()
{
	objecthide(cylinder_1);
	PIEchangeDisplayCommand(PencilText+ " Hide", PencilText + " Show", handlePencil);
	PIEchangeInputCommand(PencilText+ " Hide", PencilText + " Show", handlePencil);
}

function handleGlass()
{
	objectshow(glass);
	PIEchangeDisplayCommand(GlassText+ " Show", GlassText + " Hide", handleGlassHide);
	PIEchangeInputCommand(GlassText+ " Show", GlassText + " Hide", handleGlassHide);
}
function handleGlassHide()
{
	objecthide(glass);
	PIEchangeDisplayCommand(GlassText+ " Hide", GlassText + " Show", handleGlass);
	PIEchangeInputCommand(GlassText+ " Hide", GlassText + " Show", handleGlass);
}







function objectshow(object)
{
	object.visible = true;
    PIErender();
}
function objecthide(object)
{
	object.visible = false;
	PIErender();
}

function BallhandleZ(newValue)
{
    rubberball.position.set(rubberball.position.x, rubberball.position.y, newValue*(-1));
    PIErender()
}
function PencilhandleZ(newValue)
{
    cylinder_1.position.set(cylinder_1.position.x, cylinder_1.position.y, newValue*(-1));
    PIErender()
}
function GlasshandleZ(newValue)
{
    glass.position.set(glass.position.x, glass.position.y, newValue*(-1));
    PIErender()
}
function PaperhandleZ(newValue)
{
    plane.position.set(plane.position.x, plane.position.y, newValue*(-1));
    PIErender()
}

function initialiseControls()
{
	initialiseControlVariables();
	// pieaddbutton or something of this sort?

	/* Create Input Panel */
	PIEaddDualCommand(BallText+ " Show", handleBall);
/*	PIEaddDualCommand(BallText+ " Hide", handleBallHide);
*/
	PIEaddDualCommand(PencilText+ " Show", handlePencil);
/*	PIEaddDualCommand(PencilText+ " Hide", handlePencilHide);
*/
	PIEaddDualCommand(PaperText+ " Show", handlePaper);
/*	PIEaddDualCommand(PaperText+ " Hide", handlePaperHide);
*/
	PIEaddDualCommand(GlassText+ " Show", handleGlass);
/*	PIEaddDualCommand(GlassText+ " Hide", handleGlassHide);
*/

	PIEaddInputSlider(BallText, Zdefault, BallhandleZ, Zmin, Zmax, Zstep);
	PIEaddInputSlider(PencilText, Zdefault, PencilhandleZ, Zmin, Zmax, Zstep);
	PIEaddInputSlider(PaperText, Zdefault, PaperhandleZ, Zmin, Zmax, Zstep);
	PIEaddInputSlider(GlassText, Zdefault, GlasshandleZ, Zmin, Zmax, Zstep);
}


var helpContent;
function initialiseHelp()
{
	helpContent="";
	helpContent = helpContent + "<h2>Add help info here</h2>";
	/*helpContent = helpContent + "<h3>About the experiment</h3>";
	helpContent = helpContent + "<p>The experiment shws a bouncing ball constrained by left, right, top and bottom walls.</p>";
	helpContent = helpContent + "<h3>Animation control</h3>";
	helpContent = helpContent + "<p>The top line has animation controls. There are two states of the experiment.</p>";
	helpContent = helpContent + "<h3>The setup stage</h3>";
	helpContent = helpContent + "<p>The initial state is setup stage. In this stage, you can see a control window at the right. You have access to five sliders.</p>";
	helpContent = helpContent + "<p>You can control the following:</p>";
	helpContent = helpContent + "<ul>";
	helpContent = helpContent + "<li>X&nbsp;&nbsp;:&nbsp;Controls the X position of the ball.</li>";
	helpContent = helpContent + "<li>Y&nbsp;&nbsp;:&nbsp;Controls the Y position of the ball.</li>";
	helpContent = helpContent + "<li>VX&nbsp;:&nbsp;Controls the X velocity of the ball.</li>";
	helpContent = helpContent + "<li>VY&nbsp;:&nbsp;Controls the Y velocity of the ball.</li>";
	helpContent = helpContent + "<li>AY&nbsp;:&nbsp;Controls the Y acceleration of the ball.</li>";
	helpContent = helpContent + "</ul>";
	helpContent = helpContent + "<p>You also have an additional text input to control the coefficient of restitution of the bottom floor.</p>";
	helpContent = helpContent + "<p>Once you setup the experiment, you can enter the animation stage by clicking the start button</p>";
	helpContent = helpContent + "<h3>The animation stage</h3>";
	helpContent = helpContent + "<p>In the animation stage, the ball will bounce around obeyng the laws of physics.</p>";
	helpContent = helpContent + "<p>The right hand panel now shows the values of the four experiment variables during animation.</p>";
	helpContent = helpContent + "<ul>";
	helpContent = helpContent + "<li>X&nbsp;&nbsp;:&nbsp;Shows the X position of the ball.</li>";
	helpContent = helpContent + "<li>Y&nbsp;&nbsp;:&nbsp;Shows the Y position of the ball.</li>";
	helpContent = helpContent + "<li>VX&nbsp;:&nbsp;Shows the X velocity of the ball.</li>";
	helpContent = helpContent + "<li>VY&nbsp;:&nbsp;Shows the Y velocity of the ball.</li>";
	helpContent = helpContent + "</ul>";
	helpContent = helpContent + "<p>In addition you will also see two sliders showing potential and kinetic energy.</p>";
	helpContent = helpContent + "<p>You can pause and resume the animation by using the pause/play nutton on the top line</p>";
	helpContent = helpContent + "<p>You can slow down and speed up the animaion by uing the speed control buttons</p>";
	helpContent = helpContent + "<h3>The drag and drop</h3>";
	helpContent = helpContent + "<p>You can also position the ball by dragging and dropping it. You can only do this in the setup stage. This has been prevented in the animation stage.</p>";
	helpContent = helpContent + "<h2>Happy Experimenting</h2>";*/
	PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo()
{
	infoContent =  "";
	infoContent = infoContent + "<h2>Write info content here</h2>";
/*    infoContent = infoContent + "<h3>About the experiment</h3>";
	infoContent = infoContent + "<p>The experiment shws a bouncing ball constrained by left, right, top and bottom walls.</p>";
	infoContent = infoContent + "<h3>Collision</h3>";
	infoContent = infoContent + "<p>When an object collides with a surface, the direction of velocity normal to the surface is reversed.</p>";
	infoContent = infoContent + "<p>At the time of impact, the ball is deformed because of the force of the wall. This deformation can be easily observed with a sponge ball. If you drop a ball of dough on the floor, it does not bounce, it is only deformed.</p>";
	infoContent = infoContent + "<p>The harder balls are also deformed. But because of the hard nature of the meterial, the hard ball tries to regain it's shape. This attempt to reain the shape reverses the velocity by pushing aainst the wall.</p>";
	infoContent = infoContent + "<p>When the ball collides with the left or the right wall, the velocity in the X direction reverses while the velocity in the Y direction reamains the same.</p>";
	infoContent = infoContent + "<p>When the ball collides with the top or the bottom wall, the velocity in the Y direction reverses while the velocity in the Y direction reamains the same.</p>";
	infoContent = infoContent + "<h3>The coefficient of restitution</h3>";
	infoContent = infoContent + "<p>When the velocity reverses direction, it is not necessary that it's magnitude remains the same.</p>";
	infoContent = infoContent + "<p>The ball may not retain it's original shape and texture. The cricket ball loses it's shine.</p>";
	infoContent = infoContent + "<p>Some of the energy is lost because of the deformation of the ball. The energy loss means that the kinetic energy of the ball will be reduced after impact.</p>";
	infoContent = infoContent + "<p>The coefficient of restitution specifies how much of the velocity will be retained after impact.</p>";
	infoContent = infoContent + "<p>The coefficient of restitution does not affect te velocity in the direction parallel to the impact.</p>";
	infoContent = infoContent + "<p>When the ball collides with the left or the right wall, the magnitude of the velocity in the X direction will reduce as per the coefficient of restitution. The magnitude and sign in Y direction remains the same.</p>";
	infoContent = infoContent + "<p>When the ball collides with the top or the bottom wall, the magnitude of the velocity in the Y direction will reduce as per the coefficient of restitution. The magnitude and sign in X direction remains the same.</p>";
	infoContent = infoContent + "<h2>Happy Experimenting</h2>";*/
	PIEupdateInfo(infoContent);
}
function initialiseScene()
{
	renderer.setClearColor( 0xCC99FF );

	/* Initialise Scene Variables */
	mySceneTLX = -100.0;
	mySceneTLY = -100.0;
	mySceneBRX = 100.0;
	mySceneBRY = 100.0;
	mySceneW   = (mySceneBRX - mySceneTLX);
	mySceneH   = (mySceneTLY - mySceneBRY);
	myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
	myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;
	/*myBallZ    = -2.0*/
}
function resetExperiment()
{
    /* initialise Other Variables */
/*    initialiseOtherVariables();
*/
    rubberball.position.set(0, 40, -20);
    plane.position.set( 0, 40, -20);
	cylinder_1.position.set( 0, 40, -20);
	glass.position.set( 0, 40, -20);

	rubberball.visible = false;
	plane.visible = false;
	cylinder_1.visible = false;
	glass.visible = false;

	PIErender();


	PIEchangeDisplayCommand(GlassText+ " Hide", GlassText + " Show", handleGlass);
	PIEchangeInputCommand(GlassText+ " Hide", GlassText + " Show", handleGlass);


	PIEchangeDisplayCommand(PencilText+ " Hide", PencilText + " Show", handlePencil);
	PIEchangeInputCommand(PencilText+ " Hide", PencilText + " Show", handlePencil);


	PIEchangeDisplayCommand(PaperText+ " Hide", PaperText + " Show", handlePaper);
	PIEchangeInputCommand(PaperText+ " Hide", PaperText + " Show", handlePaper);


	PIEchangeDisplayCommand(BallText+ " Hide", BallText + " Show", handleBall);
	PIEchangeInputCommand(BallText+ " Hide", BallText + " Show", handleBall);
}
function loadExperimentElements()
{
	
	PIEsetExperimentTitle("Activity 1 - 6.11.1A Transparent, translucent and opaque objects");
	PIEsetDeveloperName("Mahim Goyal");

	PIEhideControlElement();

	/* initialise help and info content */
	initialiseHelp();
	initialiseInfo();

	/* initialise Scene */
	initialiseScene();

	/* initialise Other Variables */
	/*initialiseOtherVariables();*/
	renderer.setClearColor( 0xCC99FF );

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
	PIEaddElement(plane);
	PIEdragElement(plane);
	
	//Pencil
	var geometry = new THREE.ConeGeometry( 2, 10, 8 );
	var material = new THREE.MeshBasicMaterial( {color: 0xFFCC66} );
	cone = new THREE.Mesh( geometry, material );
	cone.position.set( 0, 40, 0);

	var geometry = new THREE.CylinderGeometry( 2, 2, 70, 8 );
	for ( var i = 0; i < geometry.faces.length-1; i = i + 2 ) {
	    geometry.faces[ i ].color.setHex(  0xffffff );
	    geometry.faces[ i+1 ].color.setHex(  0x990000 );
	}
	var material = new THREE.MeshBasicMaterial( {color: 0xFF3333} );
	material.vertexColors = THREE.FaceColors;
	cylinder_1 = new THREE.Mesh( geometry, material );
	cylinder_1.position.set( 0, 50, 0);
	cylinder_1.add(cone);

	var geometry = new THREE.ConeGeometry( 1, 5, 8 );
	var material = new THREE.MeshBasicMaterial( {color: 0x333333} );
	cone1 = new THREE.Mesh( geometry, material );
	cone1.position.set( 0, 43, 0);
	cylinder_1.add(cone1);
	cylinder_1.visible = false;
	PIEaddElement(cylinder_1);
	PIEdragElement(cylinder_1);


	//Glass Slab
	var geometry = new THREE.BoxGeometry( 50, 50 ,10);
	var material = new THREE.MeshBasicMaterial( {
		color: 0x99CCCC,
		side: THREE.DoubleSide, 
		opacity: 0.5,
		transparent: true,
	} );
	glass = new THREE.Mesh( geometry, material );
	glass.position.set( 0, 40, 0);
	glass.visible = false;
	PIEaddElement(glass);
	PIEdragElement(glass);




	/* Instantiate experiment controls */
    initialiseControls();


    /* Reset all positions */
    resetExperiment();

    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);	

}
function insertText () {
	var node = document.createElement("DIV");                 // Create a <li> node
	var textnode = document.createTextNode("Water");         // Create a text node
	node.appendChild(textnode);                              // Append the text to <li>
	document.getElementsByTagName("BODY")[0].appendChild(node); 	

	var att = document.createAttribute("id");       // Create a "class" attribute
	att.value = "infoo";                           // Set the value of the class attribute
	node.setAttributeNode(att);  

	var att = document.createAttribute("style");       // Create a "class" attribute
	att.value = "position: absolute; top: 100px; left : -100px; width: 100%; text-align: center; z-index: 100; display:block; color: white;";                          
	node.setAttributeNode(att);  

} 