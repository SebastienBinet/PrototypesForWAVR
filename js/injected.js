function handleMessage(e,t,n){if(e.name&&("db_screenshot"===e.name&&(null==canvas?init(e.data):discardSnapshot(!0)),"db_tool"===e.name&&(canvas&&canvas.discardActiveObject(),isObjectFocused=!1,selectedTool=e.data),"db_close"===e.name&&dispose(),"db_save"===e.name)){canvas.discardActiveObject(),isObjectFocused=!1,$("#damnbugs-image").remove();var o=$("<input type=hidden id=damnbugs-image />").val(canvas.toDataURL());$(".crowdsourcedtesting-canvas").append(o);var a=document.createElement("SCRIPT");a.type="text/javascript",a.src=DB_HOST+"/bookmarklet/v1/dist/clipper.min.js?"+(new Date).getTime()/1e5,document.getElementsByTagName("head")[0].appendChild(a)}}function init(e){$("body").css("overflow","hidden"),Browser.addKeyboardHandlers({27:onEscKeyDown}),$(document).on("keydown",onKeydown),$(window).on("resize",onWindowResize);var t=getMaxZindex();zIndex=t==-(1/0)?1:t,createCanvas(e),createTools()}function getMaxZindex(){var e=Math.max.apply(null,$.map($("body *"),function(e,t){return"static"!=$(e).css("position")?parseInt($(e).css("z-index"))||1:void 0}));return e}function createCanvasContainer(e,t){var n=$("<div class='crowdsourcedtesting-canvas'></div>");return n.css({position:"fixed",top:"0",left:"0",border:"0",padding:"0",margin:"0",overflow:"hidden","background-color":"#E0DEDE","background-image":"none","-webkit-user-select":"none","-webkit-user-drag":"none","-webkit-tap-highlight-color":"rgba(0, 0, 0, 0)","touch-action":"none","z-index":zIndex++,width:e,height:t}),$("body").append(n),n}function createTools(){var e=$("<iframe class='crowdsourcedtesting-tools'></iframe>").attr({src:chrome.extension.getURL("tools/editor.html"),allowtransparency:"true"}).css({position:"fixed",top:"0",right:"0",border:"0",padding:"0",margin:"0",overflow:"hidden","-webkit-user-select":"none","-webkit-user-drag":"none","-webkit-tap-highlight-color":"rgba(0, 0, 0, 0)","touch-action":"none","z-index":zIndex++,width:64,height:310});return $("body").append(e),e}function dispose(){canvas=null,$("body").css("overflow","auto"),$(document).off("keydown",onKeydown),$(window).off("resize",onWindowResize),$(".crowdsourcedtesting-canvas, .crowdsourcedtesting-tools").remove(),window.postMessage({name:"db_close_dialog"},"*")}function onWindowResize(){$(".crowdsourcedtesting-canvas").css({width:$(window).width(),height:$(window).height()})}function onKeydown(e){if(canvas&&(8==e.which||46==e.which)){var t=canvas.getActiveObject();if(isTextField(t)&&t.isEditing)return;e.preventDefault(),canvas.remove(t),isObjectFocused=!1}}function onEscKeyDown(e){if(canvas){var t=canvas.getActiveObject();isObjectFocused=!1,isTextField(t)&&""===t.text?canvas.remove(t):discardSnapshot()}}function onSelectionCleared(e){isObjectSelected=!1,isTextField(selectedObject)&&""===selectedObject.text&&canvas.remove(selectedObject),selectedObject=null}function onObjectScaling(e){isObjectMoving=!0}function onObjectRotating(e){isObjectMoving=!0}function onObjectMoving(e){isObjectMoving=!0}function onObjectModified(e){isObjectMoving=!1}function onObjectSelected(e){isObjectSelected=!0,isObjectFocused=!0,selectedObject=e.target}function onMouseUp(e){isMouseDown=!1,selectedObject&&"ellipse"===selectedObject.type&&0==selectedObject.rx&&0==selectedObject.ry&&canvas.remove(selectedObject)}function onMouseMove(e){if(!isObjectMoving&&isMouseDown&&selectedObject){var t=canvas.getPointer(e.e);switch(selectedTool){case 2:case 3:resizeSquare(t);break;case 4:resizeEllipse(t)}}}function onMouseDown(e){if(isMouseDown=!0,!isObjectSelected){if(isObjectFocused)return void(isObjectFocused=!1);var t=canvas.getPointer(e.e);switch(x=t.x,y=t.y,selectedTool){case 1:addText(t);break;case 2:isDrawing=!0,addSquare(t);break;case 3:addSquare(t,!0);break;case 4:isDrawing=!0,addEllipse(t)}}}function discardSnapshot(e){return canvas.getActiveObject()||!e&&!confirm("Discard this snapshot?")?(canvas.deactivateAll(),void canvas.renderAll()):void dispose()}function createCanvas(e){var t=$(window).width(),n=$(window).height(),o=createCanvasContainer(t,n),a=document.createElement("canvas");a.width=t,a.height=n,o.append(a);var i=new Image;i.onload=function(){if(canvas=new fabric.Canvas(a,{selection:!1}),canvas.on("object:selected",onObjectSelected),canvas.on("object:moving",onObjectMoving),canvas.on("object:modified",onObjectModified),canvas.on("object:scaling",onObjectScaling),canvas.on("object:rotating",onObjectRotating),canvas.on("selection:cleared",onSelectionCleared),canvas.on("mouse:down",onMouseDown),canvas.on("mouse:up",onMouseUp),canvas.on("mouse:move",onMouseMove),1!==window.devicePixelRatio){var e=canvas.getElement();e.setAttribute("width",t*window.devicePixelRatio),e.setAttribute("height",n*window.devicePixelRatio),e.getContext("2d").scale(window.devicePixelRatio,window.devicePixelRatio)}var o=new fabric.Image(i,{left:0,top:0,selectable:!1});o.scaleToWidth(t),canvas.add(o)},i.src=e}function addText(e){var t=new fabric.IText("",{cornerSize:6,cornerColor:"#0583D1",cursorColor:selectedColor,cursorDelay:100,cursorDuration:100,fill:selectedColor,shadow:"rgba(0,0,0,0.2) 3px 3px 3px",fontFamily:"Helvetica",fontWeight:800,fontSize:30,stroke:"#ffffff",strokeWidth:1.5,editingBorderColor:"rgba(0,0,0,0)",borderColor:"#0583D1",top:e.y-26,left:e.x});canvas.add(t),canvas.setActiveObject(t),t.enterEditing()}function addEllipse(e){var t=new fabric.Ellipse({borderColor:"#0583D1",cornerColor:"#0583D1",cornerSize:6,left:e.x,top:e.y,rx:0,ry:0,fill:"rgba(0,0,0,0)",stroke:selectedColor,strokeWidth:3});canvas.add(t),canvas.setActiveObject(t)}function addSquare(e,t){var n=new fabric.Rect({borderColor:"#0583D1",cornerColor:"#0583D1",cornerSize:6,width:0,height:0,left:e.x,top:e.y,fill:t?"#1E2328":"rgba(0,0,0,0)",stroke:t?"rgba(0,0,0,0)":selectedColor,strokeWidth:2});canvas.add(n),canvas.setActiveObject(n)}function resizeSquare(e){var t=Math.abs(e.x-x),n=Math.abs(e.y-y);if(!t||!n)return!1;var o=canvas.getActiveObject();o.set({width:t,height:n}),o.setCoords(),canvas.renderAll()}function resizeEllipse(e){var t=Math.abs(e.x-x),n=Math.abs(e.y-y);if(!t||!n)return!1;var o=canvas.getActiveObject();o.set({rx:t,ry:n,width:t,height:n}),o.setCoords(),canvas.renderAll()}function isTextField(e){return e?"i-text"===e.get("type"):!1}var canvas,zIndex=1,isDrawing=!0,isObjectMoving=!1,isObjectSelected=!1,isObjectFocused=!1,isMouseDown=!1,selectedColor="#EB4A41",selectedObject,selectedTool=1,DB_HOST="https://crowdsourcedtesting.com",x,y;Browser.addMessageHandlers({db_screenshot:handleMessage}),window.addEventListener("message",function(e){handleMessage(e.data,e)},!1);