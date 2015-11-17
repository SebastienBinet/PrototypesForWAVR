var HELIX_RADIUS = 10;
var GAZE_TIMER_NBR_FRAME = 50;
var DEFAULT_CANVAS_BOX_COLOR        = 0x404040;
var DEFAULT_CANVAS_BOX_COLOR_RGB    = {r:0x40/0xff, g:0x40/0xff, b:0x40/0xff};
var DEFAUT_TEXT_COLOR               = 0x40c0c0;
var DEFAUT_TEXT_SELECTED_COLOR      = 0xc0ffc0;
var BLACK_COLOR                     = 0x000000;

var INSTRUCTION_PANEL   = 0;
var CITY                = 1; // index in mesh array to change the text
var BRAND               = 2; // index in mesh array to change the text
var YEAR                = 3; // index in mesh array to change the text
var AUDI                = 4;
var BMW                 = 5;
var MERCEDES            = 6;
var LAVAL               = 7;
var MONTREAL            = 8;
var CHATEAUGAY          = 9;

var meshArrayForTextUpdate = [];
var menuSelections = {};


function addSelectableMeshToMenuMesh(selectableMesh) {
    scene.add(selectableMesh);
    // make this UI interactivable
    selectables.push(selectableMesh);
}

//function dimmInstructionsPanel() {
//    var TextMeshOnInstructionsPanel = meshArrayForTextUpdate[INSTRUCTION_PANEL];
//    if (TextMeshOnInstructionsPanel) {
//        var panelMesh = TextMeshOnInstructionsPanel.parent;
//        if (buttonMeshToErase) {
//            var parent = buttonMeshToErase.parent;
//            if (parent) {
//                parent.remove(buttonMeshToErase);
//                var index = selectables.indexOf(buttonMeshToErase);
//                selectables.splice(index, 1 /* remove 1*/);
//            }
//        }
//    }
//}


function earseButtonThatHasThisTextMeshId(id) {
   var TextMeshOnButtonToErase = meshArrayForTextUpdate[id];
    if (TextMeshOnButtonToErase) {
        var buttonMeshToErase = TextMeshOnButtonToErase.parent;
        if (buttonMeshToErase) {
            var parent = buttonMeshToErase.parent;
            if (parent) {
                parent.remove(buttonMeshToErase);
                var index = selectables.indexOf(buttonMeshToErase);
                selectables.splice(index, 1 /* remove 1*/);
            }
        }
    }
}

function clearDisplay() {
    earseButtonThatHasThisTextMeshId(INSTRUCTION_PANEL);
    earseButtonThatHasThisTextMeshId(2016      );
    earseButtonThatHasThisTextMeshId(2015      );
    earseButtonThatHasThisTextMeshId(2014      );
    earseButtonThatHasThisTextMeshId(AUDI      );
    earseButtonThatHasThisTextMeshId(BMW       );
    earseButtonThatHasThisTextMeshId(MERCEDES  );
    earseButtonThatHasThisTextMeshId(LAVAL     );
    earseButtonThatHasThisTextMeshId(MONTREAL  );
    earseButtonThatHasThisTextMeshId(CHATEAUGAY);
}

function createButtonMesh(buttonInfo) {
    // create canvas
    var textureForTransparency01 = THREE.ImageUtils.loadTexture( "../images/a-grayBorderDarkCenter.png" );
    var buttonBoxMaterial = new THREE.MeshBasicMaterial({color: DEFAULT_CANVAS_BOX_COLOR, alphaMap: textureForTransparency01, alphaMap: textureForTransparency01, side: THREE.DoubleSide, transparent: true});
    var buttonBoxGeometry = new THREE.PlaneBufferGeometry (buttonInfo.layoutInfo.layoutSize.length, buttonInfo.layoutInfo.layoutSize.height);
    var buttonBoxMesh = new THREE.Mesh( buttonBoxGeometry, buttonBoxMaterial );
    buttonBoxMesh.___MESH_NAME = buttonInfo.text + "\'s Box, id:" + buttonBoxMesh.id;
    buttonBoxMesh.position.x = buttonInfo.layoutInfo.layoutStartPos.x;
    buttonBoxMesh.position.y = buttonInfo.layoutInfo.layoutStartPos.y;
    buttonBoxMesh.position.z = buttonInfo.layoutInfo.layoutStartPos.z;
    addSelectableMeshToMenuMesh(buttonBoxMesh);
    
    // little dark zone behind the canvas
    var backgroundBoxMaterial = new THREE.MeshBasicMaterial({color: BLACK_COLOR, alphaMap: textureForTransparency01, alphaMap: textureForTransparency01, side: THREE.DoubleSide, transparent: true});
    var backgroundBoxGeometry = new THREE.PlaneBufferGeometry (buttonInfo.layoutInfo.layoutSize.length*1.05, buttonInfo.layoutInfo.layoutSize.height*1.05);
    var backgroundBoxMesh = new THREE.Mesh( backgroundBoxGeometry, backgroundBoxMaterial );
    backgroundBoxMesh.___MESH_NAME = buttonInfo.text + "\'s Background Box, id:" + backgroundBoxMesh.id + " for \'s Box, id:" + buttonBoxMesh.id;
    backgroundBoxMesh.position.z = -0.1;
    buttonBoxMesh.add(backgroundBoxMesh);
    
//    }
//    scene.add(buttonBoxMesh);
    // make this UI interactivable
//     selectables.push(buttonBoxMesh);

    buttonBoxMesh.hoverStateJustEnteredCallback = buttonInfo.enterMenuFunction;
    buttonBoxMesh.hoverStateContinuedCallback = buttonInfo.stayMenuFunction;
    buttonBoxMesh.hoverStateJustLeftCallback = buttonInfo.leaveMenuFunction;
    //buttonBoxMesh.hoverStateJustLeftCallback = expandingMenuInfo.hoverStateJustLeftCallback;

    // add display-only text
    // if an array of string
    if (buttonInfo.text[0][1] != undefined ){
        for (var i=0; i<buttonInfo.text.length; i++) {
            var textThisLine = buttonInfo.text[i];
            console.log("text = " + textThisLine );
            var textShapes = THREE.FontUtils.generateShapes( (textThisLine ? textThisLine : ""), {'font' : 'helvetiker','weight' : 'normal', 'style' : 'normal','size' : 1,'curveSegments' : 300} );
            var textGeometry = new THREE.ShapeGeometry( textShapes );
            var textMesh = new THREE.Mesh( textGeometry, new THREE.MeshBasicMaterial( { color: DEFAUT_TEXT_COLOR } ) ) ;
            textMesh.___MESH_NAME = textThisLine + "\'s Text, id:" + buttonBoxMesh.id;
            textMesh.position.x = -buttonInfo.layoutInfo.layoutSize.length/3;
            textMesh.position.y = buttonInfo.layoutInfo.layoutSize.height/4 - 2*i;
            textMesh.position.z = 0.1;
            buttonBoxMesh.add(textMesh);
            if(i==0) { meshArrayForTextUpdate[buttonInfo.meshTextId] = textMesh; }
        }
    } else {
        // only one string
        var textShapes = THREE.FontUtils.generateShapes( (buttonInfo.text ? buttonInfo.text : "???k6k6k"), {'font' : 'helvetiker','weight' : 'normal', 'style' : 'normal','size' : 1,'curveSegments' : 300} );
        var textGeometry = new THREE.ShapeGeometry( textShapes );
        var textMesh = new THREE.Mesh( textGeometry, new THREE.MeshBasicMaterial( { color: DEFAUT_TEXT_COLOR } ) ) ;
        textMesh.___MESH_NAME = buttonInfo.text + "\'s Text, id:" + textMesh.id;
        textMesh.position.x = -buttonInfo.layoutInfo.layoutSize.length/3;
        textMesh.position.y = 0;
        textMesh.position.z = 0.1;
        buttonBoxMesh.add(textMesh);
        meshArrayForTextUpdate[buttonInfo.meshTextId] = textMesh;
    }
//    var textMesh = new THREE.Mesh( textGeometry, new THREE.MeshBasicMaterial( { color: DEFAUT_TEXT_COLOR } ) ) ;
//    textMesh.___MESH_NAME = buttonInfo.text + "\'s Text, id:" + textMesh.id;
//    textMesh.position.x = -buttonInfo.layoutInfo.layoutSize.length/3;
//    textMesh.position.y = 0;
//    textMesh.position.z = 0.1;
//    buttonBoxMesh.add(textMesh);
//    meshArrayForTextUpdate[buttonInfo.meshTextId] = textMesh;
    //addSelectableMeshToMenuMesh(buttonBoxMesh);
            console.log("createButtonMesh, meshName = " + buttonBoxMesh.___MESH_NAME);
            console.log("createButtonMesh, meshName = " + backgroundBoxMesh.___MESH_NAME);
            console.log("createButtonMesh, meshName = " + textMesh.___MESH_NAME);

}

function logDummy(){console.log("0909980");}

var menuLayout_AudiButton = {
    layoutInfo: {
        layoutStartPos:             {x:undefined, y:undefined, z:undefined},
        layoutIncrement:            {x:undefined, y:undefined},
        layoutSize:                 {length:undefined, height:undefined}
    },
    text:                       "AUDI",
    meshTextId:                 AUDI,    
    createAndDrawMenuFunction:function (layoutInfoToApply){
        this.layoutInfo.layoutStartPos.x  = layoutInfoToApply.layoutStartPos.x;
        this.layoutInfo.layoutStartPos.y  = layoutInfoToApply.layoutStartPos.y;
        this.layoutInfo.layoutStartPos.z  = layoutInfoToApply.layoutStartPos.z;
        this.layoutInfo.layoutSize.length = layoutInfoToApply.layoutSize.length;
        this.layoutInfo.layoutSize.height = layoutInfoToApply.layoutSize.height;

        createButtonMesh(menuLayout_AudiButton);
    },
//    createAndDrawMenuFunction:menuLayout_AudiButton_createAndDrawMenuFunction,
    eraseAndRemoveMenuFunction: logDummy,
//    enterMenuFunction:          function() {setBrand(menuLayout_AudiButton.text);},
    enterMenuFunction:          function() {
        console.log("enterMenuFunction for audi, this.id = " + this.id);
        this.counter = 0.0;
        this.material.color.r = 0.0;
        this.material.color.g = 0.0;
        this.material.color.b = 0.0;
//      this.material.color.b  = {r: 0.9, g: 0.6, b: 0.2};
    },
    stayMenuFunction:           function() {
        if (this.counter != undefined) { 
            // means: counter is still counting (it was be marked as undefined once timed-over)
            
            if (this.counter < 1.0) {
                // Means: timer is still counting
                this.counter += 1/GAZE_TIMER_NBR_FRAME;
                this.material.color.r += 1/GAZE_TIMER_NBR_FRAME;
                this.material.color.g += 1/GAZE_TIMER_NBR_FRAME;
                this.material.color.b += 1/GAZE_TIMER_NBR_FRAME;
            } else {
                // Means time just wen over
                // Mark the timer as undefined to indicate it is over.
                this.counter = undefined; setBrand(menuLayout_AudiButton.text);
            }
        }
    },
    leaveMenuFunction:          function() {
        this.material.color.r = DEFAULT_CANVAS_BOX_COLOR_RGB.r;
        this.material.color.g = DEFAULT_CANVAS_BOX_COLOR_RGB.g;
        this.material.color.b = DEFAULT_CANVAS_BOX_COLOR_RGB.b;
        this.children[1].scale.x = 1;
        this.children[1].scale.y = 1;
},
};
//function menuLayout_AudiButton_createAndDrawMenuFunction(layoutInfoToApply) {
//    menuLayout_AudiButton.layoutInfo.layoutStartPos.x  = layoutInfoToApply.layoutStartPos.x;
//    menuLayout_AudiButton.layoutInfo.layoutStartPos.y  = layoutInfoToApply.layoutStartPos.y;
//    menuLayout_AudiButton.layoutInfo.layoutStartPos.z  = layoutInfoToApply.layoutStartPos.z;
//    menuLayout_AudiButton.layoutInfo.layoutSize.length = layoutInfoToApply.layoutSize.length;
//    menuLayout_AudiButton.layoutInfo.layoutSize.height = layoutInfoToApply.layoutSize.height;
//
//    createButtonMesh(menuLayout_AudiButton);
//}
var menuLayout_BmwButton = {
    layoutInfo: {
        layoutStartPos:             {x:undefined, y:undefined, z:undefined},
        layoutIncrement:            {x:undefined, y:undefined},
        layoutSize:                 {length:undefined, height:undefined}
    },
    text:                       "BMW",
    meshTextId:                 BMW,
    createAndDrawMenuFunction:  menuLayout_BmwButton_createAndDrawMenuFunction,
    eraseAndRemoveMenuFunction: logDummy,
    enterMenuFunction:          function() {
        this.counter = 0.0;
        this.material.color.r = 1.0;
        this.material.color.g = 0.5;
        this.material.color.b = 0.0;
        this.children[1].scale.x = 2;
        this.children[1].scale.y = 2;
//        this.children[1].material.color.g = 0.0;
//        this.children[1].material.color.b = 0.0;
//      this.material.color.b  = {r: 0.9, g: 0.6, b: 0.2};
    },
    stayMenuFunction:           function() {
        if (this.counter != undefined) { 
            // means: counter is still counting (it was be marked as undefined once timed-over)
            
            if (this.counter < 1.0) {
                // Means: timer is still counting
                this.counter += 1/GAZE_TIMER_NBR_FRAME;
                this.material.color.r += 1/GAZE_TIMER_NBR_FRAME;
                this.material.color.g += 1/GAZE_TIMER_NBR_FRAME;
                this.material.color.b += 1/GAZE_TIMER_NBR_FRAME;
                this.children[1].scale.x -= 1/GAZE_TIMER_NBR_FRAME;
                this.children[1].scale.y -= 1/GAZE_TIMER_NBR_FRAME;
            } else {
                // Means time just wen over
                // Mark the timer as undefined to indicate it is over.
                this.counter = undefined; setBrand(menuLayout_BmwButton.text);
            }
        }
    },
    leaveMenuFunction:          function() {
        this.material.color.r = DEFAULT_CANVAS_BOX_COLOR_RGB.r;
        this.material.color.g = DEFAULT_CANVAS_BOX_COLOR_RGB.g;
        this.material.color.b = DEFAULT_CANVAS_BOX_COLOR_RGB.b;
        this.children[1].scale.x = 1;
        this.children[1].scale.y = 1;
    },
};
function menuLayout_BmwButton_createAndDrawMenuFunction(layoutInfoToApply) {
    menuLayout_BmwButton.layoutInfo.layoutStartPos.x  = layoutInfoToApply.layoutStartPos.x;
    menuLayout_BmwButton.layoutInfo.layoutStartPos.y  = layoutInfoToApply.layoutStartPos.y;
    menuLayout_BmwButton.layoutInfo.layoutStartPos.z  = layoutInfoToApply.layoutStartPos.z;
    menuLayout_BmwButton.layoutInfo.layoutSize.length = layoutInfoToApply.layoutSize.length;
    menuLayout_BmwButton.layoutInfo.layoutSize.height = layoutInfoToApply.layoutSize.height;

    createButtonMesh(menuLayout_BmwButton);
}
var menuLayout_MercedesButton = {
    layoutInfo: {
        layoutStartPos:             {x:undefined, y:undefined, z:undefined},
        layoutIncrement:            {x:undefined, y:undefined},
        layoutSize:                 {length:undefined, height:undefined}
    },
    text:                       "MERCEDES",
    meshTextId:                 MERCEDES,
    createAndDrawMenuFunction:  menuLayout_MercedesButton_createAndDrawMenuFunction,
    eraseAndRemoveMenuFunction: logDummy,
    enterMenuFunction:          function() {this.counter = 0.0;},
    stayMenuFunction:           function() {
        if (this.counter != undefined) { this.counter = (this.counter >= 1.0) ? 1.0 : this.counter + 0.05; }
        if (this.counter == 1.0) {this.counter = undefined; setBrand(menuLayout_MercedesButton.text); }
    },
    leaveMenuFunction:          function() {/*TBD*/},
};
function menuLayout_MercedesButton_createAndDrawMenuFunction(layoutInfoToApply) {
    menuLayout_MercedesButton.layoutInfo.layoutStartPos.x  = layoutInfoToApply.layoutStartPos.x;
    menuLayout_MercedesButton.layoutInfo.layoutStartPos.y  = layoutInfoToApply.layoutStartPos.y;
    menuLayout_MercedesButton.layoutInfo.layoutStartPos.z  = layoutInfoToApply.layoutStartPos.z;
    menuLayout_MercedesButton.layoutInfo.layoutSize.length = layoutInfoToApply.layoutSize.length;
    menuLayout_MercedesButton.layoutInfo.layoutSize.height = layoutInfoToApply.layoutSize.height;

    createButtonMesh(menuLayout_MercedesButton);
}


var menuLayout_2016Button = {
    layoutInfo: {
        layoutStartPos:             {x:undefined, y:undefined, z:undefined},
        layoutIncrement:            {x:undefined, y:undefined},
        layoutSize:                 {length:undefined, height:undefined}
    },
    text:                       "2016",
    meshTextId:                 2016,
    createAndDrawMenuFunction:  function (layoutInfoToApply){
        this.layoutInfo.layoutStartPos.x  = layoutInfoToApply.layoutStartPos.x;
        this.layoutInfo.layoutStartPos.y  = layoutInfoToApply.layoutStartPos.y;
        this.layoutInfo.layoutStartPos.z  = layoutInfoToApply.layoutStartPos.z;
        this.layoutInfo.layoutSize.length = layoutInfoToApply.layoutSize.length;
        this.layoutInfo.layoutSize.height = layoutInfoToApply.layoutSize.height;
        createButtonMesh(menuLayout_2016Button);
    },
    eraseAndRemoveMenuFunction: logDummy,
    enterMenuFunction:          function() {this.counter = 0.0;},
    stayMenuFunction:           function() {
        if (this.counter != undefined) { this.counter = (this.counter >= 1.0) ? 1.0 : this.counter + 0.05; }
        if (this.counter == 1.0) {this.counter = undefined; setYear(menuLayout_2016Button.text); }
    },
    leaveMenuFunction:          function() {/*TBD*/},
};
var menuLayout_2015Button = {
    layoutInfo: {
        layoutStartPos:             {x:undefined, y:undefined, z:undefined},
        layoutIncrement:            {x:undefined, y:undefined},
        layoutSize:                 {length:undefined, height:undefined}
    },
    text:                       "2015",
    meshTextId:                 2015,
    createAndDrawMenuFunction:  function (layoutInfoToApply){
        this.layoutInfo.layoutStartPos.x  = layoutInfoToApply.layoutStartPos.x;
        this.layoutInfo.layoutStartPos.y  = layoutInfoToApply.layoutStartPos.y;
        this.layoutInfo.layoutStartPos.z  = layoutInfoToApply.layoutStartPos.z;
        this.layoutInfo.layoutSize.length = layoutInfoToApply.layoutSize.length;
        this.layoutInfo.layoutSize.height = layoutInfoToApply.layoutSize.height;
        createButtonMesh(menuLayout_2015Button);
    },
    eraseAndRemoveMenuFunction: logDummy,
    enterMenuFunction:          function() {this.counter = 0.0;},
    stayMenuFunction:           function() {
        if (this.counter != undefined) { this.counter = (this.counter >= 1.0) ? 1.0 : this.counter + 0.05; }
        if (this.counter == 1.0) {this.counter = undefined; setYear(menuLayout_2015Button.text); }
    },
    leaveMenuFunction:          function() {/*TBD*/},
};
var menuLayout_2014Button = {
    layoutInfo: {
        layoutStartPos:             {x:undefined, y:undefined, z:undefined},
        layoutIncrement:            {x:undefined, y:undefined},
        layoutSize:                 {length:undefined, height:undefined}
    },
    text:                       "2014",
    meshTextId:                 2014,
    createAndDrawMenuFunction:  function (layoutInfoToApply){
        this.layoutInfo.layoutStartPos.x  = layoutInfoToApply.layoutStartPos.x;
        this.layoutInfo.layoutStartPos.y  = layoutInfoToApply.layoutStartPos.y;
        this.layoutInfo.layoutStartPos.z  = layoutInfoToApply.layoutStartPos.z;
        this.layoutInfo.layoutSize.length = layoutInfoToApply.layoutSize.length;
        this.layoutInfo.layoutSize.height = layoutInfoToApply.layoutSize.height;
        createButtonMesh(menuLayout_2014Button);
    },
    eraseAndRemoveMenuFunction: logDummy,
    enterMenuFunction:          function() {this.counter = 0.0;},
    stayMenuFunction:           function() {
        if (this.counter != undefined) { this.counter = (this.counter >= 1.0) ? 1.0 : this.counter + 0.05; }
        if (this.counter == 1.0) {this.counter = undefined; setYear(menuLayout_2014Button.text); }
    },
    leaveMenuFunction:          function() {/*TBD*/},
};


///////////
var menuLayout_LavalButton = {
    layoutInfo: {
        layoutStartPos:             {x:undefined, y:undefined, z:undefined},
        layoutIncrement:            {x:undefined, y:undefined},
        layoutSize:                 {length:undefined, height:undefined}
    },
    text:                       "Laval",
    meshTextId:                 LAVAL,    
    createAndDrawMenuFunction:function (layoutInfoToApply){
        this.layoutInfo.layoutStartPos.x  = layoutInfoToApply.layoutStartPos.x;
        this.layoutInfo.layoutStartPos.y  = layoutInfoToApply.layoutStartPos.y;
        this.layoutInfo.layoutStartPos.z  = layoutInfoToApply.layoutStartPos.z;
        this.layoutInfo.layoutSize.length = layoutInfoToApply.layoutSize.length;
        this.layoutInfo.layoutSize.height = layoutInfoToApply.layoutSize.height;

        createButtonMesh(menuLayout_LavalButton);
    },
    eraseAndRemoveMenuFunction: logDummy,
    enterMenuFunction:          function() {this.counter = 0.0;},
    stayMenuFunction:           function() {
        if (this.counter != undefined) { this.counter = (this.counter >= 1.0) ? 1.0 : this.counter + 0.05; }
        if (this.counter == 1.0) {this.counter = undefined; setCity(menuLayout_LavalButton.text); }
    },
    leaveMenuFunction:          function() {/*TBD*/},
};
var menuLayout_MontrealButton = {
    layoutInfo: {
        layoutStartPos:             {x:undefined, y:undefined, z:undefined},
        layoutIncrement:            {x:undefined, y:undefined},
        layoutSize:                 {length:undefined, height:undefined}
    },
    text:                       "Montreal",
    meshTextId:                 MONTREAL,    
    createAndDrawMenuFunction:function (layoutInfoToApply){
        this.layoutInfo.layoutStartPos.x  = layoutInfoToApply.layoutStartPos.x;
        this.layoutInfo.layoutStartPos.y  = layoutInfoToApply.layoutStartPos.y;
        this.layoutInfo.layoutStartPos.z  = layoutInfoToApply.layoutStartPos.z;
        this.layoutInfo.layoutSize.length = layoutInfoToApply.layoutSize.length;
        this.layoutInfo.layoutSize.height = layoutInfoToApply.layoutSize.height;

        createButtonMesh(menuLayout_MontrealButton);
    },
    eraseAndRemoveMenuFunction: logDummy,
    enterMenuFunction:          function() {this.counter = 0.0;},
    stayMenuFunction:           function() {
        if (this.counter != undefined) { this.counter = (this.counter >= 1.0) ? 1.0 : this.counter + 0.05; }
        if (this.counter == 1.0) {this.counter = undefined; setCity(menuLayout_MontrealButton.text); }
    },
    leaveMenuFunction:          function() {/*TBD*/},
};
var menuLayout_ChateaugayButton = {
    layoutInfo: {
        layoutStartPos:             {x:undefined, y:undefined, z:undefined},
        layoutIncrement:            {x:undefined, y:undefined},
        layoutSize:                 {length:undefined, height:undefined}
    },
    text:                       "Chateaugay",
    meshTextId:                 CHATEAUGAY,    
    createAndDrawMenuFunction:function (layoutInfoToApply){
        this.layoutInfo.layoutStartPos.x  = layoutInfoToApply.layoutStartPos.x;
        this.layoutInfo.layoutStartPos.y  = layoutInfoToApply.layoutStartPos.y;
        this.layoutInfo.layoutStartPos.z  = layoutInfoToApply.layoutStartPos.z;
        this.layoutInfo.layoutSize.length = layoutInfoToApply.layoutSize.length;
        this.layoutInfo.layoutSize.height = layoutInfoToApply.layoutSize.height;

        createButtonMesh(menuLayout_ChateaugayButton);
    },
    eraseAndRemoveMenuFunction: logDummy,
    enterMenuFunction:          function() {this.counter = 0.0;},
    stayMenuFunction:           function() {
        if (this.counter != undefined) { this.counter = (this.counter >= 1.0) ? 1.0 : this.counter + 0.05; }
        if (this.counter == 1.0) {this.counter = undefined; setCity(menuLayout_ChateaugayButton.text); }
    },
    leaveMenuFunction:          function() {/*TBD*/},
};


var menuLayout_BrandButton = {
    layoutInfo: {
        layoutStartPos:             {x:0, y:-10, z:-HELIX_RADIUS},
        layoutIncrement:            {x:0, y:4},
        layoutSize:                 {length:12, height:3}
    },
    text:                       "Brand: Any",
    meshTextId:                 BRAND,
    items:[
        menuLayout_MercedesButton,
        menuLayout_AudiButton,
        menuLayout_BmwButton,
//        menuLayout_HideAll
    ],
    createAndDrawMenuFunction:function(){createButtonMesh(menuLayout_BrandButton)},
    eraseAndRemoveMenuFunction: logDummy,
    enterMenuFunction:          menuLayout_BrandButton_createAndDrawMenuFunction,
    stayMenuFunction:           logDummy, /*do nothing special*/
    leaveMenuFunction:          function() {/*TBD*/},
};
function menuLayout_BrandButton_createAndDrawMenuFunction() {
    clearDisplay();
    for (var i=0; i<menuLayout_BrandButton.items.length; i++) {
        var layoutInfoMaster = menuLayout_BrandButton.layoutInfo;
        var layoutInfoToApply = {};
        layoutInfoToApply.layoutStartPos = {};
        layoutInfoToApply.layoutStartPos.x = layoutInfoMaster.layoutStartPos.x + layoutInfoMaster.layoutIncrement.x * (i+1);
        layoutInfoToApply.layoutStartPos.y = layoutInfoMaster.layoutStartPos.y + layoutInfoMaster.layoutIncrement.y * (i+1);
        layoutInfoToApply.layoutStartPos.z = layoutInfoMaster.layoutStartPos.z + 0.1;
        layoutInfoToApply.layoutSize = {};
        layoutInfoToApply.layoutSize.length = layoutInfoMaster.layoutSize.length;
        layoutInfoToApply.layoutSize.height = layoutInfoMaster.layoutSize.height;
        menuLayout_BrandButton.items[i].createAndDrawMenuFunction(layoutInfoToApply);
    }
}

var menuLayout_YearButton = {
    eraseAndRemoveMenuFunction: function(){},
    enterMenuFunction:          menuLayout_YearButton_createAndDrawMenuFunction,
    stayMenuFunction:           logDummy, /*do nothing special*/
    leaveMenuFunction:          function() {/*TBD*/},
    layoutInfo:{
        layoutStartPos:         {x:-13, y:-10, z:-HELIX_RADIUS},
        layoutIncrement:        {x:0, y:4},
        layoutSize:             {length:12, height:3}
    },
    text:                       "Year: Any",
    meshTextId:                 YEAR,
    items:[
        menuLayout_2016Button,
        menuLayout_2015Button,
        menuLayout_2014Button,
//        menuLayout_2013Button,
//        menuLayout_2012Button,
//        menuLayout_2011Button,
//        menuLayout_HideAll
    ],
    createAndDrawMenuFunction:function(){createButtonMesh(this)},
};
function menuLayout_YearButton_createAndDrawMenuFunction() {
    clearDisplay();
    for (var i=0; i<menuLayout_YearButton.items.length; i++) {
        var layoutInfoMaster = menuLayout_YearButton.layoutInfo;
        var layoutInfoToApply = {};
        layoutInfoToApply.layoutStartPos = {};
        layoutInfoToApply.layoutStartPos.x = layoutInfoMaster.layoutStartPos.x + layoutInfoMaster.layoutIncrement.x * (i+1);
        layoutInfoToApply.layoutStartPos.y = layoutInfoMaster.layoutStartPos.y + layoutInfoMaster.layoutIncrement.y * (i+1);
        layoutInfoToApply.layoutStartPos.z = layoutInfoMaster.layoutStartPos.z + 0.1;
        layoutInfoToApply.layoutSize = {};
        layoutInfoToApply.layoutSize.length = layoutInfoMaster.layoutSize.length;
        layoutInfoToApply.layoutSize.height = layoutInfoMaster.layoutSize.height;
        menuLayout_YearButton.items[i].createAndDrawMenuFunction(layoutInfoToApply);
    }
}

var menuLayout_CityButton = {
    layoutInfo: {
        layoutStartPos:             {x:13, y:-10, z:-HELIX_RADIUS},
        layoutIncrement:            {x:0, y:4},
        layoutSize:                 {length:12, height:3}
    },
    text:                       "City: Any",
    meshTextId:                 CITY,
    items:[
        menuLayout_LavalButton,
        menuLayout_MontrealButton,
        menuLayout_ChateaugayButton,
//        menuLayout_HideAll
    ],
    createAndDrawMenuFunction:function(){
        createButtonMesh(menuLayout_CityButton);
    },
    eraseAndRemoveMenuFunction: logDummy,
    enterMenuFunction:          menuLayout_CityButton_createAndDrawMenuFunction,
    stayMenuFunction:           logDummy, /*do nothing special*/
    leaveMenuFunction:          function() {/*TBD*/},
};
function menuLayout_CityButton_createAndDrawMenuFunction() {
    clearDisplay();
    for (var i=0; i<menuLayout_CityButton.items.length; i++) {
        var layoutInfoMaster = menuLayout_CityButton.layoutInfo;
        var layoutInfoToApply = {};
        layoutInfoToApply.layoutStartPos = {};
        layoutInfoToApply.layoutStartPos.x = layoutInfoMaster.layoutStartPos.x + layoutInfoMaster.layoutIncrement.x * (i+1);
        layoutInfoToApply.layoutStartPos.y = layoutInfoMaster.layoutStartPos.y + layoutInfoMaster.layoutIncrement.y * (i+1);
        layoutInfoToApply.layoutStartPos.z = layoutInfoMaster.layoutStartPos.z + 0.1;
        layoutInfoToApply.layoutSize = {};
        layoutInfoToApply.layoutSize.length = layoutInfoMaster.layoutSize.length;
        layoutInfoToApply.layoutSize.height = layoutInfoMaster.layoutSize.height;
        menuLayout_CityButton.items[i].createAndDrawMenuFunction(layoutInfoToApply);
    }
}



var menuLayout_RemoveAllPopUpButtons_Button = {
    layoutInfo: {
        layoutStartPos:             {x:30, y:-10, z:-HELIX_RADIUS},
        layoutIncrement:            {x:0, y:4},
        layoutSize:                 {length:7, height:5}
    },
    text:                       ["Clear","Display"],
    meshTextId:                 -1,
    items:[],
    createAndDrawMenuFunction:function(){
        createButtonMesh(menuLayout_RemoveAllPopUpButtons_Button);
    },
    eraseAndRemoveMenuFunction: logDummy,
    enterMenuFunction:          clearDisplay,
    stayMenuFunction:           logDummy, /*do nothing special*/
    leaveMenuFunction:          function() {/*TBD*/},
};

var menuLayout_InstructionsPanel = {
    layoutInfo: {
        layoutStartPos:             {x:0, y:10, z:-2*HELIX_RADIUS},
        layoutIncrement:            {x:0, y:20},
        layoutSize:                 {length:100, height:45}
    },
    text:        [
        "UI prototype: \"Menu2\"",
        "Content: POP-UP menu + current selection + 3 kinds of gaze timer feedback",
        "",
        "Instructions:",
        "1- (Re-)load the HTML page,",
        "2- Look at \"Brand:Any\" -> a list will appear,",
        "3- Look at Mercedes for 1/2 second -> text will change to \"Brand:Mercedes\",",
        "4- Look at Audi for 1/2 second -> Button will higlight and at the end the text will change to \"Brand:Audi\"",
        "5- Look at BMW for 1/2 second  -> Button color and text will give feedback and at the end the text will change to \"Brand:BMW\"",
        "",
        "",
        "Note: there is a small transparent black frame around buttons to make it easier to see over other background info.",
        "Design element: when quitting a choice (e.g.:\"Audi\"), the button apparence comes back to initial.",
        "Design element: we clear the display when a category button (e.g.: \"Brand:xxx\") is entered.",
        "Design element: we have added a Clear Display button.",
    ],
    meshTextId:                 INSTRUCTION_PANEL,
    items:[],
    createAndDrawMenuFunction:function(){createButtonMesh(menuLayout_InstructionsPanel)},
    eraseAndRemoveMenuFunction: logDummy,
    enterMenuFunction:          logDummy,
    stayMenuFunction:           logDummy, /*do nothing special*/
    leaveMenuFunction:          function() {/*TBD*/},
};

var menuLayout_Filters = {
    createAndDrawMenuFunction:menuLayout_Filters_createAndDrawMenuFunction,
    eraseAndRemoveMenuFunction:function(){},
    enterMenuFunction:function(){/*empty at the base level*/},
    stayMenuFunction:function(){/*empty at the base level*/},
    leaveMenuFunction:function(){/*empty at the base level*/},
    items:[
        menuLayout_InstructionsPanel,  
        menuLayout_BrandButton,
        menuLayout_YearButton,
        menuLayout_CityButton,
        menuLayout_RemoveAllPopUpButtons_Button,
//        menuLayout_HideAll
    ]
};
function menuLayout_Filters_createAndDrawMenuFunction() {
    for (var x=0; x<this.items.length; x++){
        var y=this.items[x]; y.createAndDrawMenuFunction();
    }
}












function emptyCallbackFunction(input) {
    console.log("###### emptyCallbackFunction(" + (input ? input : "empty") + ") was called !!!");
}



///////////////////////////////////////
// update texts
function replaceMeshText(indiceForMeshTextToReplace, newMeshText) {
    var textShapes = THREE.FontUtils.generateShapes( (newMeshText ? newMeshText : "???hhgh9hg9"), {'font' : 'helvetiker','weight' : 'bold', 'style' : 'normal','size' : 1,'curveSegments' : 300} );
    var textGeometry = new THREE.ShapeGeometry( textShapes );
    var textMesh = new THREE.Mesh( textGeometry, new THREE.MeshBasicMaterial( { color: DEFAUT_TEXT_SELECTED_COLOR } ) ) ;
    textMesh.___MESH_NAME = ">>> " + newMeshText + " in small zone";
    
    textMesh.position.x = meshArrayForTextUpdate[indiceForMeshTextToReplace].position.x;
    textMesh.position.y = meshArrayForTextUpdate[indiceForMeshTextToReplace].position.y;
    textMesh.position.z = meshArrayForTextUpdate[indiceForMeshTextToReplace].position.z;

    // replace
    var parent = meshArrayForTextUpdate[indiceForMeshTextToReplace].parent;
    parent.remove(meshArrayForTextUpdate[indiceForMeshTextToReplace]);
    parent.add(textMesh);
    meshArrayForTextUpdate[indiceForMeshTextToReplace]  = textMesh;
}
function setYear(yearString) {
    replaceMeshText(YEAR, "Year:" + yearString);
}

function setCity(cityString) {
    replaceMeshText(CITY, "City:" + cityString);
}
function setBrand(brandString) {
    replaceMeshText(BRAND, "Brand:" + brandString);
}

