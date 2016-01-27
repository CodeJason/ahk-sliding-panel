
/*
Info must contain:
	id selector
Info can contain:
	side - left or right
	width - %, px or whatever
	slide_time - a double or int value eg 1, 0.5
	z_index - int value for the z-index of the menu
	touch_boundary - int value which turns into px - the amount of distance from the side that it will detect touching
*/
function ahk_slideout(info){
	
	//constants
	var panel = undefined;
	var initialPanelStyles = {
		position:"fixed",
		top:"0",
		bottom:"0",		
		overflow:"auto"		
	};
	
	//default width
	var width = "50%";
	//transition time
	var slide_time = "0.5";
	//panel out
	var slideOut = false;
	//z-index
	var z_index = "999";
	//touch boundary
	var touch_boundary = 50
	
	function applyStyles(styles){
		for(style in styles){
			panel.style[style] = styles[style];			
		}
	}	
	
	if (!info || !info.id){
		console.error("ID of panel not set");
	}
	else{
		panel = document.getElementById(info.id);
	}
		
	if (!panel){
		console.error("Could not get panel using id supplied");
	}else{	
		//set defaults
		
		var panelID = info.id;
		
		//set ints for left and right - figure it would be faster than strings
		var left = true;		
		
		function leftSide(){
			return side == left;
		}
		function rightSide(){
			return side == right;
		}			
		
		//get items from info
		
		//check if setting right - already left
		if (info.side && info.side == "right"){
			left = false;		
		}
		
		//check width
		if (info.width){
			width = info.width;
		}
		//add to styles
		initialPanelStyles.width = width;
		
		//check time
		if (info.slide_time){
			slide_time = info.slide_time;
		}
		//add
		if (left){
			initialPanelStyles.transition = "left " + slide_time + "s";
		}
		else{
			initialPanelStyles.transition = "right " + slide_time + "s";
		}
		
		//z-index
		if (info.z_index){
			z_index = info.z_index;
		}
		initialPanelStyles.zIndex = z_index;
		
		//set position
		if (left){
			initialPanelStyles.left = "-"+width;
		}
		else{
			initialPanelStyles.right = "-"+width;
		}
		
		//touch boundary
		if (info.touch_boundary){
			touch_boundary = info.touch_boundary;
		}
		
		applyStyles(initialPanelStyles);
		
		window.addEventListener("load", function(){
			window.addEventListener("touchstart", touchStart, false);
			window.addEventListener("touchmove", touchDrag, false);
			window.addEventListener("touchend", touchEnd, false);
		});
		
		this.toggleMenu = function(){
			if (left){
				if (slideOut){
					panel.style.left = initialPanelStyles.left;
				}
				else{
					panel.style.left = 0;
				}
			}
			else{
				if (slideOut){
					panel.style.right = initialPanelStyles.right;
				}
				else{
					panel.style.right = 0;					
				}
			}
			slideOut = !slideOut;
		};	
	}
	
	var dragging = false;
	var lastTouch;
	var dragOffset = undefined;
	
	function touchStart(event){		
		if (!dragging && !slideOut){			
			var x = event.touches[0].pageX;
			var within = false;			
			if (left){
				if (x <= touch_boundary){
					within = true;
				}
			}
			else{
				var width = window.innerWidth;
				if (x >= width-touch_boundary){
					within = true;
				}
			}
			if (within){
				//console.log("within")
				dragging = true;
				panel.style.transition = "none";
				setPosition(x);
			}
			//console.log("start", x);
		}
		else if (!dragging && slideOut){						
			var x = event.touches[0].pageX;
			if (left && x > panel.offsetWidth){				
				panel.style.left = initialPanelStyles.left;
				slideOut = false;						
			}
			else if (!left && window.innerWidth-x > panel.offsetWidth){
				panel.style.right = initialPanelStyles.right;
				slideOut = false;				
			}
			else{
				dragging = true;
				panel.style.transition = "none";
				dragOffset = x;
				setPosition(x);				
			}
			
		}
	}
	function touchDrag(event){		
		//console.log("drag");
		if (dragging){
			var x = event.touches[0].pageX;
			if (left && x <= panel.offsetWidth || !left && window.innerWidth-x <= panel.offsetWidth){				
				setPosition(x);
			}
		}
	}
	function touchEnd(){	
		//console.log("end");
		if (dragging){
			panel.style.transition = initialPanelStyles.transition;
			//figure out if over half way
			if (left){
				if (lastTouch >= panel.offsetWidth/2){
					panel.style.left = 0;
					slideOut = true;
				}
				else{
					panel.style.left = initialPanelStyles.left;
					slideOut = false;
				}
			}
			else{
				if (window.innerWidth-lastTouch >= panel.offsetWidth/2){
					panel.style.right = 0;
					slideOut = true;
				}
				else{
					panel.style.right = initialPanelStyles.right;
					slideOut = false;
				}
			}			
			dragging = false;
			dragOffset = undefined;
		}
	}
	
	function setPosition(x){
		var wWidth = window.innerWidth;
		if (dragOffset){
			if (left){
				x = panel.offsetWidth - (dragOffset - x);
			}
			else{			
				x = (wWidth-panel.offsetWidth) + (x-dragOffset);				
			}
		}		
		
		if (left){
			panel.style.left = "-" + (panel.offsetWidth - x) +"px";
		}
		else{				
			panel.style.right = "-" + (panel.offsetWidth - (wWidth-x)) + "px";
		}
		lastTouch = x;
		
	}
}