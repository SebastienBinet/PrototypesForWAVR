var HELIX_RADIUS = 10;
var CITY = 0; // index in mesh array to change the text
var BRAND = 1; // index in mesh array to change the text
var YEAR = 2; // index in mesh array to change the text
var meshArrayForTextUpdate = [];

var menuLayout = [
            { // Expanding Menu
                creatorCallback : createExpandingMenu,
                expandingMenuInfo : {
                    ___debugName : "Expanding Menu 001",
                    pos : {x:0, y:-10, z:-HELIX_RADIUS },
                    //rot, 
                    sizeSmall : {length:40, height:3}, // initial size
                    expansionGrowth : {left:0, right:0, up:100, down:0},
                    hoverStateJustEnteredCallback      : expandingMenu_HandleEntering,
                    hoverStateContinuedCallback : expandingMenu_HandleStayingInside,
                    hoverStateJustLeftCallback       : expandingMenu_HandleExiting,
                    categories : [
                        {
                            creatorCallback : createCategoryMenu,
                            categoryMenuInfo : {
                                ___debugName : "Expanding Menu 001 - City",
                                titleText : "City",
                                meshTextId : CITY,
                                posOffsetSmall : {x:10, y:-0.2},
                                posOffsetExpanded : {x:10, y:2},
                                choices : [
                                    {
                                        ___debugName : "Expanding Menu 001 - City - Montreal",
                                        titleText : "Montreal",
                                        posOffset : {x:0, y:3}
                                    },
                                    {
                                        ___debugName : "Expanding Menu 001 - City - Chateaugay",
                                        titleText : "Chateaugay",
                                        posOffset : {x:0, y:5}
                                    },
//                                    {
//                                        ___debugName : "Expanding Menu 001 - City - Laval",
//                                        titleText : "Laval",
//                                        posOffset : {x:0, y:11}
//                                    }
                                ],
                                hoverStateJustEnteredCallback      : emptyCallbackFunction,
                                hoverStateContinuedCallback : expandingMenu_Category_HandleStayingInside,
                                hoverStateJustLeftCallback       : emptyCallbackFunction,
                                choiceActivationCallback : selectCity,
                            }, // City
                        },
                        {
                            creatorCallback : createCategoryMenu,
                            categoryMenuInfo : {
                                ___debugName : "Expanding Menu 001 - Brand",
                                titleText : "Brand",
                                meshTextId : BRAND,
                                posOffsetSmall : {x:0, y:-0.2},
                                posOffsetExpanded : {x:0, y:2},
                                choices : [
                                    {
                                        ___debugName : "Expanding Menu 001 - Brand - Mercedes",
                                        titleText : "Mercedes",
                                        posOffset : {x:0, y:3}
                                    },
                                    {
                                        ___debugName : "Expanding Menu 001 - Brand - Porsche",
                                        titleText : "Porsche",
                                        posOffset : {y:5}
                                    },
                                    {
                                        ___debugName : "Expanding Menu 001 - Brand - Audi",
                                        titleText : "Audi",
                                        posOffset : {y:7}
                                    },
//                                    {
//                                        ___debugName : "Expanding Menu 001 - Brand - BMW",
//                                        titleText : "BMW",
//                                        posOffset : {y:14}
//                                    }
                                ],
                                hoverStateJustEnteredCallback      : emptyCallbackFunction,
                                hoverStateContinuedCallback : expandingMenu_Category_HandleStayingInside,
                                hoverStateJustLeftCallback       : emptyCallbackFunction,
                                choiceActivationCallback : selectBrand,
                            }, // Brand
                        },
                        {
                            creatorCallback : createCategoryMenu,
                            categoryMenuInfo : {
                                ___debugName : "Expanding Menu 001 - Year",
                                titleText : "Year",
                                meshTextId : YEAR,
                                posOffsetSmall : {x:-10, y:-0.2},
                                posOffsetExpanded : {x:-10, y:2},
                                choices : [
                                    {
                                        ___debugName : "Expanding Menu 001 - Year - 2016",
                                        titleText : "2016",
                                        posOffset : {y:3}
                                    },
                                    {
                                        ___debugName : "Expanding Menu 001 - Year - 2015",
                                        titleText : "2015",
                                        posOffset : {y:4.5}
                                    },
                                    {
                                        ___debugName : "Expanding Menu 001 - Year - 2014",
                                        titleText : "2014",
                                        posOffset : {y:6}
                                    },
                                    {
                                        ___debugName : "Expanding Menu 001 - Year - 2013",
                                        titleText : "2013",
                                        posOffset : {y:7.5}
                                    },
                                    {
                                        ___debugName : "Expanding Menu 001 - Year - 2012",
                                        titleText : "2012",
                                        posOffset : {y:9}
                                    },
                                    {
                                        ___debugName : "Expanding Menu 001 - Year - 2011",
                                        titleText : "2011",
                                        posOffset : {y:10.5}
                                    },
//                                    {
//                                        ___debugName : "Expanding Menu 001 - Year - 2010",
//                                        titleText : "2010",
//                                        posOffset : {y:12}
//                                    },
                                    {
                                        ___debugName : "Expanding Menu 001 - Year - 2009",
                                        titleText : "2009",
                                        posOffset : {y:13.5}
                                    },
//                                    {
//                                        ___debugName : "Expanding Menu 001 - Year - 2008",
//                                        titleText : "2008",
//                                        posOffset : {y:20}
//                                    }
                                ],
                                hoverStateJustEnteredCallback      : emptyCallbackFunction,
                                hoverStateContinuedCallback : expandingMenu_Category_HandleStayingInside,
                                hoverStateJustLeftCallback       : emptyCallbackFunction,
                                choiceActivationCallback : selectYear,
                            }, // Year
                        }
                    ], // categories
                } //
            }, //  Expanding Menu
            
]; // end of menuLayout






///////////////////////////////////////
// registered callback to outside

function emptyCallbackFunction(input) {
    console.log("###### emptyCallbackFunction(" + (input ? input : "empty") + ") was called !!!");
}

var selectCityCallbackFunction = emptyCallbackFunction;
var selectBrandCallbackFunction = emptyCallbackFunction;
var selectYearCallbackFunction = emptyCallbackFunction;

function setSelectCityCallback(callbackFunction)    { selectCityCallbackFunction    = callbackFunction; }
function selectCity(citySelected)                   { selectCityCallbackFunction(citySelected);         }
function setSelectBrandCallback(callbackFunction)   { selectBrandCallbackFunction   = callbackFunction; }
function selectBrand(citySelected)                  { selectBrandCallbackFunction(citySelected);        }
function setSelectYearCallback(callbackFunction)    { selectYearCallbackFunction    = callbackFunction; }
function selectYear(citySelected)                   { selectYearCallbackFunction(citySelected);         }


///////////////////////////////////////
// update texts
function replaceMeshText(indiceForMeshTextToReplace, newMeshText) {
    var textShapes = THREE.FontUtils.generateShapes( (newMeshText ? newMeshText : "???hhgh9hg9"), {'font' : 'helvetiker','weight' : 'bold', 'style' : 'normal','size' : 1,'curveSegments' : 300} );
    var textGeometry = new THREE.ShapeGeometry( textShapes );
    var textMesh = new THREE.Mesh( textGeometry, new THREE.MeshBasicMaterial( { color: 0xc0ffc0 } ) ) ;
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
    replaceMeshText(YEAR, yearString);
//    var textShapes = THREE.FontUtils.generateShapes( (yearString ? yearString : "???hhgh9hg9"), {'font' : 'helvetiker','weight' : 'normal', 'style' : 'normal','size' : 1,'curveSegments' : 300} );
//    var textGeometry = new THREE.ShapeGeometry( textShapes );
//    var textMesh = new THREE.Mesh( textGeometry, new THREE.MeshBasicMaterial( { color: 0xc0c0c0 } ) ) ;
//    textMesh.___MESH_NAME = ">>> " + yearString + " in small zone";
//    
//    textMesh.position.x = meshArrayForTextUpdate[YEAR].position.x;
//    textMesh.position.y = meshArrayForTextUpdate[YEAR].position.y;
//    textMesh.position.z = meshArrayForTextUpdate[YEAR].position.z;
//
//    // replace
//    var parent = meshArrayForTextUpdate[YEAR].parent;
//    parent.remove(meshArrayForTextUpdate[YEAR]);
//    parent.add(textMesh);
//    meshArrayForTextUpdate[YEAR]  = textMesh;
}

function setCity(cityString) {
    replaceMeshText(CITY, cityString);
}
function setBrand(brandString) {
    replaceMeshText(BRAND, brandString);
}

///////////////////////////////////////
// scene creation

function createSceneLayout(selectableArrayToAddTo) {
    for (var x=0; x < menuLayout.length; x++) {
        if (menuLayout[x].creatorCallback) {menuLayout[x].creatorCallback(menuLayout[x].expandingMenuInfo, selectableArrayToAddTo); }
    }
}

function createExpandingMenu(expandingMenuInfo, selectableArrayToAddTo) {
    // create canvas (initially small size)
    var textureForTransparency01 = THREE.ImageUtils.loadTexture( "../images/a-grayBorderDarkCenter.png" );
    var expandingMenuBoxMaterial = new THREE.MeshBasicMaterial({color: 0x404040, alphaMap: textureForTransparency01, alphaMap: textureForTransparency01, side: THREE.DoubleSide, transparent: true});
    var expandingMenuBoxGeometry = new THREE.PlaneBufferGeometry (expandingMenuInfo.sizeSmall.length,   expandingMenuInfo.sizeSmall.height);
    var expandingMenuBoxMesh = new THREE.Mesh( expandingMenuBoxGeometry, expandingMenuBoxMaterial );
    expandingMenuBoxMesh.___MESH_NAME = expandingMenuInfo.___debugName;
    expandingMenuBoxMesh.position.x = expandingMenuInfo.pos.x;
    expandingMenuBoxMesh.position.y = expandingMenuInfo.pos.y;
    expandingMenuBoxMesh.position.z = expandingMenuInfo.pos.z;
    scene.add(expandingMenuBoxMesh);
    // make this UI interactivable
    selectables.push(expandingMenuBoxMesh);
    expandingMenuBoxMesh.hoverStateJustEnteredCallback = expandingMenuInfo.hoverStateJustEnteredCallback;
    expandingMenuBoxMesh.hoverStateContinuedCallback = expandingMenuInfo.hoverStateContinuedCallback;
    expandingMenuBoxMesh.hoverStateJustLeftCallback = expandingMenuInfo.hoverStateJustLeftCallback;
    
    // loop all sub menus
    var qtyCategories = expandingMenuInfo.categories.length;
//    var verticalSpacing = expandingMenuInfo.expansionGrowth.up / qtyChoices; // TBD: upgrade this function if it becomes also required to grow down.
    
    for(var x=0; x < qtyCategories; x++) {
        // create this sub menu
        if (expandingMenuInfo.categories[x].creatorCallback) {
            expandingMenuInfo.categories[x].creatorCallback(expandingMenuBoxMesh, expandingMenuInfo.categories[x].categoryMenuInfo, selectableArrayToAddTo);
        }
    }
}

function createCategoryMenu(parentMesh, categoryMenuInfo, selectableArrayToAddTo) {
    console.log("createCategoryMenu(" 
                + "\"" + ((parentMesh && parentMesh.___MESH_NAME) ? parentMesh.___MESH_NAME : "????") + "\"" + ", "
                + "\"" + ((categoryMenuInfo && categoryMenuInfo.___debugName) ? categoryMenuInfo.___debugName : "????") + "\"" 
                + " ) was called");

    // add display-only texts of categories on small zone
    var textShapes = THREE.FontUtils.generateShapes( (categoryMenuInfo.titleText ? categoryMenuInfo.titleText : "???64565"), {'font' : 'helvetiker','weight' : 'normal', 'style' : 'normal','size' : 1,'curveSegments' : 300} );
    var textGeometry = new THREE.ShapeGeometry( textShapes );
    var textMesh = new THREE.Mesh( textGeometry, new THREE.MeshBasicMaterial( { color: 0xc0c0c0 } ) ) ;
    textMesh.___MESH_NAME = categoryMenuInfo.___debugName + " in small zone";
    parentMesh.add(textMesh);
    textMesh.position.x = categoryMenuInfo.posOffsetSmall.x;
    textMesh.position.y = categoryMenuInfo.posOffsetSmall.y;
    textMesh.position.z = 0.1;
    meshArrayForTextUpdate[categoryMenuInfo.meshTextId] = textMesh;
    
    
    // add active-able texts of categories on large zone (initially inactive)
    textMesh = new THREE.Mesh( textGeometry, new THREE.MeshBasicMaterial( { color: 0xc0c0c0 } ) ) ;
    textMesh.___MESH_NAME = categoryMenuInfo.___debugName + " in expanded zone";
    parentMesh.add(textMesh);
    textMesh.position.x = categoryMenuInfo.posOffsetExpanded.x;
    textMesh.position.y = categoryMenuInfo.posOffsetExpanded.y;
    textMesh.position.z = 0.1;
    // make this UI interactivable
    selectables.push(textMesh);

    textMesh.visible = true;    
    
    var qtyChoices = categoryMenuInfo.choices.length;

    // add selectable texts of categories' choices on large zone (initially inactive)
    for(var x=0; x < qtyChoices; x++) {
        var choice = categoryMenuInfo.choices[x];
        // create this sub menu
        textShapes = THREE.FontUtils.generateShapes( (choice.titleText ? choice.titleText : "???g54g54"), {'font' : 'helvetiker','weight' : 'normal', 'style' : 'normal','size' : 1,'curveSegments' : 300} );
        textGeometry = new THREE.ShapeGeometry( textShapes );
        var textMeshL2 = new THREE.Mesh( textGeometry, new THREE.MeshBasicMaterial( { color: 0xc0c0c0 } ) ) ;
        textMeshL2.___MESH_NAME = choice.___debugName;
        textMesh.add(textMeshL2);
        textMeshL2.position.x = (choice.posOffset.x ? choice.posOffset.x : 0);
        textMeshL2.position.y = choice.posOffset.y;
        textMeshL2.position.z = 0.1;
        textMeshL2.visible = true;
        
        
    }
}




///////////////////////////////////////
// gaze behavior


function expandingMenu_HandleEntering(meshObject) {
    console.log("entering function expandingMenu_HandleEntering()");
    for (x =0; x < meshObject.children.length ; x++ ) {
        meshObject.children[x].visible = true;
    }
    
}

function expandingMenu_HandleStayingInside(meshObject) {
    console.log("entering function expandingMenu_HandleStayingInside()");
}

function expandingMenu_HandleExiting(meshObject) {
    console.log("entering function expandingMenu_HandleExiting()");
}

function expandingMenu_Category_HandleStayingInside(meshObject) {
    console.log("entering function expandingMenu_Category_HandleStayingInside()");
}
