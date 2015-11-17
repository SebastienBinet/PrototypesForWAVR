var ALL_CHOICES     = 5;

var TYPE_HATCHBACK  = 10;
var TYPE_SUV        = 11;
var TYPE_SEDAN      = 12;
var TYPE_ALL        = ALL_CHOICES;

var BRAND_AUDI      = 100;
var BRAND_BMW       = 110;
var BRAND_MERCEDES  = 120;
var BRAND_ALL       = ALL_CHOICES;

var MODEL_AUDI_A3   = 1000;
var MODEL_AUDI_A4   = 1001;
var MODEL_AUDI_A5   = 1002;
var MODEL_AUDI_A6   = 1003;
var MODEL_AUDI_ALL  = ALL_CHOICES;

var MODEL_BMW_325   = 1100;
var MODEL_BMW_X3    = 1101;
var MODEL_BMW_X5    = 1102;
var MODEL_BMW_ALL   = ALL_CHOICES;

var MODEL_MERCEDES_GLK  = 1200;
var MODEL_MERCEDES_ALL  = ALL_CHOICES;

var YEAR_ALL            = ALL_CHOICES;
var PRICE_ALL           = ALL_CHOICES;


var FILTER_ALL = 20;
var FILTER_NONE = 20;
    
var databaseForCodeValidation = [
    {   id: 255, type: TYPE_SEDAN   , brand: BRAND_AUDI      , model: MODEL_AUDI_A3      , year: 2016   , price: 20000},
    {   id: 256, type: TYPE_SEDAN   , brand: BRAND_AUDI      , model: MODEL_AUDI_A3      , year: 2015   , price: 19000},
    {   id: 257, type: TYPE_SEDAN   , brand: BRAND_AUDI      , model: MODEL_AUDI_A3      , year: 2014   , price: 18000},
    {   id: 258, type: TYPE_SEDAN   , brand: BRAND_AUDI      , model: MODEL_AUDI_A4      , year: 2016   , price: 20000},
    {   id: 259, type: TYPE_SEDAN   , brand: BRAND_AUDI      , model: MODEL_AUDI_A4      , year: 2015   , price: 19000},
    {   id: 260, type: TYPE_SEDAN   , brand: BRAND_AUDI      , model: MODEL_AUDI_A5      , year: 2016   , price: 20000},
    {   id: 261, type: TYPE_SEDAN   , brand: BRAND_AUDI      , model: MODEL_AUDI_A5      , year: 2015   , price: 19000},
    {   id: 262, type: TYPE_SEDAN   , brand: BRAND_BMW       , model: MODEL_BMW_325      , year: 2016   , price: 20000},
    {   id: 263, type: TYPE_SEDAN   , brand: BRAND_BMW       , model: MODEL_BMW_325      , year: 2015   , price: 19000},
    {   id: 264, type: TYPE_SUV     , brand: BRAND_BMW       , model: MODEL_BMW_X3       , year: 2016   , price: 20000},
    {   id: 265, type: TYPE_SUV     , brand: BRAND_MERCEDES  , model: MODEL_MERCEDES_GLK , year: 2016   , price: 20000},
];

var visibilityFlag_Type = {
    VISIBLE_FLAG_TYPE_SUV           : true,
    VISIBLE_FLAG_TYPE_SEDAN         : true,
};
var visibilityFlag_Brand = {
    VISIBLE_FLAG_BRAND_AUDI         : true,
    VISIBLE_FLAG_BRAND_BMW          : true,
    VISIBLE_FLAG_BRAND_MERCEDES     : true,
};
var visibilityFlag_ModelAudi = {
    VISIBLE_FLAG_MODEL_AUDI_A3      : true,
    VISIBLE_FLAG_MODEL_AUDI_A4      : true,
    VISIBLE_FLAG_MODEL_AUDI_A5      : true,
    VISIBLE_FLAG_MODEL_AUDI_A6      : true,
};
var visibilityFlag_ModelBmw = {
    VISIBLE_FLAG_MODEL_BMW_325      : true,
    VISIBLE_FLAG_MODEL_BMW_X3       : true,
    VISIBLE_FLAG_MODEL_BMW_X5       : true,
};
var visibilityFlag_ModelMercedes = {
    VISIBLE_FLAG_MODEL_MERCEDES_GLK : true,
};

var visibilityFlag_YearMin = 1900;
var visibilityFlag_YearMax = 2100;
var visibilityFlag_PriceMin = 0;
var visibilityFlag_PriceMax = 1000000;

function setvisibilityFlag_Type(type, isVisible) { 
    switch (type) {
            case TYPE_SUV: {
                visibilityFlag_Type.VISIBLE_FLAG_TYPE_SUV      = isVisible;
                break;
            }
            case TYPE_SEDAN: {
                visibilityFlag_Type.VISIBLE_FLAG_TYPE_SEDAN    = isVisible;
                break;
            }
            case ALL_CHOICES: {
                visibilityFlag_Type.VISIBLE_FLAG_TYPE_SUV      = isVisible;
                visibilityFlag_Type.VISIBLE_FLAG_TYPE_SEDAN    = isVisible;
                break;
            }
            default: {
                console.error("############ assert 5k5j4kj34k5h");
                break;
            }
    }
}

function setvisibilityFlag_Brand(brand, isVisible) { 
    switch (brand) {
            case BRAND_AUDI: {
                visibilityFlag_Brand.VISIBLE_FLAG_BRAND_AUDI      = isVisible;
                break;
            }
            case BRAND_BMW: {
                visibilityFlag_Brand.VISIBLE_FLAG_BRAND_BMW    = isVisible;
                break;
            }
            case BRAND_MERCEDES: {
                visibilityFlag_Brand.VISIBLE_FLAG_BRAND_MERCEDES    = isVisible;
                break;
            }
            case ALL_CHOICES: {
                visibilityFlag_Brand.VISIBLE_FLAG_BRAND_BMW    = isVisible;
                visibilityFlag_Brand.VISIBLE_FLAG_BRAND_AUDI      = isVisible;
                visibilityFlag_Brand.VISIBLE_FLAG_BRAND_MERCEDES    = isVisible;
                break;
            }
            default: {
                console.error("############ assert jd8d8d76yf7fd");
                break;
            }
    }
}
function setvisibilityFlag_ModelAudi(modelAudi, isVisible) { 
    switch (modelAudi) {
            case MODEL_AUDI_A3: {
                visibilityFlag_ModelAudi.VISIBLE_FLAG_MODEL_AUDI_A3      = isVisible;
                break;
            }
            case MODEL_AUDI_A4: {
                visibilityFlag_ModelAudi.VISIBLE_FLAG_MODEL_AUDI_A4      = isVisible;
                break;
            }
            case MODEL_AUDI_A5: {
                visibilityFlag_ModelAudi.VISIBLE_FLAG_MODEL_AUDI_A5      = isVisible;
                break;
            }
            case MODEL_AUDI_A6: {
                visibilityFlag_ModelAudi.VISIBLE_FLAG_MODEL_AUDI_A6      = isVisible;
                break;
            }
            case ALL_CHOICES: {
                visibilityFlag_ModelAudi.VISIBLE_FLAG_MODEL_AUDI_A3      = isVisible;
                visibilityFlag_ModelAudi.VISIBLE_FLAG_MODEL_AUDI_A4      = isVisible;
                visibilityFlag_ModelAudi.VISIBLE_FLAG_MODEL_AUDI_A5      = isVisible;
                visibilityFlag_ModelAudi.VISIBLE_FLAG_MODEL_AUDI_A6      = isVisible;
                break;
            }
            default: {
                console.error("############ assert 767k7k6j4hh45h");
                break;
            }
    }
}
function setvisibilityFlag_ModelBmw(modelBmw, isVisible) { 
    switch (modelBmw) {
            case MODEL_BMW_325: {
                visibilityFlag_ModelBmw.VISIBLE_FLAG_MODEL_BMW_325      = isVisible;
                break;
            }
            case MODEL_BMW_X3: {
                visibilityFlag_ModelBmw.VISIBLE_FLAG_MODEL_BMW_X3    = isVisible;
                break;
            }
            case MODEL_BMW_X5: {
                visibilityFlag_ModelBmw.VISIBLE_FLAG_MODEL_BMW_X5    = isVisible;
                break;
            }
            case ALL_CHOICES: {
                visibilityFlag_ModelBmw.VISIBLE_FLAG_MODEL_BMW_325      = isVisible;
                visibilityFlag_ModelBmw.VISIBLE_FLAG_MODEL_BMW_X3      = isVisible;
                visibilityFlag_ModelBmw.VISIBLE_FLAG_MODEL_BMW_X5      = isVisible;
                break;
            }
            default: {
                console.error("############ assert gfgufug8isdfg");
                break;
            }
    }
}
function setvisibilityFlag_ModelMercedes(modelMercedes, isVisible) { 
    switch (modelMercedes) {
            case MODEL_MERCEDES_GLK: {
                visibilityFlag_ModelMercedes.VISIBLE_FLAG_MODEL_MERCEDES_GLK      = isVisible;
                break;
            }
            case ALL_CHOICES: {
                visibilityFlag_ModelMercedes.VISIBLE_FLAG_MODEL_MERCEDES_GLK      = isVisible;
                break;
            }
            default: {
                console.error("############ assert hythr5hgfder");
                break;
            }
    }
}
function setvisibilityFlag_Year(min, max) { 
    visibilityFlag_YearMin = (min == YEAR_ALL) ? 1900 : min;
    visibilityFlag_YearMax = (max == YEAR_ALL) ? 2100 : max;
}
function setvisibilityFlag_Price(min, max) { 
    visibilityFlag_PriceMin = (min == PRICE_ALL) ? 0 : min;
    visibilityFlag_PriceMax = (max == PRICE_ALL) ? 1000000 : max;
}


function getArrayOfVisibleCars() {
    var a=[];
    for (var i=0; i<database.length; i++) {
        var thisCarIsCurrentlyVisible = true;
        thisCarIsCurrentlyVisible = thisCarIsCurrentlyVisible && !(database[i].type  == TYPE_SUV                && !visibilityFlag_Type.            VISIBLE_FLAG_TYPE_SUV           );
        thisCarIsCurrentlyVisible = thisCarIsCurrentlyVisible && !(database[i].type  == TYPE_SEDAN              && !visibilityFlag_Type.            VISIBLE_FLAG_TYPE_SEDAN         );
        thisCarIsCurrentlyVisible = thisCarIsCurrentlyVisible && !(database[i].brand == BRAND_AUDI              && !visibilityFlag_Brand.           VISIBLE_FLAG_BRAND_AUDI         );
        thisCarIsCurrentlyVisible = thisCarIsCurrentlyVisible && !(database[i].brand == BRAND_BMW               && !visibilityFlag_Brand.           VISIBLE_FLAG_BRAND_BMW          );
        thisCarIsCurrentlyVisible = thisCarIsCurrentlyVisible && !(database[i].brand == BRAND_MERCEDES          && !visibilityFlag_Brand.           VISIBLE_FLAG_BRAND_MERCEDES     );
        thisCarIsCurrentlyVisible = thisCarIsCurrentlyVisible && !(database[i].model == MODEL_AUDI_A3           && !visibilityFlag_ModelAudi.       VISIBLE_FLAG_MODEL_AUDI_A3      );
        thisCarIsCurrentlyVisible = thisCarIsCurrentlyVisible && !(database[i].model == MODEL_AUDI_A4           && !visibilityFlag_ModelAudi.       VISIBLE_FLAG_MODEL_AUDI_A4      );
        thisCarIsCurrentlyVisible = thisCarIsCurrentlyVisible && !(database[i].model == MODEL_AUDI_A5           && !visibilityFlag_ModelAudi.       VISIBLE_FLAG_MODEL_AUDI_A5      );
        thisCarIsCurrentlyVisible = thisCarIsCurrentlyVisible && !(database[i].model == MODEL_AUDI_A6           && !visibilityFlag_ModelAudi.       VISIBLE_FLAG_MODEL_AUDI_A6      );
        thisCarIsCurrentlyVisible = thisCarIsCurrentlyVisible && !(database[i].model == MODEL_BMW_325           && !visibilityFlag_ModelBmw.        VISIBLE_FLAG_MODEL_BMW_325      );
        thisCarIsCurrentlyVisible = thisCarIsCurrentlyVisible && !(database[i].model == MODEL_BMW_X3            && !visibilityFlag_ModelBmw.        VISIBLE_FLAG_MODEL_BMW_X3       );
        thisCarIsCurrentlyVisible = thisCarIsCurrentlyVisible && !(database[i].model == MODEL_BMW_X5            && !visibilityFlag_ModelBmw.        VISIBLE_FLAG_MODEL_BMW_X5       );
        thisCarIsCurrentlyVisible = thisCarIsCurrentlyVisible && !(database[i].model == MODEL_MERCEDES_GLK      && !visibilityFlag_ModelMercedes.   VISIBLE_FLAG_MODEL_MERCEDES_GLK );
        thisCarIsCurrentlyVisible = thisCarIsCurrentlyVisible &&   database[i].year >= visibilityFlag_YearMin;
        thisCarIsCurrentlyVisible = thisCarIsCurrentlyVisible &&   database[i].year <= visibilityFlag_YearMax;
        thisCarIsCurrentlyVisible = thisCarIsCurrentlyVisible &&   database[i].price >= visibilityFlag_PriceMin;
        thisCarIsCurrentlyVisible = thisCarIsCurrentlyVisible &&   database[i].price <= visibilityFlag_PriceMax;
       if (thisCarIsCurrentlyVisible) {
            a.push(database[i].id);
        } else {
            var tt=0; tt=tt+2;
        }
    }
    return a;
}

function codeValidation() {
    var EXPECTED_ALL = [255,256,257,258,259,260,261,262,263,264,265];
    var EXPECTED_NONE = [/*255,256,257,258,259,260,261,262,263,264,265*/];
    var EXPECTED_VUS = [/*255,256,257,258,259,260,261,262,263,*/264,265];
    var EXPECTED_SEDAN = [255,256,257,258,259,260,261,262,263/*,264,265*/];
    var EXPECTED_BMW_MERCEDES = [/*255,256,257,258,259,260,261,*/262,263,264,265];
    var EXPECTED_MERCEDES = [/*255,256,257,258,259,260,261,262,263,264,*/265];
    var EXPECTED_AUDI_MERCEDES = [255,256,257,258,259,260,261,/*262,263,264,*/265];
    var EXPECTED_AUDIA3A5A6_MERCEDES = [255,256,257,/*258,259,*/260,261,/*262,263,264,*/265];
    var EXPECTED_AUDIA3A5A6_MERCEDES_xto2015 = [/*255,*/256,257,/*258,259,260,*/261,/*262,263,264,265*/];
    var EXPECTED_AUDIA3A5A6_MERCEDES_xto2015_0to18000CAN = [/*255,256,*/257,/*258,259,260,261,262,263,264,265*/];
    var nbrCodeErrorDetected=0;
    var didThisSingleVerificationSucceeded;
    var returnedArray;
    database = databaseForCodeValidation;
    
    // validation #1
    returnedArray = getArrayOfVisibleCars();
    didThisSingleVerificationSucceeded = areTwoArraysIdentical(returnedArray, EXPECTED_ALL)
    nbrCodeErrorDetected += didThisSingleVerificationSucceeded ? 0 : 1 ;
    
    // validation #2
    setvisibilityFlag_Type(TYPE_SUV,false);
    returnedArray = getArrayOfVisibleCars();
    didThisSingleVerificationSucceeded = areTwoArraysIdentical(returnedArray, EXPECTED_SEDAN)
    nbrCodeErrorDetected += didThisSingleVerificationSucceeded ? 0 : 1 ;
    
    // validation #3
    setvisibilityFlag_Type(TYPE_SEDAN,false);
    returnedArray = getArrayOfVisibleCars();
    didThisSingleVerificationSucceeded = areTwoArraysIdentical(returnedArray, EXPECTED_NONE)
    nbrCodeErrorDetected += didThisSingleVerificationSucceeded ? 0 : 1 ;

    // validation #4
    setvisibilityFlag_Type(TYPE_SUV,true);
    returnedArray = getArrayOfVisibleCars();
    didThisSingleVerificationSucceeded = areTwoArraysIdentical(returnedArray, EXPECTED_VUS)
    nbrCodeErrorDetected += didThisSingleVerificationSucceeded ? 0 : 1 ;
    
    // validation #5
    setvisibilityFlag_Type(TYPE_ALL,false);
    returnedArray = getArrayOfVisibleCars();
    didThisSingleVerificationSucceeded = areTwoArraysIdentical(returnedArray, EXPECTED_NONE)
    nbrCodeErrorDetected += didThisSingleVerificationSucceeded ? 0 : 1 ;
    
    // validation #6
    setvisibilityFlag_Type(TYPE_ALL,true);
    returnedArray = getArrayOfVisibleCars();
    didThisSingleVerificationSucceeded = areTwoArraysIdentical(returnedArray, EXPECTED_ALL)
    nbrCodeErrorDetected += didThisSingleVerificationSucceeded ? 0 : 1 ;
    
    // validation #
    setvisibilityFlag_Brand(BRAND_AUDI,false);
    returnedArray = getArrayOfVisibleCars();
    didThisSingleVerificationSucceeded = areTwoArraysIdentical(returnedArray, EXPECTED_BMW_MERCEDES)
    nbrCodeErrorDetected += didThisSingleVerificationSucceeded ? 0 : 1 ;
    
    // validation #
    setvisibilityFlag_Brand(BRAND_BMW,false);
    returnedArray = getArrayOfVisibleCars();
    didThisSingleVerificationSucceeded = areTwoArraysIdentical(returnedArray, EXPECTED_MERCEDES)
    nbrCodeErrorDetected += didThisSingleVerificationSucceeded ? 0 : 1 ;

    // validation #
    setvisibilityFlag_Brand(BRAND_AUDI,true);
    returnedArray = getArrayOfVisibleCars();
    didThisSingleVerificationSucceeded = areTwoArraysIdentical(returnedArray, EXPECTED_AUDI_MERCEDES)
    nbrCodeErrorDetected += didThisSingleVerificationSucceeded ? 0 : 1 ;

    // validation #
    setvisibilityFlag_ModelAudi(MODEL_AUDI_A4,false);
    returnedArray = getArrayOfVisibleCars();
    didThisSingleVerificationSucceeded = areTwoArraysIdentical(returnedArray, EXPECTED_AUDIA3A5A6_MERCEDES)
    nbrCodeErrorDetected += didThisSingleVerificationSucceeded ? 0 : 1 ;

    // validation #
    setvisibilityFlag_Year(YEAR_ALL,2015);
    returnedArray = getArrayOfVisibleCars();
    didThisSingleVerificationSucceeded = areTwoArraysIdentical(returnedArray, EXPECTED_AUDIA3A5A6_MERCEDES_xto2015)
    nbrCodeErrorDetected += didThisSingleVerificationSucceeded ? 0 : 1 ;

    // validation #
    setvisibilityFlag_Price(PRICE_ALL,18000);
    returnedArray = getArrayOfVisibleCars();
    didThisSingleVerificationSucceeded = areTwoArraysIdentical(returnedArray, EXPECTED_AUDIA3A5A6_MERCEDES_xto2015_0to18000CAN)
    nbrCodeErrorDetected += didThisSingleVerificationSucceeded ? 0 : 1 ;

    
    if (nbrCodeErrorDetected > 0 ) {
        console.error("##### there were " + nbrCodeErrorDetected + " code errors detected in this file!! ");
    }
    database = null;
}

function areTwoArraysIdentical(a,b) {
    if (a == undefined && b == undefined) { return true;}
    if (a == undefined && b != undefined) { console.log("a=[" + a + "], b=[" + b + "]");return false;}
    if (a != undefined && b == undefined) { console.log("a=[" + a + "], b=[" + b + "]");return false;}
    if (a.length != b.length) { console.log("a=[" + a + "], b=[" + b + "]");return false;}
    for (var i = 0 ; i < a.length; i++) {
        if (a[i] != b[i]) {console.log("a=[" + a + "], b=[" + b + "]"); return false;}
    }
    return true;
}

// validate immediately
codeValidation();