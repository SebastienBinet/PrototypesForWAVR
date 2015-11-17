//<script src="../js/three.min.js"></script>
//<script src="../js/Menu3_Constants.js"></script>
//<script src="../js/Menu3_Globals.js"></script>

var HELIX_DISTANCE = 50;
// var FAR_DISTANCE = 200;
var QTY_ELEMENTS_PER_TURN = 20;
var BASE_TILE_SIZE = 10;
var SEPARATION_BETWEEN_TWO_RIBBON_PASS = 25;
var DAMP = 0.8;
var MAX_SPEED = 50; // max travel on each axis per update
var ANGULAR_DAMP_RATIO = 0.8;
var MAX_ANGULAR_VELOCITY_RAD_PER_UPDATE = Math.PI * 2 / 60; // 60 frames to make a full turn 
var RATIO_DISTANCE_WHEN_NEW_IMAGE = 0.75;



function helix_initTempPopulateDatabase(database) {
	if (database && database.length) {
		for (var i = 0; i < database.length ; i++) {
			if (database[i] == undefined) {
				database[i] = {};
			}


			// position
			database[i].isOnMainHelixRibbon = true;
			database[i].indexForPlaceOnMainHelixRibbon = i; 

			// database[i].goal = {};
			database[i].goalThetaInNbTurn = database[i].indexForPlaceOnMainHelixRibbon/ QTY_ELEMENTS_PER_TURN; // 0 is the top of ribbon and is always in front
			database[i].goalThetaInDegree = database[i].goalThetaInNbTurn * 360;
			database[i].goalThetaInRad = database[i].goalThetaInNbTurn * Math.PI * 2;
			database[i].thetaInRad = database[i].goalThetaInRad;
			


			// Make, Model, year, ...

			
			// image
			var fileName = "../images/mercedes" + (i%11 + 1) + "." + (i%3 +1) +".jpg";
			database[i].url=fileName;

			// filters
			if (i < database.length / 2) {
				database[i].isOnMainHelixRibbon = true;
			} else if (i%2) {
				database[i].isOnMainHelixRibbon = true;
			} else {
				database[i].isOnMainHelixRibbon = false;
			}
		}
	}
}

function helix_initCreateMeshesInDataBase(database) {
	if (database && database.length) {
		var textureForTransparency01 = THREE.ImageUtils.loadTexture( "../images/a-grayBorderDarkCenter.png" );

		for (var i = 0; i < database.length ; i++) {



		// var objectMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( "../images/MyPlaceHolder.png" ), side: THREE.DoubleSide, transparent: true});


			var objectMaterialDefault = new THREE.MeshBasicMaterial({color: 0x020202, alphaMap: textureForTransparency01, side: THREE.DoubleSide, transparent: true});

//             var fileName = "../images/mercedes" + (i + 1) + "." + (0 +1) +".jpg";
//             //                var fileName = "../images/car_" + indexThisItem + "_" + subIndex +".jpg";
// //            if (doesFileExist(fileName)) {
//             if (doesFileExist(fileName)) {

//                 var objectMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( fileName /* "../images/car_2_2.jpg" */ ), side: THREE.DoubleSide, transparent: true});
//             } else {
//                 var objectMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( "../images/MyPlaceHolder.png" ), side: THREE.DoubleSide, transparent: true});
//             }
            
            var objectGeometry = new THREE.PlaneBufferGeometry (BASE_TILE_SIZE, BASE_TILE_SIZE);
            // var objectMesh = new THREE.Mesh( objectGeometry, objectMaterial );
            var objectMesh = new THREE.Mesh( objectGeometry, objectMaterialDefault );
			objectMesh.position.x = Math.random()*10-5;
			objectMesh.position.y = Math.random()*10-5;
			objectMesh.position.z = -10;
			objectMesh.rotation.y = 180  * Math.PI/180;
			scene.add(objectMesh);

			database[i].objectMesh = objectMesh;
			database[i].objectMesh.goal = {};
			database[i].objectMesh.goal.position = {x:objectMesh.position.x, y:objectMesh.position.y, z:objectMesh.position.z};
			database[i].objectMesh.goal.rotation = {x:objectMesh.rotation.x, y:objectMesh.rotation.y, z:objectMesh.rotation.z};

			// loadThisTextureWithThisUrl(database[i].objectMesh,"../images/car_1_1.jpg");



		}
	}
}

function helix_updateIndicesInRibbon(database) {
	var indexInRibbon = 0;
	if (database && database.length) {
		for (var i = 0; i < database.length ; i++) {
			if (database[i].isOnMainHelixRibbon) {
				database[i].indexForPlaceOnMainHelixRibbon = indexInRibbon++;
			} else {
				// not on ribbon, so we hack it as in between two places in ribbon
				database[i].indexForPlaceOnMainHelixRibbon = i-0.5;
			}
		}
	}
}

// function helix_computeMeshesGoalPosition(database) {
// 	// where is the beginning of the helix ribbon
// 	var begY = database.length / 2 / QTY_ELEMENTS_PER_TURN * SEPARATION_BETWEEN_TWO_RIBBON_PASS;

// 	if (database && database.length) {
// 		for (var i = 0; i < database.length ; i++) {

// 			// when object is not on ribbon, it is very far
// 			if (database[i].isOnMainHelixRibbon) {
// 				var distance = HELIX_DISTANCE;
// 				distance *= database[i].isNewlyShow ? RATIO_DISTANCE_WHEN_NEW_IMAGE : 1.0;
// 				// world pos and rot
// 				database[i].objectMesh.goal.position.x =  distance * Math.sin(database[i].thetaInRad);
// 				database[i].objectMesh.goal.position.y =  -SEPARATION_BETWEEN_TWO_RIBBON_PASS * database[i].indexForPlaceOnMainHelixRibbon / QTY_ELEMENTS_PER_TURN + begY;
// 				database[i].objectMesh.goal.position.z = -distance * Math.cos(database[i].thetaInRad);
// 				database[i].objectMesh.goal.rotation.y = - database[i].thetaInRad;
// 			} else {

// 				database[i].objectMesh.goal.position.x = 0;
// 				database[i].objectMesh.goal.position.y = 100;
// 				database[i].objectMesh.goal.position.z = -20;
// 				database[i].objectMesh.goal.rotation.y = - database[i].thetaInRad;;
// 			}

// 		}
// 	}
// }

function helix_computeMeshesGoalTheta(database) {
	// where is the beginning of the helix ribbon
	var begY = database.length / 2 / QTY_ELEMENTS_PER_TURN * SEPARATION_BETWEEN_TWO_RIBBON_PASS;

	if (database && database.length) {
		for (var i = 0; i < database.length ; i++) {

			// compute theta
			database[i].goalThetaInNbTurn = database[i].indexForPlaceOnMainHelixRibbon / QTY_ELEMENTS_PER_TURN; // 0 is the top of ribbon and is always in front
			database[i].goalThetaInDegree = database[i].goalThetaInNbTurn * 360;
			database[i].goalThetaInRad = database[i].goalThetaInNbTurn * Math.PI * 2;
		}
	}
}

// function computeNewValue(old, goal, damp, speedLimit) {
// 	var newValue;
// 	var delta = goal - old;
// 	delta *= 1 - damp; 
// 	delta = (delta >  speedLimit) ?  speedLimit : delta;
// 	delta = (delta < -speedLimit) ? -speedLimit : delta;
// 	newValue = old + delta;
// 	return newValue;
// }

function computeNewThetaValue(oldTheta, goalTheta, angularDampRatio, angularVelocityLimit) {
	var newTheta;
	var deltaTheta = goalTheta - oldTheta;
	deltaTheta *= 1 - angularDampRatio; 
	deltaTheta = (deltaTheta >  angularVelocityLimit) ?  angularVelocityLimit : deltaTheta;
	deltaTheta = (deltaTheta < -angularVelocityLimit) ? -angularVelocityLimit : deltaTheta;
	newTheta = oldTheta + deltaTheta;
	return newTheta;
}

// function helix_computeMeshesCurrentPosition(database) {
// 	// where is the beginning of the helix ribbon
// 	var begY = database.length / 2 / QTY_ELEMENTS_PER_TURN * SEPARATION_BETWEEN_TWO_RIBBON_PASS;

// 	if (database && database.length) {
// 		for (var i = 0; i < database.length ; i++) {
// 			// world pos and rot
// 			database[i].objectMesh.position.x = computeNewValue(database[i].objectMesh.position.x, database[i].objectMesh.goal.position.x, DAMP, MAX_SPEED);
// 			database[i].objectMesh.position.y = computeNewValue(database[i].objectMesh.position.y, database[i].objectMesh.goal.position.y, DAMP, MAX_SPEED);
// 			database[i].objectMesh.position.z = computeNewValue(database[i].objectMesh.position.z, database[i].objectMesh.goal.position.z, DAMP, MAX_SPEED);
// 			database[i].objectMesh.rotation.y = computeNewValue(database[i].objectMesh.rotation.y, database[i].objectMesh.goal.rotation.y, DAMP, MAX_SPEED);
// 		}
// 	}
// }
function helix_computeMeshesCurrentPosition(database) {
	// where is the beginning of the helix ribbon
	var begY = database.length / 2 / QTY_ELEMENTS_PER_TURN * SEPARATION_BETWEEN_TWO_RIBBON_PASS;

	if (database && database.length) {
		for (var i = 0; i < database.length ; i++) {

			database[i].thetaInRad = computeNewThetaValue(database[i].thetaInRad, database[i].goalThetaInRad, ANGULAR_DAMP_RATIO, MAX_ANGULAR_VELOCITY_RAD_PER_UPDATE);


			// when object is not on ribbon, it is very far
			if (database[i].isOnMainHelixRibbon) {
				var distance = HELIX_DISTANCE;
				distance *= database[i].isNewlyShow ? RATIO_DISTANCE_WHEN_NEW_IMAGE : 1.0;
				// world pos and rot
				database[i].objectMesh.position.x =  distance * Math.sin(database[i].thetaInRad);
				database[i].objectMesh.position.y =  -SEPARATION_BETWEEN_TWO_RIBBON_PASS * database[i].indexForPlaceOnMainHelixRibbon / QTY_ELEMENTS_PER_TURN + begY;
				database[i].objectMesh.position.z = -distance * Math.cos(database[i].thetaInRad);
				database[i].objectMesh.rotation.y = - database[i].thetaInRad;
			} else {

				database[i].objectMesh.position.x = 0;
				database[i].objectMesh.position.y = 100;
				database[i].objectMesh.position.z = -20;
				database[i].objectMesh.rotation.y = - database[i].thetaInRad;;
			}
		}
	}
}


function TO_MOVE_loadAMissingImage(database) {
	if (database && database.length) {
		var randomStartingPoint = Math.floor(Math.random()*database.length);
		for (var iOutRanges = randomStartingPoint ; iOutRanges < randomStartingPoint + database.length ; iOutRanges++) {
			var i = iOutRanges % database.length;
			if (! database[i].imageWasLoaded) {
				loadThisTextureWithThisUrl(database[i].objectMesh,database[i].url);
				// loadThisTextureWithThisUrl(database[i].objectMesh,"../images/car_1_1.jpg");
				database[i].imageWasLoaded = true;
				break;
			} else {
				var x=0 ;
			}
		}
	}
}

// function TO_DELETE_RANDOMIZE_RIBBON(database) {
// 	if (database && database.length) {


// 		var RANDOM_PERIOD = 20;
// 		var removeNow = Math.floor(Math.random()*RANDOM_PERIOD*10)%(RANDOM_PERIOD*10) == 0;
// 		if (removeNow) {
// 			var randomIndexToRemoveFromRibbon = Math.floor(Math.random()*database.length);
// 			database[randomIndexToRemoveFromRibbon].isOnMainHelixRibbon=false
// 		}
// 		var addNow = Math.floor(Math.random()*RANDOM_PERIOD)%RANDOM_PERIOD == 0;
// 		if (addNow) {
// 			var randomIndexToPutInRibbon = Math.floor(Math.random()*database.length);
// 			database[randomIndexToPutInRibbon].isOnMainHelixRibbon=true;
// 			database[randomIndexToPutInRibbon].isNewlyShow = true;
// 		}
// 	}
// }

function TO_DELETE_RANDOMIZE_RIBBON(database) {
	if (database && database.length) {


		var RANDOM_PERIOD = 200;

		// remove in batch
		var removeNow = Math.floor(Math.random()*RANDOM_PERIOD)%(RANDOM_PERIOD) == 0;
		if (removeNow) {
			// remove 20 images
			for (var i = 0; i < 20 ; i++) {
				var randomIndexToRemoveFromRibbon = Math.floor(Math.random()*database.length);
				database[randomIndexToRemoveFromRibbon].isOnMainHelixRibbon=false;
			}
		}
		
		// add in batch
		var addNow = Math.floor(Math.random()*RANDOM_PERIOD)%RANDOM_PERIOD == 0;
		if (addNow) {
			// reset all flags related to newly shown image
			for (var i = 0; i < database.length ; i++) {
				database[i].isNewlyShow = false;
			}

			// add 20 images
			for (var i = 0; i < 25 ; i++) {
				var randomIndexToPutInRibbon = Math.floor(Math.random()*database.length);
				database[randomIndexToPutInRibbon].isOnMainHelixRibbon=true;
				database[randomIndexToPutInRibbon].isNewlyShow = true;
			}
		}
	}
}

function TO_DELETE_RANDOMIZE_RIBBON_NOW(database) {
	if (database && database.length) {


			// remove 20 images
			for (var i = 0; i < 20 ; i++) {
				var randomIndexToRemoveFromRibbon = Math.floor(Math.random()*database.length);
				database[randomIndexToRemoveFromRibbon].isOnMainHelixRibbon=false;
			}
		
			// reset all flags related to newly shown image
			for (var i = 0; i < database.length ; i++) {
				database[i].isNewlyShow = false;
			}

			// add 20 images
			for (var i = 0; i < 25 ; i++) {
				var randomIndexToPutInRibbon = Math.floor(Math.random()*database.length);
				database[randomIndexToPutInRibbon].isOnMainHelixRibbon=true;
				database[randomIndexToPutInRibbon].isNewlyShow = true;
			}
	}
}
